"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, ShieldCheck, Globe, Zap, Phone, BadgeCheck, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProduct, type Field } from "@/config/products";
import { COUNTRY_INFO, PREDEPARTURE } from "@/config/countryInfo";
import { site } from "@/config/site";

const HIDE = new Set(["consent", "honeypot", "truthful", "truthfulUs", "truthfulUk"]);

function valueOf(field: Field, raw: string, t: (l: any) => string): string {
  if (!raw) return "—";
  if (field.type === "select" || field.type === "toggle") {
    const opt = field.options?.find((o) => o.value === raw);
    if (opt) return t(opt.label);
    if (field.type === "toggle") return raw === "yes" ? "Áno" : raw === "no" ? "Nie" : raw;
  }
  if (field.type === "file") {
    const n = raw.split(",").filter(Boolean).length;
    return n ? `${n} súbor(ov)` : "—";
  }
  return raw;
}

export default function SummaryPage() {
  const { t, lang } = useLang();
  const cart = useCart();
  const params = useSearchParams();
  const ref = params.get("ref");

  // Po platbe sa košík vyčistí → použijeme snapshot poslednej objednávky.
  const [snap, setSnap] = useState<{ items: typeof cart.items; total?: number } | null>(null);
  useEffect(() => {
    if (cart.items.length === 0) {
      try { const raw = localStorage.getItem("voyago.lastOrder"); if (raw) setSnap(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, [cart.items.length]);

  const items = cart.items.length ? cart.items : (snap?.items ?? []);
  const total = cart.items.length ? cart.total : (snap?.total ?? items.reduce((s, i) => s + (i.price || 0), 0));

  // zoskup podľa produktu
  const groups = items.reduce<Record<string, typeof items>>((acc, it) => {
    (acc[it.slug] ||= []).push(it);
    return acc;
  }, {});
  const slugs = Object.keys(groups);
  const countries = Array.from(new Set(slugs.map((s) => getProduct(s)?.country).filter(Boolean) as string[]));

  if (items.length === 0) {
    return (
      <section className="container-page py-16">
        <p className="text-ink-soft">{t({ sk: "Košík je prázdny — zhrnutie vytvoríte z vyplnenej žiadosti.", en: "Cart is empty — create a summary from a filled application." })}</p>
        <Link href="/destinations" className="btn-primary mt-6">{t({ sk: "Vybrať destináciu", en: "Choose a destination" })}</Link>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }
      `}</style>

      {/* Ovládanie (netlačí sa) */}
      <div className="no-print mb-6 flex items-center justify-between gap-3">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"><ArrowLeft size={15} /> {t({ sk: "Späť do košíka", en: "Back to cart" })}</Link>
        <button onClick={() => window.print()} className="btn-primary"><Printer size={16} /> {t({ sk: "Tlačiť / uložiť ako PDF", en: "Print / save as PDF" })}</button>
      </div>

      {/* Tlačený dokument */}
      <div id="print-area" className="mx-auto max-w-[820px] rounded-2xl border border-line bg-white p-8 text-ink shadow-card sm:p-10 print:border-0 print:shadow-none">
        {/* Hlavička */}
        <div className="flex items-start justify-between border-b-2 border-ink pb-5">
          <div>
            <p className="font-display text-2xl font-extrabold">{site.brand}<span className="text-brass">.</span></p>
            <p className="mt-1 text-xs text-ink-soft">{t({ sk: "Zhrnutie žiadosti", en: "Application summary" })}</p>
          </div>
          <div className="text-right text-xs text-ink-soft">
            {ref && <p className="font-mono text-base font-bold tracking-wider text-ink">{ref}</p>}
            <p className="mt-1">{new Date().toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>

        {/* Položky / cestujúci */}
        {slugs.map((slug) => {
          const product = getProduct(slug);
          if (!product) return null;
          const fields = product.fields;
          const travelers = groups[slug];
          return (
            <div key={slug} className="mt-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">{t(product.destination)} <span className="text-brass">· {t(product.name)}</span></h2>
                <span className="text-[0.6rem] uppercase tracking-wider text-ink-soft">{travelers.length} {t({ sk: "cestujúci", en: "traveller(s)" })}</span>
              </div>

              {travelers.map((it, idx) => (
                <div key={it.id} className="mt-4 rounded-xl border border-line-soft bg-paper/40 p-4">
                  <p className="mb-3 text-[0.6rem] uppercase tracking-wider text-brass">{t({ sk: "Cestujúci", en: "Traveller" })} {idx + 1}</p>
                  <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {fields.filter((f) => !HIDE.has(f.name) && it.data[f.name]).map((f) => (
                      <div key={f.name} className="flex flex-col">
                        <dt className="text-[0.62rem] uppercase tracking-wide text-ink-soft/70">{t(f.label)}</dt>
                        <dd className="text-sm font-medium text-ink">{valueOf(f, it.data[f.name], t)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          );
        })}

        {/* Cena */}
        <div className="mt-7 flex items-center justify-between rounded-xl bg-ink px-5 py-4 text-paper">
          <span className="text-sm">{t({ sk: "Celková suma (vrátane štátnych poplatkov, s DPH)", en: "Total (incl. government fees, VAT)" })}</span>
          <span className="font-display text-2xl font-extrabold">{money(total, lang)}</span>
        </div>

        {/* Užitočné info do krajiny */}
        {countries.map((cc) => {
          const info = COUNTRY_INFO[cc];
          const product = slugs.map(getProduct).find((p) => p?.country === cc);
          if (!info || !product) return null;
          return (
            <div key={cc} className="mt-8 break-inside-avoid">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold"><Globe size={18} className="text-brass" /> {t({ sk: "Užitočné informácie", en: "Useful information" })} — {t(product.destination)}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Info icon={<BadgeCheck size={15} />} label={t({ sk: "Oficiálny portál", en: "Official portal" })} value={info.portal} />
                <Info icon={<Globe size={15} />} label={t({ sk: "Mena", en: "Currency" })} value={info.currency} />
                <Info icon={<Zap size={15} />} label={t({ sk: "Zásuvka / napätie", en: "Plug / voltage" })} value={info.plug} />
                <Info icon={<Phone size={15} />} label={t({ sk: "Tiesňové číslo", en: "Emergency" })} value={info.emergency} />
              </div>
              <ul className="mt-3 space-y-1.5">
                {info.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-soft"><Check size={15} className="mt-0.5 shrink-0 text-green" /> {t(tip)}</li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* Pred cestou */}
        <div className="mt-8 break-inside-avoid rounded-xl border border-line-soft p-4">
          <h3 className="flex items-center gap-2 font-display text-base font-bold"><ShieldCheck size={17} className="text-brass" /> {t({ sk: "Pred cestou si skontrolujte", en: "Before you travel, check" })}</h3>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {PREDEPARTURE.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-soft"><Check size={15} className="mt-0.5 shrink-0 text-green" /> {t(p)}</li>
            ))}
          </ul>
        </div>

        {/* Pätička dokumentu */}
        <div className="mt-8 border-t border-line-soft pt-4 text-[0.7rem] leading-relaxed text-ink-soft/70">
          <p>{site.company.legalName} · {site.email} · {site.phone}</p>
          <p className="mt-1">{t({ sk: "Voyago je súkromný sprostredkovateľ víz a cestovných povolení, nie je štátnym orgánom. Informácie sú orientačné; rozhoduje príslušný úrad.", en: "Voyago is a private intermediary, not a government body. Information is indicative; the relevant authority decides." })}</p>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-line-soft bg-paper/30 p-3">
      <span className="mt-0.5 text-brass">{icon}</span>
      <div className="min-w-0">
        <p className="text-[0.6rem] uppercase tracking-wide text-ink-soft/70">{label}</p>
        <p className="break-all text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}
