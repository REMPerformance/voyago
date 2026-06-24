// Centrálne nastavenie značky a globálnych hodnôt.
// Zmena názvu značky, kontaktu či meny sa robí TU, na jednom mieste.

export const site = {
  brand: "Voyago", 
  url: "https://voyago.sk", 
  tagline: {
    sk: "Víza a cestovné povolenia vybavené za vás",
    en: "Visas & travel authorizations handled for you",
  },
  email: "info@voyago.sk",
  phone: "+421 949 253 872",
  
  company: {
    legalName: "Lukáš Tonkovič – REM Performance", 
    dic: "1128793787",
    icDph: "SK1128793787", 
    address: "Karpatské Námestie 7770/10A, 83106 Bratislava, Slovensko",
    register: "Zapísaná v OR OS Piešťany, vložka č. 230-24974",
  },
  // Odkazy na sociálne siete (prázdne = skryté)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  // Mena a formátovanie
  currency: "EUR",
  locale: { sk: "sk-SK", en: "en-GB" },
  // Stripe poplatok (orientačne, pre kalkuláciu marže v admin pohľade neskôr)
  paymentFeePct: 0.015,
  paymentFeeFixed: 0.25,
} as const;

// Právne vyhlásenie — sprostredkovateľ víz (nie štátny orgán) + transparentnosť ceny.
// Drž ho vo footeri kvôli dôvere aj pravidlám Google Ads.
export const disclaimer = {
  sk: "Voyago je súkromný sprostredkovateľ víz a cestovných povolení. Nie sme štátny orgán ani s ním nie sme prepojení.  Naša cena zahŕňa štátny poplatok a poplatok za sprostredkovanie a kontrolu žiadosti.",
  en: "Voyago is a private visa and travel-authorization intermediary. We are not a government body and are not affiliated with one. Our price includes the government fee plus a fee for handling and checking your application.",
} as const;
