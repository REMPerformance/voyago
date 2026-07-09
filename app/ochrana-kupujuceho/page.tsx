import type { Metadata } from "next";
import { ProtectionContent } from "@/components/ProtectionContent";
import { PROTECTION_FEE } from "@/config/products";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Ochrana kupujúceho — vrátenie peňazí pri zamietnutí | Voyago",
  description: `Doplnok za ${PROTECTION_FEE} € na osobu: ak úrad žiadosť zamietne napriek správne poskytnutým údajom, vrátime vám celú pôvodnú sumu vrátane štátneho poplatku. Prečítajte si, čo ochrana kryje, na čo sa nevzťahuje a ako uplatniť nárok.`,
  keywords: ["ochrana kupujúceho", "vrátenie peňazí", "zamietnutie víza", "ESTA zamietnutie", "garancia vrátenia peňazí"],
  alternates: {
    canonical: `${site.url}/ochrana-kupujuceho`,
    languages: {
      "sk-SK": `${site.url}/ochrana-kupujuceho`,
      "en-GB": `${site.url}/ochrana-kupujuceho`,
      "uk-UA": `${site.url}/ochrana-kupujuceho`,
      "de-DE": `${site.url}/ochrana-kupujuceho`,
      "x-default": `${site.url}/ochrana-kupujuceho`,
    },
  },
  openGraph: {
    title: "Ochrana kupujúceho | Voyago",
    description: `Ak úrad zamietne žiadosť napriek správnym údajom, vrátime celú pôvodnú sumu. Doplnok ${PROTECTION_FEE} € na osobu.`,
    url: `${site.url}/ochrana-kupujuceho`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Ochrana kupujúceho",
      provider: { "@id": `${site.url}/#organization` },
      serviceType: "Doplnková služba k sprostredkovaniu cestovného povolenia",
      description:
        "Doplnková služba, pri ktorej sprostredkovateľ vráti zákazníkovi celú pôvodne uhradenú sumu, ak úrad žiadosť zamietne napriek správne a pravdivo poskytnutým údajom.",
      offers: {
        "@type": "Offer",
        price: String(PROTECTION_FEE),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Koľko stojí Ochrana kupujúceho?",
          acceptedAnswer: { "@type": "Answer", text: `Ochrana kupujúceho stojí ${PROTECTION_FEE} € s DPH za každého cestujúceho. Poplatok je nevratný.` },
        },
        {
          "@type": "Question",
          name: "Čo Ochrana kupujúceho kryje?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kryje situáciu, keď úrad zamietne žiadosť napriek tomu, že ste poskytli pravdivé, správne a úplné údaje. V takom prípade vrátime celú pôvodnú sumu vrátane štátneho poplatku aj poplatku za sprostredkovanie.",
          },
        },
        {
          "@type": "Question",
          name: "Na čo sa Ochrana kupujúceho nevzťahuje?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nevzťahuje sa na nesprávne či zatajené údaje, neplatný cestovný doklad, nedostavenie sa na pohovor alebo biometriu, stiahnutie žiadosti a na prihlášky do americkej DV lotérie. Nevratný je aj samotný poplatok za ochranu a príplatok za expresné spracovanie.",
          },
        },
        {
          "@type": "Question",
          name: "Ako uplatním nárok na vrátenie peňazí?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Rozhodnutie úradu o zamietnutí pošlite e-mailom na ${site.email} do 14 dní od jeho doručenia. Po overení podmienok vrátime celú pôvodnú sumu do 14 dní rovnakým spôsobom, akým ste platili.`,
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProtectionContent />
    </>
  );
}
