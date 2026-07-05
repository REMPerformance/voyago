import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail, newsletterEmail } from "@/lib/email";

export const runtime = "nodejs";

// jednoduché markdown -> html (odseky, ## nadpis, - odrážka, **tučné**)
function toHtml(src: string): string {
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks = src.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((b) => {
    if (b.startsWith("## ")) return `<h2 style="font-size:16px;margin:18px 0 8px">${esc(b.slice(3))}</h2>`;
    if (/^-\s+/m.test(b)) {
      const items = b.split("\n").filter((l) => l.startsWith("- ")).map((l) => `<li style="margin:4px 0">${esc(l.slice(2))}</li>`).join("");
      return `<ul style="font-size:14px;line-height:1.6;padding-left:18px">${items}</ul>`;
    }
    return `<p style="font-size:14px;line-height:1.6">${esc(b).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")}</p>`;
  }).join("");
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db not configured" }, { status: 500 });
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data: u } = await supabaseAdmin.auth.getUser(token);
  if (!u?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const title = String(b?.title || "").trim().slice(0, 160);
  const body = String(b?.body || "").trim().slice(0, 8000);
  const test = String(b?.test || "").trim().toLowerCase();
  if (title.length < 2 || body.length < 2) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  if (!process.env.EMAIL_FROM) return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });

  const bodyHtml = toHtml(body);

  // testovací e-mail len na jednu adresu
  if (test) {
    const { subject, html } = newsletterEmail(test, title, bodyHtml);
    const r = await sendEmail({ to: test, subject, html });
    return NextResponse.json({ ok: r.ok, sent: r.ok ? 1 : 0, test: true, error: r.error });
  }

  // všetci odberatelia (unikátne e-maily)
  const { data } = await supabaseAdmin.from("notify_signups").select("email");
  const emails = Array.from(new Set((data || []).map((r: any) => String(r.email).toLowerCase()).filter(Boolean)));
  let sent = 0;
  for (const to of emails) {
    const { subject, html } = newsletterEmail(to, title, bodyHtml);
    const r = await sendEmail({ to, subject, html });
    if (r.ok) sent++;
    await new Promise((res) => setTimeout(res, 120)); // šetrný rate-limit
  }
  return NextResponse.json({ ok: true, sent, total: emails.length });
}
