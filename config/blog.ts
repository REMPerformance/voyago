export type Loc = { sk: string; en: string };
export type Block = { h?: Loc; p?: Loc; list?: Loc[] };
export type FAQ = { q: Loc; a: Loc };

export type BlogPost = {
  slug: string;
  date: string;
  updated?: string;
  readMins: number;
  tag: Loc;
  title: Loc;
  excerpt: Loc;
  seoTitle: Loc;
  metaDescription: Loc;
  keywords: string[];
  image: string;
  imageAlt: Loc;
  body: Block[];
  faq?: FAQ[];
};

const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const POSTS: BlogPost[] = [
  {
    slug: "co-je-esta-a-kto-ho-potrebuje",
    date: "2026-05-20",
    updated: "2026-06-10",
    readMins: 7,
    tag: { sk: "USA · ESTA", en: "USA · ESTA" },
    title: { sk: "Čo je ESTA a kto ho potrebuje? Kompletný sprievodca", en: "What is ESTA and who needs it? A complete guide" },
    excerpt: { sk: "ESTA je elektronické cestovné povolenie do USA pre bezvízový vstup. Kto ho potrebuje, ako dlho platí, koľko stojí a aké chyby vás môžu stáť cestu.", en: "ESTA is the electronic travel authorization for visa-free entry to the USA. Who needs it, how long it lasts, what it costs, and the mistakes that can cost you the trip." },
    seoTitle: { sk: "Čo je ESTA a kto ho potrebuje? Sprievodca | Voyago", en: "What is ESTA and who needs it? Guide | Voyago" },
    metaDescription: { sk: "Kompletný sprievodca ESTA do USA: kto ho potrebuje, platnosť, cena, ako požiadať a najčastejšie chyby. Vybavte ESTA bez stresu s Voyago.", en: "Complete ESTA guide for the USA: who needs it, validity, cost, how to apply and common mistakes. Get your ESTA stress-free with Voyago." },
    keywords: ["ESTA", "ESTA USA", "vízum do USA", "cestovné povolenie USA", "Visa Waiver Program"],
    image: IMG("photo-1436491865332-7a61a109cc05"),
    imageAlt: { sk: "Krídlo lietadla nad oblakmi pri ceste do USA", en: "Airplane wing above the clouds en route to the USA" },
    body: [
      { p: { sk: "Plánujete cestu do Spojených štátov a počuli ste o „ESTA“, no nie ste si istí, čo to vlastne je? V tomto sprievodcovi nájdete všetko podstatné — bez úradníckeho jazyka.", en: "Planning a trip to the United States and heard about \"ESTA\" but unsure what it actually is? This guide covers the essentials — without the bureaucratic jargon." } },
      { h: { sk: "Čo je ESTA", en: "What is ESTA" }, p: { sk: "ESTA (Electronic System for Travel Authorization) je elektronické cestovné povolenie, ktoré umožňuje občanom krajín zapojených do programu Visa Waiver cestovať do USA bez klasického víza — na turistiku, biznis alebo tranzit na pobyt do 90 dní. Nie je to vízum, ale povinný súhlas so vstupom, ktorý posudzujú americké úrady ešte pred vašou cestou.", en: "ESTA (Electronic System for Travel Authorization) is an electronic travel authorization that lets citizens of Visa Waiver Program countries travel to the USA without a traditional visa — for tourism, business or transit of up to 90 days. It is not a visa, but a mandatory pre-travel clearance assessed by US authorities before you fly." } },
      { h: { sk: "Kto ESTA potrebuje", en: "Who needs ESTA" }, p: { sk: "ESTA potrebujú občania krajín Visa Waiver Programu vrátane Slovenska, Česka a väčšiny krajín EÚ, ktorí cestujú leteckou alebo lodnou dopravou. Povolenie musíte mať schválené ešte pred nástupom do lietadla — bez neho vás dopravca nemusí pustiť na palubu.", en: "ESTA is required for citizens of Visa Waiver Program countries, including Slovakia, Czechia and most EU states, travelling by air or sea. It must be approved before you board — without it the carrier may refuse to let you on the plane." } },
      { list: [
        { sk: "Cestujete na turistiku, návštevu rodiny alebo krátku obchodnú cestu.", en: "You are travelling for tourism, family visits or a short business trip." },
        { sk: "Váš pobyt nepresiahne 90 dní.", en: "Your stay will not exceed 90 days." },
        { sk: "Máte biometrický pas krajiny Visa Waiver Programu.", en: "You hold a biometric passport from a Visa Waiver Program country." }
      ] },
      { h: { sk: "Platnosť a počet vstupov", en: "Validity and number of entries" }, p: { sk: "Schválené ESTA platí 2 roky alebo do skončenia platnosti pasu (podľa toho, čo nastane skôr) a umožňuje viacnásobné vstupy. Ak si vymeníte pas alebo zmeníte meno či občianstvo, musíte požiadať o nové.", en: "An approved ESTA is valid for 2 years or until your passport expires (whichever comes first) and allows multiple entries. If you change your passport, name or citizenship, you must apply for a new one." } },
      { h: { sk: "Koľko ESTA stojí a ako dlho trvá schválenie", en: "How much ESTA costs and how long approval takes" }, p: { sk: "Oficiálny štátny poplatok je nízky, no žiadosť obsahuje sériu bezpečnostných otázok, kde aj malá chyba vedie k zamietnutiu. Schválenie zvyčajne príde do niekoľkých hodín, no odporúča sa požiadať aspoň 72 hodín pred odletom. U nás zaplatíte jednu cenu vrátane štátneho poplatku aj kontroly žiadosti odborníkom.", en: "The official government fee is low, but the application includes a set of security questions where even a small error leads to refusal. Approval usually arrives within hours, but applying at least 72 hours before departure is recommended. With us you pay one price including the government fee and an expert review." } },
      { h: { sk: "Najčastejšie chyby", en: "Common mistakes" }, list: [
        { sk: "Preklep v čísle pasu alebo v mene — údaje musia presne sedieť s pasom.", en: "A typo in the passport number or name — details must match the passport exactly." },
        { sk: "Nepravdivá odpoveď na bezpečnostnú otázku — vedie k zamietnutiu aj zákazu vstupu.", en: "An untrue answer to a security question — leads to refusal and possible entry ban." },
        { sk: "Žiadosť na poslednú chvíľu — pri zdržaní môžete prísť o let.", en: "Applying at the last minute — a delay can cost you your flight." }
      ] },
      { h: { sk: "Ako vám pomôžeme", en: "How we help" }, p: { sk: "Vyplníte krátky zrozumiteľný dotazník, my žiadosť skontrolujeme, podáme na oficiálnom portáli a sledujeme stav až do schválenia. O výsledku vás informujeme e-mailom.", en: "You fill in a short, clear form, we review the application, file it on the official portal and track its status until approval. We notify you of the result by email." } }
    ],
    faq: [
      { q: { sk: "Je ESTA to isté ako vízum?", en: "Is ESTA the same as a visa?" }, a: { sk: "Nie. ESTA je cestovné povolenie pre bezvízový vstup do 90 dní. Pri dlhšom pobyte, štúdiu či práci potrebujete klasické vízum.", en: "No. ESTA is a travel authorization for visa-free stays up to 90 days. Longer stays, study or work require a regular visa." } },
      { q: { sk: "Ako dlho pred cestou mám požiadať?", en: "How early should I apply?" }, a: { sk: "Ideálne aspoň 72 hodín pred odletom, hoci schválenie býva rýchle.", en: "Ideally at least 72 hours before departure, although approval is usually fast." } }
    ]
  },
  {
    slug: "uk-eta-nove-pravidla-vstupu",
    date: "2026-05-08",
    updated: "2026-06-05",
    readMins: 6,
    tag: { sk: "UK · ETA", en: "UK · ETA" },
    title: { sk: "UK ETA: nové pravidlá vstupu do Británie", en: "UK ETA: the new rules for entering Britain" },
    excerpt: { sk: "Spojené kráľovstvo zaviedlo elektronickú autorizáciu ETA aj pre občanov EÚ. Čo to znamená pre vašu cestu, čo budete potrebovať a ako sa vyhnúť problémom na hranici.", en: "The UK introduced the ETA, now also for EU citizens. What it means for your trip, what you'll need, and how to avoid problems at the border." },
    seoTitle: { sk: "UK ETA: nové pravidlá vstupu do Británie | Voyago", en: "UK ETA: new rules for entering Britain | Voyago" },
    metaDescription: { sk: "UK ETA pre občanov EÚ: kto ho potrebuje, čo budete potrebovať (pas, selfie), platnosť a ako požiadať. Vybavte ETA do Británie s Voyago.", en: "UK ETA for EU citizens: who needs it, what you'll need (passport, selfie), validity and how to apply. Get your UK ETA with Voyago." },
    keywords: ["UK ETA", "ETA Británia", "vízum do Anglicka", "cestovné povolenie UK", "ETA Veľká Británia"],
    image: IMG("photo-1513635269975-59663e0ac1ad"),
    imageAlt: { sk: "Londýn — Big Ben a typický červený autobus", en: "London — Big Ben and a classic red bus" },
    body: [
      { p: { sk: "Británia zaviedla nový systém Electronic Travel Authorisation (ETA). Týka sa už aj cestovateľov z EÚ vrátane Slovenska a Česka. Tu je všetko, čo potrebujete vedieť pred cestou.", en: "Britain has rolled out the Electronic Travel Authorisation (ETA) scheme. It now applies to EU travellers too, including from Slovakia and Czechia. Here's everything to know before you go." } },
      { h: { sk: "Čo je UK ETA", en: "What is the UK ETA" }, p: { sk: "ETA je elektronické povolenie potrebné na vstup do Spojeného kráľovstva pre krátkodobé návštevy bez víza — turistiku, návštevu rodiny alebo krátke pracovné cesty. Viaže sa priamo na váš pas.", en: "The ETA is an electronic authorization required to enter the UK for short visa-free visits — tourism, family visits or short business trips. It is linked directly to your passport." } },
      { h: { sk: "Kto ho potrebuje", en: "Who needs it" }, p: { sk: "Občania krajín, ktoré na krátke návštevy nepotrebujú vízum — vrátane väčšiny EÚ. Každý cestujúci vrátane detí potrebuje vlastné ETA.", en: "Citizens of countries that don't need a visa for short visits — including most of the EU. Every traveller, including children, needs their own ETA." } },
      { h: { sk: "Čo budete potrebovať", en: "What you'll need" }, list: [
        { sk: "Platný biometrický pas.", en: "A valid biometric passport." },
        { sk: "Fotografiu tváre (selfie) podľa pravidiel gov.uk.", en: "A face photo (selfie) following gov.uk rules." },
        { sk: "Základné údaje o ceste a kontakt.", en: "Basic trip details and contact information." }
      ] },
      { h: { sk: "Platnosť", en: "Validity" }, p: { sk: "ETA zvyčajne platí dva roky alebo do skončenia platnosti pasu a umožňuje opakované vstupy. Cestujte s tým istým pasom, na ktorý bolo ETA vydané.", en: "The ETA is typically valid for two years or until the passport expires and allows repeat entries. Travel with the same passport the ETA was issued for." } },
      { h: { sk: "Časté chyby a ako sa im vyhnúť", en: "Common mistakes and how to avoid them" }, list: [
        { sk: "Nekvalitná fotka — najčastejší dôvod zdržania. Pripravíme ju podľa noriem.", en: "A poor-quality photo — the top cause of delay. We prepare it to spec." },
        { sk: "Cesta s iným pasom, než na ktorý bolo ETA vydané.", en: "Travelling with a different passport than the one the ETA was issued for." },
        { sk: "Predpoklad, že deti ho nepotrebujú — potrebuje ho každý.", en: "Assuming children don't need one — everyone does." }
      ] },
      { h: { sk: "Ako vám pomôžeme", en: "How we help" }, p: { sk: "Prevedieme vás celým formulárom v slovenčine, skontrolujeme fotku aj údaje a žiadosť podáme za vás. Stav sledujete online a o schválení vás informujeme e-mailom.", en: "We guide you through the whole form, check your photo and details and file the application for you. Track the status online and we'll email you on approval." } }
    ],
    faq: [
      { q: { sk: "Potrebujú ETA aj deti?", en: "Do children need an ETA?" }, a: { sk: "Áno, vlastné povolenie potrebuje každý cestujúci bez ohľadu na vek.", en: "Yes, every traveller needs their own authorization regardless of age." } },
      { q: { sk: "Je ETA to isté ako vízum?", en: "Is the ETA the same as a visa?" }, a: { sk: "Nie, ide o povolenie pre krátkodobé bezvízové návštevy, nie o plné vízum.", en: "No, it's an authorization for short visa-free visits, not a full visa." } }
    ]
  },
  {
    slug: "esta-eta-evisa-aky-je-rozdiel",
    date: "2026-04-22",
    readMins: 8,
    tag: { sk: "Sprievodca", en: "Guide" },
    title: { sk: "ESTA, ETA či e-Visa? Aký je rozdiel a čo potrebujete", en: "ESTA, ETA or e-Visa? The difference and what you need" },
    excerpt: { sk: "Pojmy ESTA, ETA, e-Visa a klasické vízum sa ľahko pomýlia. Vysvetľujeme rozdiely jednoducho, aby ste vedeli presne, čo na svoju cestu potrebujete.", en: "ESTA, ETA, e-Visa and a traditional visa are easy to confuse. We explain the differences simply, so you know exactly what your trip needs." },
    seoTitle: { sk: "ESTA vs ETA vs e-Visa: aký je rozdiel? | Voyago", en: "ESTA vs ETA vs e-Visa: what's the difference? | Voyago" },
    metaDescription: { sk: "Rozdiel medzi ESTA, ETA, e-Visa a klasickým vízom jednoducho vysvetlený. Zistite, ktoré cestovné povolenie potrebujete pre svoju destináciu.", en: "The difference between ESTA, ETA, e-Visa and a traditional visa explained simply. Find out which travel authorization your destination needs." },
    keywords: ["ESTA vs ETA", "rozdiel ESTA ETA e-Visa", "aké vízum potrebujem", "cestovné povolenie", "e-Visa"],
    image: IMG("photo-1488646953014-85cb44e25828"),
    imageAlt: { sk: "Mapa, fotoaparát a doplnky na plánovanie cesty", en: "A map, camera and accessories laid out for trip planning" },
    body: [
      { p: { sk: "ESTA, ETA, e-Visa, ETIAS… skratiek je veľa a ľahko sa v nich stratiť. Dobrá správa: princíp je vždy podobný. Tu je prehľad, ktorý vám pomôže zorientovať sa.", en: "ESTA, ETA, e-Visa, ETIAS… there are a lot of acronyms and it's easy to get lost. The good news: the principle is always similar. Here's an overview to help you orient yourself." } },
      { h: { sk: "Cestovné povolenie vs. vízum", en: "Travel authorization vs. visa" }, p: { sk: "Cestovné povolenie (ESTA, ETA, ETIAS) je rýchly elektronický súhlas so vstupom pre krátke bezvízové návštevy. Vízum je formálnejší doklad pre dlhšie pobyty, prácu či štúdium a často vyžaduje viac dokumentov.", en: "A travel authorization (ESTA, ETA, ETIAS) is a quick electronic clearance for short visa-free visits. A visa is a more formal document for longer stays, work or study and often requires more documentation." } },
      { h: { sk: "ESTA — USA", en: "ESTA — USA" }, p: { sk: "Elektronické povolenie do Spojených štátov pre pobyt do 90 dní. Platí 2 roky a umožňuje viac vstupov.", en: "An electronic authorization for the United States for stays up to 90 days. Valid for 2 years with multiple entries." } },
      { h: { sk: "ETA — UK, Kanada a ďalšie", en: "ETA — UK, Canada and others" }, p: { sk: "Electronic Travel Authorisation používa napríklad Spojené kráľovstvo, Kanada (eTA), Austrália či Nový Zéland. Princíp je rovnaký: krátkodobé povolenie viazané na pas.", en: "Electronic Travel Authorisation is used by the UK, Canada (eTA), Australia and New Zealand, among others. The principle is the same: a short-term authorization linked to your passport." } },
      { h: { sk: "e-Visa — online vízum", en: "e-Visa — an online visa" }, p: { sk: "e-Visa je plnohodnotné vízum, o ktoré požiadate online namiesto návštevy ambasády. Používa ho napríklad India, Egypt, Turecko, Vietnam či Srí Lanka. Zvyčajne ho treba vytlačiť a mať pri sebe.", en: "An e-Visa is a full visa you apply for online instead of visiting an embassy. It's used by India, Egypt, Turkey, Vietnam and Sri Lanka, among others. It usually needs to be printed and carried with you." } },
      { h: { sk: "ETIAS — Európa (čoskoro)", en: "ETIAS — Europe (soon)" }, p: { sk: "ETIAS je pripravovaný európsky systém povolení pre návštevníkov z bezvízových krajín cestujúcich do schengenského priestoru. Sledujte našu sekciu noviniek.", en: "ETIAS is the upcoming European authorization system for visitors from visa-free countries travelling to the Schengen area. Watch our news section." } },
      { h: { sk: "Ako zistím, čo potrebujem?", en: "How do I find out what I need?" }, p: { sk: "Závisí to od vášho občianstva, cieľovej krajiny, účelu a dĺžky pobytu. Použite náš krátky sprievodca „Aké vízum potrebujem“, alebo nám napíšte — poradíme.", en: "It depends on your citizenship, destination, purpose and length of stay. Use our short \"Which visa do I need\" wizard, or message us — we'll advise." } }
    ],
    faq: [
      { q: { sk: "Môžem mať ESTA aj vízum naraz?", en: "Can I hold both an ESTA and a visa?" }, a: { sk: "Áno, ale na jednu cestu zvyčajne použijete jedno povolenie podľa účelu a dĺžky pobytu.", en: "Yes, but for a single trip you typically use one authorization based on purpose and length of stay." } },
      { q: { sk: "Potrebujem e-Visa vytlačiť?", en: "Do I need to print an e-Visa?" }, a: { sk: "Pri mnohých krajinách áno — na hranici ho kontrolujú v papierovej forme. Vždy odporúčame mať kópiu.", en: "For many countries yes — it's checked on paper at the border. We always recommend carrying a copy." } }
    ]
  },
  {
    slug: "ako-sa-pripravit-na-ziadost-o-vizum",
    date: "2026-04-06",
    readMins: 6,
    tag: { sk: "Tipy", en: "Tips" },
    title: { sk: "Ako sa pripraviť na žiadosť: doklady, fotka a časté chyby", en: "How to prepare your application: documents, photo and mistakes" },
    excerpt: { sk: "Praktický návod, čo si pripraviť pred podaním žiadosti o cestovné povolenie alebo vízum — a ktorým chybám sa vyhnúť, aby vás nič nezdržalo.", en: "A practical guide on what to prepare before applying for a travel authorization or visa — and which mistakes to avoid so nothing slows you down." },
    seoTitle: { sk: "Príprava na žiadosť o vízum: doklady, fotka, chyby | Voyago", en: "Preparing your visa application: documents, photo, mistakes | Voyago" },
    metaDescription: { sk: "Čo si pripraviť pred žiadosťou o vízum či cestovné povolenie: pas, fotka, doklady a najčastejšie chyby, ktoré vedú k zamietnutiu. Praktický návod od Voyago.", en: "What to prepare before applying for a visa or travel authorization: passport, photo, documents and the common mistakes that cause refusals. A practical Voyago guide." },
    keywords: ["žiadosť o vízum", "doklady na vízum", "fotka na vízum", "ako požiadať o vízum", "časté chyby vízum"],
    image: IMG("photo-1530521954074-e64f6810b32d"),
    imageAlt: { sk: "Pas položený na mape pri príprave na cestu", en: "A passport resting on a map while preparing to travel" },
    body: [
      { p: { sk: "Dobrá príprava ušetrí čas aj nervy. Tu je jednoduchý kontrolný zoznam, vďaka ktorému prejde vaša žiadosť hladko.", en: "Good preparation saves time and nerves. Here's a simple checklist to help your application go through smoothly." } },
      { h: { sk: "1. Skontrolujte platnosť pasu", en: "1. Check your passport validity" }, p: { sk: "Mnohé krajiny vyžadujú platnosť pasu minimálne 6 mesiacov po plánovanom návrate. Skontrolujte to ako prvé — výmena pasu trvá.", en: "Many countries require at least 6 months' passport validity beyond your planned return. Check this first — replacing a passport takes time." } },
      { h: { sk: "2. Pripravte kvalitnú fotografiu", en: "2. Prepare a quality photo" }, p: { sk: "Zlé fotky sú najčastejším dôvodom zdržania. Fotka má byť ostrá, na svetlom pozadí, bez tieňov, okuliarov a pokrývky hlavy. My ju upravíme presne podľa noriem danej krajiny.", en: "Bad photos are the top cause of delay. The photo should be sharp, on a light background, with no shadows, glasses or headwear. We adjust it to each country's exact spec." } },
      { h: { sk: "3. Majte poruke údaje o ceste", en: "3. Keep your trip details handy" }, list: [
        { sk: "Adresa prvého ubytovania v cieľovej krajine.", en: "Address of your first accommodation in the destination." },
        { sk: "Dátumy príletu a odletu, číslo letu (ak ho máte).", en: "Arrival and departure dates, flight number (if you have it)." },
        { sk: "Kontaktné údaje a e-mail, ktorý pravidelne kontrolujete.", en: "Contact details and an email you check regularly." }
      ] },
      { h: { sk: "4. Odpovedajte pravdivo", en: "4. Answer truthfully" }, p: { sk: "Bezpečnostné a zdravotné otázky berte vážne. Nepravdivé odpovede môžu viesť k zamietnutiu, ba aj k zákazu vstupu do krajiny.", en: "Take security and health questions seriously. False answers can lead to refusal and even an entry ban." } },
      { h: { sk: "5. Nechajte si žiadosť skontrolovať", en: "5. Have your application reviewed" }, p: { sk: "Pred odoslaním si dajte žiadosť skontrolovať niekým, kto pozná požiadavky. My to robíme pri každej objednávke automaticky — než ju podáme úradu.", en: "Before submitting, have your application checked by someone who knows the requirements. We do this automatically on every order — before filing with the authority." } }
    ],
    faq: [
      { q: { sk: "Čo ak si nie som istý fotkou?", en: "What if I'm unsure about my photo?" }, a: { sk: "Nahrajte bežnú fotografiu — my ju skontrolujeme a upravíme podľa noriem, prípadne vás požiadame o novú.", en: "Upload a regular photo — we'll check and adjust it to spec, or ask you for a new one if needed." } },
      { q: { sk: "Ako dlho dopredu sa mám pripraviť?", en: "How far in advance should I prepare?" }, a: { sk: "Ideálne aspoň týždeň pred cestou, aby bol priestor na prípadné doplnenie.", en: "Ideally at least a week before travel, to allow time for any follow-up." } }
    ]
  },
  {
    slug: "etias-novy-system-cesty-po-europe",
    date: "2026-03-18",
    readMins: 6,
    tag: { sk: "Európa · ETIAS", en: "Europe · ETIAS" },
    title: { sk: "ETIAS: nový systém pre cesty po Európe", en: "ETIAS: the new system for travel across Europe" },
    excerpt: { sk: "Európa pripravuje systém ETIAS — povolenie pre návštevníkov z bezvízových krajín. Čo to je, koho sa týka a ako sa pripraviť vopred.", en: "Europe is preparing the ETIAS system — an authorization for visitors from visa-free countries. What it is, who it affects, and how to prepare." },
    seoTitle: { sk: "ETIAS: nový systém pre cesty po Európe | Voyago", en: "ETIAS: the new system for travelling across Europe | Voyago" },
    metaDescription: { sk: "ETIAS vysvetlené: kto bude potrebovať európske cestovné povolenie, ako bude fungovať, platnosť a ako sa pripraviť. Sledujte novinky s Voyago.", en: "ETIAS explained: who will need the European travel authorization, how it will work, validity and how to prepare. Follow the news with Voyago." },
    keywords: ["ETIAS", "ETIAS Európa", "európske cestovné povolenie", "Schengen povolenie", "ETIAS Slovensko"],
    image: IMG("photo-1502602898657-3e91760cbb34"),
    imageAlt: { sk: "Eiffelova veža v Paríži ako symbol ciest po Európe", en: "The Eiffel Tower in Paris symbolising travel across Europe" },
    body: [
      { p: { sk: "Európska únia pripravuje ETIAS — nový systém cestovných povolení. Ak cestujete po Európe, oplatí sa vedieť, čo vás čaká, aby vás zmena nezaskočila.", en: "The European Union is preparing ETIAS — a new travel authorization system. If you travel across Europe, it's worth knowing what's coming so the change doesn't catch you off guard." } },
      { h: { sk: "Čo je ETIAS", en: "What is ETIAS" }, p: { sk: "ETIAS (European Travel Information and Authorisation System) bude elektronické povolenie pre návštevníkov z krajín, ktoré do schengenského priestoru nepotrebujú vízum. Pôjde o podobný princíp ako americké ESTA.", en: "ETIAS (European Travel Information and Authorisation System) will be an electronic authorization for visitors from countries that don't need a visa for the Schengen area. It works on a similar principle to the US ESTA." } },
      { h: { sk: "Koho sa to týka", en: "Who it affects" }, p: { sk: "Týka sa návštevníkov z bezvízových krajín mimo EÚ. Občania EÚ povolenie pri cestách v rámci Únie nepotrebujú. Ak teda cestujete s pasom EÚ po Európe, ETIAS sa vás priamo netýka — užitočné je to však vedieť pre rodinu či priateľov zo zahraničia.", en: "It affects visitors from visa-free non-EU countries. EU citizens won't need it when travelling within the Union. So if you travel within Europe on an EU passport, ETIAS doesn't directly apply to you — but it's useful to know for family or friends from abroad." } },
      { h: { sk: "Ako bude fungovať", en: "How it will work" }, list: [
        { sk: "Žiadosť online, viazaná na pas.", en: "An online application, linked to your passport." },
        { sk: "Povolenie pre viac krátkodobých vstupov počas svojej platnosti.", en: "Authorization for multiple short stays during its validity." },
        { sk: "Jednotné pravidlá pre celý schengenský priestor.", en: "Unified rules across the entire Schengen area." }
      ] },
      { h: { sk: "Ako sa pripraviť", en: "How to prepare" }, p: { sk: "Majte pas s dostatočnou platnosťou a sledujte oficiálne oznámenia o spustení. Hneď ako bude ETIAS dostupné, pridáme ho medzi naše služby a prevedieme vás žiadosťou.", en: "Keep a passport with sufficient validity and watch for official launch announcements. As soon as ETIAS goes live, we'll add it to our services and guide you through the application." } }
    ],
    faq: [
      { q: { sk: "Potrebujem ETIAS ako občan EÚ?", en: "Do I need ETIAS as an EU citizen?" }, a: { sk: "Nie, na cesty v rámci EÚ ho nepotrebujete. Týka sa návštevníkov z bezvízových krajín mimo EÚ.", en: "No, you don't need it for travel within the EU. It applies to visitors from visa-free non-EU countries." } },
      { q: { sk: "Kedy ETIAS spustia?", en: "When will ETIAS launch?" }, a: { sk: "Dátum spustenia určujú európske inštitúcie. Sledujte našu sekciu noviniek pre aktuálne informácie.", en: "The launch date is set by the European institutions. Follow our news section for updates." } }
    ]
  }
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
