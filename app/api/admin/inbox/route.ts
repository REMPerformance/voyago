import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const TABLES = ["contact_messages", "b2b_leads", "affiliate_signups", "notify_signups"] as const;

async function requireUser(req: NextRequest) {
  if (!supabaseAdmin) return null;
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data } = await supabaseAdmin.auth.getUser(token);
  return data?.user || null;
}

export async function GET(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db not configured" }, { status: 500 });
  if (!(await requireUser(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const out: Record<string, unknown[]> = {};
  for (const t of TABLES) {
    const { data } = await supabaseAdmin.from(t).select("*").order("created_at", { ascending: false }).limit(200);
    out[t] = data || [];
  }
  return NextResponse.json(out);
}

export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db not configured" }, { status: 500 });
  if (!(await requireUser(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const table = url.searchParams.get("table") as (typeof TABLES)[number] | null;
  const id = url.searchParams.get("id");
  if (!table || !TABLES.includes(table) || !id) return NextResponse.json({ error: "bad request" }, { status: 400 });
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
