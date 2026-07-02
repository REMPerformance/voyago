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
      { h: { sk: "Ako vám pomôžeme", en: "How we help" }, p: { sk: "Vyplníte krátky zrozumiteľný dotazník, my žiadosť skontrolujeme, podáme na oficiálnom portáli a sledujeme stav až do schválenia. O výsledku vás informujeme e-mailom.", en: "You fill in a short, clear form, we review the application, file it on the official portal and track its status until approval. We notify you of the result by email." } },
      { h: { sk: "Ako prebieha žiadosť krok za krokom", en: "The application step by step" }, p: { sk: "Formulár má približne 20 minút poctivej práce: osobné údaje, údaje z pasu, adresa v USA (stačí prvý hotel), zamestnávateľ, kontakt na blízku osobu a séria bezpečnostných otázok o zdraví, trestnej minulosti či predchádzajúcich zamietnutiach. Systém následne žiadosť preverí voči bezpečnostným databázam. Väčšina odpovedí príde rýchlo, ale úrad má oficiálne až 72 hodín — preto sa neoplatí čakať na poslednú chvíľu.", en: "The form takes about 20 minutes of honest work: personal details, passport data, a US address (your first hotel is fine), employer, an emergency contact and a set of security questions about health, criminal history or previous refusals. The system then screens the application against security databases. Most answers come quickly, but officially the authority has up to 72 hours — so don't leave it to the last minute." } },
      { h: { sk: "Čo znamená status žiadosti", en: "What your application status means" }, list: [
        { sk: "Authorization Approved — máte schválené, môžete cestovať. Potvrdenie si uložte.", en: "Authorization Approved — you're cleared to travel. Save the confirmation." },
        { sk: "Travel Not Authorized — zamietnuté. Neznamená to zákaz vstupu do USA, ale musíte žiadať o klasické vízum na ambasáde.", en: "Travel Not Authorized — refused. It doesn't mean a US entry ban, but you must apply for a regular visa at the embassy." },
        { sk: "Pending — žiadosť sa ešte posudzuje; typicky sa rozhodne do 72 hodín.", en: "Pending — still under review; usually decided within 72 hours." }
      ] },
      { h: { sk: "ESTA a tranzit cez USA", en: "ESTA and transiting the USA" }, p: { sk: "Aj keď v USA len prestupujete na let do Mexika, Kanady či Južnej Ameriky, ESTA potrebujete. USA nemajú tranzitnú zónu ako európske letiská — každý cestujúci formálne vstupuje na územie USA, prechádza pasovou kontrolou a musí mať platné povolenie alebo vízum. V žiadosti vtedy označíte, že cestujete tranzitom.", en: "Even if you're only connecting in the USA to a flight to Mexico, Canada or South America, you need ESTA. The US has no transit zone like European airports — every passenger formally enters the country, passes immigration and must hold a valid authorization or visa. In the form you simply mark that you are in transit." } },
      { h: { sk: "Vstup s ESTA: čo vás čaká na letisku", en: "Entering with ESTA: what to expect at the airport" }, p: { sk: "Po prílete vás čaká pasová kontrola: odtlačky prstov, fotografia a pár otázok — kam idete, na ako dlho, kde budete bývať a či máte spiatočnú letenku. Odpovedajte stručne a pravdivo. Úradník má právo rozhodnúť o dĺžke povoleného pobytu (pečiatka alebo elektronický záznam I-94) a vo výnimočných prípadoch aj o odopretí vstupu — ESTA je povolenie nastúpiť do lietadla, nie garancia vstupu.", en: "On arrival you go through immigration: fingerprints, a photo and a few questions — where you're going, for how long, where you'll stay and whether you have a return ticket. Answer briefly and truthfully. The officer decides your permitted length of stay (the I-94 record) and, in rare cases, may refuse entry — ESTA is permission to board, not a guarantee of entry." } },
      { h: { sk: "Pobyt do 90 dní: na čo si dať pozor", en: "The 90-day limit: what to watch" }, p: { sk: "Limit 90 dní sa nedá predĺžiť a nezresetujete ho krátkym výletom do Kanady či Mexika — čas strávený v susedných krajinách sa do limitu zvyčajne počíta. Prekročenie pobytu (overstay) má vážne následky: zrušenie ESTA, problémy pri ďalších cestách a možný viacročný zákaz vstupu. Plánujte s rezervou.", en: "The 90-day limit cannot be extended, and a short trip to Canada or Mexico doesn't reset it — time in neighbouring countries usually counts towards the limit. Overstaying has serious consequences: ESTA revocation, trouble on future trips and a possible multi-year entry ban. Plan with a margin." } },
      { h: { sk: "Kedy ESTA nestačí a potrebujete vízum", en: "When ESTA isn't enough and you need a visa" }, list: [
        { sk: "Pobyt dlhší ako 90 dní, štúdium, práca alebo platené vystúpenia.", en: "Stays over 90 days, study, work or paid performances." },
        { sk: "Návšteva Iránu, Iraku, Severnej Kórey, Sýrie, Sudánu, Líbye, Somálska či Jemenu po roku 2011 — strácate nárok na bezvízový vstup.", en: "Travel to Iran, Iraq, North Korea, Syria, Sudan, Libya, Somalia or Yemen after 2011 — you lose visa-waiver eligibility." },
        { sk: "Predchádzajúce zamietnutie víza či ESTA, alebo dvojité občianstvo niektorých krajín.", en: "A previous visa/ESTA refusal, or dual citizenship of certain countries." }
      ] },
      { h: { sk: "Praktické tipy pred odletom", en: "Practical pre-departure tips" }, p: { sk: "Skontrolujte, že meno v letenke presne sedí s pasom, ESTA potvrdenie majte uložené v telefóne aj vytlačené, a pas nech platí minimálne počas celého pobytu. Ak sa vám zmení pas, e-mail alebo adresa v USA, ESTA sa viaže na pas — pri novom pase žiadate nové povolenie.", en: "Check that the name on your ticket matches your passport exactly, keep the ESTA confirmation on your phone and printed, and make sure your passport is valid for your whole stay. ESTA is tied to your passport — a new passport means a new application." } },
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
      { h: { sk: "Ako vám pomôžeme", en: "How we help" }, p: { sk: "Prevedieme vás celým formulárom v slovenčine, skontrolujeme fotku aj údaje a žiadosť podáme za vás. Stav sledujete online a o schválení vás informujeme e-mailom.", en: "We guide you through the whole form, check your photo and details and file the application for you. Track the status online and we'll email you on approval." } },
      { h: { sk: "Ako žiadosť prebieha v praxi", en: "How the application works in practice" }, p: { sk: "Britská žiadosť je z veľkej časti postavená na fotografiách: nahrávate sken pasu (stránku s údajmi) a aktuálnu fotografiu tváre, ktorú systém porovnáva s pasom. Nasledujú osobné údaje, adresa, zamestnanie a bezpečnostné otázky o trestnej minulosti. Väčšina žiadostí je vybavená v priebehu hodín až troch pracovných dní.", en: "The UK application is largely photo-based: you upload a scan of your passport data page and a current photo of your face, which the system matches against the passport. Then come personal details, address, employment and security questions about criminal history. Most applications are decided within hours to three working days." } },
      { h: { sk: "Na fotke záleží viac, než si myslíte", en: "The photo matters more than you think" }, list: [
        { sk: "Neutrálne pozadie, rovnomerné svetlo, žiadne tiene na tvári.", en: "Neutral background, even light, no shadows on the face." },
        { sk: "Bez okuliarov, bez pokrývky hlavy (okrem náboženských), neutrálny výraz.", en: "No glasses, no headwear (except religious), neutral expression." },
        { sk: "Fotku odfoťte na výšku telefónom — selfie režim väčšinou vyhovuje, ak je ostrá.", en: "Portrait orientation on a phone is fine — selfies usually pass if sharp." }
      ] },
      { h: { sk: "ETA platí 2 roky — a viaže sa na pas", en: "ETA lasts 2 years — and is tied to your passport" }, p: { sk: "Schválená ETA umožňuje opakované návštevy do 6 mesiacov počas 2 rokov alebo do konca platnosti pasu. Nový pas znamená novú žiadosť. Povolenie potrebuje každý cestujúci vrátane bábätiek — rodina s dvoma deťmi teda podáva štyri žiadosti.", en: "An approved ETA allows repeat visits of up to 6 months over 2 years, or until your passport expires. A new passport means a new application. Every traveller needs one, including infants — a family of four files four applications." } },
      { h: { sk: "Tranzit cez Londýn: pozor na typ prestupu", en: "Transiting London: know your connection type" }, p: { sk: "Ak pri prestupe neopúšťate tranzitnú zónu (airside), ETA sa oficiálne nevyžaduje. Ak však musíte prejsť pasovou kontrolou — napríklad si preberáte batožinu, meníte letisko z Heathrow na Gatwick, alebo letíte nízkonákladovkou bez prepojenej batožiny — ETA potrebujete. V praxi ju odporúčame mať pri každom prestupe v UK: za pár eur získate istotu.", en: "If you stay airside during your connection, an ETA is officially not required. But if you must pass border control — collecting bags, changing from Heathrow to Gatwick, or flying low-cost without through-checked luggage — you need one. In practice we recommend it for any UK connection: a few euros buys certainty." } },
      { h: { sk: "Čo vás čaká na britskej hranici", en: "What to expect at the UK border" }, p: { sk: "Väčšina cestujúcich s biometrickým pasom prejde cez eGates — automatické brány, ktoré overia tvár voči pasu a ETA si stiahnu elektronicky. Nič netlačíte. Úradník sa pri manuálnej kontrole môže spýtať na účel cesty, dĺžku pobytu, ubytovanie a financie. Pracovať na ETA nemôžete; návštevy, turistika, štúdium do 6 mesiacov a obchodné stretnutia sú v poriadku.", en: "Most travellers with biometric passports use the eGates — automatic gates that match your face to the passport and pull your ETA electronically. Nothing to print. At a manual check the officer may ask about purpose, length of stay, accommodation and funds. You can't work on an ETA; visits, tourism, study up to 6 months and business meetings are fine." } },
      { h: { sk: "Najčastejšie dôvody zamietnutia", en: "The most common refusal reasons" }, list: [
        { sk: "Nekvalitná alebo nezhodná fotografia tváre s pasom.", en: "Poor-quality photo or a face that doesn't match the passport." },
        { sk: "Zamlčaná trestná minulosť — UK má prístup k medzinárodným databázam.", en: "Concealed criminal history — the UK checks international databases." },
        { sk: "Preklepy v čísle pasu či mene, ktoré nesedia s dokladom.", en: "Typos in the passport number or name that don't match the document." }
      ] },
      { h: { sk: "Skúsenosť z praxe", en: "A note from practice" }, p: { sk: "Najviac problémov vidíme pri fotografiách nahrávaných narýchlo z galérie — orezané čelo, tieň cez polovicu tváre, okuliare. Práve preto každú žiadosť pred podaním kontrolujeme a keď fotke niečo chýba, vypýtame si novú ešte pred odoslaním úradom. Ušetríte si zamietnutie aj opakovaný poplatok.", en: "Most issues we see come from photos uploaded in a hurry — cropped forehead, a shadow across half the face, glasses. That's why we review every application before filing and request a new photo before submission if something's off. It saves you a refusal and a repeat fee." } },
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
      { h: { sk: "Ako zistím, čo potrebujem?", en: "How do I find out what I need?" }, p: { sk: "Závisí to od vášho občianstva, cieľovej krajiny, účelu a dĺžky pobytu. Použite náš krátky sprievodca „Aké vízum potrebujem“, alebo nám napíšte — poradíme.", en: "It depends on your citizenship, destination, purpose and length of stay. Use our short \"Which visa do I need\" wizard, or message us — we'll advise." } },
      { h: { sk: "Prečo tie skratky vôbec existujú", en: "Why these acronyms exist at all" }, p: { sk: "Štáty postupne nahrádzajú papierové pečiatky elektronickou predbežnou kontrolou: cestujúceho preveria ešte pred nástupom do lietadla, nie až na hranici. Pre vás to znamená menej byrokracie, pre štáty viac bezpečnosti. Preto rovnaký princíp nájdete pod rôznymi menami — ESTA v USA, ETA v UK a Kanade, ETIAS čoskoro v Európe, e-Visa v Ázii a Afrike.", en: "States are replacing paper stamps with electronic pre-screening: travellers are vetted before boarding, not at the border. For you it means less bureaucracy; for states, more security. The same principle appears under different names — ESTA in the USA, ETA in the UK and Canada, ETIAS soon in Europe, e-Visa across Asia and Africa." } },
      { h: { sk: "Porovnanie v skratke", en: "Quick comparison" }, list: [
        { sk: "ESTA (USA): povolenie pre bezvízové krajiny, platí 2 roky, pobyt do 90 dní.", en: "ESTA (USA): visa-waiver authorization, 2 years, stays up to 90 days." },
        { sk: "ETA (UK, Kanada): obdoba ESTA, platí 2 roky (UK) / 5 rokov (Kanada), viaže sa na pas.", en: "ETA (UK, Canada): ESTA's counterpart, 2 years (UK) / 5 years (Canada), tied to the passport." },
        { sk: "e-Visa (India, Vietnam, Egypt, Turecko…): elektronické vízum s vlastnými pravidlami dĺžky pobytu a počtu vstupov.", en: "e-Visa (India, Vietnam, Egypt, Türkiye…): an electronic visa with its own stay and entry rules." },
        { sk: "ETIAS (EÚ, od 2026): povolenie pre bezvízových návštevníkov Európy, platí 3 roky.", en: "ETIAS (EU, from 2026): authorization for visa-exempt visitors to Europe, valid 3 years." }
      ] },
      { h: { sk: "Ako zistiť, čo potrebujete práve vy", en: "How to find what you need" }, p: { sk: "Rozhodujú tri veci: vaše občianstvo, cieľová krajina a účel cesty. Slovák na dovolenku do USA potrebuje ESTA; do Londýna ETA; do Indie turistické e-vízum. Pri dvojitom občianstve žiadate na pas, s ktorým cestujete. A pozor na tranzit — prestup v USA či UK má vlastné pravidlá. Náš sprievodca na stránke vám typ povolenia určí za 30 sekúnd.", en: "Three things decide: your citizenship, the destination and the purpose of travel. A Slovak holidaymaker needs ESTA for the USA, an ETA for London, a tourist e-visa for India. With dual citizenship, apply on the passport you travel with. And mind transits — connecting in the USA or UK has its own rules. Our 30-second wizard tells you which permit you need." } },
      { h: { sk: "Ceny a platnosť: na čo si dať pozor", en: "Prices and validity: what to watch" }, p: { sk: "Štátne poplatky sa líšia od pár dolárov po desiatky eur a menia sa — vlády ich pravidelne upravujú. Dôležitejšie než samotná suma je vedieť, čo za ňu dostávate: počet vstupov (jednorazový vs. viacnásobný), maximálnu dĺžku pobytu a platnosť povolenia. Lacné jednorazové e-vízum môže vyjsť drahšie než viacvstupové, ak plánujete región navštíviť dvakrát.", en: "Government fees range from a few dollars to tens of euros and change regularly. More important than the amount is what it buys: number of entries (single vs. multiple), maximum stay and validity. A cheap single-entry e-visa can cost more than a multiple-entry one if you plan to visit the region twice." } },
      { h: { sk: "Špeciálny prípad: papierové vízum", en: "The special case: paper visas" }, p: { sk: "Ak cestujete za prácou, štúdiom či na dlhší pobyt, elektronické povolenia nestačia — potrebujete klasické vízum cez ambasádu s osobným pohovorom, biometriou a dlhšími lehotami. Tieto víza nevybavujeme, ale poradíme vám, či ich vôbec potrebujete: prekvapivo veľa ľudí ide na ambasádu zbytočne, keď im stačilo e-vízum.", en: "For work, study or longer stays, electronic authorizations aren't enough — you need a traditional embassy visa with an interview, biometrics and longer lead times. We don't arrange those, but we can tell you whether you actually need one: surprisingly many people visit an embassy unnecessarily when an e-visa would have sufficed." } },
      { h: { sk: "Jedna zásada pre všetky typy", en: "One rule for all types" }, p: { sk: "Nech žiadate o čokoľvek, údaje musia byť presne podľa pasu — do bodky, vrátane diakritiky v prepise a poradia mien. Druhá zásada: žiadajte s predstihom. Aj „okamžité“ povolenia môžu spadnúť do manuálnej kontroly a tá trvá dni. Tretia: povolenie vždy skontrolujte po doručení — preklep v čísle pasu robí doklad neplatným.", en: "Whatever you apply for, details must match your passport exactly — to the letter, including transliteration and name order. Second rule: apply early. Even \"instant\" permits can fall into manual review, which takes days. Third: always check the issued permit — a typo in the passport number makes it invalid." } },
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
      { h: { sk: "5. Nechajte si žiadosť skontrolovať", en: "5. Have your application reviewed" }, p: { sk: "Pred odoslaním si dajte žiadosť skontrolovať niekým, kto pozná požiadavky. My to robíme pri každej objednávke automaticky — než ju podáme úradu.", en: "Before submitting, have your application checked by someone who knows the requirements. We do this automatically on every order — before filing with the authority." } },
      { h: { sk: "Pas: prvá a najdôležitejšia kontrola", en: "Passport: the first and most important check" }, p: { sk: "Väčšina krajín vyžaduje pas platný ešte 6 mesiacov po plánovanom odchode a aspoň jednu-dve voľné strany. Skontrolujte aj fyzický stav — natrhnutá stránka či odlepená fólia na fotke môžu byť dôvodom na odopretie nástupu do lietadla. Ak sa pas blíži ku koncu platnosti, vymeňte ho pred podaním žiadosti: povolenia sa viažu na konkrétny pas.", en: "Most countries require a passport valid 6 months beyond your planned departure and one or two blank pages. Check its physical condition too — a torn page or lifting laminate over the photo can mean denied boarding. If your passport is close to expiry, renew it before applying: permits are tied to a specific passport." } },
      { h: { sk: "Dokumenty, ktoré sa zídu pri každej žiadosti", en: "Documents useful for any application" }, list: [
        { sk: "Sken alebo fotografia dátovej strany pasu (ostrá, bez odleskov).", en: "A scan or photo of the passport data page (sharp, no glare)." },
        { sk: "Digitálna fotografia tváre podľa požiadaviek krajiny — pozrite náš sprievodca Foto na vízum.", en: "A digital face photo meeting the country's rules — see our visa-photo guide." },
        { sk: "Adresa prvého ubytovania a orientačný itinerár.", en: "Your first accommodation address and a rough itinerary." },
        { sk: "Platobná karta a e-mail, ku ktorému máte prístup aj na cestách.", en: "A payment card and an email you can access while travelling." }
      ] },
      { h: { sk: "Bezpečnostné otázky: pravda sa oplatí", en: "Security questions: honesty pays" }, p: { sk: "Otázky o trestnej minulosti, predchádzajúcich zamietnutiach či zdravotnom stave vyzerajú nepríjemne, ale krajiny si odpovede vedia overiť v medzinárodných databázach. Nepravdivá odpoveď je horšia než nepohodlná pravda — vedie k zamietnutiu, zrušeniu už vydaného povolenia a často k dlhoročnému zákazu. Ak máte komplikovanú situáciu, radšej sa poraďte vopred.", en: "Questions about criminal history, previous refusals or health look unpleasant, but countries can verify answers in international databases. An untrue answer is worse than an uncomfortable truth — it leads to refusal, revocation of an issued permit and often a long ban. If your situation is complicated, seek advice first." } },
      { h: { sk: "Časovanie: kedy žiadať", en: "Timing: when to apply" }, p: { sk: "Ideálne 2–4 týždne pred cestou. Nie preto, že by spracovanie trvalo tak dlho — väčšina povolení príde do pár dní — ale preto, aby ste mali rezervu na manuálnu kontrolu, opravu fotky či výmenu pasu. Žiadať príliš skoro sa tiež neoplatí pri povoleniach s krátkou platnosťou viazanou na dátum vstupu (niektoré e-víza).", en: "Ideally 2–4 weeks before travel. Not because processing takes that long — most permits arrive within days — but to leave a buffer for manual review, a photo fix or a passport renewal. Applying too early can also backfire with permits whose short validity is tied to the entry date (some e-visas)." } },
      { h: { sk: "Deti a rodinné žiadosti", en: "Children and family applications" }, p: { sk: "Každé dieťa potrebuje vlastný pas a vlastné povolenie — bez výnimky, aj bábätká. Údaje vypĺňate z detského pasu, fotografia musí spĺňať rovnaké pravidlá (u bábätiek sa toleruje viac). Ak dieťa cestuje len s jedným rodičom, niektoré krajiny odporúčajú notársky súhlas druhého rodiča — preverte si to pri destinácii.", en: "Every child needs their own passport and their own permit — no exceptions, infants included. Fill in details from the child's passport; the photo must meet the same rules (more tolerance for babies). If a child travels with one parent only, some countries recommend a notarised consent from the other parent — check per destination." } },
      { h: { sk: "Po schválení: skontrolujte doklad", en: "After approval: verify the document" }, p: { sk: "Otvorte doručené povolenie a porovnajte číslo pasu, meno a dátumy — preklep robí doklad nepoužiteľným a na letisku sa rieši veľmi zle. Uložte si PDF do telefónu, pošlite kópiu spolucestujúcemu a pri krajinách, ktoré to vyžadujú, si ho vytlačte. My vám výsledok posielame e-mailom aj s praktickými informáciami do krajiny.", en: "Open the issued permit and compare the passport number, name and dates — a typo makes it unusable and is painful to fix at the airport. Save the PDF to your phone, send a copy to a travel companion and print it for countries that require it. We email you the result together with practical country info." } },
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
      { h: { sk: "Ako sa pripraviť", en: "How to prepare" }, p: { sk: "Majte pas s dostatočnou platnosťou a sledujte oficiálne oznámenia o spustení. Hneď ako bude ETIAS dostupné, pridáme ho medzi naše služby a prevedieme vás žiadosťou.", en: "Keep a passport with sufficient validity and watch for official launch announcements. As soon as ETIAS goes live, we'll add it to our services and guide you through the application." } },
      { h: { sk: "Prečo ETIAS vzniká", en: "Why ETIAS is being introduced" }, p: { sk: "Do Európy ročne prichádzajú desiatky miliónov návštevníkov bez víz — a hranice o nich doteraz nemali žiadne informácie vopred. ETIAS to mení: krátka online žiadosť sa preverí voči európskym bezpečnostným databázam ešte pred cestou, podobne ako americká ESTA. Pre bežného turistu je to formalita na pár minút; pre schengenský priestor výrazné posilnenie kontroly.", en: "Tens of millions of visa-free visitors enter Europe each year — and until now borders had no advance information about them. ETIAS changes that: a short online application is screened against European security databases before travel, much like the US ESTA. For an ordinary tourist it's a few-minute formality; for Schengen, a major security upgrade." } },
      { h: { sk: "Koho sa ETIAS týka — a koho nie", en: "Who ETIAS applies to — and who's exempt" }, list: [
        { sk: "Týka sa: občanov ~59 bezvízových krajín (USA, UK, Kanada, Austrália, Japonsko…), vrátane detí.", en: "Applies to: citizens of ~59 visa-exempt countries (USA, UK, Canada, Australia, Japan…), children included." },
        { sk: "Netýka sa: občanov EÚ/EHP a Švajčiarska, držiteľov schengenských víz a povolení na pobyt.", en: "Exempt: EU/EEA and Swiss citizens, holders of Schengen visas and residence permits." },
        { sk: "Slovákov sa ETIAS netýka — cestujú po EÚ na občiansky preukaz.", en: "Slovaks are unaffected — they travel within the EU on an ID card." }
      ] },
      { h: { sk: "Ako bude žiadosť vyzerať", en: "What the application will look like" }, p: { sk: "Formulár potrvá približne 10–20 minút: osobné údaje, údaje z pasu, vzdelanie a zamestnanie, prvá krajina vstupu a bezpečnostné otázky o trestnej minulosti, cestách do konfliktných zón či predchádzajúcich vyhosteniach. Poplatok 20 € platí každý žiadateľ od 18 do 70 rokov. Podľa EÚ bude veľká väčšina žiadostí schválená automaticky do pár minút; manuálna kontrola môže trvať do 4 dní, výnimočne dlhšie.", en: "The form takes roughly 10–20 minutes: personal details, passport data, education and occupation, first country of entry and security questions about criminal history, travel to conflict zones or prior removals. The €20 fee applies to applicants aged 18–70. The EU expects the vast majority of applications to be approved automatically within minutes; manual review can take up to 4 days, exceptionally longer." } },
      { h: { sk: "ETIAS a EES: dva systémy, jedna hranica", en: "ETIAS and EES: two systems, one border" }, p: { sk: "Spolu s ETIAS spúšťa Európa aj Entry/Exit System (EES) — biometrickú evidenciu vstupov a výstupov, ktorá nahrádza pečiatky v pase. EES prebieha na hranici (odtlačky, fotografia), ETIAS sa vybavuje online pred cestou. Prvé mesiace po spustení preto rátajte s dlhšími radmi na letiskách, kým sa systémy zabehnú.", en: "Alongside ETIAS, Europe is launching the Entry/Exit System (EES) — biometric registration of entries and exits replacing passport stamps. EES happens at the border (fingerprints, photo); ETIAS is done online before travel. Expect longer airport queues in the first months while the systems bed in." } },
      { h: { sk: "Čo to znamená pre vaše cesty a blízkych v zahraničí", en: "What it means for your trips and family abroad" }, p: { sk: "Ak máte rodinu či priateľov v USA, UK alebo Kanade, ktorí vás chodia navštevovať, od spustenia ETIAS budú potrebovať schválené povolenie ešte pred odletom do Európy. Odporučte im žiadať s predstihom — najmä v prvej vlne po spustení, keď budú systémy vyťažené. My budeme ETIAS vybavovať kompletne: kontrola, podanie aj sledovanie stavu.", en: "If you have family or friends in the USA, UK or Canada who visit you, they'll need an approved ETIAS before flying to Europe once it launches. Advise them to apply early — especially in the first wave when systems will be busy. We'll handle ETIAS end to end: review, filing and status tracking." } },
      { h: { sk: "Pozor na podvodné stránky", en: "Beware of scam sites" }, p: { sk: "Oficiálny portál ETIAS ešte neexistuje — spustí sa až so systémom. Každá stránka, ktorá dnes „predáva ETIAS“, vyberá peniaze za nič. Nechajte nám e-mail a napíšeme vám presne v momente, keď sa registrácie otvoria.", en: "The official ETIAS portal doesn't exist yet — it launches with the system. Any site \"selling ETIAS\" today is taking money for nothing. Leave us your email and we'll write the moment registrations open." } },
    ],
    faq: [
      { q: { sk: "Potrebujem ETIAS ako občan EÚ?", en: "Do I need ETIAS as an EU citizen?" }, a: { sk: "Nie, na cesty v rámci EÚ ho nepotrebujete. Týka sa návštevníkov z bezvízových krajín mimo EÚ.", en: "No, you don't need it for travel within the EU. It applies to visitors from visa-free non-EU countries." } },
      { q: { sk: "Kedy ETIAS spustia?", en: "When will ETIAS launch?" }, a: { sk: "Dátum spustenia určujú európske inštitúcie. Sledujte našu sekciu noviniek pre aktuálne informácie.", en: "The launch date is set by the European institutions. Follow our news section for updates." } }
    ]
  },
  {
    slug: "kedy-vybavit-cestovne-povolenie-casova-os",
    date: "2026-06-24",
    readMins: 9,
    tag: { sk: "Praktické rady", en: "Practical tips" },
    title: { sk: "Kedy vybaviť cestovné povolenie? Časová os pred cestou krok za krokom", en: "When to arrange your travel permit? A step-by-step pre-trip timeline" },
    excerpt: { sk: "Mesiac pred odletom, týždeň, deň? Praktická časová os, kedy riešiť pas, povolenie, fotku aj tlač dokumentov — aby vás nič nezaskočilo.", en: "A month before departure, a week, a day? A practical timeline for passport, permit, photo and printing — so nothing catches you out." },
    seoTitle: { sk: "Kedy vybaviť cestovné povolenie? Časová os | Voyago", en: "When to arrange a travel permit? Timeline | Voyago" },
    metaDescription: { sk: "Praktická časová os pred cestou: kedy skontrolovať pas, kedy požiadať o ESTA, ETA či e-vízum, kedy riešiť fotku a čo mať pri sebe na letisku.", en: "A practical pre-trip timeline: when to check your passport, apply for ESTA, ETA or an e-visa, sort your photo and what to carry at the airport." },
    keywords: ["kedy žiadať o vízum", "cestovné povolenie termín", "ESTA kedy", "ETA kedy", "časová os cesta"],
    image: IMG("photo-1488646953014-85cb44e25828"),
    imageAlt: { sk: "Cestovateľ s kufrom na letisku pri okne", en: "Traveller with a suitcase at an airport window" },
    body: [
      { p: { sk: "Najviac stresu pri cestovaní nevzniká na letisku, ale týždeň pred ním — keď človek zistí, že pas končí, fotka nevyhovuje a povolenie ešte nie je podané. Táto časová os vám to zoradí tak, aby ste všetko stíhali s rezervou.", en: "Most travel stress isn't born at the airport but a week before it — when you find the passport is expiring, the photo doesn't comply and the permit hasn't been filed. This timeline puts everything in order with a margin." } },
      { h: { sk: "4–8 týždňov pred cestou: pas a plán", en: "4–8 weeks before: passport and plan" }, p: { sk: "Skontrolujte platnosť pasu — väčšina krajín chce 6 mesiacov po návrate a voľné strany. Výmena pasu trvá týždne, preto je to prvý krok. Zistite, aké povolenie destinácia vyžaduje (náš sprievodca to určí za pol minúty) a či sa vás týkajú špeciálne pravidlá: tranzit cez USA/UK, dvojité občianstvo, cesta s deťmi.", en: "Check passport validity — most countries want 6 months beyond return plus blank pages. Renewal takes weeks, so it comes first. Find out which permit your destination requires (our wizard does it in half a minute) and whether special rules apply: US/UK transit, dual citizenship, travelling with children." } },
      { h: { sk: "2–4 týždne pred cestou: podajte žiadosť", en: "2–4 weeks before: file the application" }, p: { sk: "Toto je ideálne okno pre ESTA, ETA aj e-víza. Povolenia síce často prídu do pár hodín, ale rezerva kryje manuálnu kontrolu, opravu fotografie či sviatky v cieľovej krajine. Pri e-vízach s platnosťou viazanou na dátum vstupu (niektoré ázijské krajiny) si nastavte dátumy podľa reálneho itinerára.", en: "This is the ideal window for ESTA, ETA and e-visas. Permits often arrive within hours, but the buffer covers manual review, a photo fix or public holidays in the destination. For e-visas whose validity is tied to the entry date (some Asian countries), set dates according to your real itinerary." } },
      { list: [
        { sk: "Pripravte sken pasu a fotografiu podľa pravidiel krajiny.", en: "Prepare a passport scan and a photo meeting the country's rules." },
        { sk: "Údaje vypĺňajte presne podľa pasu — do písmena.", en: "Fill in details exactly as in the passport — to the letter." },
        { sk: "Použite e-mail, ku ktorému máte prístup aj v zahraničí.", en: "Use an email you can access abroad." }
      ] },
      { h: { sk: "1 týždeň pred cestou: skontrolujte výsledok", en: "1 week before: verify the result" }, p: { sk: "Otvorte schválené povolenie a porovnajte meno, číslo pasu a dátumy. Preklep = neplatný doklad, a na letisku sa rieši veľmi zle. Uložte si PDF do telefónu, pošlite kópiu spolucestujúcemu a vytlačte, ak to krajina vyžaduje (India, Vietnam). Skontrolujte aj zhodu mena v letenke s pasom.", en: "Open the approved permit and compare name, passport number and dates. A typo = an invalid document, and airports are the worst place to fix it. Save the PDF to your phone, send a copy to a companion and print it where required (India, Vietnam). Also check your ticket name matches the passport." } },
      { h: { sk: "Deň pred odletom: posledná kontrola", en: "The day before: final check" }, list: [
        { sk: "Pas + povolenie (v telefóne aj vytlačené) + letenka na jednom mieste.", en: "Passport + permit (phone and print) + ticket in one place." },
        { sk: "Adresa prvého ubytovania a spiatočný lístok poruke — pýtajú sa na ne na hranici.", en: "First accommodation address and return ticket at hand — border officers ask." },
        { sk: "Nabitý telefón a offline kópie dokumentov (letiskové Wi-Fi je lotéria).", en: "Charged phone and offline copies of documents (airport Wi-Fi is a lottery)." }
      ] },
      { h: { sk: "Na letisku a na hranici", en: "At the airport and the border" }, p: { sk: "Povolenie kontroluje už dopravca pri check-ine — bez neho vás nemusí pustiť do lietadla. Na hranici odpovedajte stručne a pravdivo: účel cesty, dĺžka pobytu, ubytovanie, financie. Povolenie je súhlas nastúpiť, o vstupe rozhoduje úradník; pri bežnej turistike je to formalita.", en: "The carrier checks your permit at check-in — without it you may be denied boarding. At the border answer briefly and truthfully: purpose, length of stay, accommodation, funds. A permit is clearance to board; the officer decides entry — for ordinary tourism it's a formality." } },
      { h: { sk: "Čo ak horí termín?", en: "What if time is short?" }, p: { sk: "Cestujete o tri dni? Stále sa to dá stihnúť: väčšina elektronických povolení prichádza do 72 hodín a naše expresné spracovanie posunie vašu žiadosť na začiatok radu — podáme ju do 24 hodín od doplnenia údajov. Rátajte však s tým, že rozhodnutie úradu urýchliť nevieme.", en: "Flying in three days? It's still doable: most electronic permits arrive within 72 hours and our express processing moves you to the front of our queue — filed within 24 hours of receiving your details. Bear in mind we can't speed up the authority's decision." } }
    ],
    faq: [
      { q: { sk: "Dá sa žiadať aj z letiska?", en: "Can I apply from the airport?" }, a: { sk: "Technicky áno, ale je to hazard — pri manuálnej kontrole let nestihnete. Vždy žiadajte aspoň pár dní vopred.", en: "Technically yes, but it's a gamble — a manual review means missing your flight. Always apply at least a few days ahead." } },
      { q: { sk: "Povolenie mám, letenku ešte nie. Vadí to?", en: "I have the permit but no ticket yet. Is that a problem?" }, a: { sk: "Nie. Povolenia sa viažu na pas, nie na konkrétny let — letenku môžete kúpiť aj po schválení.", en: "No. Permits are tied to your passport, not a specific flight — you can buy the ticket after approval." } }
    ]
  },
];


// Odhad času čítania z obsahu (slová / 180 wpm), min. 3 min.
export function estimateReadMins(post: BlogPost): number {
  let words = 0;
  const count = (t?: string) => { if (t) words += t.split(/\s+/).length; };
  for (const b of post.body) { count(b.h?.sk); count(b.p?.sk); for (const li of b.list ?? []) count(li.sk); }
  for (const f of post.faq ?? []) { count(f.q.sk); count(f.a.sk); }
  return Math.max(3, Math.round(words / 180));
}

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
