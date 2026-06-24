"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Košík. Každá položka = jedna žiadosť pre jedného cestujúceho.
// "Pridať ďalšieho cestujúceho" = ďalšia položka pre ten istý produkt.
// Stav sa drží v localStorage, takže prežije obnovenie stránky.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/config/products";
import { finalPriceCached } from "@/lib/discounts";

export interface CartItem {
  id: string; // unikátne id položky
  slug: string; // produkt
  price: number; // cena v čase pridania
  data: Record<string, string>; // vyplnené údaje cestujúceho (mená, e-mail, súbory ako názvy)
}

interface Ctx {
  items: CartItem[];
  add: (slug: string, data: Record<string, string>) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<Ctx | null>(null);
const KEY = "voyago.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = (slug: string, data: Record<string, string>) => {
    const product = getProduct(slug);
    if (!product) return;
    setItems((prev) => [
      ...prev,
      {
        id: `${slug}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        slug,
        price: finalPriceCached(product),
        data,
      },
    ]);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const value = useMemo<Ctx>(
    () => ({
      items,
      add,
      remove,
      clear,
      count: items.length,
      total: items.reduce((sum, i) => sum + i.price, 0),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
