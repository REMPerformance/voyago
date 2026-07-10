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
  // Rozšírené štýlovanie (všetko voliteľné, s rozumnými predvolenými hodnotami)
  bg_color?: string | null;        // vlastná farba pozadia baru, napr. "#0A1622"
  text_color?: string | null;      // vlastná farba textu
  font_weight?: "thin" | "normal" | "bold" | null;
  italic?: boolean | null;         // naklonený text
  animation?: "none" | "marquee" | "pulse" | "slide" | null; // pohyb textu
  anim_speed?: number | null;      // rýchlosť animácie v sekundách
  sticky?: boolean | null;         // bar sa lepí navrchu pri scrollovaní
  hover_glow?: boolean | null;     // efekt pri prejdení myšou
  show_date?: boolean | null;      // zobraziť dátum
  date_position?: "left" | "right" | null;
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
