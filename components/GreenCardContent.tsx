"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, BookOpen, Users2, Ban, ListChecks, Camera, UsersRound, Trophy, Wallet, ShieldAlert, BarChart3, Check, FileCheck, Send } from "lucide-react";
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
    <section className="pb-16">
      {/* HERO — full-bleed navy s kartou a štatistikami */}
      <div className="relative isolate overflow-hidden bg-navy text-cream">
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 620">
          <polygon points="1200,0 1200,470 700,0" fill="#11202e" />
          <polygon points="0,620 400,620 0,320" fill="#0e1b27" />
          <polygon points="960,0 1200,0 1200,300" fill="none" stroke="#C99A4E" strokeOpacity="0.18" strokeWidth="1.5" />
        </svg>

        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <div>
            <div className="inline-flex items-center gap-3 rounded-lg border border-cream/15 bg-cream/[0.05] px-3.5 py-2">
              <CalendarDays size={16} className="text-brass-light" />
              <span className="text-xs font-semibold text-cream/80">{t({ sk: "Oficiálne okno: október 2026 · prihlášky prijímame už teraz", en: "Official window: October 2026 · we accept entries now" })}</span>
            </div>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.02] sm:text-6xl">
              {t({ sk: "Americká", en: "U.S." })} <span className="text-brass-light">{t({ sk: "zelená karta", en: "Green Card" })}</span>
            </h1>
            <p className="mt-2 text-base font-medium text-cream/60">Diversity Visa Lottery (DV-2028)</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
              {t({ sk: "Šanca na trvalý pobyt v USA cez oficiálnu lotériu vlády USA. My skontrolujeme fotografiu podľa noriem, vyplníme údaje bez chýb a prihlášku podáme v októbrovom okne za vás.", en: "A shot at U.S. permanent residency via the official U.S. government lottery. We check your photo against the standards, complete the data error-free and file your entry in the October window for you." })}
            </p>

            <div className="mt-7 flex flex-wrap items-end gap-2">
              <span className="text-[0.62rem] uppercase tracking-wider text-cream/50">{t({ sk: "od", en: "from" })}</span>
              <span className="font-display text-5xl font-extrabold leading-none text-cream">49 €</span>
              <span className="pb-1 text-sm font-semibold text-cream/60">{t({ sk: "s DPH", en: "incl. VAT" })}</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/green-card/prihlaska" className="btn-accent !py-3.5 text-base sm:!px-8">
                {t({ sk: "Vyplniť prihlášku", en: "Start my entry" })} <ArrowRight size={16} />
              </Link>
              <a href="#info" className="inline-flex items-center gap-2 rounded-lg border border-cream/20 px-6 py-3.5 text-base font-semibold text-cream transition-colors hover:border-cream/50">
                {t({ sk: "Všetko o lotérii", en: "About the lottery" })}
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end lg:pr-0">
            <div className="w-full max-w-md rotate-[3deg] transition-transform duration-300 hover:rotate-0 lg:max-w-none lg:origin-right lg:scale-[1.22] xl:scale-[1.32]">
              <GreenCardSpecimen />
            </div>
          </div>
        </div>

        {/* štatistický pás */}
        <div className="relative border-t border-cream/10 bg-cream/[0.03]">
          <div className="container-page grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
            {[
              ["20,8 mil.", t({ sk: "prihlášok v DV-2026", en: "entries in DV-2026" })],
              ["≈ 51 850", t({ sk: "dostupných zelených kariet", en: "green cards available" })],
              ["26", t({ sk: "vybraných zo Slovenska", en: "selected from Slovakia" })],
              ["1×", t({ sk: "ročne — jediné okno", en: "a year — a single window" })],
            ].map(([v, l]) => (
              <div key={l as string}>
                <p className="font-display text-2xl font-extrabold text-brass-light sm:text-3xl">{v}</p>
                <p className="mt-0.5 text-xs text-cream/60">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page">
        {/* PRIEBEH ROČNÍKA — časová os */}
        <div className="mt-16">
          <p className="eyebrow">{t({ sk: "Priebeh ročníka", en: "How the cycle works" })}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">{t({ sk: "Od prihlášky po zelenú kartu", en: "From entry to Green Card" })}</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FileCheck size={18} />, tt: t({ sk: "Kedykoľvek: prihláška u nás", en: "Anytime: your entry with us" }), d: t({ sk: "Vyplníte údaje a nahráte fotografiu. My všetko skontrolujeme podľa oficiálnych noriem — chybná fotka je dôvod diskvalifikácie č. 1.", en: "You fill in your details and upload a photo. We check everything against the official standards — a bad photo is the No. 1 disqualification reason." }) },
              { icon: <Send size={18} />, tt: t({ sk: "Október: oficiálne okno", en: "October: the official window" }), d: t({ sk: "Registrácia je otvorená len niekoľko týždňov. Vašu prihlášku podáme na oficiálnom portáli a pošleme vám potvrdzovacie číslo.", en: "Registration opens for just a few weeks. We file your entry on the official portal and send you the confirmation number." }) },
              { icon: <Trophy size={18} />, tt: t({ sk: "Máj: výsledky žrebovania", en: "May: draw results" }), d: t({ sk: "Vláda USA zverejní vybraných. Výsledok vám overíme a oznámime — a ak ste vybraní, poradíme s ďalšími krokmi.", en: "The U.S. government publishes selectees. We check and share your result — and if selected, we guide you on next steps." }) },
              { icon: <Check size={18} />, tt: t({ sk: "Potom: vízum a pohovor", en: "Then: visa and interview" }), d: t({ sk: "Vybraní pokračujú formulárom DS-260, pohovorom na ambasáde a lekárskou prehliadkou k trvalému pobytu.", en: "Selectees continue via the DS-260 form, an embassy interview and a medical exam towards permanent residency." }) },
            ].map((sItem, i) => (
              <li key={i} className="relative rounded-2xl border border-line bg-surface p-5 shadow-card">
                <span className="absolute right-4 top-4 font-display text-3xl font-extrabold text-ink/[0.06]">{i + 1}</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{sItem.icon}</span>
                <p className="mt-3 font-display text-base font-bold text-ink">{sItem.tt}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{sItem.d}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* PREČO CEZ NÁS */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { icon: <Camera size={18} />, tt: t({ sk: "Fotografia podľa noriem", en: "Photo to standard" }), d: t({ sk: "Najčastejší dôvod vyradenia. Fotku skontrolujeme podľa oficiálnych parametrov a keď nevyhovuje, vypýtame si novú.", en: "The most common rejection reason. We verify your photo against the official parameters and request a new one if it fails." }) },
            { icon: <ListChecks size={18} />, tt: t({ sk: "Údaje bez chýb", en: "Error-free data" }), d: t({ sk: "Duplicitná či chybná prihláška znamená diskvalifikáciu. Všetko prejde ľudskou kontrolou pred podaním.", en: "A duplicate or faulty entry means disqualification. Everything passes a human check before filing." }) },
            { icon: <ShieldAlert size={18} />, tt: t({ sk: "Podané načas a bezpečne", en: "Filed on time, safely" }), d: t({ sk: "Žiadne zmeškané okno ani podvodné stránky. Podávame na oficiálnom portáli a potvrdenie máte v e-maile.", en: "No missed window, no scam sites. We file on the official portal and the confirmation lands in your inbox." }) },
          ].map((c) => (
            <div key={c.tt} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{c.icon}</span>
              <p className="mt-3 font-display text-base font-bold text-ink">{c.tt}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          ))}
        </div>

        {/* INFO s ľavým menu */}
        <div id="info" className="mt-20 scroll-mt-24">
          <h2 className="font-display text-3xl font-extrabold">{t({ sk: "Všetko o zelenej karte", en: "Everything about the Green Card" })}</h2>
          <p className="mt-2 max-w-2xl text-ink-soft">{t({ sk: "Vyberte si tému a dozviete sa detaily — oprávnenosť, fotografia, rodina, výber, poplatky aj štatistiky.", en: "Pick a topic to read the details — eligibility, photo, family, selection, fees and statistics." })}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {TOPICS.map((tp) => {
                const Icon = tp.icon;
                const on = tp.id === active;
                return (
                  <button key={tp.id} onClick={() => setActive(tp.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors lg:w-full ${on ? "border-brass/40 bg-brass/[0.08] text-ink" : "border-transparent text-ink-soft hover:bg-paper hover:text-ink"}`}>
                    <Icon size={16} className={on ? "text-brass" : ""} /> <span className="whitespace-nowrap">{t(tp.label)}</span>
                  </button>
                );
              })}
            </nav>

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

        {/* CTA pás */}
        <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold">{t({ sk: "Prihláška zaberie ~15 minút. My dotiahneme zvyšok.", en: "The entry takes ~15 minutes. We handle the rest." })}</h3>
            <p className="mt-1 text-cream/70">{t({ sk: "Kontrola fotografie, údajov aj podanie v oficiálnom okne — od 49 € s DPH.", en: "Photo check, data review and filing in the official window — from €49 incl. VAT." })}</p>
          </div>
          <Link href="/green-card/prihlaska" className="btn-accent shrink-0 !py-3.5 sm:!px-8">
            {t({ sk: "Vyplniť prihlášku", en: "Start my entry" })} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}