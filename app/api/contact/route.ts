import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (b?.website) return NextResponse.json({ ok: true }); // honeypot
  const name = String(b?.name || "").trim().slice(0, 120);
  const email = String(b?.email || "").trim().toLowerCase();
  const message = String(b?.message || "").trim().slice(0, 4000);
  if (name.length < 2 || !EMAIL.test(email) || message.length < 5) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const subject = String(b?.subject || "").trim().slice(0, 200);
  const { error } = await supabaseAdmin.from("contact_messages").insert({ name, email, subject, message });
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  const admin = process.env.ADMIN_NOTIFY_EMAIL;
  if (admin && process.env.EMAIL_FROM) {
    await sendEmail({ to: admin, subject: `Kontakt: ${subject || name}`, html: `<p><b>${name}</b> · ${email}</p><p>${message.replace(/</g, "&lt;")}</p>` }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
