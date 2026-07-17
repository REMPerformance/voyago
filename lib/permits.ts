import { supabase } from "@/lib/supabase";

const BUCKET = "applications";

/** Dokument priložený k povoleniu. */
export interface PermitDoc {
  path: string;
  name: string;
  size?: number;
  uploaded_at: string;
}

/** Stav evidovaného povolenia (platnosť sa počíta z valid_to). */
export type PermitStatus = "pending" | "active" | "cancelled";

export interface Permit {
  id: string;
  created_at: string;
  updated_at?: string | null;
  application_id?: string | null;
  ref?: string | null;
  holder_name: string;
  email?: string | null;
  phone?: string | null;
  product_slug: string;
  permit_number?: string | null;
  status: PermitStatus;
  issued_at?: string | null;
  valid_from?: string | null;
  valid_to?: string | null;
  entries?: string | null;
  max_stay?: string | null;
  notes?: string | null;
  documents?: PermitDoc[] | null;
}

export const PERMIT_STATUSES: PermitStatus[] = ["pending", "active", "cancelled"];

export function permitStatusLabel(s: PermitStatus): string {
  if (s === "pending") return "Čaká na vydanie";
  if (s === "active") return "Vydané";
  return "Zrušené";
}

/** Vypočítaná platnosť podľa dátumov + stavu. */
export type Validity =
  | { kind: "none"; label: string; days: null }
  | { kind: "cancelled"; label: string; days: null }
  | { kind: "pending"; label: string; days: null }
  | { kind: "future"; label: string; days: number }
  | { kind: "valid"; label: string; days: number }
  | { kind: "soon"; label: string; days: number }
  | { kind: "expired"; label: string; days: number };

const DAY = 24 * 3600 * 1000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

/** Koľko dní zostáva do konca platnosti (záporné = expirované). */
export function daysLeft(validTo?: string | null): number | null {
  if (!validTo) return null;
  const to = startOfDay(new Date(validTo));
  const today = startOfDay(new Date());
  return Math.round((to - today) / DAY);
}

/** Vyhodnotí platnosť povolenia pre farebný indikátor v admine. */
export function validity(p: Permit, soonDays = 30): Validity {
  if (p.status === "cancelled") return { kind: "cancelled", label: "Zrušené", days: null };
  if (p.status === "pending") return { kind: "pending", label: "Čaká na vydanie", days: null };
  if (!p.valid_to) return { kind: "none", label: "Bez dátumu platnosti", days: null };

  const left = daysLeft(p.valid_to)!;
  if (left < 0) return { kind: "expired", label: `Expirované pred ${Math.abs(left)} dňami`, days: left };

  if (p.valid_from) {
    const startsIn = daysLeft(p.valid_from)!;
    if (startsIn > 0) return { kind: "future", label: `Platí o ${startsIn} dní`, days: left };
  }

  if (left === 0) return { kind: "soon", label: "Končí dnes", days: 0 };
  if (left <= soonDays) return { kind: "soon", label: `Končí o ${left} dní`, days: left };
  return { kind: "valid", label: `Platné ešte ${left} dní`, days: left };
}

/** Farebné triedy pre chip podľa platnosti. */
export function validityChip(kind: Validity["kind"]): string {
  switch (kind) {
    case "valid":
      return "bg-green/12 text-green";
    case "soon":
      return "bg-brass/18 text-brass";
    case "expired":
      return "bg-terra/12 text-terra";
    case "future":
      return "bg-teal/12 text-teal";
    case "cancelled":
      return "bg-ink/10 text-ink-soft";
    default:
      return "bg-ink/8 text-ink-soft";
  }
}

/* ---------- CRUD ---------- */

export async function fetchPermits(): Promise<Permit[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("permits").select("*").order("created_at", { ascending: false });
  if (error) { console.error("permits fetch", error.message); return []; }
  return (data as Permit[]) || [];
}

export async function savePermit(p: Partial<Permit>): Promise<Permit | null> {
  if (!supabase) return null;
  const payload: any = {
    application_id: p.application_id || null,
    ref: p.ref || null,
    holder_name: p.holder_name || "",
    email: p.email || null,
    phone: p.phone || null,
    product_slug: p.product_slug || "",
    permit_number: p.permit_number || null,
    status: p.status || "pending",
    issued_at: p.issued_at || null,
    valid_from: p.valid_from || null,
    valid_to: p.valid_to || null,
    entries: p.entries || null,
    max_stay: p.max_stay || null,
    notes: p.notes || null,
    documents: p.documents || [],
    updated_at: new Date().toISOString(),
  };
  const q = p.id
    ? supabase.from("permits").update(payload).eq("id", p.id).select().single()
    : supabase.from("permits").insert(payload).select().single();
  const { data, error } = await q;
  if (error) { console.error("permit save", error.message); return null; }
  return data as Permit;
}

export async function deletePermit(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("permits").delete().eq("id", id);
  return !error;
}

/* ---------- Dokumenty ---------- */

/** Nahrá dokument k povoleniu do Storage (priečinok permits/). */
export async function uploadPermitDoc(file: File): Promise<PermitDoc | null> {
  if (!supabase) return null;
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  const path = `permits/${crypto.randomUUID()}-${safe}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (error) { console.error("permit doc upload", error.message); return null; }
  return { path, name: file.name, size: file.size, uploaded_at: new Date().toISOString() };
}

/** Zmaže dokument zo Storage. */
export async function removePermitDoc(path: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  return !error;
}
