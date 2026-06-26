"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, BookOpen, Users2, Ban, ListChecks, Camera, UsersRound, Trophy, Wallet, ShieldAlert, BarChart3 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { GreenCardSpecimen } from "@/components/GreenCardSpecimen";

type L = { sk: string; en: string };
type Block = { h?: L; p?: L; ul?: { sk: string[]; en: string[] } };

const TOPICS: { id: string; icon: any; label: L; blocks: Block[] }[] = [
  {
    id: "overview", icon: BookOpen, label: { sk: "Čo je DV lotéria", en: "What is the DV lottery" },
    blocks: [
      { p: { sk: "Diversity Visa (DV) je oficiálny program vlády USA, ktorý každý rok udeľuje až 55 000 zelených kariet (trvalý pobyt) ľuďom z krajín s historicky nízkou mierou imigrácie do USA. Pre DV-2026 je limit po zákonných úpravách (NACARA/NDAA) znížený na približne 51 850 víz.", en: "The Diversity Visa (DV) is an official U.S. government program that each year awards up to 55,000 green cards (permanent residency) to people from countries with historically low immigration to the U.S. For DV-2026 the limit is reduced to roughly 51,850 visas after statutory adjustments (NACARA/NDAA)." } },
      { p: { sk: "Výber prebieha náhodným počítačovým žrebovaním. Víza sa rozdeľujú medzi šesť regiónov a žiadna krajina nesmie získať viac ako 7 % z dostupných víz.", en: "Selection is a random computer drawing. Visas are split among six regions and no single country may receive more than 7% of available visas." } },
      { p: { sk: "Pozor: výber (selection) nezaručuje vízum. Znamená len, že môžete požiadať — musíte spĺňať podmienky a konať rýchlo.", en: "Note: being selected does not guarantee a visa. It only means you may apply — you must qualify and act quickly." } },
    ],
  },
  {
    id: "eligibility", icon: Users2, label: { sk: "Kto sa môže prihlásiť", en: "Who can apply" },
    blocks: [
      { h: { sk: "Podmienka 1 — krajina", en: "Requirement 1 — country" }, p: { sk: "Musíte byť rodákom z oprávnenej krajiny. Slovensko je oprávnené. Ak nie ste, môžete si nárokovať krajinu narodenia manžela/ky, alebo krajinu narodenia jedného z rodičov (za istých podmienok).", en: "You must be a native of an eligible country. Slovakia is eligible. If you are not, you may claim your spouse's country of birth, or a parent's country of birth (under certain conditions)." } },
      { h: { sk: "Podmienka 2 — vzdelanie alebo prax", en: "Requirement 2 — education or work" }, ul: { sk: ["aspoň stredoškolské vzdelanie (úspešne ukončený 12-ročný cyklus formálneho vzdelávania), ALEBO", "2 roky pracovných skúseností za posledných 5 rokov v profesii, ktorá si vyžaduje min. 2 roky prípravy (SVP 7.0+)."], en: ["at least a high-school education (a completed 12-year course of formal education), OR", "2 years of work experience in the last 5 years in an occupation requiring at least 2 years of training (SVP 7.0+)."] } },
      { p: { sk: "Musíte spĺňať obe podmienky (krajina aj vzdelanie/prax).", en: "You must meet both requirements (country and education/work)." } },
    ],
  },
  {
    id: "excluded", icon: Ban, label: { sk: "Vylúčené krajiny", en: "Excluded countries" },
    blocks: [
      { p: { sk: "Rodáci z týchto krajín sa pre DV-2026 nemôžu prihlásiť (za posledných 5 rokov z nich prišlo viac než 50 000 imigrantov). Slovensko medzi nimi NIE JE — Slováci sa prihlásiť môžu.", en: "Natives of these countries cannot apply for DV-2026 (more than 50,000 immigrants came from them in the last 5 years). Slovakia is NOT among them — Slovaks can apply." } },
      { ul: { sk: ["Bangladéš, Brazília, Kanada, Čína (vrátane Hongkongu)", "Kolumbia, Kuba, Dominikánska rep., Salvádor, Haiti, Honduras", "India, Jamajka, Mexiko, Nigéria, Pakistan", "Filipíny, Južná Kórea, Venezuela, Vietnam"], en: ["Bangladesh, Brazil, Canada, China (incl. Hong Kong)", "Colombia, Cuba, Dominican Republic, El Salvador, Haiti, Honduras", "India, Jamaica, Mexico, Nigeria, Pakistan", "Philippines, South Korea, Venezuela, Vietnam"] } },
    ],
  },
  {
    id: "data", icon: ListChecks, label: { sk: "Aké údaje budete potrebovať", en: "What information you'll need" },
    blocks: [
      { ul: { sk: ["Meno (priezvisko, krstné, stredné) presne ako v pase", "Pohlavie a dátum narodenia", "Mesto a krajina narodenia + krajina oprávnenosti", "Fotografia — vaša, manžela/ky a každého dieťaťa", "Poštová adresa a krajina, kde teraz žijete", "Telefón (voliteľné) a e-mail (s prístupom do mája)", "Najvyššie dosiahnuté vzdelanie", "Rodinný stav a údaje o manželovi/ke", "Všetky slobodné deti do 21 rokov"], en: ["Name (last, first, middle) exactly as in passport", "Gender and date of birth", "City & country of birth + country of eligibility", "Photo — of you, your spouse and each child", "Mailing address and the country where you live today", "Phone (optional) and email (with access through May)", "Highest level of education achieved", "Marital status and spouse details", "All unmarried children under 21"] } },
      { p: { sk: "Jedna prihláška na osobu — viac prihlášok znamená diskvalifikáciu. Manželia môžu podať každý po jednej.", en: "One entry per person — multiple entries mean disqualification. Spouses may each submit one." } },
    ],
  },
  {
    id: "photo", icon: Camera, label: { sk: "Fotografia – požiadavky", en: "Photo requirements" },
    blocks: [
      { ul: { sk: ["farebná, ostrá, na bielom/sivobielom pozadí", "čelný pohľad, neutrálny výraz, otvorené oči", "bežné oblečenie, bez pokrývky hlavy (okrem náboženskej)", "bez okuliarov, nie staršia ako 6 mesiacov"], en: ["color, in focus, plain white/off-white background", "full-face view, neutral expression, both eyes open", "everyday clothing, no head covering (except religious)", "no glasses, not older than 6 months"] } },
      { h: { sk: "Technické parametre", en: "Technical specs" }, ul: { sk: ["formát JPEG (.jpg)", "veľkosť do 240 kB", "štvorec (výška = šírka), 600×600 px"], en: ["JPEG (.jpg) format", "file size ≤ 240 kB", "square (height = width), 600×600 px"] } },
      { p: { sk: "Rovnaká fotka ako v predošlom roku = diskvalifikácia. My ju za vás skontrolujeme.", en: "The same photo as a prior year = disqualification. We check it for you." } },
    ],
  },
  {
    id: "family", icon: UsersRound, label: { sk: "Rodina – manžel/ka a deti", en: "Family – spouse & children" },
    blocks: [
      { h: { sk: "Manžel / manželka", en: "Spouse" }, p: { sk: "Manžela/ku musíte uviesť, aj keď s vami nepricestuje, aj keď ste odlúčení (okrem súdneho odlúčenia). Výnimka: ak je manžel/ka občan alebo trvalý rezident USA, neuvádzate ho/ju.", en: "You must list your spouse even if they won't immigrate, even if separated (unless legally separated). Exception: if your spouse is a U.S. citizen or LPR, do not list them." } },
      { h: { sk: "Deti", en: "Children" }, p: { sk: "Uveďte všetky živé slobodné deti do 21 rokov — vlastné, nevlastné aj adoptované — aj keď s vami nežijú alebo nepricestujú.", en: "List all living unmarried children under 21 — natural, step and adopted — even if they don't live with you or won't immigrate." } },
      { p: { sk: "Neuvedenie oprávneného člena rodiny (alebo uvedenie nesprávnej osoby) môže spôsobiť diskvalifikáciu.", en: "Failing to list an eligible family member (or listing the wrong person) can cause disqualification." } },
    ],
  },
  {
    id: "selection", icon: Trophy, label: { sk: "Výber a výsledky", en: "Selection & results" },
    blocks: [
      { p: { sk: "Výsledky zistíte cez „Entrant Status Check\" na dvprogram.state.gov pomocou potvrdzovacieho čísla z prihlášky, spravidla od mája. Toto je jediný oficiálny spôsob.", en: "You check results via \"Entrant Status Check\" at dvprogram.state.gov using the confirmation number from your entry, usually from May. This is the only official channel." } },
      { p: { sk: "Vláda USA vám NIKDY nepošle e-mail, že ste boli vybraní. Potvrdzovacie číslo si uchovajte minimálne do 30. septembra nasledujúceho roka.", en: "The U.S. government will NEVER email you to say you were selected. Keep your confirmation number at least until September 30 of the following year." } },
      { p: { sk: "Pri výhre nasleduje formulár DS-260 a pohovor na ambasáde. Všetky víza musia byť vydané do konca fiškálneho roka (30. september).", en: "If selected, the DS-260 form and an embassy interview follow. All visas must be issued by the end of the fiscal year (September 30)." } },
    ],
  },
  {
    id: "fees", icon: Wallet, label: { sk: "Poplatky", en: "Fees" },
    blocks: [
      { p: { sk: "Ak ste vybraní a požiadate o vízum, vízový poplatok platíte až na pohovore priamo ambasáde USA. Tento poplatok je nevratný, ak vízum nezískate.", en: "If selected and you apply for a visa, the visa fee is paid at the interview directly to the U.S. embassy. That fee is non-refundable if you don't get the visa." } },
      { p: { sk: "Naša cena od 49 € s DPH pokrýva kompletnú službu — kontrolu fotografie a údajov, správne vyplnenie a podanie prihlášky na oficiálnom portáli.", en: "Our price from €49 incl. VAT covers the complete service — checking your photo and data, correctly completing and filing your entry on the official portal." } },
    ],
  },
  {
    id: "scams", icon: ShieldAlert, label: { sk: "Podvody – pozor", en: "Scams – be careful" },
    blocks: [
      { ul: { sk: ["Vláda USA neoznamuje výber e-mailom — len cez Entrant Status Check.", "Oficiálne sú len stránky s doménou .gov (dvprogram.state.gov).", "Nikdy neposielajte peniaze za DV cez Western Union a pod.", "Uchovajte si potvrdzovacie číslo aj potvrdzovaciu stránku."], en: ["The U.S. government does not announce selection by email — only via Entrant Status Check.", "Only .gov sites are official (dvprogram.state.gov).", "Never send money for the DV via Western Union etc.", "Keep your confirmation number and confirmation page."] } },
      { p: { sk: "Potvrdzovacie číslo a stránku vám vždy odovzdáme — bez nich by ste sa nedostali k výsledkom.", en: "We always hand you your confirmation number and page — without them you couldn't access your results." } },
    ],
  },
  { id: "stats", icon: BarChart3, label: { sk: "Štatistiky DV-2026", en: "DV-2026 statistics" }, blocks: [] },
];

