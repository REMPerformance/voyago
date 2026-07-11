import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { POSTS as STATIC_POSTS, estimateReadMins } from "@/config/blog";
import type { VisaUpdate } from "@/lib/updates";

/** Zjednotený príspevok pre stránku Blog (blog aj novinka, statický aj z databázy). */
export interface UnifiedPost {
  slug: string;
  kind: "blog" | "update";
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  tag: string;
  image: string;
  countries: string[];
  category: string;
  severity: string;
  destinationSlug: string;
  source: "static" | "db";
}

function fromStatic(lang: "sk" | "en" = "sk"): UnifiedPost[] {
  return STATIC_POSTS.map((p) => ({
    slug: p.slug,
    kind: "blog" as const,
    title: p.title.sk,
    excerpt: p.excerpt.sk,
    date: p.date,
    readMins: estimateReadMins(p),
    tag: p.tag.sk,
    image: p.image,
    countries: [],
    category: "general",
    severity: "info",
    destinationSlug: "",
    source: "static" as const,
  }));
}

function fromDb(rows: VisaUpdate[]): UnifiedPost[] {
  return rows.map((u) => ({
    slug: u.slug,
    kind: (u.kind === "blog" ? "blog" : "update") as "blog" | "update",
    title: u.title,
    excerpt: u.summary,
    date: u.published_at,
    readMins: u.read_mins || 4,
    tag: u.tag || "",
    image: u.image || "",
    countries: u.countries || [],
    category: u.category,
    severity: u.severity,
    destinationSlug: u.destination_slug || "",
    source: "db" as const,
  }));
}

/** Všetky príspevky (statické + DB), zoradené od najnovších. */
export async function getAllPosts(): Promise<UnifiedPost[]> {
  let db: UnifiedPost[] = [];
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin.from("visa_updates").select("*").eq("published", true).order("published_at", { ascending: false }).limit(200);
    db = fromDb((data as VisaUpdate[]) || []);
  }
  const all = [...db, ...fromStatic()];
  // dedup podľa slug (DB má prednosť)
  const seen = new Set<string>();
  const out: UnifiedPost[] = [];
  for (const p of all) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
  }
  return out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Príspevky priradené k destinácii (podľa slug produktu). */
export async function getPostsForDestination(destinationSlug: string): Promise<UnifiedPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.destinationSlug === destinationSlug);
}
