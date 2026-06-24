import { supabase, supabaseEnabled } from "@/lib/supabase";
import { LOCAL_ANNOUNCEMENTS } from "@/config/announcements";

export type Tone = "info" | "warning" | "success" | "promo";
export type Placement = "bar" | "popup";

export interface Announcement {
  id: string;
  enabled: boolean;
  placement: Placement;
  tone: Tone;
  title: string;
  message: string;
  link_url?: string | null;
  link_label?: string | null;
  starts_at?: string | null;
  ends_at?: string | null; // null = do odvolania
  dismissible: boolean;
  priority: number;
  created_at?: string;
}

export function isActive(a: Announcement, now = Date.now()): boolean {
  if (!a.enabled) return false;
  if (a.starts_at && Date.parse(a.starts_at) > now) return false;
  if (a.ends_at && Date.parse(a.ends_at) < now) return false;
  return true;
}

/** Načíta oznamy zo Supabase, alebo z lokálneho configu ako fallback. */
export async function fetchAnnouncements(): Promise<Announcement[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error && data) return data as Announcement[];
  }
  return LOCAL_ANNOUNCEMENTS;
}
