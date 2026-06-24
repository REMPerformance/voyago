// ─────────────────────────────────────────────────────────────────────────────
// SPRIEVODCA — rozhodovacia logika "aké povolenie potrebujem".
//
// ⚠️ DÔLEŽITÉ: Toto sú zjednodušené MVP pravidlá pre prvé destinácie.
// Reálne pravidlá (matica občianstvo × krajina) sa menia a ZDROJ PRAVDY sú
// oficiálne štátne weby (cestovný priemysel používa databázu IATA Timatic).
// Pri rozširovaní toto nahradíme dátovým configom / API, nie ďalšími if-mi.
// ─────────────────────────────────────────────────────────────────────────────

import type { Localized } from "@/config/products";

export type Citizenship = "eu" | "uk" | "us" | "ca" | "au" | "other";
export type Destination =
  | "US" | "GB" | "CA" | "AU" | "NZ" | "KR" | "EU"
  | "IN" | "EG" | "VN" | "LK" | "TR" | "ID" | "TZ";
export type Purpose = "tourism" | "business" | "transit" | "work";
export type Duration = "short" | "long";

export type EligKind = "product" | "visa-free" | "embassy" | "soon";

export interface EligResult {
  kind: EligKind;
  slug?: string; // ak kind === "product" | "soon"
  note: Localized;
}

// Možnosti pre jednotlivé otázky (sprievodca ich vykreslí ako dlaždice).
export const CITIZENSHIPS: { value: Citizenship; key: string }[] = [
  { value: "eu", key: "wiz.cit.eu" },
  { value: "uk", key: "wiz.cit.uk" },
  { value: "us", key: "wiz.cit.us" },
  { value: "ca", key: "wiz.cit.ca" },
  { value: "au", key: "wiz.cit.au" },
  { value: "other", key: "wiz.cit.other" },
];

export const DESTINATIONS: { value: Destination; flag: string; label: Localized }[] = [
  { value: "US", flag: "🇺🇸", label: { sk: "Spojené štáty", en: "United States" } },
  { value: "GB", flag: "🇬🇧", label: { sk: "Veľká Británia", en: "United Kingdom" } },
  { value: "CA", flag: "🇨🇦", label: { sk: "Kanada", en: "Canada" } },
  { value: "AU", flag: "🇦🇺", label: { sk: "Austrália", en: "Australia" } },
  { value: "NZ", flag: "🇳🇿", label: { sk: "Nový Zéland", en: "New Zealand" } },
  { value: "KR", flag: "🇰🇷", label: { sk: "Južná Kórea", en: "South Korea" } },
  { value: "EU", flag: "🇪🇺", label: { sk: "Európska únia", en: "European Union" } },
  { value: "IN", flag: "🇮🇳", label: { sk: "India", en: "India" } },
  { value: "EG", flag: "🇪🇬", label: { sk: "Egypt", en: "Egypt" } },
  { value: "VN", flag: "🇻🇳", label: { sk: "Vietnam", en: "Vietnam" } },
  { value: "LK", flag: "🇱🇰", label: { sk: "Srí Lanka", en: "Sri Lanka" } },
  { value: "TR", flag: "🇹🇷", label: { sk: "Turecko", en: "Türkiye" } },
  { value: "ID", flag: "🇮🇩", label: { sk: "Indonézia", en: "Indonesia" } },
  { value: "TZ", flag: "🇹🇿", label: { sk: "Tanzánia", en: "Tanzania" } },
];

export const PURPOSES: { value: Purpose; key: string }[] = [
  { value: "tourism", key: "wiz.purpose.tourism" },
  { value: "business", key: "wiz.purpose.business" },
  { value: "transit", key: "wiz.purpose.transit" },
  { value: "work", key: "wiz.purpose.work" },
];

export const DURATIONS: { value: Duration; key: string }[] = [
  { value: "short", key: "wiz.dur.short" },
  { value: "long", key: "wiz.dur.long" },
];

// Časté hlášky
const VISA_FREE = (dest: string): Localized => ({
  sk: `Pre váš pas do destinácie ${dest} pravdepodobne nepotrebujete žiadne povolenie vopred.`,
  en: `With your passport you likely don't need any advance permit for ${dest}.`,
});

const EMBASSY: Localized = {
  sk: "Toto je klasické vízum cez ambasádu (pohovor, biometria, prípadne dlhodobý pobyt). Tento typ cez nás nevybavíte — obráťte sa priamo na zastupiteľstvo.",
  en: "This is a standard embassy visa (interview, biometrics or long-term stay). We don't handle this type — please contact the consulate directly.",
};

const LONG_STAY: Localized = {
  sk: "Cestovné povolenia (ESTA, ETA, e-Visa) platia len pre krátke pobyty. Na dlhší pobyt či prácu treba klasické vízum cez ambasádu, ktoré cez nás nevybavíte.",
  en: "Travel authorizations (ESTA, ETA, e-Visa) only cover short stays. Long stays or work require a standard embassy visa, which we don't handle.",
};

