"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { productPrice, type Product } from "@/config/products";

// Modulová cache (kvôli ne-komponentom, napr. košík)
let MAP: Record<string, number> = {};
export const setDiscountMap = (m: Record<string, number>) => { MAP = m; };
export const discountPercentOf = (slug: string): number => MAP[slug] || 0;
export const finalPriceCached = (product: Product): number => {
  const base = productPrice(product);
  const pct = MAP[product.slug] || 0;
  return pct ? Math.round(base * (1 - pct / 100)) : base;
};

export async function fetchDiscounts(): Promise<Record<string, number>> {
  if (supabaseEnabled && supabase) {
    const { data } = await supabase.from("discounts").select("slug, percent, active");
    if (data) {
      const m: Record<string, number> = {};
      (data as any[]).forEach((d) => { if (d.active && d.percent > 0) m[d.slug] = d.percent; });
      return m;
    }
  }
  return {};
}

const Ctx = createContext<{ map: Record<string, number> }>({ map: {} });

export function DiscountsProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, number>>({});
  useEffect(() => {
    fetchDiscounts().then((m) => { setMap(m); setDiscountMap(m); }).catch(() => {});
  }, []);
  return <Ctx.Provider value={{ map }}>{children}</Ctx.Provider>;
}

export function useFinalPrice() {
  const { map } = useContext(Ctx);
  return (product: Product) => {
    const base = productPrice(product);
    const pct = map[product.slug] || 0;
    return pct ? Math.round(base * (1 - pct / 100)) : base;
  };
}
export function useDiscountPercent() {
  const { map } = useContext(Ctx);
  return (slug: string) => map[slug] || 0;
}
