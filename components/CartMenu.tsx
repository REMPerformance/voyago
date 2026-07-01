"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart, itemTotal } from "@/lib/cart";
import { getProduct } from "@/config/products";
import { money } from "@/lib/format";

export function CartMenu() {
  const { t } = useLang();
  const { lang } = useLang();
  const { items, remove, total, count } = useCart();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t({ sk: "Košík", en: "Cart" })}
        aria-expanded={open}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
      >
        <ShoppingBag size={18} />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-terra text-[0.62rem] font-bold text-cream">
            {count}
          </span>
        )}
      </button>

      <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`} onClick={close} />

      <div
        className={`absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-2xl border border-line bg-surface p-3 shadow-lift transition-all duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <p className="px-1 pb-2 text-sm font-bold text-ink">
          {t({ sk: "Košík", en: "Cart" })} {count > 0 && <span className="text-ink-soft">({count})</span>}
        </p>

        {items.length === 0 ? (
          <div className="px-1 py-6 text-center">
            <p className="text-sm text-ink-soft">{t({ sk: "Košík je zatiaľ prázdny.", en: "Your cart is empty." })}</p>
            <Link href="/destinations" onClick={close} className="btn-ghost mt-3 inline-flex h-9 !px-4 text-sm">
              {t({ sk: "Prezrieť destinácie", en: "Browse destinations" })}
            </Link>
          </div>
        ) : (
          <>
            <ul className="max-h-72 divide-y divide-line-soft overflow-y-auto">
              {items.map((it) => {
                const p = getProduct(it.slug);
                if (!p) return null;
                const name = [it.data.givenNames, it.data.surname].filter(Boolean).join(" ");
                const addons = it.express || it.protection;
                return (
                  <li key={it.id} className="flex items-center gap-2.5 py-2.5">
                    <span className="text-xl">{p.flag}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{t(p.destination)}</p>
                      <p className="truncate text-xs text-ink-soft">
                        {name || t(p.name)}
                        {addons && <span className="text-brass"> · {t({ sk: "+ doplnky", en: "+ add-ons" })}</span>}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-sm font-bold text-ink">{money(itemTotal(it), lang)}</span>
                    <button
                      onClick={() => remove(it.id)}
                      aria-label={t({ sk: "Odobrať", en: "Remove" })}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-terra/10 hover:text-terra"
                    >
                      <X size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-1 flex items-center justify-between border-t border-line px-1 pt-3">
              <span className="text-sm text-ink-soft">{t({ sk: "Spolu", en: "Total" })}</span>
              <span className="font-display text-lg font-extrabold text-ink">{money(total, lang)}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link href="/cart" onClick={close} className="btn-ghost inline-flex h-10 justify-center text-sm">
                {t({ sk: "Košík", en: "View cart" })}
              </Link>
              <Link href="/checkout" onClick={close} className="btn-primary inline-flex h-10 justify-center text-sm">
                {t({ sk: "K pokladni", en: "Checkout" })}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
