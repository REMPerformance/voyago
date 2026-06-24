import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EMAIL } from "@/config/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "email_disabled" }, { status: 503 });
  if (!supabaseAdmin) return NextResponse.json({ error: "no_admin" }, { status: 503 });

  // Len prihlásený admin (overenie Supabase tokenu)
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data: u } = await supabaseAdmin.auth.getUser(token);
  if (!u?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { to, subject, html, attachments } = (await req.json()) as {
    to?: string; subject?: string; html?: string;
    attachments?: { filename: string; content: string }[];
  };
  if (!to) return NextResponse.json({ error: "no_recipient" }, { status: 400 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${EMAIL.fromName} <${process.env.EMAIL_FROM || EMAIL.fromAddress}>`,
      to: [to],
      subject: subject || "Správa od Voyago",
      html: html || "",
      attachments: (attachments || []).map((a) => ({ filename: a.filename, content: a.content })),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json({ error: "send_failed", detail }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
