import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (b?.website) return NextResponse.json({ ok: true }); // honeypot
  const name = String(b?.name || "").trim().slice(0, 120);
  const email = String(b?.email || "").trim().toLowerCase();
  if (name.length < 2 || !EMAIL.test(email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const row = {
    name, email,
    channel: String(b?.channel || "").trim().slice(0, 300),
    audience: String(b?.audience || "").trim().slice(0, 120),
    note: String(b?.note || "").trim().slice(0, 1500),
  };
  const { error } = await supabaseAdmin.from("affiliate_signups").insert(row);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  const admin = process.env.ADMIN_NOTIFY_EMAIL;
  if (admin && process.env.EMAIL_FROM) {
    await sendEmail({ to: admin, subject: `Affiliate prihláška: ${name}`, html: `<p><b>${name}</b> · ${email}</p><p>Kanál: ${row.channel || "—"} · Publikum: ${row.audience || "—"}</p><p>${row.note.replace(/</g, "&lt;")}</p>` }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
