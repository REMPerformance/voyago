import { NextResponse } from "next/server";
import Stripe from "stripe";
import { finalizePaidApplication } from "@/lib/finalizeOrder";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whSecret) return NextResponse.json({ error: "stripe_disabled" }, { status: 503 });

  const stripe = new Stripe(key);
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, whSecret);
  } catch {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const appId = session.metadata?.appId;
    if (appId) await finalizePaidApplication(appId);
  }
  return NextResponse.json({ received: true });
}
