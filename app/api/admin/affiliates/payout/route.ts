import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

async function auth(req: NextRequest) {
  if (!supabaseAdmin) return null;
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data } = await supabaseAdmin.auth.getUser(token);
  return data?.user || null;
}

// POST — zaznamenať vyplatenú províziu partnerovi
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const affiliate_id = String(b?.affiliate_id || "");
  const amount = Number(b?.amount);
  if (!affiliate_id || !Number.isFinite(amount) || amount <= 0) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  const { error } = await supabaseAdmin.from("affiliate_payouts").insert({
    affiliate_id,
    amount,
    note: String(b?.note || "").slice(0, 300),
  });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
