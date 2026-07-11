import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const revalidate = 120;

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ updates: [] });
  const { data } = await supabaseAdmin
    .from("visa_updates")
    .select("slug,title,summary,countries,category,severity,published_at,restrictions,kind,image,tag,destination_slug,read_mins")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(100);
  return NextResponse.json({ updates: data || [] });
}
