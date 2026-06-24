import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ valid: false });
  const code = (new URL(req.url).searchParams.get("code") || "").trim().toUpperCase();
  if (!code) return NextResponse.json({ valid: false });

  const { data } = await supabaseAdmin.from("promo_codes").select("*").eq("code", code).maybeSingle();
  if (!data || !data.active) return NextResponse.json({ valid: false });
  if (data.expires_at && new Date(data.expires_at) < new Date()) return NextResponse.json({ valid: false });
  if (data.max_uses != null && data.used >= data.max_uses) return NextResponse.json({ valid: false });

  return NextResponse.json({ valid: true, percent: data.percent, code });
}
