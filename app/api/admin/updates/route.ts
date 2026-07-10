import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/updates";

export const runtime = "nodejs";

async function auth(req: NextRequest) {
  if (!supabaseAdmin) return null;
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const { data } = await supabaseAdmin.auth.getUser(token);
  return data?.user || null;
}

export async function GET(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data } = await supabaseAdmin.from("visa_updates").select("*").order("published_at", { ascending: false });
  return NextResponse.json({ updates: data || [] });
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const title = String(b?.title || "").trim().slice(0, 200);
  if (title.length < 3) return NextResponse.json({ ok: false, error: "title" }, { status: 400 });

  let slug = slugify(String(b?.slug || title));
  // zabezpečiť unikátnosť
  const { data: existing } = await supabaseAdmin.from("visa_updates").select("id").eq("slug", slug).maybeSingle();
  if (existing && existing.id !== b?.id) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const row = {
    title,
    slug,
    summary: String(b?.summary || "").slice(0, 500),
    body: String(b?.body || "").slice(0, 12000),
    countries: Array.isArray(b?.countries) ? b.countries.map((c: any) => String(c).trim()).filter(Boolean).slice(0, 30) : [],
    category: ["delay", "new_requirement", "price", "closure", "general"].includes(b?.category) ? b.category : "general",
    severity: ["info", "warning", "critical"].includes(b?.severity) ? b.severity : "info",
    restrictions: String(b?.restrictions || "").slice(0, 2000),
    source_url: String(b?.source_url || "").slice(0, 500),
    published: b?.published !== false,
    published_at: b?.published_at ? new Date(b.published_at).toISOString() : new Date().toISOString(),
  };

  if (b?.id) {
    const { error } = await supabaseAdmin.from("visa_updates").update(row).eq("id", b.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, slug });
  }
  const { error } = await supabaseAdmin.from("visa_updates").insert(row);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ error: "db" }, { status: 500 });
  if (!(await auth(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await supabaseAdmin.from("visa_updates").delete().eq("id", id);
  return NextResponse.json({ ok: true });
}
