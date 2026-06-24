"use client";

import Link from "next/link";
import { BadgeCheck, FileCheck2, Globe2, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Specializations() {
  const { t } = useLang();

  const items = [
    {
      slug: "us-esta",
      icon: BadgeCheck,
      title: t({ sk: "ESTA do USA", en: "ESTA for the USA" }),
      text: t({ sk: "Vyplníme za vás registráciu ESTA a vybavíme všetky formality pre cestu do USA.", en: "We complete your ESTA and handle every formality for your US trip." }),
    },
    {
      slug: "uk-eta",
      icon: FileCheck2,
      title: t({ sk: "ETA do Veľkej Británie", en: "ETA for the UK" }),
      text: t({ sk: "Žiadosť o UK ETA podáme a skontrolujeme údaje podľa vášho pasu.", en: "We file your UK ETA and verify the details against your passport." }),
    },
    {
      slug: "ca-eta",
      icon: Globe2,
      title: t({ sk: "eTA do Kanady", en: "eTA for Canada" }),
      text: t({ sk: "Registráciu eTA do Kanady zastrešíme kompletne od začiatku do konca.", en: "We handle your Canada eTA completely, from start to finish." }),
    },
  ];

  return (
    <section className="container-page py-16">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">{t({ sk: "Naša špecializácia", en: "What we specialise in" })}</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t({ sk: "Vybavíme to za vás", en: "We handle it for you" })}</h2>
        <p className="mt-3 text-ink-soft">
          {t({ sk: "Vy nám poviete kam idete, my sa postaráme o zvyšok.", en: "Tell us where you're going — we take care of the rest." })}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.slug} delay={i * 90}>
            <Link
              href={`/apply/${it.slug}`}
              className="group flex h-full flex-col rounded-xl2 border border-line bg-surface p-7 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:border-brass/40 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-brass transition-colors group-hover:bg-brass group-hover:text-cream">
                <it.icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{it.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{it.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-all group-hover:gap-2.5">
                {t({ sk: "Vyplniť žiadosť", en: "Start application" })} <ArrowRight size={15} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
