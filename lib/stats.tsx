"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase, supabaseEnabled } from "@/lib/supabase";

// Počet vybavených žiadostí per slug (krajina/produkt).
let MAP: Record<string, number> = {};
export const processedOf = (slug: string): number => MAP[slug] || 0;

export async function fetchStats(): Promise<Record<string, number>> {
  if (supabaseEnabled && supabase) {
    const { data } = await supabase.from("country_stats").select("slug, processed");
    if (data) {
      const m: Record<string, number> = {};
      (data as any[]).forEach((d) => { m[d.slug] = Number(d.processed) || 0; });
      return m;
    }
  }
  return {};
}

const Ctx = createContext<{ map: Record<string, number>; reload: () => void }>({ map: {}, reload: () => {} });

export function StatsProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, number>>({});
  const reload = useCallback(() => {
    fetchStats().then((m) => { setMap(m); MAP = m; }).catch(() => {});
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return <Ctx.Provider value={{ map, reload }}>{children}</Ctx.Provider>;
}

export function useProcessed(slug: string): number {
  const { map } = useContext(Ctx);
  return map[slug] || 0;
}

// Admin: nastaviť absolútny počet pre krajinu.
export async function setProcessed(slug: string, value: number) {
  if (supabaseEnabled && supabase) {
    await supabase.from("country_stats").upsert({ slug, processed: Math.max(0, Math.round(value)) }, { onConflict: "slug" });
  }
}

// Admin: pripočítať (napr. +1 keď sa žiadosť označí ako hotová).
export async function bumpProcessed(slug: string, by = 1) {
  if (!(supabaseEnabled && supabase) || !slug) return;
  const { data } = await supabase.from("country_stats").select("processed").eq("slug", slug).maybeSingle();
  const cur = Number((data as any)?.processed) || 0;
  await supabase.from("country_stats").upsert({ slug, processed: Math.max(0, cur + by) }, { onConflict: "slug" });
}
