"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Jazyk (SK/EN). Drží aktuálny jazyk, prepína ho a poskytuje pomocníkov:
//   t(localized)  → vyberie .sk alebo .en z objektu { sk, en }
//   tr("nav.home") → vyberie text zo slovníka UI nižšie
// Texty produktov (názvy krajín atď.) žijú v config/products.ts, nie tu.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, Localized } from "@/config/products";

// Slovník UI textov. Pridať text = pridať kľúč s { sk, en }.
const UI: Record<string, Localized> = {
  "nav.destinations": { sk: "Destinácie", en: "Destinations" },
  "nav.wizard": { sk: "Aké vízum potrebujem?", en: "Which one do I need?" },
  "nav.how": { sk: "Ako to funguje", en: "How it works" },
  "nav.cart": { sk: "Košík", en: "Cart" },

  "cta.start": { sk: "Zistiť za 30 sekúnd", en: "Find out in 30 seconds" },
  "cta.browse": { sk: "Prezrieť destinácie", en: "Browse destinations" },
  "cta.apply": { sk: "Vyplniť žiadosť", en: "Start application" },
  "cta.soon": { sk: "Čoskoro", en: "Coming soon" },
  "cta.back": { sk: "Späť", en: "Back" },
  "cta.continue": { sk: "Pokračovať", en: "Continue" },

  "hero.eyebrow": { sk: "Cestovné povolenia bez stresu", en: "Travel permits without the stress" },
  "hero.title": {
    sk: "Víza vybavíme za vás. Vy už len cestujete.",
    en: "We handle the visa. You just travel.",
  },
  "hero.sub": {
    sk: "Vyberte si destináciu, zistite aké vízum potrebujete a vyplňte krátky dotazník. Kontrolu, podanie aj komunikáciu s úradmi vybavíme my — a pošleme vám potvrdenie o schválení.",
    en: "Pick a destination, find out which visa you need and fill in a short form. The checking, filing and dealing with authorities is on us — we send you the approval.",
  },
  "hero.quickLabel": { sk: "Kam cestujete?", en: "Where are you going?" },
  "hero.quickLead": {
    sk: "Neviete, čo na cestu potrebujete? Vyberte krajinu a zistite to ihneď.",
    en: "Not sure what you need? Pick a country and find out instantly.",
  },
  "hero.quickGo": { sk: "Zistiť ihneď", en: "Check now" },
  "hero.cta": { sk: "Aké víza potrebujem na moju cestu?", en: "Which visa do I need for my trip?" },

  "how.title": { sk: "Ako to funguje", en: "How it works" },
  "how.head": {
    sk: "Vízový proces je komplikovaný. My ho robíme jednoduchým.",
    en: "The visa process is complicated. We make it simple.",
  },
  "how.hardTitle": { sk: "Keď to riešite sami", en: "Doing it yourself" },
  "how.easyTitle": { sk: "S Voyago", en: "With Voyago" },
  "how.hard.1": {
    sk: "Zistiť, či vôbec potrebujete ESTA, ETA, e-Visa alebo klasické vízum",
    en: "Working out whether you need an ESTA, ETA, e-Visa or a full visa",
  },
  "how.hard.2": {
    sk: "Pravidlá sa líšia podľa občianstva, účelu aj dĺžky pobytu",
    en: "Rules differ by nationality, purpose and length of stay",
  },
  "how.hard.3": {
    sk: "Prísne normy na fotku, pas a podporné dokumenty",
    en: "Strict photo, passport and supporting-document standards",
  },
  "how.hard.4": {
    sk: "Formuláre po anglicky, plné úradníckych pojmov",
    en: "Forms in English, full of bureaucratic terms",
  },
  "how.hard.5": {
    sk: "Jediná chyba znamená zamietnutie a stratu poplatku",
    en: "A single mistake means rejection and a lost fee",
  },
  "how.hard.6": {
    sk: "Termíny, doplňujúce otázky úradov a sledovanie stavu",
    en: "Deadlines, follow-up questions and status tracking",
  },
  "how.1.t": { sk: "Posúdime oprávnenosť", en: "We assess eligibility" },
  "how.1.d": {
    sk: "Podľa občianstva, cieľa a účelu cesty určíme presný typ povolenia, ktorý potrebujete.",
    en: "From your nationality, destination and purpose we pin down the exact permit you need.",
  },
  "how.2.t": { sk: "Pripravíme a skontrolujeme dokumenty", en: "We prepare & check documents" },
  "how.2.d": {
    sk: "Skontrolujeme pas, fotku aj podklady podľa oficiálnych noriem, aby žiadosť neprešla zamietnutím.",
    en: "We check passport, photo and supporting files against official standards so the application isn't rejected.",
  },
  "how.3.t": { sk: "Podáme cez oficiálne kanály", en: "We file via official channels" },
  "how.3.d": {
    sk: "Vašu žiadosť podáme na oficiálnom štátnom portáli a uhradíme štátny poplatok.",
    en: "We submit your application on the official government portal and pay the government fee.",
  },
  "how.4.t": { sk: "Sledujeme stav a komunikujeme s úradmi", en: "We track status & handle queries" },
  "how.4.d": {
    sk: "Strážime priebeh a vybavíme prípadné doplňujúce otázky zo strany úradu.",
    en: "We monitor progress and deal with any follow-up questions from the authorities.",
  },
  "how.5.t": { sk: "Doručíme schválené povolenie", en: "We deliver the approved permit" },
  "how.5.d": {
    sk: "Hneď po schválení vám dokument pošleme na e-mail, pripravený na cestu.",
    en: "As soon as it's approved we email you the document, ready for travel.",
  },

  "dest.title": { sk: "Destinácie", en: "Destinations" },
  "dest.sub": {
    sk: "Vyberte krajinu, kam cestujete. Cena už zahŕňa štátny poplatok aj našu asistenciu.",
    en: "Pick the country you're travelling to. The price already includes the government fee and our assistance.",
  },
  "dest.from": { sk: "od", en: "from" },
  "dest.processing": { sk: "Spracovanie", en: "Processing" },
  "dest.validity": { sk: "Platnosť", en: "Validity" },
  "dest.stay": { sk: "Dĺžka pobytu", en: "Length of stay" },
  "facts.title": { sk: "Dobré vedieť", en: "Good to know" },
  "faq.title": { sk: "Časté otázky", en: "Frequently asked" },
  "faq.eligTitle": { sk: "Môžem žiadať?", en: "Am I eligible?" },
  "faq.eligText": {
    sk: "Cez krátky dotazník za 30 sekúnd zistíte, či pre vašu cestu potrebujete práve toto povolenie.",
    en: "A 30-second check tells you whether this is the right permit for your trip.",
  },
  "faq.eligCta": { sk: "Zistiť, či mám nárok", en: "Check my eligibility" },

  "wiz.title": { sk: "Aké vízum alebo povolenie potrebujete?", en: "Which visa or permit do you need?" },
  "wiz.sub": {
    sk: "Štyri otázky. Bez registrácie. Bez záväzku.",
    en: "Four questions. No sign-up. No commitment.",
  },
  "wiz.q1": { sk: "Akú máte štátnu príslušnosť?", en: "What is your nationality?" },
  "wiz.q2": { sk: "Kam cestujete?", en: "Where are you travelling?" },
  "wiz.q3": { sk: "Aký je účel cesty?", en: "What is the purpose of your trip?" },
  "wiz.q4": { sk: "Ako dlho tam budete?", en: "How long will you stay?" },
  "wiz.step": { sk: "Otázka", en: "Question" },
  "wiz.of": { sk: "z", en: "of" },
  "wiz.restart": { sk: "Začať odznova", en: "Start over" },

  "wiz.cit.eu": { sk: "Krajina EÚ / EHP / Švajčiarsko", en: "EU / EEA / Switzerland" },
  "wiz.cit.uk": { sk: "Veľká Británia", en: "United Kingdom" },
  "wiz.cit.us": { sk: "USA", en: "United States" },
  "wiz.cit.ca": { sk: "Kanada", en: "Canada" },
  "wiz.cit.au": { sk: "Austrália / Nový Zéland", en: "Australia / New Zealand" },
  "wiz.cit.other": { sk: "Iná krajina", en: "Another country" },

  "wiz.purpose.tourism": { sk: "Turistika / návšteva", en: "Tourism / visit" },
  "wiz.purpose.business": { sk: "Pracovná cesta", en: "Business trip" },
  "wiz.purpose.transit": { sk: "Tranzit", en: "Transit" },
  "wiz.purpose.work": { sk: "Práca / štúdium / pobyt", en: "Work / study / residence" },

  "wiz.dur.short": { sk: "Do 90 dní", en: "Up to 90 days" },
  "wiz.dur.long": { sk: "Viac ako 90 dní", en: "More than 90 days" },

  "wiz.res.needTitle": { sk: "Potrebujete toto povolenie", en: "You need this permit" },
  "wiz.res.freeTitle": { sk: "Nepotrebujete nič", en: "You need nothing" },
  "wiz.res.embassyTitle": { sk: "Toto cez nás nevybavíte", en: "We can't handle this one" },
  "wiz.res.soonTitle": { sk: "Pripravujeme", en: "Coming soon" },
  "wiz.res.cleared": { sk: "VYBAVÍME", en: "WE'LL HANDLE IT" },
  "wiz.res.free": { sk: "BEZ POVOLENIA", en: "NO PERMIT" },
  "wiz.res.referred": { sk: "NEVYBAVÍME", en: "NOT HANDLED" },

  "form.required": { sk: "povinné", en: "required" },
  "form.optional": { sk: "nepovinné", en: "optional" },
  "form.uploading": { sk: "Nahrávam…", en: "Uploading…" },
  "form.upload": { sk: "Nahrať súbor", en: "Upload file" },
  "form.chosen": { sk: "Vybraté:", en: "Selected:" },
  "form.errRequired": { sk: "Vyplňte toto pole.", en: "Please fill this in." },
  "form.addTraveler": { sk: "Pridať ďalšieho cestujúceho", en: "Add another traveller" },
  "form.addAndCart": { sk: "Pridať do košíka", en: "Add to cart" },
  "form.traveler": { sk: "Cestujúci", en: "Traveller" },

  "cart.title": { sk: "Košík", en: "Cart" },
  "cart.empty": { sk: "Košík je zatiaľ prázdny.", en: "Your cart is empty." },
  "cart.emptyCta": { sk: "Vybrať destináciu", en: "Pick a destination" },
  "cart.remove": { sk: "Odstrániť", en: "Remove" },
  "cart.total": { sk: "Spolu", en: "Total" },
  "cart.checkout": { sk: "Prejsť k platbe", en: "Go to checkout" },
  "cart.govIncluded": { sk: "vrátane štátneho poplatku", en: "government fee included" },

  "checkout.title": { sk: "Zhrnutie a platba", en: "Summary & payment" },
  "checkout.summary": { sk: "Vaša objednávka", en: "Your order" },
  "checkout.pay": { sk: "Zaplatiť bezpečne", en: "Pay securely" },
  "checkout.demoNote": {
    sk: "Toto je ukážkový checkout. Po napojení Stripe sem doplníme reálnu platobnú bránu (karta, Apple Pay, Google Pay).",
    en: "This is a demo checkout. Once Stripe is connected, the real payment gateway goes here (card, Apple Pay, Google Pay).",
  },
  "checkout.done": { sk: "Hotovo — ukážka", en: "Done — demo" },
  "checkout.thanks": {
    sk: "Ďakujeme! V ostrej verzii tu Stripe spracuje platbu a objednávka padne do nášho admin panelu.",
    en: "Thank you! In production Stripe processes the payment here and the order lands in our admin panel.",
  },

  "footer.independent": { sk: "Sprostredkovateľ víz", en: "Visa intermediary" },
  "footer.rights": { sk: "Všetky práva vyhradené.", en: "All rights reserved." },
  "footer.broker": {
    sk: "Voyago je súkromný sprostredkovateľ víz a cestovných povolení. Nie sme štátny orgán.",
    en: "Voyago is a private visa and travel-authorization intermediary. We are not a government body.",
  },

  "trust.handling": { sk: "Vybavujeme ESTA · ETA · e-Visa", en: "We handle ESTA · ETA · e-Visa" },
  "trust.official": { sk: "Podávame na oficiálnych portáloch", en: "Filed on official portals" },
  "hero.chip.official": { sk: "Podávame oficiálne", en: "Official submission" },
  "hero.chip.checked": { sk: "Skontrolované odborníkom", en: "Expert-checked" },

  "gc.eyebrow": { sk: "USA · Diversity Visa Lottery", en: "USA · Diversity Visa Lottery" },
  "gc.title": { sk: "Americká zelená karta", en: "US Green Card" },
  "gc.sub": {
    sk: "Šanca na trvalý pobyt v USA cez oficiálnu lotériu Diversity Visa. Posúdime oprávnenosť, pripravíme fotku presne podľa noriem a oficiálnu prihlášku podáme za vás.",
    en: "A shot at US permanent residency through the official Diversity Visa lottery. We check eligibility, prepare a fully compliant photo and file the official entry for you.",
  },
  "gc.btn": { sk: "Americká zelená karta", en: "US Green Card" },
  "gc.soon": { sk: "Prihlášky otvárame čoskoro", en: "Applications opening soon" },
  "gc.note": {
    sk: "Vstup do lotérie je na oficiálnom portáli zdarma. Voyago si účtuje poplatok za prípravu a kontrolu prihlášky.",
    en: "Entering the lottery is free on the official portal. Voyago charges a fee for preparing and checking your entry.",
  },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (l: Localized) => string;
  tr: (key: string) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sk");

  useEffect(() => {
    const saved = window.localStorage.getItem("voyago.lang");
    if (saved === "sk" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("voyago.lang", l);
    document.documentElement.lang = l;
  };

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (l: Localized) => l[lang],
      tr: (key: string) => UI[key]?.[lang] ?? key,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
