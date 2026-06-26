"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProduct } from "@/config/products";

export default function CartPage() {
  const { t, tr, lang } = useLang();
  const { items, remove, total } = useCart();

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
              <li key={item.id} className="card flex items-center gap-4 p-5">
                <span className="text-3xl">{product.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{t(product.destination)}</p>
                  <p className="text-xs uppercase tracking-wider text-teal">{t(product.name)}</p>
                  {name && <p className="mt-1 truncate text-sm text-ink-soft">{name}</p>}
                </div>
                <span className="font-display text-lg font-extrabold">{money(item.price, lang)}</span>
                <button
                  onClick={() => remove(item.id)}
                  aria-label={tr("cart.remove")}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-terra/10 hover:text-terra"
                >
                  <Trash2 size={16} />
                </button>
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
