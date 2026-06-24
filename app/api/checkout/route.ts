import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct, productPrice } from "@/config/products";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "stripe_disabled" }, { status: 503 });

  const stripe = new Stripe(key);
  const { appId, slugs, origin, promo } = (await req.json()) as { appId?: string; slugs?: string[]; origin?: string; promo?: string };

  // zľavy z DB (autoritatívne pre účtovanú cenu)
  const discounts: Record<string, number> = {};
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin.from("discounts").select("slug, percent, active");
    (data || []).forEach((d: any) => { if (d.active && d.percent > 0) discounts[d.slug] = d.percent; });
  }

  // promo kód (autoritatívna validácia na serveri)
  let promoPct = 0;
  if (promo && supabaseAdmin) {
    const { data: pc } = await supabaseAdmin.from("promo_codes").select("*").eq("code", String(promo).toUpperCase()).maybeSingle();
    if (pc && pc.active && (!pc.expires_at || new Date(pc.expires_at) > new Date()) && (pc.max_uses == null || pc.used < pc.max_uses)) {
      promoPct = pc.percent || 0;
    }
  }

  const line_items = (slugs || [])
    .map((slug) => {
      const p = getProduct(slug);
      if (!p) return null;
      const base = productPrice(p);
      const pct = discounts[slug] || 0;
      const afterCountry = pct ? base * (1 - pct / 100) : base;
      const amount = promoPct ? Math.round(afterCountry * (1 - promoPct / 100)) : Math.round(afterCountry);
      return {
        price_data: {
          currency: "eur",
          product_data: { name: `Voyago — ${p.name.sk}` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      };
    })
    .filter(Boolean);

  if (line_items.length === 0) return NextResponse.json({ error: "empty" }, { status: 400 });

  const base = origin || req.headers.get("origin") || "";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: line_items as any,
    metadata: { appId: appId || "" },
    success_url: `${base}/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
