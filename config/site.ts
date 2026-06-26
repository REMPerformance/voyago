// Centrálne nastavenie značky a globálnych hodnôt.
// Zmena názvu značky, kontaktu či meny sa robí TU, na jednom mieste.

export const site = {
  brand: "Voyago", // pracovný názov — kľudne zmeň
  url: "https://voyago.sk", // ⚠️ DOPLŇ skutočnú doménu (používa sa pre SEO/sitemap)
  tagline: {
    sk: "Víza a cestovné povolenia vybavené za vás",
    en: "Visas & travel authorizations handled for you",
  },
  email: "info@voyago.example",
  phone: "+421 900 000 000",
  // ⚠️ DOPLŇ skutočné firemné údaje (povinné pre e-shop v SR)
  company: {
    legalName: "LP WEBDESIGN s. r. o.", // obchodné meno
    ico: "00 000 000",
    dic: "0000000000",
    icDph: "SK0000000000", // ak ste platca DPH; inak nechaj prázdne ""
    address: "Ulica 000, 000 00 Mesto, Slovensko",
    register: "Zapísaná v OR OS ..., oddiel Sro, vložka č. ...",
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
  locale: { sk: "sk-SK", en: "en-GB", cs: "cs-CZ", hu: "hu-HU", uk: "uk-UA" },
  // Stripe poplatok (orientačne, pre kalkuláciu marže v admin pohľade neskôr)
  paymentFeePct: 0.015,
  paymentFeeFixed: 0.25,
} as const;

// Právne vyhlásenie — sprostredkovateľ víz (nie štátny orgán) + transparentnosť ceny.
// Drž ho vo footeri kvôli dôvere aj pravidlám Google Ads.
export const disclaimer = {
  sk: "Voyago je súkromný sprostredkovateľ víz a cestovných povolení. Nie sme štátny orgán ani s ním nie sme prepojení. Žiadosť si môžete podať aj sami na oficiálnych portáloch, kde platíte len štátny poplatok. Naša cena zahŕňa štátny poplatok a poplatok za sprostredkovanie a kontrolu žiadosti.",
  en: "Voyago is a private visa and travel-authorization intermediary. We are not a government body and are not affiliated with one. You can also apply yourself on the official portals, paying only the government fee. Our price includes the government fee plus a fee for handling and checking your application.",
} as const;
