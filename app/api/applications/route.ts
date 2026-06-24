import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function genRef() {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let r = "";
  for (let i = 0; i < 6; i++) r += s[Math.floor(Math.random() * s.length)];
  return `VYG-${r}`;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const d = await res.json();
    return !!d.success;
  } catch { return false; }
}

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: "no_admin" }, { status: 503 });
  const body = await req.json();

  if (body.honeypot) return NextResponse.json({ error: "spam" }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";

  if (process.env.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(body.turnstileToken || "", ip);
    if (!ok) return NextResponse.json({ error: "captcha" }, { status: 400 });
  }

  const ref = genRef();
  const { data, error } = await supabaseAdmin.from("applications").insert({
    ref,
    product_slug: body.product_slug || "",
    email: body.email || null,
    travelers: body.travelers || [],
    files: body.files || [],
    amount_cents: body.amount_cents || 0,
    paid: false,
    status: "new",
    consent_vop: !!body.consent_vop,
    consent_gdpr: !!body.consent_gdpr,
    consent_at: new Date().toISOString(),
    consent_ip: ip,
    promo_code: body.promoCode ? String(body.promoCode).toUpperCase() : null,
  }).select("id, ref").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: (data as any).id, ref: (data as any).ref });
}
