import type { Announcement } from "@/lib/announcements";

/**
 * Lokálny fallback oznamov — použije sa, kým nie je nastavené Supabase.
 * Po napojení Supabase + admin konzoly (/admin) sa oznamy spravujú odtiaľ
 * a tento súbor sa už nepoužíva.
 */
export const LOCAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "greencard-info",
    enabled: true,
    placement: "bar",
    tone: "promo",
    title: "Americká zelená karta",
    message: "Registrácia do DV lotérie sa blíži — nechajte si u nás pripraviť prihlášku včas.",
    link_url: "/green-card",
    link_label: "Zistiť viac",
    starts_at: null,
    ends_at: null, // do odvolania
    dismissible: true,
    priority: 10,
  },
];
