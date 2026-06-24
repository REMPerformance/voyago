import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { finalizePaidApplication } from "@/lib/finalizeOrder";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get("session_id");
  if (!key || !sid) return NextResponse.json({ paid: false });

  const stripe = new Stripe(key);
  const session = await stripe.checkout.sessions.retrieve(sid);
  const paid = session.payment_status === "paid";
  const appId = session.metadata?.appId;
  let ref: string | null = null;

  if (paid && appId) {
    await finalizePaidApplication(appId);
    if (supabaseAdmin) {
      const { data } = await supabaseAdmin.from("applications").select("ref").eq("id", appId).single();
      ref = (data as any)?.ref ?? null;
    }
  }
  return NextResponse.json({ paid, ref });
}
