import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let b: { email?: string; topic?: string; website?: string };
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  if (b?.website) return NextResponse.json({ ok: true }); // honeypot
  const email = String(b?.email || "").trim().toLowerCase();
  const topic = String(b?.topic || "general").slice(0, 60);
  if (!EMAIL.test(email) || email.length > 200) return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { error } = await supabaseAdmin.from("notify_signups").upsert({ email, topic }, { onConflict: "email,topic" });
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  if (process.env.EMAIL_FROM) {
    sendEmail({
      to: email,
      subject: "Dáme vám vedieť — Voyago",
      html: `<p>Ďakujeme! Hneď ako spustíme túto službu, ozveme sa vám na túto adresu.</p><p style="color:#888;font-size:13px">Ak ste o upozornenie nežiadali, túto správu pokojne ignorujte.</p>`,
    }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
