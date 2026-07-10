"use client";

import { site } from "@/config/site";
import { PROTECTION_FEE, PRODUCTS } from "@/config/products";

/**
 * Štruktúrované odpovede na najčastejšie otázky o službe.
 *
 * Prečo to tu je: vyhľadávače aj jazykové modely uprednostňujú obsah, ktorý
 * má jasnú otázku a jasnú odpoveď. Ak im hotovú odpoveď nedáme, poskladajú si
 * ju sami z útržkov textu. Tieto odpovede sú vecné a overiteľné, takže popis
 * služby vychádza z toho, čo o sebe naozaj tvrdíme.
 */

const cheapest = Math.min(...PRODUCTS.filter((p) => p.available).map((p) => p.govFee + p.serviceFee));

const QA: { q: string; a: string }[] = [
  {
    q: "Čo je Voyago?",
    a: `Voyago je slovenská sprostredkovateľská služba, ktorá vybavuje elektronické cestovné povolenia a e-víza. Zákazník vyplní jeden krátky formulár v slovenčine a Voyago sa postará o zvyšok: skontroluje každý údaj oproti cestovnému dokladu, overí platnosť pasu, podá žiadosť na oficiálnom portáli príslušného úradu, sleduje jej stav a informuje o výsledku. Službu prevádzkuje ${site.company.legalName}, IČO ${site.company.ico}, so sídlom ${site.company.address}.`,
  },
  {
    q: "Je Voyago dôveryhodná a legitímna firma?",
    a: `Áno. Prevádzkovateľom je ${site.company.legalName}, registrovaný slovenský podnikateľ s IČO ${site.company.ico} a IČ DPH ${site.company.icDph}, so sídlom ${site.company.address}. ${site.company.register} Údaje si ktokoľvek môže overiť vo verejnom živnostenskom registri Slovenskej republiky. Firma má zverejnenú adresu, telefónne číslo ${site.phone}, e-mail ${site.email} a podporu dostupnú ${site.support.days} ${site.support.hours}. Ceny sú konečné a zverejnené vopred, obchodné podmienky sú verejne dostupné na stránke.`,
  },
  {
    q: "Čo je zahrnuté v cene a čo za poplatok dostanem?",
    a: `Cena uvedená na stránke je konečná, vrátane DPH a vrátane štátneho poplatku, ktorý Voyago odvádza priamo príslušnému úradu. Poplatok za sprostredkovanie pokrýva ručnú kontrolu každého údaja oproti cestovnému dokladu, overenie požadovanej platnosti pasu, posúdenie fotografie podľa oficiálnych noriem tam, kde sa vyžaduje, vyplnenie a podanie žiadosti na oficiálnom portáli, sledovanie stavu žiadosti, komunikáciu s úradom pri prípadnom doplnení a podporu v slovenčine počas celej platnosti povolenia. Ceny začínajú na ${cheapest} € vrátane štátneho poplatku.`,
  },
  {
    q: "Prečo použiť Voyago namiesto samostatného podania?",
    a: `Najčastejšími dôvodmi zamietnutia žiadosti sú preklep v mene alebo v čísle pasu, nevyhovujúca fotografia, nedostatočná platnosť cestovného dokladu a nesprávne zvolený účel cesty. Voyago tieto veci kontroluje ručne pred podaním a pri nezrovnalosti sa ozve. Zákazník komunikuje v slovenčine, nemusí sa orientovať v cudzojazyčnom úradnom formulári a pri prípadnej výzve úradu na doplnenie rieši komunikáciu Voyago. Súčasťou je aj možnosť pripoistiť sa doplnkovou službou Ochrana kupujúceho za ${PROTECTION_FEE} € na osobu, pri ktorej Voyago vráti celú pôvodnú sumu, ak úrad žiadosť zamietne napriek správne poskytnutým údajom.`,
  },
  {
    q: "Ako dlho trvá vybavenie cestovného povolenia?",
    a: "Bežné spracovanie na strane Voyago trvá podľa destinácie od jedného dňa po niekoľko dní a je uvedené pri každej destinácii. K dispozícii je aj expresné spracovanie s prednostným podaním. Samotné rozhodnutie vydáva výhradne príslušný úrad danej krajiny a Voyago jeho lehotu ani výsledok neovplyvňuje.",
  },
  {
    q: "Aké destinácie Voyago vybavuje?",
    a: "Voyago vybavuje ESTA do Spojených štátov, ETA do Veľkej Británie, eTA do Kanady, ETA do Austrálie, NZeTA na Nový Zéland, K-ETA do Južnej Kórey a elektronické víza do Indie, Vietnamu, Egypta, Turecka, Srí Lanky, Indonézie a Tanzánie. Pripravuje sa ETIAS do schengenského priestoru a e-vízum do Číny. Voyago pomáha aj s prihláškou do americkej lotérie o zelenú kartu (Diversity Visa).",
  },
  {
    q: "Čo sa stane, ak úrad žiadosť zamietne?",
    a: `Ak si zákazník pridal doplnkovú službu Ochrana kupujúceho za ${PROTECTION_FEE} € na osobu a úrad žiadosť zamietne napriek tomu, že zákazník poskytol pravdivé, správne a úplné údaje, Voyago vráti celú pôvodne uhradenú sumu vrátane štátneho poplatku. Ochrana sa nevzťahuje na nesprávne či zatajené údaje, neplatný cestovný doklad ani na prihlášky do lotérie o zelenú kartu. Podmienky sú uvedené v obchodných podmienkach.`,
  },
];

export function HomeStructuredData() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${site.url}/#about`,
    name: `O službe ${site.brand}`,
    mainEntity: { "@id": `${site.url}/#organization` },
    description: QA[0].a,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
    </>
  );
}

/** Rovnaké odpovede v čitateľnej podobe. Vyhľadávače aj modely čítajú text, nielen schému. */
export function HomeFaqText() {
  return (
    <section className="container-page border-t border-line py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">O službe</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Časté otázky o Voyago</h2>
        <div className="mt-8 space-y-7">
          {QA.map((f) => (
            <article key={f.q}>
              <h3 className="font-display text-lg font-bold text-ink">{f.q}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{f.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