const EU_STATS: [string, string, number][] = [
  ["Slovensko", "Slovakia", 26],
  ["Česko", "Czech Republic", 44],
  ["Poľsko", "Poland", 343],
  ["Maďarsko", "Hungary", 121],
  ["Rakúsko", "Austria", 35],
  ["Nemecko", "Germany", 420],
  ["Ukrajina", "Ukraine", 5283],
  ["Rusko", "Russia", 5510],
  ["Spojené kráľovstvo", "United Kingdom", 1303],
  ["Taliansko", "Italy", 267],
  ["Francúzsko", "France", 309],
  ["Turecko", "Turkey", 3191],
];

export function GreenCardContent() {
  const { t } = useLang();
  const [active, setActive] = useState("overview");
  const topic = TOPICS.find((x) => x.id === active)!;

  return (
    <section className="container-page py-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
        {t({ sk: "← Späť", en: "← Back" })}
      </Link>

      {/* HERO */}
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div className="flex justify-center lg:justify-start">
          <GreenCardSpecimen />
        </div>
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass/12 text-brass"><CalendarDays size={20} /></span>
            <div>
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ink-soft/70">{t({ sk: "Oficiálne otvorenie", en: "Official opening" })}</p>
              <p className="font-display text-base font-extrabold text-ink">{t({ sk: "Október 2026", en: "October 2026" })}</p>
            </div>
          </div>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02]">{t({ sk: "Americká zelená karta", en: "U.S. Green Card" })}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{t({ sk: "Šanca na trvalý pobyt v USA cez oficiálnu lotériu Diversity Visa. Prihlášku od vás prijmeme kedykoľvek — skontrolujeme fotografiu, vyplníme údaje a podáme ju za vás v októbrovom okne.", en: "A shot at U.S. permanent residency via the official Diversity Visa lottery. We accept your entry anytime — we check your photo, complete the data and file it for you in the October window." })}</p>
          <div className="mt-6 flex flex-wrap items-end gap-2">
            <span className="text-[0.62rem] uppercase tracking-wider text-ink-soft/70">{t({ sk: "od", en: "from" })}</span>
            <span className="font-display text-4xl font-extrabold leading-none text-ink">49 €</span>
            <span className="pb-0.5 text-sm font-semibold text-ink-soft">{t({ sk: "s DPH", en: "incl. VAT" })}</span>
          </div>
          <Link href="/green-card/prihlaska" className="btn-accent mt-7 w-full !py-3.5 text-base sm:w-auto sm:!px-8">
            {t({ sk: "Vyplniť údaje", en: "Fill in details" })} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* INFO with left menu */}
      <div className="mt-20">
        <h2 className="font-display text-3xl font-extrabold">{t({ sk: "Všetko o zelenej karte", en: "Everything about the Green Card" })}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{t({ sk: "Vyberte si tému vľavo a dozviete sa detaily — oprávnenosť, fotografia, rodina, výber, poplatky aj štatistiky.", en: "Pick a topic on the left to read the details — eligibility, photo, family, selection, fees and statistics." })}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* menu */}
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
            {TOPICS.map((tp) => {
              const Icon = tp.icon;
              const on = tp.id === active;
              return (
                <button key={tp.id} onClick={() => setActive(tp.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors lg:w-full ${on ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper hover:text-ink"}`}>
                  <Icon size={16} className={on ? "text-brass-light" : ""} /> <span className="whitespace-nowrap">{t(tp.label)}</span>
                </button>
              );
            })}
          </nav>

          {/* content */}
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="font-display text-2xl font-bold">{t(topic.label)}</h3>

            {topic.id === "stats" ? (
              <div className="mt-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    [t({ sk: "Prihlášok celkovo", en: "Total entries" }), "20 822 624"],
                    [t({ sk: "Zaregistrovaných (s rodinami)", en: "Registered (with families)" }), "129 516"],
                    [t({ sk: "Dostupných víz (DV-2026)", en: "Visas available (DV-2026)" }), "≈ 51 850"],
                  ].map(([l, val]) => (
                    <div key={l} className="rounded-xl border border-line bg-paper/40 p-4">
                      <p className="text-[0.56rem] uppercase tracking-wider text-ink-soft/70">{l}</p>
                      <p className="mt-1 font-display text-xl font-extrabold text-ink">{val}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 mb-2 text-sm font-semibold text-ink">{t({ sk: "Koľko vybrali vlani (vybraní + rodina), Európa:", en: "Selected last year (selectees + family), Europe:" })}</p>
                <div className="overflow-hidden rounded-xl border border-line">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-paper text-left"><th className="px-4 py-2 text-[0.6rem] uppercase tracking-wider text-ink-soft">{t({ sk: "Krajina", en: "Country" })}</th><th className="px-4 py-2 text-right text-[0.6rem] uppercase tracking-wider text-ink-soft">{t({ sk: "Vybraní", en: "Selected" })}</th></tr></thead>
                    <tbody>
                      {EU_STATS.map(([sk, en, n]) => {
                        const me = sk === "Slovensko";
                        return (
                          <tr key={en} className={`border-t border-line-soft ${me ? "bg-brass/[0.07]" : ""}`}>
                            <td className={`px-4 py-2 ${me ? "font-bold text-ink" : "text-ink-soft"}`}>{t({ sk, en })}{me && <span className="ml-2 rounded-md bg-brass/20 px-2 py-0.5 text-[0.5rem] uppercase text-brass">{t({ sk: "vy", en: "you" })}</span>}</td>
                            <td className={`px-4 py-2 text-right font-mono ${me ? "font-bold text-brass" : "text-ink"}`}>{n.toLocaleString("sk-SK")}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-ink-soft/70">{t({ sk: "Zdroj: U.S. Department of State, DV-2026 Selected Entrants. Čísla zahŕňajú vybraných aj ich rodinných príslušníkov.", en: "Source: U.S. Department of State, DV-2026 Selected Entrants. Figures include selectees and their family members." })}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {topic.blocks.map((b, i) => (
                  <div key={i}>
                    {b.h && <p className="font-display text-base font-bold text-ink">{t(b.h)}</p>}
                    {b.p && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t(b.p)}</p>}
                    {b.ul && (
                      <ul className="mt-1 space-y-1.5">
                        {(t({ sk: b.ul.sk.join("|||"), en: b.ul.en.join("|||") })).split("|||").map((li, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-ink-soft"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" /> {li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
