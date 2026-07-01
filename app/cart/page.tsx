"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart, itemTotal } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProduct, EXPRESS, PROTECTION, expressAmount } from "@/config/products";

export default function CartPage() {
  const { t, tr, lang } = useLang();
  const { items, remove, setExpress, setProtection, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-extrabold">{tr("cart.title")}</h1>
        <p className="mt-3 text-ink-soft">{tr("cart.empty")}</p>
        <Link href="/destinations" className="btn-primary mt-8">
          {tr("cart.emptyCta")} <ArrowRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <section className="container-page py-16">
      <h1 className="text-4xl font-extrabold">{tr("cart.title")}</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {items.map((item) => {
            const product = getProduct(item.slug);
            if (!product) return null;
            const name = [item.data.givenNames, item.data.surname].filter(Boolean).join(" ");
            return (
              <li key={item.id} className="card p-5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{product.flag}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{t(product.destination)}</p>
                    <p className="text-xs uppercase tracking-wider text-teal">{t(product.name)}</p>
                    {name && <p className="mt-1 truncate text-sm text-ink-soft">{name}</p>}
                  </div>
                  <span className="font-display text-lg font-extrabold">{money(itemTotal(item), lang)}</span>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={tr("cart.remove")}
                    className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-terra/10 hover:text-terra"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => setExpress(item.id, !item.express)}
                    aria-pressed={!!item.express}
                    className={`flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left text-sm transition-colors ${item.express ? "border-brass bg-brass/[0.06]" : "border-line bg-paper/40 hover:border-brass/40"}`}
                  >
                    <span className={`flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors ${item.express ? "bg-brass" : "bg-line"}`}>
                      <span className={`block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${item.express ? "translate-x-3" : ""}`} />
                    </span>
                    <span className="flex-1 font-medium text-ink">{t(EXPRESS.label)} <span className="text-[0.68rem] text-brass/70">(+50 %)</span></span>
                    <span className="font-semibold text-brass">+{money(expressAmount(item.price), lang)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProtection(item.id, !item.protection)}
                    aria-pressed={!!item.protection}
                    className={`flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left text-sm transition-colors ${item.protection ? "border-brass bg-brass/[0.06]" : "border-line bg-paper/40 hover:border-brass/40"}`}
                  >
                    <span className={`flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors ${item.protection ? "bg-brass" : "bg-line"}`}>
                      <span className={`block h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${item.protection ? "translate-x-3" : ""}`} />
                    </span>
                    <span className="flex-1 font-medium text-ink">{t(PROTECTION.label)}</span>
                    <span className="font-semibold text-brass">+{money(PROTECTION.fee, lang)}</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside>
          <div className="card sticky top-20 p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{tr("cart.total")}</span>
              <span className="font-display text-3xl font-extrabold">{money(total, lang)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft/75">{tr("cart.govIncluded")}</p>
            <Link href="/checkout" className="btn-accent mt-6 w-full">
              {tr("cart.checkout")} <ArrowRight size={16} />
            </Link>
            <Link href="/zhrnutie" className="btn-ghost mt-2 w-full justify-center !py-2.5 text-sm">
              {lang === "sk" ? "Stiahnuť zhrnutie (PDF)" : "Download summary (PDF)"}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
