import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (b?.website) return NextResponse.json({ ok: true }); // honeypot
  const company = String(b?.company || "").trim().slice(0, 160);
  const email = String(b?.email || "").trim().toLowerCase();
  if (company.length < 2 || !EMAIL.test(email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const row = {
    company, email,
    ico: String(b?.ico || "").trim().slice(0, 20),
    phone: String(b?.phone || "").trim().slice(0, 30),
    volume: String(b?.volume || "").trim().slice(0, 60),
    message: String(b?.message || "").trim().slice(0, 2000),
  };
  const { error } = await supabaseAdmin.from("b2b_leads").insert(row);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  const admin = process.env.ADMIN_NOTIFY_EMAIL;
  if (admin && process.env.EMAIL_FROM) {
    await sendEmail({ to: admin, subject: `B2B dopyt: ${company}`, html: `<p><b>${company}</b> (IČO: ${row.ico || "—"})</p><p>${email} · ${row.phone || "—"} · objem: ${row.volume || "—"}</p><p>${row.message.replace(/</g, "&lt;")}</p>` }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
