import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

async function auth(req: NextRequest) {
  if (!supabaseAdmin) return null;
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data } = await supabaseAdmin.auth.getUser(token);
  return data?.user || null;
}

// GET — zoznam partnerov + agregované štatistiky
export async function GET(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: affs } = await supabaseAdmin.from("affiliates").select("*").order("created_at", { ascending: false });
  const { data: visits } = await supabaseAdmin.from("visits").select("sid, query, is_bot, type").eq("type", "pageview");
  const { data: apps } = await supabaseAdmin.from("applications").select("aff_code, paid, amount_cents, travelers");

  const rows = (affs || []).map((a: any) => {
    const codeL = String(a.code).toLowerCase();
    // návštevy: query obsahuje ref=KOD, len ľudia, unikátne session
    const vSids = new Set<string>();
    (visits || []).forEach((v: any) => {
      if (v.is_bot) return;
      const q = String(v.query || "").toLowerCase();
      if (q.includes("ref=" + codeL)) vSids.add(v.sid);
    });
    const orders = (apps || []).filter((o: any) => String(o.aff_code || "").toLowerCase() === codeL);
    const paid = orders.filter((o: any) => o.paid);
    // servisný poplatok = z travelers (súčet); provízia = commission_pct %
    let serviceSum = 0;
    paid.forEach((o: any) => (o.travelers || []).forEach((t: any) => { serviceSum += (t.serviceFee || t.price ? (t.serviceFee || 0) : 0); }));
    const revenue = paid.reduce((s: number, o: any) => s + (o.amount_cents || 0), 0) / 100;
    // ak nemáme serviceFee v travelers, odhad z revenue (konzervatívne 40 %)
    const serviceBase = serviceSum > 0 ? serviceSum : revenue * 0.4;
    let commission = serviceBase * (a.commission_pct / 100);
    if (a.discount_mode === "from_commission" && a.discount_pct > 0) {
      commission -= revenue * (a.discount_pct / 100); // zľava sa odpočíta z provízie
      if (commission < 0) commission = 0;
    }
    return {
      ...a,
      visits: vSids.size,
      orders: orders.length,
      paidOrders: paid.length,
      revenue: Math.round(revenue * 100) / 100,
      commission: Math.round(commission * 100) / 100,
    };
  });
  return NextResponse.json({ affiliates: rows });
}

// POST — vytvoriť partnera (+ voliteľne zľavový kód do discounts/promo_codes)
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const name = String(b?.name || "").trim().slice(0, 120);
  const code = String(b?.code || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 40);
  const commission_pct = Math.max(0, Math.min(100, Number(b?.commission_pct) || 12));
  const discount_pct = Math.max(0, Math.min(90, Number(b?.discount_pct) || 0));
  const discount_mode = b?.discount_mode === "from_commission" ? "from_commission" : "extra";
  if (name.length < 2 || code.length < 2) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  const { error } = await supabaseAdmin.from("affiliates").insert({ name, code, commission_pct, discount_pct, discount_mode, note: String(b?.note || "").slice(0, 500) });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // ak má partner zľavu pre zákazníka, vytvor promo kód (rovnaké meno)
  if (discount_pct > 0) {
    await supabaseAdmin.from("promo_codes").upsert({ code, percent: discount_pct, active: true }, { onConflict: "code" }).select().maybeSingle().then(() => {}, () => {});
  }
  return NextResponse.json({ ok: true });
}

// PATCH — aktivovať/deaktivovať
export async function PATCH(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (!b?.id) return NextResponse.json({ ok: false }, { status: 400 });
  await supabaseAdmin.from("affiliates").update({ active: !!b.active }).eq("id", b.id);
  return NextResponse.json({ ok: true });
}

// DELETE — zmazať partnera
export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await supabaseAdmin.from("affiliates").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
