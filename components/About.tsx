"use client";

import { Check, ShieldAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function About() {
  const { t } = useLang();

  const doItems = [
    t({ sk: "Posúdime, aké povolenie pre vašu cestu potrebujete", en: "Assess which permit your trip needs" }),
    t({ sk: "Skontrolujeme platnosť pasu a fotku podľa oficiálnych noriem", en: "Check passport validity and photo against official standards" }),
    t({ sk: "Vyplníme žiadosť presne a bez chýb", en: "Fill in the application accurately, without errors" }),
    t({ sk: "Podáme ju na oficiálnom štátnom portáli", en: "File it on the official government portal" }),
    t({ sk: "Uhradíme štátny poplatok za vás", en: "Pay the government fee on your behalf" }),
    t({ sk: "Sledujeme stav a komunikujeme s úradmi", en: "Track the status and deal with the authorities" }),
    t({ sk: "Doručíme schválené povolenie na e-mail", en: "Deliver the approved permit to your e-mail" }),
    t({ sk: "Sme vám k dispozícii pred cestou aj počas nej", en: "We're available before and during your trip" }),
  ];

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{t({ sk: "O nás", en: "About us" })}</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.04] sm:text-5xl">
            {t({ sk: "Pripravíme všetko od začiatku až po koniec", en: "We prepare everything, start to finish" })}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {t({
              sk: "Voyago je tím, ktorý cestovateľom zo Slovenska a okolia uľahčuje cestu do zahraničia. Vízový proces býva neprehľadný a plný úradníckych nástrah — my ho celý preberáme na seba.",
              en: "Voyago is a team that makes travelling abroad easier for people from Slovakia and beyond. The visa process is confusing and full of bureaucratic traps — we take all of it on.",
            })}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {t({
              sk: "Sprostredkúvame elektronické cestovné povolenia a e-víza do desiatok krajín. Každú žiadosť skontroluje človek a podáme ju cez oficiálne kanály — aby ste mali povolenie vybavené správne a načas.",
              en: "We arrange electronic travel authorizations and e-visas to dozens of countries. Every application is checked by a person and filed through official channels — so your permit is correct and on time.",
            })}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">{t({ sk: "Čo všetko robíme", en: "What we do" })}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {doItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/40"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/12 text-green">
                  <Check size={13} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Dôležité upozornenie */}
      <Reveal delay={80}>
        <div className="mt-10 flex items-start gap-4 rounded-xl2 border border-brass/35 bg-brass/[0.07] p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brass/15 text-brass">
            <ShieldAlert size={20} />
          </span>
          <div>
            <p className="font-display text-base font-bold text-ink">
              {t({ sk: "Dôležité na záver", en: "Important to know" })}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {t({
                sk: "Posledné slovo pri vstupe do krajiny má vždy pohraničný alebo imigračný úradník (customs / border officer) v cieľovej destinácii. Platné cestovné povolenie ani vízum samo o sebe nezaručuje vstup do krajiny.",
                en: "The final say on entry always rests with the border or immigration officer at your destination. A valid travel authorization or visa does not by itself guarantee entry into the country.",
              })}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
