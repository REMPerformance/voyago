"use client";

import { Plus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Faq() {
  const { t } = useLang();

  const items = [
    { q: t({ sk: "Ako dlho to trvá vybaviť?", en: "How long does it take?" }), a: t({ sk: "Závisí od krajiny — od pár hodín po niekoľko pracovných dní. Orientačný čas spracovania uvádzame pri každej destinácii a po podaní stav žiadosti priebežne sledujeme za vás.", en: "It depends on the country — from a few hours to several working days. We show an estimate for every destination and track your application status after filing." }) },
    { q: t({ sk: "Čo keď je s tým problém na letisku alebo pri vybavovaní?", en: "What if there's a problem at the airport or during processing?" }), a: t({ sk: "Sme s vami. Ak sa pri spracovaní vyskytne problém, riešime ho priamo s vami e-mailom či telefonicky. Ak by ste mali komplikáciu na letisku, máte v e-maile potvrdenie aj naše kontakty — poradíme vám, ako postupovať. Konečné rozhodnutie o vstupe má vždy pohraničný orgán.", en: "We're with you. If an issue comes up during processing, we solve it with you by email or phone. If something happens at the airport, you have your confirmation and our contacts in your inbox — we'll advise you what to do. The final entry decision always rests with border officers." }) },
    { q: t({ sk: "Čo pre mňa viete vybaviť?", en: "What can you arrange for me?" }), a: t({ sk: "Elektronické cestovné povolenia a e-víza: ESTA do USA, ETA do Veľkej Británie a Kanady, e-víza do Indie, Vietnamu, Egypta, Turecka a ďalších krajín. Posúdime, čo presne potrebujete, skontrolujeme údaje a žiadosť podáme za vás.", en: "Electronic travel authorizations and e-visas: US ESTA, UK and Canada ETA, e-visas for India, Vietnam, Egypt, Türkiye and more. We assess what you need, check your details and file the application for you." }) },
    { q: t({ sk: "Vízum vs. povolenie — aký je rozdiel?", en: "Visa vs. permit — what's the difference?" }), a: t({ sk: "Elektronické povolenia (ESTA, ETA, ETIAS) sú rýchly online súhlas so vstupom pre krátke pobyty. E-vízum je elektronická obdoba víza. Klasické víza cez ambasádu (pracovné, študijné) nevybavujeme.", en: "Electronic authorizations (ESTA, ETA, ETIAS) are a fast online clearance for short stays. An e-visa is the electronic form of a visa. We don't arrange embassy visas (work, study)." }) },
    { q: t({ sk: "Čo ak žiadosť zamietnu?", en: "What if my application is refused?" }), a: t({ sk: "Každú žiadosť pred podaním kontrolujeme, aby sme riziko minimalizovali. Ak by k zamietnutiu došlo, poradíme vám ďalší postup. S doplnkom Ochrana kupujúceho (22 €/osoba) vám vrátime celú pôvodnú sumu, ak úrad žiadosť zamietne napriek správne poskytnutým údajom — nevzťahuje sa na zamietnutie pre chybné či zatajené informácie.", en: "We review every application before filing to minimise risk. If a refusal happens, we advise you on next steps. With Buyer Protection (€22/person) we refund the full original amount if the authority refuses despite correctly provided details — refusals caused by incorrect or concealed information are not covered." }) },
    { q: t({ sk: "Sú moje údaje v bezpečí?", en: "Is my data safe?" }), a: t({ sk: "Áno. Údaje prenášame šifrovane (HTTPS), používame ich výlučne na vybavenie vašej žiadosti a nikdy ich nepredávame tretím stranám. Platby spracúva certifikovaná brána Stripe — údaje o karte sa k nám vôbec nedostanú.", en: "Yes. Data is transferred encrypted (HTTPS), used solely to process your application and never sold to third parties. Payments run through Stripe — your card details never reach us." }) },
    { q: t({ sk: "Musím si niečo tlačiť?", en: "Do I need to print anything?" }), a: t({ sk: "Pri niektorých krajinách áno (napr. Vietnam či India vyžadujú vytlačené povolenie), pri iných stačí elektronická forma v telefóne. Pri každej destinácii to jasne uvádzame a napíšeme vám to aj do e-mailu s výsledkom.", en: "For some countries yes (Vietnam and India require a printed permit), for others the electronic form on your phone is enough. We state it clearly per destination and repeat it in your result email." }) },
    { q: t({ sk: "Vybavíte aj celú rodinu?", en: "Can you handle the whole family?" }), a: t({ sk: "Áno. Do jednej objednávky pridáte ľubovoľný počet cestujúcich — každému vyplníte krátky formulár a všetko zaplatíte naraz. Deti potrebujú vlastné povolenie rovnako ako dospelí.", en: "Yes. Add any number of travellers to one order — a short form each, one payment. Children need their own authorization just like adults." }) },
    { q: t({ sk: "Na aké otázky sa pripraviť pri vstupe do krajiny?", en: "What questions should I prepare for at the border?" }), a: t({ sk: "Pohraničný úradník sa môže opýtať na účel a dĺžku cesty, adresu ubytovania, spiatočnú letenku, dostatok financií, prípadne na zamestnanie. Odpovedajte stručne a pravdivo a majte poruke rezerváciu ubytovania aj spiatočný lístok.", en: "A border officer may ask about the purpose and length of your trip, accommodation address, return ticket, funds and sometimes employment. Answer briefly and truthfully and keep your booking and return ticket at hand." }) },
  ];

  return (
    <section className="container-page py-16">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t({ sk: "Časté otázky", en: "Frequently asked" })}</h2>
        </div>
        <p className="max-w-sm text-sm text-ink-soft">{t({ sk: "Všetko podstatné na jednom mieste. Nenašli ste odpoveď? Napíšte nám v chate.", en: "Everything essential in one place. Didn't find your answer? Message us in the chat." })}</p>
      </Reveal>

      <div className="mt-9 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <details key={i} className="group rounded-xl border border-line bg-surface transition-colors hover:border-brass/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-ink">
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
