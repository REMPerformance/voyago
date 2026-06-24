import type { Metadata } from "next";
import { GreenCardContent } from "@/components/GreenCardContent";

const DESC =
  "Prihláška do oficiálnej lotérie o americkú zelenú kartu (Diversity Visa, DV-2026/DV-2027). Skontrolujeme fotografiu podľa noriem, vyplníme a podáme prihlášku za vás. Oprávnenosť, fotografia, rodina, výber, poplatky aj štatistiky. Prihlášky berieme stále. Od 49 €.";

export const metadata: Metadata = {
  title: "Americká zelená karta (DV lotéria) — online prihláška a info | Voyago",
  description: DESC,
  keywords: ["americká zelená karta", "zelená karta prihláška", "DV lotéria", "Diversity Visa", "green card", "DV-2026", "DV-2027", "americké vízum", "trvalý pobyt USA", "lotéria o zelenú kartu", "prihláška zelená karta online", "DV lottery Slovensko"],
  alternates: { canonical: "/green-card" },
  openGraph: { title: "Americká zelená karta (DV lotéria) — online prihláška", description: DESC, type: "website", locale: "sk_SK", siteName: "Voyago" },
  twitter: { card: "summary_large_image", title: "Americká zelená karta — online prihláška | Voyago", description: DESC },
  robots: { index: true, follow: true },
};

const FAQ = [
  { q: "Môže sa Slovák prihlásiť do lotérie o zelenú kartu?", a: "Áno. Slovensko je oprávnená krajina pre DV program. Prihlásiť sa môže ktokoľvek, kto spĺňa podmienku krajiny a podmienku vzdelania alebo praxe." },
  { q: "Garantujete výhru zelenej karty?", a: "Nie. Ide o náhodnú lotériu vlády USA. Garantujeme správne vyplnenie podľa vašich údajov, kontrolu fotografie podľa noriem a riadne podanie prihlášky na oficiálnom portáli." },
  { q: "Koľko stojí podanie prihlášky?", a: "Naša cena je od 49 € s DPH za prihlášku a zahŕňa kompletnú službu — kontrolu fotografie, správne vyplnenie a podanie prihlášky na oficiálnom portáli." },
  { q: "Kedy sa lotéria otvára?", a: "Oficiálne okno sa otvára spravidla v prvom októbrovom týždni. Prihlášky prijímame priebežne celý rok a podáme ich v najbližšom októbrovom okne." },
  { q: "Koľko ľudí vlani vybrali zo Slovenska?", a: "Pre DV-2026 bolo zo Slovenska zaregistrovaných 26 osôb (vybraní spolu s rodinnými príslušníkmi). Celosvetovo bolo z 20,8 milióna prihlášok zaregistrovaných približne 129 516 osôb." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", name: "Americká zelená karta — prihláška do DV lotérie", serviceType: "Sprostredkovanie prihlášky do lotérie Diversity Visa", description: DESC, areaServed: "SK", provider: { "@type": "Organization", name: "Voyago" }, offers: { "@type": "Offer", price: "49", priceCurrency: "EUR", availability: "https://schema.org/InStock" } },
    { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Domov", item: "/" }, { "@type": "ListItem", position: 2, name: "Americká zelená karta", item: "/green-card" }] },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GreenCardContent />
      {/* SEO: FAQ v HTML */}
      <section className="container-page max-w-3xl pb-20">
        <h2 className="font-display text-3xl font-extrabold">Časté otázky</h2>
        <dl className="mt-8 space-y-5">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-xl border border-line bg-surface p-5 shadow-card">
              <dt className="font-display text-base font-bold text-ink">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
