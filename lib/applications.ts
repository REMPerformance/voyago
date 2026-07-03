import { supabase, supabaseEnabled } from "@/lib/supabase";

const BUCKET = "applications";

/** Nahrá súbor do Supabase Storage, vráti cestu (path) alebo null. */
export async function uploadFile(file: File): Promise<string | null> {
  if (!supabase) return null;
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  const path = `uploads/${crypto.randomUUID()}-${safe}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) { console.error("upload error", error.message); return null; }
  return path;
}

/** Dočasný podpísaný odkaz na stiahnutie súboru (1 h). */
export async function fileSignedUrl(path: string): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

/** Affiliate kód z localStorage (platí 30 dní od kliknutia na ?ref= odkaz). */
function getAffiliateRef(): string | null {
  try {
    const raw = window.localStorage.getItem("voyago.ref");
    if (!raw) return null;
    const { c, t } = JSON.parse(raw);
    if (!c || Date.now() - t > 30 * 24 * 3600 * 1000) return null;
    return String(c).slice(0, 40);
  } catch { return null; }
}

export interface SubmitItem { slug: string; price: number; data: Record<string, string>; express?: boolean; protection?: boolean; }

/** Odošle žiadosť cez server (IP + súhlas + referencia + anti-spam). Vráti {id, ref} alebo null. */
export interface SubmitOptions { consent?: boolean; honeypot?: string; turnstileToken?: string; promoCode?: string; }

export async function submitApplication(
  items: SubmitItem[], totalEur: number, opts: SubmitOptions = {},
): Promise<{ id: string; ref: string } | null> {
  if (items.length === 0) return null;
  const email = items.find((i) => i.data.email)?.data.email ?? null;
  const files: string[] = [];
  items.forEach((i) => Object.values(i.data).forEach((v) => {
    if (typeof v === "string") v.split(",").forEach((part) => { if (part.startsWith("uploads/")) files.push(part); });
  }));
  try {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_slug: items[0]?.slug ?? "",
        email,
        travelers: items.map((i) => ({ slug: i.slug, price: i.price, data: i.data, express: !!i.express, protection: !!i.protection })),
        ref: getAffiliateRef(),
        files,
        amount_cents: Math.round(totalEur * 100),
        consent_vop: !!opts.consent,
        consent_gdpr: !!opts.consent,
        honeypot: opts.honeypot || "",
        turnstileToken: opts.turnstileToken || "",
        promoCode: opts.promoCode || "",
      }),
    });
    if (!res.ok) { console.error("submit failed", await res.text()); return null; }
    const d = await res.json();
    return d?.id ? { id: d.id, ref: d.ref } : null;
  } catch (e) { console.error("submit error", e); return null; }
}
