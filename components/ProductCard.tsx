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

  const inner = (
    <>
      {/* jemný mosadzný akcent navrchu pri hoveri */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />

      {/* Hlavička */}
      <div className="flex items-center gap-3 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/w160/${cc}.png`} alt="" className="h-9 w-[52px] shrink-0 rounded-[5px] object-cover ring-1 ring-line" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-[1.15rem] font-bold leading-tight text-ink">{t(product.destination)}</h3>
          <p className="mt-0.5 truncate text-xs text-ink-soft/80">{t(product.name)}</p>
        </div>
        <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-wide text-brass">{typeLabel}</span>
      </div>

      {/* Popis */}
      <p className="px-5 text-[0.83rem] leading-relaxed text-ink-soft line-clamp-2">{t(product.summary)}</p>

      {/* Parametre */}
      <dl className="mt-4 space-y-2 px-5">
        <div className="flex items-center gap-2 text-xs">
          <Clock size={14} className="shrink-0 text-brass" />
          <dt className="text-ink-soft/70">{tr("dest.processing")}:</dt>
          <dd className="font-medium text-ink">{t(product.processingDays)}</dd>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ShieldCheck size={14} className="shrink-0 text-brass" />
          <dt className="text-ink-soft/70">{tr("dest.validity")}:</dt>
          <dd className="truncate font-medium text-ink">{t(product.validity)}</dd>
        </div>
        {product.stay && (
          <div className="flex items-center gap-2 text-xs">
            <Plane size={14} className="shrink-0 text-brass" />
            <dt className="text-ink-soft/70">{t({ sk: "Pobyt", en: "Stay" })}:</dt>
            <dd className="truncate font-medium text-ink">{t(product.stay)}</dd>
          </div>
        )}
      </dl>

      {/* Päta */}
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-line-soft p-5 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[0.6rem] font-medium uppercase tracking-wide text-ink-soft/65">{tr("dest.from")}</span>
            {pct > 0 && <span className="rounded bg-terra/10 px-1.5 py-0.5 text-[0.58rem] font-bold text-terra">−{pct}%</span>}
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-display text-[1.35rem] font-extrabold leading-none text-ink whitespace-nowrap">{money(price, lang)}</span>
            {pct > 0 && <span className="text-xs text-ink-soft/55 line-through">{money(base, lang)}</span>}
            <span className="text-[0.58rem] font-semibold text-ink-soft/55">{t({ sk: "s DPH", en: "VAT" })}</span>
          </div>
        </div>
        {soon ? (
          <span className="shrink-0 rounded-md border border-line px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wide text-ink-soft/55">{tr("cta.soon")}</span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-all group-hover:gap-2.5 group-hover:bg-navy-soft">
            {tr("cta.apply")} <ArrowRight size={15} />
          </span>
        )}
      </div>
    </>
  );

  const cls = "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift";

  return soon ? <div className={cls}>{inner}</div> : <Link href={`/apply/${product.slug}`} className={cls}>{inner}</Link>;
}
