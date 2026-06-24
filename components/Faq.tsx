"use client";

import { Plus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const { t } = useLang();

  const items = [
    { q: t({ sk: "Čo presne pre mňa vybavíte?", en: "What exactly do you handle?" }), a: t({ sk: "Posúdime, aké povolenie potrebujete, skontrolujeme doklady a podáme žiadosť cez oficiálny štátny portál. Vy len vyplníte krátky formulár.", en: "We assess the permit you need, check documents and file on the official portal. You only fill a short form." }) },
    { q: t({ sk: "Prečo platiť vám?", en: "Why pay you?" }), a: t({ sk: "Podať si to viete aj sami a zaplatiť len štátny poplatok. Naša cena navyše zahŕňa kontrolu, podanie a podporu, aby vás nezamietli pre chybu.", en: "You can apply yourself and pay only the government fee. Our price adds checking, filing and support." }) },
    { q: t({ sk: "Vízum vs. cestovné povolenie?", en: "Visa vs. travel permit?" }), a: t({ sk: "Povolenia (ESTA, ETA, e-Visa) sú elektronické a pre krátke pobyty. Klasické vízum cez ambasádu nevybavujeme.", en: "Permits (ESTA, ETA, e-Visa) are electronic, for short stays. We don't arrange embassy visas." }) },
    { q: t({ sk: "Ako rýchlo to vybavíte?", en: "How fast is it?" }), a: t({ sk: "Závisí od krajiny — od pár hodín po niekoľko dní. Orientačný čas uvádzame pri každej destinácii.", en: "Depends on the country — hours to a few days. We show an estimate per destination." }) },
    { q: t({ sk: "Čo ak ma zamietnu?", en: "What if I'm rejected?" }), a: t({ sk: "Údaje kontrolujeme, aby sme riziko minimalizovali. Štátny poplatok však býva nevratný, ak úrad žiadosť zamietne.", en: "We check details to minimise risk. The government fee is usually non-refundable on rejection." }) },
    { q: t({ sk: "Je platba bezpečná?", en: "Is payment secure?" }), a: t({ sk: "Áno, cez zabezpečenú bránu — Visa, Mastercard, Apple Pay aj Google Pay.", en: "Yes, via a secure gateway — Visa, Mastercard, Apple Pay and Google Pay." }) },
    { q: t({ sk: "Musím niečo tlačiť?", en: "Do I need to print anything?" }), a: t({ sk: "Pri niektorých krajinách áno (Vietnam, India), pri iných stačí elektronická forma. Vždy to uvádzame.", en: "For some countries yes (Vietnam, India), for others electronic is enough. We always note it." }) },
    { q: t({ sk: "Vybavíte aj celú rodinu?", en: "The whole family too?" }), a: t({ sk: "Áno. Do jednej objednávky pridáte viacerých cestujúcich.", en: "Yes. Add several travellers to one order." }) },
    { q: t({ sk: "Na aké otázky sa pripraviť pri vstupe do krajiny?", en: "What questions should I prepare for at the border?" }), a: t({ sk: "Pohraničný úradník sa môže opýtať na účel a dĺžku cesty, adresu ubytovania, spiatočnú letenku, dostatok financií, prípadne na zamestnanie. Odpovedajte stručne a pravdivo a majte poruke rezerváciu ubytovania aj spiatočný lístok.", en: "A border officer may ask about the purpose and length of your trip, your accommodation address, return ticket, sufficient funds and sometimes your employment. Answer briefly and truthfully and keep your booking and return ticket at hand." }) },
  ];

  return (
    <section className="container-page py-12">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{t({ sk: "Časté otázky", en: "Frequently asked" })}</h2>
      </Reveal>

      <div className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-2">
        {items.map((item, i) => (
          <details key={i} className="group rounded-xl border border-line bg-surface transition-colors hover:border-brass/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-sm font-semibold text-ink">
              {item.q}
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-all group-open:rotate-45 group-open:border-brass group-open:text-brass">
                <Plus size={13} />
              </span>
            </summary>
            <p className="px-5 pb-4 text-[0.82rem] leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
