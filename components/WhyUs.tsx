"use client";

import { UserCheck, ReceiptText, Users, Globe2, Clock, Headset } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function WhyUs() {
  const { t } = useLang();

  const reasons = [
    {
      icon: UserCheck,
      title: t({ sk: "Profesionálna asistencia", en: "Professional assistance" }),
      text: t({ sk: "Vašu žiadosť pripraví a skontroluje človek, nie len formulár.", en: "A person prepares and checks your application, not just a form." }),
    },
    {
      icon: ReceiptText,
      title: t({ sk: "Transparentná cena", en: "Transparent pricing" }),
      text: t({ sk: "Vopred viete presnú sumu vrátane štátneho poplatku.", en: "You know the exact total upfront, government fee included." }),
    },
    {
      icon: Users,
      title: t({ sk: "Individuálny prístup", en: "Individual approach" }),
      text: t({ sk: "Poradíme presne pre vašu krajinu, účel a termín cesty.", en: "Advice tailored to your country, purpose and travel dates." }),
    },
    {
      icon: Globe2,
      title: t({ sk: "Celosvetové pokrytie", en: "Worldwide coverage" }),
      text: t({ sk: "ESTA, ETA aj e-Visa do desiatok krajín na jednom mieste.", en: "ESTA, ETA and e-Visa to dozens of countries in one place." }),
    },
    {
      icon: Clock,
      title: t({ sk: "Rýchle vybavenie", en: "Fast processing" }),
      text: t({ sk: "Väčšinu povolení podáme a vybavíme v priebehu pár dní.", en: "Most permits are filed and handled within a few days." }),
    },
    {
      icon: Headset,
      title: t({ sk: "Podpora po slovensky", en: "Support in your language" }),
      text: t({ sk: "Sme tu pred cestou aj počas nej — v slovenčine.", en: "We're here before and during your trip — in your language." }),
    },
  ];

  return (
    <section className="container-page py-20">
      {/* Hlavička — vľavo, s vysvetľujúcou vetou */}
      <div className="max-w-2xl">
        <p className="eyebrow">{t({ sk: "Prečo Voyago", en: "Why Voyago" })}</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-[2.6rem]">
          {t({ sk: "Prečo si vybrať nás", en: "Why choose us" })}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {t({
            sk: "Vybavovanie víz je plné detailov, na ktorých sa dá ľahko potknúť. Preto každú žiadosť pripravuje a kontroluje človek, cenu poznáte vopred a odpovede dostávate od skutočných ľudí.",
            en: "Visa paperwork is full of details that are easy to trip over. That is why a person prepares and checks every application, you know the price upfront, and real people answer your questions.",
          })}
        </p>
      </div>

      {/* Karty — očíslované, s brass akcentom */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <div
            key={r.title}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/45 hover:shadow-lift"
          >
            {/* jemné číslo v pozadí */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-5 font-display text-[5.5rem] font-extrabold leading-none text-ink/[0.04] transition-colors duration-300 group-hover:text-brass/10"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* brass linka hore, ktorá sa pri hoveri roztiahne */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-[3px] w-10 rounded-r-full bg-brass/70 transition-all duration-300 group-hover:w-24"
            />

            <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-paper text-brass ring-1 ring-line-soft transition-colors duration-200 group-hover:bg-brass group-hover:text-paper group-hover:ring-brass">
              <r.icon size={22} />
            </span>

            <h3 className="relative mt-5 font-display text-lg font-bold text-ink">{r.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Spodný pruh s číslami */}
      <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-navy px-6 py-7 text-cream sm:grid-cols-3 sm:px-8">
        {[
          { k: "15+", v: t({ sk: "destinácií z jedného miesta", en: "destinations in one place" }) },
          { k: "8:00 – 21:00", v: t({ sk: "podpora každý deň vrátane víkendov", en: "support every day, weekends included" }) },
          { k: "100 %", v: t({ sk: "žiadostí skontrolovaných pred podaním", en: "of applications checked before filing" }) },
        ].map((s2) => (
          <div key={s2.k} className="text-center sm:text-left">
            <p className="font-display text-2xl font-extrabold text-brass-light sm:text-[1.75rem]">{s2.k}</p>
            <p className="mt-1 text-sm leading-relaxed text-cream/70">{s2.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
