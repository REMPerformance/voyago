import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getProduct } from "@/config/products";

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
  const { data: apps } = await supabaseAdmin.from("applications").select("aff_code, paid, amount_cents, travelers, product_slug");
  const { data: payouts } = await supabaseAdmin.from("affiliate_payouts").select("affiliate_id, amount");

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
    // Servisný poplatok = súčet serviceFee produktu × počet cestujúcich (presné, z cenníka).
    let serviceBase = 0;
    paid.forEach((o: any) => {
      const p = getProduct(String(o.product_slug || ""));
      const travelers = Math.max(1, (o.travelers || []).length || 1);
      if (p) serviceBase += p.serviceFee * travelers;
    });
    const revenue = paid.reduce((s: number, o: any) => s + (o.amount_cents || 0), 0) / 100;

    // Provízia = % zo servisného poplatku
    let commission = serviceBase * (a.commission_pct / 100);
    let discountDeducted = 0;
    if (a.discount_mode === "from_commission" && a.discount_pct > 0) {
      discountDeducted = revenue * (a.discount_pct / 100); // zľavu hradí partner zo svojej provízie
      commission -= discountDeducted;
      if (commission < 0) commission = 0;
    }

    // Výplaty: koľko už bolo partnerovi vyplatené a koľko mu dlhujeme
    const paidOut = (payouts || [])
      .filter((p: any) => p.affiliate_id === a.id)
      .reduce((s: number, p: any) => s + Number(p.amount || 0), 0);
    const owed = Math.max(0, commission - paidOut);
    return {
      ...a,
      visits: vSids.size,
      orders: orders.length,
      paidOrders: paid.length,
      revenue: Math.round(revenue * 100) / 100,
      serviceBase: Math.round(serviceBase * 100) / 100,
      discountDeducted: Math.round(discountDeducted * 100) / 100,
      commission: Math.round(commission * 100) / 100,
      paidOut: Math.round(paidOut * 100) / 100,
      owed: Math.round(owed * 100) / 100,
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
