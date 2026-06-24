"use client";

import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Plane } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { money } from "@/lib/format";
import { productPrice, type Product } from "@/config/products";
import { useFinalPrice, useDiscountPercent } from "@/lib/discounts";

const TYPE_LABEL: Record<string, string> = { esta: "ESTA", eta: "ETA", evisa: "e-Visa", etias: "ETIAS" };

export function ProductCard({ product }: { product: Product }) {
  const { t, tr, lang } = useLang();
  const finalPrice = useFinalPrice();
  const discountOf = useDiscountPercent();
  const base = productPrice(product);
  const price = finalPrice(product);
  const pct = discountOf(product.slug);
  const soon = !product.available;
  const cc = product.country.toLowerCase();
  const typeLabel = TYPE_LABEL[product.type] ?? product.type.toUpperCase();

  const Poster = (
    <div className="relative h-36 overflow-hidden bg-ink">
      {/* vlajka ako pozadie */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://flagcdn.com/w640/${cc}.png`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(10,22,34,.96) 0%, rgba(10,22,34,.72) 48%, rgba(10,22,34,.28) 100%)" }} />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="rounded-md bg-brass px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-wider text-ink">{typeLabel}</span>
          {pct > 0 && <span className="rounded-md bg-terra px-2 py-0.5 font-mono text-[0.58rem] font-bold text-white">−{pct}%</span>}
        </div>
        <h3 className="font-display text-[1.7rem] font-extrabold leading-none text-paper" style={{ textShadow: "0 2px 14px rgba(7,13,24,.6)" }}>{t(product.destination)}</h3>
      </div>
    </div>
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift">
      {soon ? Poster : <Link href={`/apply/${product.slug}`} className="block">{Poster}</Link>}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[0.82rem] leading-relaxed text-ink-soft line-clamp-2">{t(product.summary)}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.72rem] text-ink-soft">
          <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-brass" /> {t(product.processingDays)}</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-brass" /> {t(product.validity)}</span>
          {product.stay && <span className="inline-flex items-center gap-1.5"><Plane size={13} className="text-brass" /> {t(product.stay)}</span>}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line-soft pt-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft/70">{tr("dest.from")}</span>
              {pct > 0 && <span className="font-mono text-xs text-ink-soft/55 line-through">{money(base, lang)}</span>}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-extrabold leading-none text-ink">{money(price, lang)}</span>
              <span className="text-[0.6rem] font-semibold text-ink-soft/60">{t({ sk: "s DPH", en: "VAT" })}</span>
            </div>
          </div>
          {soon ? (
            <span className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-soft/60">{tr("cta.soon")}</span>
          ) : (
            <Link href={`/apply/${product.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-navy-soft group-hover:gap-2.5">
              {tr("cta.apply")} <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
