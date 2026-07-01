"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Košík. Každá položka = jedna žiadosť pre jedného cestujúceho.
// Doplnky (expresné spracovanie +50 %, ochrana kupujúceho €10) sa účtujú per položka.
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
import { getProduct, EXPRESS_PCT, PROTECTION_FEE } from "@/config/products";
import { finalPriceCached } from "@/lib/discounts";

export interface CartItem {
  id: string; // unikátne id položky
  slug: string; // produkt
  price: number; // základná cena v čase pridania
  data: Record<string, string>; // vyplnené údaje cestujúceho
  express?: boolean; // expresné spracovanie (+50 %)
  protection?: boolean; // ochrana kupujúceho (€10, nevratné)
}

/** Cena doplnkov pre položku (expres + ochrana). */
export function addonsTotal(i: CartItem): number {
  return (i.express ? Math.round(i.price * EXPRESS_PCT) : 0) + (i.protection ? PROTECTION_FEE : 0);
}
/** Celková cena položky vrátane doplnkov. */
export function itemTotal(i: CartItem): number {
  return i.price + addonsTotal(i);
}

interface Ctx {
  items: CartItem[];
  add: (slug: string, data: Record<string, string>, express?: boolean, protection?: boolean) => void;
  setExpress: (id: string, express: boolean) => void;
  setProtection: (id: string, protection: boolean) => void;
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

  const add = (slug: string, data: Record<string, string>, express = false, protection = false) => {
    const product = getProduct(slug);
    if (!product) return;
    setItems((prev) => [
      ...prev,
      {
        id: `${slug}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        slug,
        price: finalPriceCached(product),
        data,
        express,
        protection,
      },
    ]);
  };

  const setExpress = (id: string, express: boolean) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, express } : i)));
  const setProtection = (id: string, protection: boolean) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, protection } : i)));

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const value = useMemo<Ctx>(
    () => ({
      items,
      add,
      setExpress,
      setProtection,
      remove,
      clear,
      count: items.length,
      total: items.reduce((sum, i) => sum + itemTotal(i), 0),
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
