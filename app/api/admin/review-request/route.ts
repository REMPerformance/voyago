import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail, reviewRequestEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db not configured" }, { status: 500 });
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data: u } = await supabaseAdmin.auth.getUser(token);
  if (!u?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const email = String(b?.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (!process.env.EMAIL_FROM) return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });

  const { subject, html } = reviewRequestEmail(email, b?.name);
  const r = await sendEmail({ to: email, subject, html });
  return NextResponse.json({ ok: r.ok, error: r.error });
}
