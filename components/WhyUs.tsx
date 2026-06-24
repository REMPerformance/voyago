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
    <section className="container-page py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">{t({ sk: "Prečo Voyago", en: "Why Voyago" })}</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t({ sk: "Prečo si vybrať nás", en: "Why choose us" })}</h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="group rounded-xl2 border border-line bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-brass transition-colors group-hover:bg-brass group-hover:text-paper">
              <r.icon size={22} />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">{r.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
