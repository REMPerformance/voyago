import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|whatsapp|telegram|headless|python-requests|curl|wget|axios|node-fetch|lighthouse|gtmetrix|monitor|uptime|preview|scrapy|semrush|ahrefs|dataprovider/i;

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ ok: false });
  let body: any = {};
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }); }

  const ua = req.headers.get("user-agent") || "";
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  const country = req.headers.get("x-vercel-ip-country") || "";
  const region = req.headers.get("x-vercel-ip-country-region") || "";
  let city = "";
  try { city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || ""); } catch { city = req.headers.get("x-vercel-ip-city") || ""; }
  const isBot = BOT_RE.test(ua) || !ua;
  const type = String(body.type || "pageview").slice(0, 20);
  if (type !== "pageview") return NextResponse.json({ ok: true }); // kliky a iné udalosti nesledujeme

  await supabaseAdmin.from("visits").insert({
    sid: String(body.sid || "").slice(0, 60),
    type,
    path: String(body.path || "").slice(0, 200),
    label: String(body.label || "").slice(0, 120),
    href: String(body.href || "").slice(0, 200),
    referrer: String(body.referrer || "").slice(0, 200),
    user_agent: ua.slice(0, 300),
    ip,
    country,
    query: String(body.query || "").slice(0, 300),
    region: region.slice(0, 10),
    city: city.slice(0, 80),
    is_bot: isBot,
  });
  return NextResponse.json({ ok: true });
}