const SOON_ETIAS: Localized = {
  sk: "Pre vstup do EÚ budete potrebovať ETIAS. Systém EÚ spúšťa v 4. štvrťroku 2026 — pripravujeme ho, ozveme sa hneď ako pôjde naživo.",
  en: "You'll need ETIAS to enter the EU. The system launches in Q4 2026 — we're getting ready and will go live the moment it does.",
};

/**
 * Vráti odporúčanie pre danú kombináciu. Komentáre vysvetľujú zjednodušenia.
 */
export function determine(
  citizenship: Citizenship,
  destination: Destination,
  purpose: Purpose,
  duration: Duration,
): EligResult {
  // Práca/štúdium/pobyt alebo dlhý pobyt → vždy ambasáda (mimo náš rozsah).
  if (purpose === "work" || duration === "long") {
    return { kind: "embassy", note: LONG_STAY };
  }

  switch (destination) {
    case "US":
      if (citizenship === "us") return { kind: "visa-free", note: VISA_FREE("USA") };
      if (citizenship === "ca") return { kind: "visa-free", note: VISA_FREE("USA") };
      // EÚ, UK, Austrália/NZ = program bezvízového styku → ESTA
      if (["eu", "uk", "au"].includes(citizenship))
        return { kind: "product", slug: "us-esta", note: VISA_FREE("USA") };
      return { kind: "embassy", note: EMBASSY };

    case "GB":
      if (citizenship === "uk") return { kind: "visa-free", note: VISA_FREE("UK") };
      // EÚ, USA, Kanada, Austrália/NZ → UK ETA (povinné už dnes)
      if (["eu", "us", "ca", "au"].includes(citizenship))
        return { kind: "product", slug: "uk-eta", note: VISA_FREE("UK") };
      return { kind: "embassy", note: EMBASSY };

    case "CA":
      if (citizenship === "ca") return { kind: "visa-free", note: VISA_FREE("Kanada") };
      if (citizenship === "us") return { kind: "visa-free", note: VISA_FREE("Kanada") };
      if (["eu", "uk", "au"].includes(citizenship))
        return { kind: "product", slug: "ca-eta", note: VISA_FREE("Kanada") };
      return { kind: "embassy", note: EMBASSY };

    case "AU":
      if (citizenship === "au") return { kind: "visa-free", note: VISA_FREE("Austrália") };
      if (["eu", "uk", "us", "ca"].includes(citizenship))
        return { kind: "product", slug: "au-eta", note: VISA_FREE("Austrália") };
      return { kind: "embassy", note: EMBASSY };

    case "NZ":
      if (citizenship === "au") return { kind: "visa-free", note: VISA_FREE("Nový Zéland") };
      if (["eu", "uk", "us", "ca"].includes(citizenship))
        return { kind: "product", slug: "nz-eta", note: VISA_FREE("Nový Zéland") };
      return { kind: "embassy", note: EMBASSY };

    case "KR":
      // Pozn.: Kórea má dočasné výnimky z K-ETA pre niektoré krajiny — over v ostrej verzii.
      if (["eu", "uk", "us", "ca", "au"].includes(citizenship))
        return { kind: "product", slug: "kr-keta", note: VISA_FREE("Kórea") };
      return { kind: "embassy", note: EMBASSY };

    case "EU":
      if (citizenship === "eu") return { kind: "visa-free", note: VISA_FREE("EÚ") };
      // Mimoeurópski bezvízoví cestovatelia → ETIAS (zatiaľ "čoskoro")
      if (["uk", "us", "ca", "au"].includes(citizenship))
        return { kind: "soon", slug: "eu-etias", note: SOON_ETIAS };
      return { kind: "embassy", note: EMBASSY };

    case "TR":
      // Väčšina občanov EÚ a UK cestuje do Turecka bezvízovo.
      if (["eu", "uk"].includes(citizenship)) return { kind: "visa-free", note: VISA_FREE("Turecko") };
      return { kind: "product", slug: "tr-evisa", note: VISA_FREE("Turecko") };

    // e-Visa destinácie — dostupné pre väčšinu pasov
    case "IN":
      return { kind: "product", slug: "in-evisa", note: VISA_FREE("India") };
    case "EG":
      return { kind: "product", slug: "eg-evisa", note: VISA_FREE("Egypt") };
    case "VN":
      return { kind: "product", slug: "vn-evisa", note: VISA_FREE("Vietnam") };
    case "LK":
      return { kind: "product", slug: "lk-eta", note: VISA_FREE("Srí Lanka") };
    case "ID":
      return { kind: "product", slug: "id-evoa", note: VISA_FREE("Indonézia") };
    case "TZ":
      return { kind: "product", slug: "tz-evisa", note: VISA_FREE("Tanzánia") };

    default:
      return { kind: "embassy", note: EMBASSY };
  }
}
