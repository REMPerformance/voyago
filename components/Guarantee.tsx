"use client";

import { ShieldCheck, RefreshCw, Eye, Headset } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Guarantee() {
  const { t } = useLang();

  const points = [
    { icon: <Eye size={20} />, title: { sk: "Kontrola pred podaním", en: "Reviewed before submission" }, desc: { sk: "Každú žiadosť ručne skontrolujeme, kým je všetko správne — chyby vás nezdržia.", en: "We manually check every application so errors don't slow you down." } },
    { icon: <RefreshCw size={20} />, title: { sk: "Vrátenie pri našej chybe", en: "Refund on our mistake" }, desc: { sk: "Ak pochybíme na našej strane, servisný poplatok vám vrátime. Bez otázok.", en: "If we make a mistake on our side, we refund the service fee. No questions." } },
    { icon: <Headset size={20} />, title: { sk: "Podpora v slovenčine", en: "Support in your language" }, desc: { sk: "Reálni ľudia, ktorí poradia pred aj počas vybavovania. Odpovedáme do 24 hodín.", en: "Real people who help before and during. We reply within 24 hours." } },
  ];

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 opacity-[0.06]">
          <ShieldCheck size={260} />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-wider text-brass-light">
            <ShieldCheck size={14} /> {t({ sk: "Naša garancia", en: "Our guarantee" })}
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {t({ sk: "Platíte za pokoj. O zvyšok sa postaráme my.", en: "You pay for peace of mind. We handle the rest." })}
          </h2>
          <p className="mt-3 max-w-xl text-paper/70">
            {t({ sk: "Transparentná cena, žiadne skryté poplatky a ľudia, ktorí to za vás dotiahnu do konca.", en: "Transparent pricing, no hidden fees, and people who see it through for you." })}
          </p>

          <div className="mt-9 grid gap-6 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title.sk} className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass/15 text-brass">{p.icon}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{t(p.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{t(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
