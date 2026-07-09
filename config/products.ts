// ─────────────────────────────────────────────────────────────────────────────
// CORE ENGINE: katalóg produktov + definícia formulárových polí.
//
// Toto je srdce celej aplikácie. Formuláre sa NEPROGRAMUJÚ pre každú krajinu
// zvlášť — vykresľujú sa z týchto configov (komponent DynamicForm).
// PRIDAŤ NOVÚ KRAJINU = pridať jeden objekt do poľa PRODUCTS nižšie.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = "sk" | "en" | "cs" | "uk" | "de";
export type Localized = { sk: string; en: string; cs?: string; uk?: string; de?: string };

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "file"
  | "checkbox"
  | "toggle"
  | "phoneIntl";

export interface FieldOption {
  value: string;
  label: Localized;
}

export interface Field {
  name: string;
  label: Localized;
  type: FieldType;
  required?: boolean;
  placeholder?: Localized;
  help?: Localized;
  showIf?: { field: string; value: string }; // pole sa zobrazí iba ak iné pole má danú hodnotu
  flagYes?: { level: "block" | "warn"; text: Localized }; // upozornenie pri odpovedi "áno" (block = nedá sa pokračovať)
  dateAfter?: { field: string; maxDays?: number }; // dátum musí byť po inom dátumovom poli (a voliteľne najviac N dní po ňom)
  options?: FieldOption[]; // pre select
  accept?: string; // pre file
  maxFiles?: number; // pre file — max počet súborov
  // Návod pri nahrávaní fotky (napr. pas / selfie): požiadavky + dobré/zlé príklady
  guidance?: {
    intro?: Localized;
    reqs: Localized[];
    good?: Localized;
    bad?: Localized;
    goodImages?: string[]; // cesty na správne príklady
    badImages?: string[]; // cesty na nesprávne príklady
    goodImageCaptions?: Localized[]; // popisky k správnym príkladom (podľa poradia)
    badImageCaptions?: Localized[]; // popisky k nesprávnym príkladom (podľa poradia)
  };
}

export type ProductType = "eta" | "evisa" | "esta" | "etias";

export interface Product {
  slug: string;
  type: ProductType;
  // Destinácia
  country: string; // ISO-ish kód, používa sa aj v sprievodcovi
  flag: string;
  name: Localized; // napr. "USA – ESTA"
  destination: Localized; // napr. "Spojené štáty"
  summary: Localized;
  // Cena = štátny poplatok + náš poplatok za asistenciu (obe v EUR)
  govFee: number;
  serviceFee: number;
  processingDays: Localized; // očakávané spracovanie
  validity: Localized; // platnosť povolenia
  stay?: Localized; // max dĺžka pobytu
  facts?: Localized[]; // krátke odrážky (napr. "len elektronická")
  faq?: { q: Localized; a: Localized }[];
  available: boolean; // false = "čoskoro" (napr. ETIAS)
  authority?: Localized; // úrad, ktorému sa údaje poskytujú (do textu súhlasu)
  passportValidityMonths?: number; // koľko mesiacov musí pas platiť po príchode/odchode (0 = aspoň počas pobytu)
  // Polia formulára pre tento produkt
  fields: Field[];
}

// ── Znovupoužiteľné skupiny polí ─────────────────────────────────────────────
// Skladáme z nich konkrétne formuláre, nech sa neopakujeme.

const personalFields: Field[] = [
  {
    name: "givenNames",
    label: { sk: "Krstné meno (meno/á)", en: "Given name(s)" },
    type: "text",
    required: true,
    placeholder: { sk: "presne ako v pase", en: "exactly as in passport" },
  },
  {
    name: "surname",
    label: { sk: "Priezvisko", en: "Surname" },
    type: "text",
    required: true,
    placeholder: { sk: "presne ako v pase", en: "exactly as in passport" },
  },
  {
    name: "dob",
    label: { sk: "Dátum narodenia", en: "Date of birth" },
    type: "date",
    required: true,
  },
  {
    name: "nationality",
    label: { sk: "Štátna príslušnosť", en: "Nationality" },
    type: "text",
    required: true,
    placeholder: { sk: "napr. Slovensko", en: "e.g. Slovakia" },
  },
];

const passportFields: Field[] = [
  {
    name: "passportNumber",
    label: { sk: "Číslo pasu", en: "Passport number" },
    type: "text",
    required: true,
  },
  {
    name: "passportExpiry",
    label: { sk: "Platnosť pasu do", en: "Passport expiry date" },
    type: "date",
    required: true,
    help: {
      sk: "Pas musí byť platný počas celej cesty.",
      en: "Passport must be valid for the whole trip.",
    },
  },
];

const contactFields: Field[] = [
  {
    name: "email",
    label: { sk: "E-mail", en: "Email" },
    type: "email",
    required: true,
    help: {
      sk: "Sem doručíme schválený dokument.",
      en: "We deliver the approved document here.",
    },
  },
  {
    name: "phone",
    label: { sk: "Telefón", en: "Phone" },
    type: "tel",
    required: false,
  },
];

const passportScan: Field = {
  name: "passportScan",
  label: { sk: "Sken pasu (strana s fotkou)", en: "Passport scan (photo page)" },
  type: "file",
  required: true,
  accept: "image/*,application/pdf",
  help: {
    sk: "Čitateľná fotka alebo sken. Údaje GDPR-bezpečne zmažeme po vybavení.",
    en: "Clear photo or scan. We delete data GDPR-safely after processing.",
  },
};

const portraitScan: Field = {
  name: "portrait",
  label: { sk: "Pasová fotografia", en: "Passport-style photo" },
  type: "file",
  required: true,
  accept: "image/*",
};

const consent: Field = {
  name: "consent",
  label: {
    sk: "Dávam súhlas so spracovaním mojich osobných údajov za účelom žiadosti o vízum / cestovné povolenie.",
    en: "I consent to the processing of my personal data for the purpose of applying for a visa / travel authorization.",
  },
  type: "checkbox",
  required: true,
};

// Štandardný formulár pre cestovnú autorizáciu (ETA/ESTA): bez fotky.
const authForm = (extra: Field[] = []): Field[] => [
  ...personalFields,
  ...passportFields,
  ...extra,
  ...contactFields,
  passportScan,
  truthful,
  consent,
];

// Formulár pre e-Visa: navyše fotka.
const evisaForm = (extra: Field[] = []): Field[] => [
  ...personalFields,
  ...passportFields,
  ...extra,
  ...contactFields,
  passportScan,
  portraitScan,
  truthful,
  consent,
];

const purposeField: Field = {
  name: "purpose",
  label: { sk: "Účel cesty", en: "Purpose of travel" },
  type: "select",
  required: true,
  options: [
    { value: "tourism", label: { sk: "Turistika", en: "Tourism" } },
    { value: "business", label: { sk: "Pracovná cesta", en: "Business" } },
    { value: "transit", label: { sk: "Tranzit", en: "Transit" } },
  ],
};

const arrivalField: Field = {
  name: "arrivalDate",
  label: { sk: "Plánovaný príchod", en: "Planned arrival date" },
  type: "date",
  required: true,
};

// ── Komplexné formuláre podľa skutočných žiadostí jednotlivých krajín ────────
type Opt = { req?: boolean; ph?: [string, string]; help?: [string, string]; showIf?: { field: string; value: string }; flag?: { level: "block" | "warn"; sk: string; en: string } };
const T = (name: string, sk: string, en: string, o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "text",
  required: o.req !== false,
  ...(o.ph ? { placeholder: { sk: o.ph[0], en: o.ph[1] } } : {}),
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
  ...(o.showIf ? { showIf: o.showIf } : {}),
});
const D = (name: string, sk: string, en: string, o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "date",
  required: true,
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
});
const S = (name: string, sk: string, en: string, options: FieldOption[], o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "select",
  required: true,
  options,
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
});
const YN = (name: string, sk: string, en: string, o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "toggle",
  required: o.req !== false,
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
  ...(o.showIf ? { showIf: o.showIf } : {}),
  ...(o.flag ? { flagYes: { level: o.flag.level, text: { sk: o.flag.sk, en: o.flag.en } } } : {}),
});
const CB = (name: string, sk: string, en: string): Field => ({ name, label: { sk, en }, type: "checkbox", required: true });
const TOG = (name: string, sk: string, en: string, o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "toggle",
  required: o.req === true,
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
  ...(o.showIf ? { showIf: o.showIf } : {}),
  ...(o.flag ? { flagYes: { level: o.flag.level, text: { sk: o.flag.sk, en: o.flag.en } } } : {}),
});
const PH = (name: string, sk: string, en: string, o: Opt = {}): Field => ({
  name,
  label: { sk, en },
  type: "phoneIntl",
  required: o.req !== false,
  ...(o.help ? { help: { sk: o.help[0], en: o.help[1] } } : {}),
});
const truthful: Field = {
  name: "truthful",
  label: {
    sk: "Čestne vyhlasujem, že všetky údaje uvedené v tejto žiadosti sú pravdivé, presné a úplné a že som nezamlčal/a žiadnu skutočnosť podstatnú pre jej posúdenie. Beriem na vedomie, že uvedenie nepravdivých alebo zavádzajúcich údajov môže viesť k zamietnutiu žiadosti, zrušeniu vydaného povolenia a odopretiu vstupu.",
    en: "I solemnly declare that all information provided in this application is true, accurate and complete, and that I have not withheld any fact material to its assessment. I understand that providing false or misleading information may lead to refusal of the application, cancellation of any authorization granted and denial of entry.",
  },
  type: "checkbox",
  required: true,
};

// UK – rozšírené, právne formulované vyhlásenia
const truthfulUk: Field = {
  name: "truthful",
  label: {
    sk: "Čestne vyhlasujem, že všetky údaje uvedené v tejto žiadosti sú pravdivé, presné a úplné a že som vedome nezamlčal/a žiadnu skutočnosť podstatnú pre jej posúdenie. Beriem na vedomie, že uvedenie nepravdivých, neúplných alebo zavádzajúcich údajov môže viesť k zamietnutiu žiadosti, zrušeniu už vydaného cestovného povolenia, odmietnutiu vstupu, ako aj k zodpovednosti podľa platných právnych predpisov.",
    en: "I solemnly declare that all information provided in this application is true, accurate and complete, and that I have not knowingly withheld any fact material to its assessment. I understand that providing false, incomplete or misleading information may result in the refusal of this application, the cancellation of any travel authorization already granted, refusal of entry, and liability under applicable law.",
  },
  type: "checkbox",
  required: true,
};

const consentUk: Field = {
  name: "consent",
  label: {
    sk: "Súhlasím so spracúvaním svojich osobných údajov vrátane údajov z cestovného dokladu a podobizne spoločnosťou Voyago a príslušnými úradmi, a to výlučne na účely podania, overenia a vybavenia tejto žiadosti o cestovné povolenie, v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR). Beriem na vedomie, že poskytnutie údajov je dobrovoľné, no nevyhnutné na spracovanie žiadosti, a že mám právo na prístup k svojim údajom, ich opravu, vymazanie a obmedzenie spracúvania.",
    en: "I consent to the processing of my personal data, including passport and photograph data, by Voyago and the competent authorities solely for the purposes of submitting, verifying and handling this travel authorization application, in accordance with Regulation (EU) 2016/679 (GDPR). I understand that providing the data is voluntary but necessary to process the application, and that I have the right to access, rectify, erase and restrict the processing of my data.",
  },
  type: "checkbox",
  required: true,
};

// USA / ESTA – rozšírené vyhlásenia vrátane doložky o uvážení CBP
const truthfulUs: Field = {
  name: "truthful",
  label: {
    sk: "Čestne vyhlasujem, že všetky údaje v tejto žiadosti sú pravdivé, presné a úplné. Beriem na vedomie, že o prípustnosti vstupu rozhoduje výlučne U.S. Customs and Border Protection (CBP) na hraničnom priechode, že schválené ESTA nezaručuje vstup do USA a že sa vzdávam práva na preskúmanie alebo odvolanie proti rozhodnutiu úradníka CBP o prípustnosti, s výnimkou žiadosti o azyl. Uvedenie nepravdivých alebo zavádzajúcich údajov môže viesť k zamietnutiu ESTA, odopretiu vstupu a k trvalej nespôsobilosti na vstup do USA.",
    en: "I solemnly declare that all information in this application is true, accurate and complete. I understand that admissibility is determined solely by U.S. Customs and Border Protection (CBP) at the port of entry, that an approved ESTA does not guarantee entry to the United States, and that I waive any right to review or appeal a CBP officer's determination of admissibility, except for a claim of asylum. Providing false or misleading information may lead to refusal of the ESTA, denial of entry and permanent ineligibility to enter the United States.",
  },
  type: "checkbox",
  required: true,
};

const consentUs: Field = {
  name: "consent",
  label: {
    sk: "Súhlasím so spracúvaním svojich osobných údajov vrátane údajov z cestovného dokladu spoločnosťou Voyago a s ich poskytnutím U.S. Department of Homeland Security / CBP, a to výlučne na účely podania a vybavenia žiadosti o cestovnú autorizáciu ESTA, v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR). Beriem na vedomie, že poskytnutie údajov je dobrovoľné, no nevyhnutné na spracovanie žiadosti, a že mám právo na prístup k svojim údajom, ich opravu a vymazanie.",
    en: "I consent to the processing of my personal data, including passport data, by Voyago and its transfer to the U.S. Department of Homeland Security / CBP solely for the purposes of submitting and handling the ESTA travel authorization application, in accordance with Regulation (EU) 2016/679 (GDPR). I understand that providing the data is voluntary but necessary to process the application, and that I have the right to access, rectify and erase my data.",
  },
  type: "checkbox",
  required: true,
};

// Per-krajinu text súhlasu (GDPR) — dosadí konkrétny úrad podľa kódu krajiny.
const AUTHORITY: Record<string, Localized> = {
  US: { sk: "U.S. Department of Homeland Security / CBP", en: "the U.S. Department of Homeland Security / CBP" },
  GB: { sk: "britskému Home Office (UK Visas and Immigration)", en: "the UK Home Office (UK Visas and Immigration)" },
  CA: { sk: "kanadskému úradu IRCC", en: "the Canadian IRCC" },
  AU: { sk: "austrálskemu Department of Home Affairs", en: "the Australian Department of Home Affairs" },
  NZ: { sk: "úradu Immigration New Zealand", en: "Immigration New Zealand" },
  KR: { sk: "kórejskému imigračnému úradu", en: "the Korea Immigration Service" },
  IN: { sk: "indickému Bureau of Immigration", en: "the Indian Bureau of Immigration" },
  EG: { sk: "egyptským imigračným úradom", en: "the Egyptian immigration authorities" },
  VN: { sk: "vietnamskému imigračnému úradu", en: "the Vietnam Immigration Department" },
  LK: { sk: "srílanským imigračným úradom", en: "the Sri Lankan immigration authorities" },
  TR: { sk: "tureckým úradom", en: "the Turkish authorities" },
  ID: { sk: "indonézskym imigračným úradom", en: "the Indonesian immigration authorities" },
  TZ: { sk: "tanzánskym imigračným úradom", en: "the Tanzanian immigration authorities" },
  EU: { sk: "systému ETIAS (eu-LISA)", en: "the ETIAS system (eu-LISA)" },
  CN: { sk: "čínskym imigračným úradom", en: "the Chinese immigration authorities" },
};
export function consentLabelFor(country: string): Localized {
  const a = AUTHORITY[country];
  const sk = a?.sk ?? "príslušným imigračným úradom cieľovej krajiny";
  const en = a?.en ?? "the destination country's immigration authorities";
  return {
    sk: `Súhlasím so spracúvaním svojich osobných údajov vrátane údajov z cestovného dokladu spoločnosťou Voyago a s ich poskytnutím ${sk}, a to výlučne na účely podania a vybavenia tejto žiadosti, v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR). Beriem na vedomie, že poskytnutie údajov je dobrovoľné, no nevyhnutné na spracovanie žiadosti, a že mám právo na prístup k svojim údajom, ich opravu a vymazanie.`,
    en: `I consent to the processing of my personal data, including passport data, by Voyago and its transfer to ${en}, solely for the purposes of submitting and handling this application, in accordance with Regulation (EU) 2016/679 (GDPR). I understand that providing the data is voluntary but necessary to process the application, and that I have the right to access, rectify and erase my data.`,
  };
}

const sexField = S("sex", "Pohlavie", "Sex", [
  { value: "M", label: { sk: "Muž", en: "Male" } },
  { value: "F", label: { sk: "Žena", en: "Female" } },
  { value: "X", label: { sk: "Iné / neuvedené", en: "Other / unspecified" } },
]);
const maritalField = S("marital", "Rodinný stav", "Marital status", [
  { value: "single", label: { sk: "Slobodný/á", en: "Single" } },
  { value: "married", label: { sk: "Ženatý / vydatá", en: "Married" } },
  { value: "divorced", label: { sk: "Rozvedený/á", en: "Divorced" } },
  { value: "widowed", label: { sk: "Vdovec / vdova", en: "Widowed" } },
]);
const entryType = S("entryType", "Počet vstupov", "Number of entries", [
  { value: "single", label: { sk: "Jednorazový vstup", en: "Single entry" } },
  { value: "multi", label: { sk: "Viacnásobný vstup", en: "Multiple entry" } },
]);
const employmentStatus = S("employmentStatus", "Pracovný status", "Employment status", [
  { value: "employed", label: { sk: "Zamestnaný/á", en: "Employed" } },
  { value: "self", label: { sk: "SZČO / podnikateľ", en: "Self-employed" } },
  { value: "student", label: { sk: "Študent/ka", en: "Student" } },
  { value: "retired", label: { sk: "Dôchodca", en: "Retired" } },
  { value: "unemployed", label: { sk: "Nezamestnaný/á", en: "Unemployed" } },
]);

const identity: Field[] = [
  personalFields[0],
  personalFields[1],
  T("otherNames", "Iné mená / prezývky (ak boli)", "Other names / aliases (if any)", { req: false }),
  sexField,
  personalFields[2],
  T("placeOfBirth", "Mesto narodenia", "Place of birth"),
  T("countryOfBirth", "Krajina narodenia", "Country of birth"),
  personalFields[3],
  T("otherNationality", "Iná štátna príslušnosť (ak existuje)", "Other nationality (if any)", { req: false }),
];
const passportFull: Field[] = [
  T("passportNumber", "Číslo pasu", "Passport number"),
  T("passportIssueCountry", "Krajina vydania pasu", "Passport issuing country"),
  D("passportIssue", "Dátum vydania pasu", "Passport issue date"),
  D("passportExpiry", "Platnosť pasu do", "Passport expiry date", {
    help: ["Pas musí byť platný počas celej cesty.", "Passport must be valid for the whole trip."],
  }),
  T("nationalId", "Národné identifikačné číslo (ak máte)", "National ID number (if any)", { req: false }),
];
const contactFull: Field[] = [
  { name: "email", label: { sk: "E-mail", en: "Email" }, type: "email", required: true, help: { sk: "Sem doručíme schválený dokument.", en: "We deliver the approved document here." } },
  PH("phone", "Telefón", "Phone"),
  T("homeAddress", "Ulica", "Street"),
  T("homeHouseNo", "Číslo domu", "House number"),
  T("homeCity", "Mesto", "City"),
  T("homePostcode", "PSČ", "Postcode"),
  T("homeCountry", "Krajina", "Country"),
];
const employment: Field[] = [
  employmentStatus,
  T("occupation", "Povolanie / pozícia", "Occupation / job title", { req: false }),
  T("employerName", "Zamestnávateľ / škola", "Employer / school", { req: false }),
  T("employerAddress", "Adresa zamestnávateľa", "Employer address", { req: false }),
];
const parents: Field[] = [
  T("fatherGiven", "Otec – meno", "Father – given name", { req: false }),
  T("fatherSurname", "Otec – priezvisko", "Father – surname", { req: false }),
  T("motherGiven", "Matka – meno", "Mother – given name", { req: false }),
  T("motherSurname", "Matka – priezvisko", "Mother – surname", { req: false }),
];
const addrDest = T("destAddress", "Adresa pobytu v cieli (hotel/ubytovanie)", "Address at destination (hotel/accommodation)", { req: false });

// USA – ESTA
const usIdentity: Field[] = [
  personalFields[0], // givenNames
  personalFields[1], // surname
  T("otherNames", "Iné mená / prezývky (ak boli)", "Other names / aliases (if any)", { req: false }),
  sexField,
  personalFields[2], // dob
  T("placeOfBirth", "Mesto narodenia", "Place of birth"),
  T("countryOfBirth", "Krajina narodenia", "Country of birth"),
  personalFields[3], // nationality
];

const usCitizenship: Field[] = [
  TOG("usDualRestricted", "Ste občanom alebo štátnym príslušníkom Iránu, Iraku, KĽDR, Sudánu alebo Sýrie?", "Are you a citizen or national of Iran, Iraq, North Korea, Sudan or Syria?", {
    req: true,
    flag: { level: "block", sk: "S občianstvom týchto krajín nie ste oprávnený/á cestovať na ESTA. Potrebujete vízum (B1/B2) cez veľvyslanectvo USA — radi vám s ním pomôžeme.", en: "With citizenship of these countries you are not eligible to travel on ESTA. You need a visa (B1/B2) via the U.S. embassy — we're happy to help." },
  }),
  TOG("usOtherNat", "Máte aj iné / dvojaké štátne občianstvo (vrátane minulých)?", "Do you have any other / dual nationality (including past)?", { req: true }),
  T("usOtherNatList", "Ktoré štátne občianstvo?", "Which nationality?", { showIf: { field: "usOtherNat", value: "yes" } }),
  T("usOtherNatDoc", "Číslo pasu / dokladu k tomuto občianstvu", "Passport / ID number for this nationality", { req: false, showIf: { field: "usOtherNat", value: "yes" } }),
];

const usContact: Field[] = [
  { name: "email", label: { sk: "E-mail", en: "Email" }, type: "email", required: true, help: { sk: "Sem doručíme schválený dokument.", en: "We deliver the approved document here." } },
  PH("phone", "Telefón", "Phone"),
  T("homeAddress", "Ulica", "Street"),
  T("usHouseNo", "Číslo domu", "House number"),
  T("homeCity", "Mesto", "City"),
  T("homePostcode", "PSČ", "Postcode"),
  T("homeCountry", "Krajina", "Country"),
  T("usSocial", "Sociálne siete – účet (nepovinné)", "Social media – account (optional)", { req: false, help: ["Platforma a používateľské meno, ak chcete uviesť (napr. Instagram / @meno).", "Platform and username, if you wish to provide (e.g. Instagram / @name)."] }),
];

const usWarn = (sk: string, en: string) => ({ level: "warn" as const, sk, en });
const usWarnGeneric = usWarn(
  "Pri tejto odpovedi býva ESTA často zamietnuté. Odporúčame konzultáciu — pravdepodobne budete potrebovať vízum (B1/B2) cez veľvyslanectvo USA.",
  "ESTA is frequently refused with this answer. We recommend a consultation — you will likely need a visa (B1/B2) via the U.S. embassy.",
);

const usEmployment: Field[] = [
  employmentStatus,
  T("occupation", "Povolanie / pozícia", "Occupation / job title"),
  T("employerName", "Zamestnávateľ / škola", "Employer / school"),
  T("employerAddress", "Adresa zamestnávateľa", "Employer address"),
];

const usFields: Field[] = [
  ...usIdentity,
  ...usCitizenship,
  ...parents,
  TOG("geMember", "Ste členom programu Global Entry / Trusted Traveler?", "Are you a member of Global Entry / a Trusted Traveler program?", { req: false }),
  T("geNumber", "PASSID / číslo člena", "PASSID / membership number", { req: false, showIf: { field: "geMember", value: "yes" } }),
  ...passportFull,
  ...usContact,
  ...usEmployment,
  T("usAddress", "Adresa pobytu v USA", "Address while in the USA", { help: ["Hotel alebo miesto, kde sa budete zdržiavať.", "Hotel or the place where you will be staying."] }),
  T("usPocName", "Kontakt v USA – meno", "U.S. point of contact – name", { help: ["Kontakt na hotel alebo majiteľa miesta, kde sa budete zdržiavať.", "Contact for the hotel or the owner of the place where you will stay."] }),
  T("usPocPhone", "Kontakt v USA – telefón", "U.S. point of contact – phone", { help: ["Telefón na hotel alebo majiteľa ubytovania.", "Phone for the hotel or accommodation owner."] }),
  T("emName", "Núdzový kontakt (doma) – meno", "Emergency contact (home) – name", { help: ["Osoba vo vašej domovskej krajine.", "A person in your home country."] }),
  T("emPhone", "Núdzový kontakt (doma) – telefón", "Emergency contact (home) – phone"),
  purposeField,
  arrivalField,
  { name: "usDeparture", label: { sk: "Plánovaný odchod", en: "Planned departure date" }, type: "date", required: true, dateAfter: { field: "arrivalDate", maxDays: 90 } },
  // Oficiálnych 9 ESTA otázok spôsobilosti (Áno/Nie)
  TOG("secDisease", "Máte fyzickú alebo duševnú poruchu, ste závislý/á na drogách, alebo trpíte infekčnou chorobou ohrozujúcou verejné zdravie?", "Do you have a physical or mental disorder, are you a drug abuser or addict, or do you have a communicable disease of public-health significance?", { req: true }),
  TOG("secArrest", "Boli ste niekedy zatknutý/á alebo odsúdený/á za trestný čin s vážnou ujmou na majetku, osobe alebo štátnej moci?", "Have you ever been arrested or convicted for a crime that caused serious damage to property, or serious harm to another person or government authority?", { req: true, flag: usWarnGeneric }),
  TOG("secDrugs", "Porušili ste niekedy zákony o omamných a psychotropných látkach?", "Have you ever violated any law related to possessing, using or distributing illegal drugs?", { req: true, flag: usWarnGeneric }),
  TOG("secTerror", "Usilujete sa alebo ste sa niekedy podieľali na terorizme, špionáži, sabotáži alebo genocíde?", "Do you seek to engage in, or have you ever engaged in, terrorism, espionage, sabotage or genocide?", { req: true, flag: usWarnGeneric }),
  TOG("secFraud", "Pokúsili ste sa získať vízum alebo vstup do USA podvodom alebo uvedením nepravdivých údajov?", "Have you ever sought a visa or entry to the USA by fraud or misrepresentation?", { req: true, flag: usWarnGeneric }),
  TOG("secWork", "Hľadáte aktuálne prácu v USA, alebo ste v USA pracovali bez povolenia vlády USA?", "Are you currently seeking employment in the USA, or have you previously worked in the USA without prior permission?", { req: true, flag: usWarnGeneric }),
  TOG("secDeny", "Bolo vám niekedy zamietnuté vízum alebo vstup do USA, alebo ste vzali žiadosť o vstup späť?", "Have you ever been denied a U.S. visa or entry, or withdrawn an application for admission?", { req: true, flag: usWarnGeneric }),
  TOG("secOverstay", "Zdržali ste sa niekedy v USA dlhšie, než vám bolo povolené?", "Have you ever stayed in the USA longer than the admission period granted to you?", { req: true, flag: usWarnGeneric }),
  TOG("secCountries", "Boli ste od 1. marca 2011 prítomný/á v Kube, Iráne, Iraku, Líbyi, KĽDR, Somálsku, Sudáne, Sýrii alebo Jemene?", "Have you been present in Cuba, Iran, Iraq, Libya, North Korea, Somalia, Sudan, Syria or Yemen on or after 1 March 2011?", {
    req: true,
    flag: { level: "block", sk: "S týmto pobytom (od 1.3.2011) nie ste oprávnený/á cestovať na ESTA. Potrebujete vízum (B1/B2) cez veľvyslanectvo USA.", en: "With this travel (since 1 Mar 2011) you are not eligible to travel on ESTA. You need a visa (B1/B2) via the U.S. embassy." },
  }),
  passportScan,
  truthfulUs,
  consentUs,
];

// UK – ETA
const ukPassportPhoto: Field = {
  name: "ukPassportPhoto",
  label: { sk: "Fotka alebo sken pasu", en: "Photo or scan of your passport" },
  type: "file",
  required: true,
  accept: "image/jpeg,image/jpg",
  maxFiles: 2,
  guidance: {
    intro: { sk: "Nahrajte alebo odfoťte váš FYZICKÝ pas (nie digitálny). Fotka/sken musí zachytávať:", en: "Upload or take a photo of your PHYSICAL passport (not a digital one). The photo/scan must show:" },
    reqs: [
      { sk: "všetky 4 rohy strany s osobnými údajmi", en: "all 4 corners of the personal details page" },
      { sk: "vaše osobné údaje aj vašu fotografiu", en: "your personal details and your photo" },
      { sk: "strojovo čitateľnú zónu (MRZ) — 2–3 riadky znakov dole", en: "the machine-readable zone (MRZ) — 2–3 lines at the bottom" },
      { sk: "jasná a ostrá, bez odleskov a odrazov", en: "clear and in focus, without glare or reflections" },
      { sk: "neupravená filtrami, originál (nie screenshot ani fotokópia)", en: "unaltered by filters, original (not a screenshot or photocopy)" },
      { sk: "farebná, vodorovne (landscape), súbor JPG/JPEG", en: "in colour, horizontal (landscape), a JPG/JPEG file" },
    ],
    good: { sk: "Celá strana ostrá, všetky rohy a MRZ čitateľné, bez odleskov.", en: "Whole page sharp, all corners and MRZ readable, no glare." },
    goodImages: ["/examples/passport-standard.jpeg"],
    goodImageCaptions: [{ sk: "Ostrá, celá strana", en: "Sharp, whole page" }],
    bad: { sk: "Rozmazané alebo s odleskom — údaje a MRZ sú nečitateľné, žiadosť zamietneme.", en: "Blurry or with glare — the details and MRZ are unreadable, the application will be rejected." },
    badImages: ["/examples/passport-blur.png", "/examples/passport-glare.png"],
    badImageCaptions: [{ sk: "Rozmazané", en: "Blurry" }, { sk: "Odlesk", en: "Glare" }],
  },
};

const ukSelfie: Field = {
  name: "ukSelfie",
  label: { sk: "Vaša fotografia (tvár)", en: "A photo of yourself (face)" },
  type: "file",
  required: true,
  accept: "image/jpeg,image/jpg",
  maxFiles: 2,
  guidance: {
    intro: { sk: "Potrebujeme fotku vašej tváre na overenie totožnosti. Dbajte na:", en: "We need a photo of your face to confirm your identity. Make sure you have:" },
    reqs: [
      { sk: "jednofarebné svetlé pozadie, nič a nikto za vami", en: "a plain light background, no objects or people behind you" },
      { sk: "viditeľná hlava, ramená a horná časť tela", en: "your head, shoulders and upper body visible" },
      { sk: "rovnomerné osvetlenie, bez tieňov a odleskov na tvári", en: "even lighting, no shadows or glare on your face" },
      { sk: "iná než v pase, nie staršia ako 3 mesiace", en: "different from your passport, taken within the last 3 months" },
      { sk: "na výšku (portrait), farebná, súbor JPG/JPEG", en: "vertical (portrait), in colour, a JPG/JPEG file" },
      { sk: "nie fotka fotky, bez filtrov a efektov", en: "not a photo of a photo, no filters or effects" },
    ],
    good: { sk: "Svetlé jednofarebné pozadie, tvár a ramená v zábere, rovnomerné svetlo bez tieňov.", en: "Plain light background, face and shoulders in frame, even lighting, no shadows." },
    goodImages: ["/examples/background-plain.jpg", "/examples/shadow-none.jpg"],
    goodImageCaptions: [{ sk: "Čisté pozadie", en: "Plain background" }, { sk: "Bez tieňov", en: "No shadows" }],
    bad: { sk: "Tieň na stene za vami alebo predmety/rastliny v zábere — neprijateľné.", en: "Shadow on the wall behind you or objects/plants in the frame — not acceptable." },
    badImages: ["/examples/shadow-behind.jpg", "/examples/background-object.jpg"],
    badImageCaptions: [{ sk: "Tieň za hlavou", en: "Shadow behind" }, { sk: "Predmet v pozadí", en: "Object behind" }],
  },
};

const ukFields: Field[] = [
  // Skontrolujte údaje (musia sedieť s MRZ v pase)
  T("givenNames", "Krstné mená", "Given names", { help: ["Presne ako v MRZ pasu — len písmená A–Z a medzery.", "Exactly as in the passport MRZ — only letters A–Z and spaces."] }),
  T("surname", "Priezvisko", "Surname", { help: ["Uveďte všetky priezviská.", "Include all your surnames."] }),
  T("passportNumber", "Číslo pasu", "Passport number"),
  T("passportIssueCountry", "Krajina vydania pasu", "Country of issue"),
  D("passportIssue", "Dátum vydania pasu", "Passport issue date"),
  D("passportExpiry", "Platnosť pasu do", "Passport expiry date"),
  D("dob", "Dátum narodenia", "Date of birth"),
  T("nationality", "Štátna príslušnosť", "Nationality", { ph: ["napr. Slovensko – SVK", "e.g. Slovakia – SVK"] }),

  // Fotky (max 2 súbory)
  ukPassportPhoto,
  ukSelfie,

  // Kde sa budete zdržiavať
  S("ukStayWhere", "Kde sa budete väčšinu času zdržiavať?", "Where are you planning to be most of the time?", [
    { value: "uk", label: { sk: "Spojené kráľovstvo (Anglicko, Škótsko, Wales, Sev. Írsko)", en: "United Kingdom (England, Scotland, Wales, N. Ireland)" } },
    { value: "jersey", label: { sk: "Jersey", en: "Jersey" } },
    { value: "guernsey", label: { sk: "Guernsey", en: "Guernsey" } },
    { value: "iom", label: { sk: "Ostrov Man", en: "Isle of Man" } },
  ], { help: ["Ak sa plány zmenia, na vašu ETA to nemá vplyv.", "Your ETA is not affected if your plans change."] }),

  // Kontakt
  { name: "email", label: { sk: "E-mail (sem doručíme ETA)", en: "Email (we deliver the ETA here)" }, type: "email", required: true },
  PH("phone", "Telefónne číslo", "Phone number"),

  // Domáca adresa
  T("homeAddress", "Ulica", "Street"),
  T("ukHouseNo", "Číslo domu", "House number"),
  T("homeCity", "Mesto", "City"),
  T("homePostcode", "PSČ", "Postcode"),
  T("homeCountry", "Krajina", "Country"),

  // Rodičia
  T("ukFatherGiven", "Otec — krstné mená", "Father — given names"),
  T("ukFatherSurname", "Otec — priezvisko", "Father — surname"),
  T("ukMotherGiven", "Matka — krstné mená", "Mother — given names"),
  T("ukMotherSurname", "Matka — priezvisko", "Mother — surname"),
  PH("ukParentPhone", "Telefón na rodiča", "Parent phone number"),
  { name: "ukParentEmail", label: { sk: "E-mail na rodiča", en: "Parent email" }, type: "email", required: true },

  // Ďalšie štátne občianstva
  TOG("ukOtherNat", "Máte aj iné štátne občianstva (vrátane minulých)?", "Do you have any other nationalities (including past)?"),
  T("ukOtherNatList", "Ktoré štátne občianstvo?", "Which nationality?", { showIf: { field: "ukOtherNat", value: "yes" } }),
  T("ukOtherNatDoc", "Číslo pasu / občianskeho preukazu k tomuto občianstvu", "Passport / ID card number for this nationality", { req: false, showIf: { field: "ukOtherNat", value: "yes" } }),

  // Bezpečnostné otázky (prepínače)
  TOG("ukCrime", "Boli ste niekedy odsúdený/á za trestný čin (kdekoľvek)?", "Have you ever had a criminal conviction (anywhere)?", { req: true, help: ["Nezahŕňa pokuty za rýchlosť/parkovanie ani činy, ktoré nie sú trestné v UK.", "Excludes speeding/parking tickets and acts that are not offences in the UK."] }),
  TOG("secWar", "Vojnové zločiny, genocída alebo zločiny proti ľudskosti?", "War crimes, genocide or crimes against humanity?", { req: true }),
  TOG("secTerror", "Terorizmus (podpora alebo členstvo v skupine)?", "Terrorism (support for or membership of a group)?", { req: true }),
  TOG("secExtreme", "Extrémizmus (podpora skupín alebo extrémistické názory)?", "Extremism (support for groups or extremist views)?", { req: true }),
  TOG("secEspionage", "Špionáž (zbieranie alebo zdieľanie tajných informácií)?", "Espionage (collecting or sharing secret information)?", { req: true }),
  TOG("secSabotage", "Sabotáž (úmyselné oslabovanie organizácie)?", "Sabotage (deliberately weakening an organisation)?", { req: true }),

  truthfulUk,
  consentUk,
];

// Kanada – eTA
const caFields: Field[] = [
  ...identity,
  maritalField,
  ...passportFull,
  ...contactFull,
  ...employment,
  purposeField,
  arrivalField,
  addrDest,
  YN("caRefused", "Zamietli vám niekedy vízum/vstup do Kanady alebo inej krajiny?", "Ever refused a visa/entry to Canada or any country?"),
  YN("caCrime", "Boli ste niekedy zatknutý/á alebo odsúdený/á?", "Have you ever been arrested or convicted?"),
  YN("caTb", "Mali ste TBC alebo blízky kontakt s osobou s TBC?", "Have you had TB or close contact with someone who had it?"),
  passportScan,
  truthful,
  consent,
];

// Austrália – ETA
const auFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  employmentStatus,
  YN("auCitizen", "Ste občanom krajiny, ktorá vydala váš pas?", "Are you a citizen of the passport-issuing country?"),
  purposeField,
  arrivalField,
  addrDest,
  YN("auCrime", "Máte záznam v registri trestov?", "Do you have any criminal convictions?"),
  YN("auTb", "Trpíte tuberkulózou?", "Do you have tuberculosis?"),
  YN("auRefused", "Bolo vám zamietnuté austrálske vízum?", "Have you ever been refused an Australian visa?", { req: false }),
  passportScan,
  truthful,
  consent,
];

// Nový Zéland – NZeTA
const nzFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  purposeField,
  arrivalField,
  addrDest,
  YN("nzDeport", "Boli ste niekedy vyhostený/á alebo vám zamietli vstup do akejkoľvek krajiny?", "Ever deported or refused entry to any country?"),
  YN("nzCrime", "Boli ste odsúdený/á na 5+ rokov (alebo 12+ mes. za posl. 10 r.)?", "Sentenced to 5+ years (or 12+ months in the last 10 years)?"),
  CB("nzIvl", "Beriem na vedomie medzinárodný turistický poplatok (IVL) zahrnutý v cene.", "I acknowledge the International Visitor Levy (IVL) included in the price."),
  passportScan,
  truthful,
  consent,
];

// Južná Kórea – K-ETA
const krFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  employmentStatus,
  T("occupation", "Povolanie", "Occupation", { req: false }),
  purposeField,
  arrivalField,
  T("krAddress", "Adresa pobytu v Kórei", "Address in Korea"),
  YN("krBefore", "Boli ste už niekedy v Kórei?", "Have you visited Korea before?", { req: false }),
  YN("krCrime", "Boli ste niekedy odsúdený/á (aj v zahraničí)?", "Ever convicted of a crime (incl. abroad)?"),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// India – e-Visa
const inFields: Field[] = [
  ...identity,
  T("religion", "Náboženstvo", "Religion", { req: false }),
  T("education", "Najvyššie dosiahnuté vzdelanie", "Highest education", { req: false }),
  T("marks", "Viditeľné identifikačné znaky (napr. jazva)", "Visible identification marks (e.g. scar)", { req: false }),
  maritalField,
  T("fatherName", "Otec – celé meno", "Father – full name"),
  T("fatherNat", "Otec – štátna príslušnosť", "Father – nationality", { req: false }),
  T("motherName", "Matka – celé meno", "Mother – full name"),
  T("spouseName", "Manžel/ka – meno (ak ženatý/vydatá)", "Spouse – name (if married)", { req: false }),
  ...employment,
  ...passportFull,
  ...contactFull,
  T("visitedCountries", "Krajiny navštívené za posledných 10 rokov", "Countries visited in the last 10 years", { req: false }),
  YN("saarc", "Navštívili ste krajiny SAARC za posledné 3 roky?", "Visited any SAARC country in the last 3 years?", { req: false }),
  T("refIndiaName", "Referencia v Indii – meno", "Reference in India – name"),
  T("refIndiaAddress", "Referencia v Indii – adresa", "Reference in India – address"),
  T("refIndiaPhone", "Referencia v Indii – telefón", "Reference in India – phone", { req: false }),
  T("refHomeName", "Referencia v domovskej krajine – meno", "Reference at home – name"),
  T("refHomeAddress", "Referencia doma – adresa", "Reference at home – address", { req: false }),
  purposeField,
  arrivalField,
  T("portArrival", "Plánované miesto vstupu (letisko/prístav)", "Planned port of arrival", { req: false }),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// Egypt – e-Visa
const egFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  T("occupation", "Povolanie", "Occupation", { req: false }),
  entryType,
  purposeField,
  arrivalField,
  T("egHotel", "Ubytovanie v Egypte (hotel/adresa)", "Accommodation in Egypt (hotel/address)", { req: false }),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// Vietnam – e-Visa
const vnFields: Field[] = [
  ...identity,
  T("religion", "Náboženstvo", "Religion", { req: false }),
  ...passportFull,
  ...contactFull,
  T("occupation", "Povolanie", "Occupation", { req: false }),
  entryType,
  D("vnEntry", "Dátum vstupu", "Intended date of entry"),
  D("vnExit", "Dátum výstupu", "Intended date of exit", { req: false }),
  T("vnPort", "Miesto vstupu (letisko/hraničný priechod)", "Port of entry"),
  T("vnAddress", "Adresa pobytu vo Vietname", "Address in Vietnam", { req: false }),
  purposeField,
  CB("vnHealth", "Súhlasím s povinným zdravotným vyhlásením pri vstupe.", "I agree to the mandatory entry health declaration."),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// Srí Lanka – ETA
const lkFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  T("occupation", "Povolanie", "Occupation", { req: false }),
  purposeField,
  arrivalField,
  T("lkAddress", "Adresa pobytu na Srí Lanke", "Address in Sri Lanka", { req: false }),
  CB("lkArrival", "Beriem na vedomie, že súčasťou je online arrival card.", "I acknowledge the online arrival card is included."),
  passportScan,
  truthful,
  consent,
];

// Turecko – e-Visa
const trFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  entryType,
  purposeField,
  arrivalField,
  T("trAddress", "Ubytovanie v Turecku", "Accommodation in Türkiye", { req: false }),
  passportScan,
  truthful,
  consent,
];

// Indonézia / Bali – e-VOA
const idFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  S("idVisaType", "Typ víza", "Visa type", [
    { value: "b1", label: { sk: "B1 – 30 dní", en: "B1 – 30 days" } },
    { value: "c1", label: { sk: "C1 – 60 dní", en: "C1 – 60 days" } },
  ]),
  arrivalField,
  T("idPort", "Miesto vstupu (napr. Bali / Denpasar)", "Port of entry (e.g. Bali / Denpasar)", { req: false }),
  T("idHotel", "Ubytovanie v Indonézii", "Accommodation in Indonesia", { req: false }),
  CB("idTax", "Beriem na vedomie turistickú daň +15 € (Bali).", "I acknowledge the +€15 tourist tax (Bali)."),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// Tanzánia / Zanzibar – e-Visa
const tzFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  T("occupation", "Povolanie", "Occupation", { req: false }),
  entryType,
  purposeField,
  arrivalField,
  T("tzHost", "Ubytovanie / hostiteľ v Tanzánii", "Accommodation / host in Tanzania", { req: false }),
  CB("tzVax", "Mám očkovanie proti žltej zimnici (alebo ho doložím).", "I have a yellow-fever vaccination (or will provide proof)."),
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// EÚ – ETIAS
const euFields: Field[] = [
  ...identity,
  parents[0],
  parents[2],
  ...passportFull,
  ...contactFull,
  ...employment,
  T("euFirstCountry", "Prvá krajina vstupu do Schengenu", "First Schengen country of entry"),
  YN("euCrime", "Boli ste odsúdený/á za závažný trestný čin (posl. 10/20 r.)?", "Convicted of a serious offence (last 10/20 years)?"),
  YN("euWar", "Zdržiavali ste sa vo vojnovej zóne?", "Have you stayed in a war zone?", { req: false }),
  YN("euDeport", "Boli ste vyhostený/á z EÚ alebo Schengenu?", "Have you been deported from the EU/Schengen?", { req: false }),
  purposeField,
  arrivalField,
  passportScan,
  truthful,
  consent,
];

// Čína – e-Visa (pripravujeme)
const cnFields: Field[] = [
  ...identity,
  ...passportFull,
  ...contactFull,
  ...employment,
  purposeField,
  arrivalField,
  passportScan,
  portraitScan,
  truthful,
  consent,
];

// ── KATALÓG ──────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    slug: "us-esta",
    type: "esta",
    country: "US",
    flag: "🇺🇸",
    name: { sk: "USA – ESTA", en: "USA – ESTA" },
    destination: { sk: "Spojené štáty", en: "United States" },
    summary: {
      sk: "Elektronické cestovné povolenie pre bezvízový vstup do USA.",
      en: "Electronic travel authorization for visa-free entry to the USA.",
    },
    govFee: 21,
    serviceFee: 53,
    processingDays: { sk: "do 1 dňa", en: "within 1 day" },
    validity: { sk: "2 roky alebo do platnosti pasu", en: "2 years or until passport expiry" },
    stay: { sk: "max 90 dní na jeden pobyt", en: "up to 90 days per stay" },
    facts: [
      { sk: "Individuálna aj skupinová žiadosť", en: "Individual or group application" },
      { sk: "Len elektronické – nič netreba tlačiť", en: "Fully electronic – nothing to print" },
    ],
    faq: [
      {
        q: { sk: "Môžem o ESTA žiadať?", en: "Am I eligible for ESTA?" },
        a: {
          sk: "ESTA je pre cestujúcich s pasom z krajiny v programe bezvízového styku (vrátane SR a väčšiny EÚ), na turistiku, biznis alebo tranzit do 90 dní. Cez krátky dotazník nižšie si over, či máte nárok.",
          en: "ESTA is for travellers holding a passport from a Visa Waiver Program country (incl. Slovakia and most of the EU), for tourism, business or transit up to 90 days. Use the short check below to confirm your eligibility.",
        },
      },
      {
        q: { sk: "Dokedy musím žiadať pred cestou?", en: "How far ahead should I apply?" },
        a: {
          sk: "Odporúčame aspoň 72 hodín pred odletom. My žiadosť spracujeme spravidla do 1 dňa.",
          en: "We recommend at least 72 hours before departure. We usually process the application within 1 day.",
        },
      },
    ],
    available: true,
    fields: usFields,
  },
  {
    slug: "uk-eta",
    type: "eta",
    country: "GB",
    flag: "🇬🇧",
    name: { sk: "UK – ETA", en: "UK – ETA" },
    destination: { sk: "Veľká Británia", en: "United Kingdom" },
    summary: {
      sk: "Povinné elektronické povolenie do UK (aj pre občanov EÚ).",
      en: "Mandatory electronic authorization for the UK (incl. EU citizens).",
    },
    govFee: 19,
    serviceFee: 30,
    processingDays: { sk: "do 3 dní", en: "within 3 days" },
    validity: { sk: "2 roky", en: "2 years" },
    stay: { sk: "max 180 dní na jeden pobyt", en: "up to 180 days per stay" },
    facts: [
      { sk: "Len elektronická – netreba nič tlačiť", en: "Fully electronic – nothing to print" },
      { sk: "Vstup len s cestovným pasom (nie OP)", en: "Entry with a passport only (no ID card)" },
    ],
    faq: [
      {
        q: { sk: "Musím UK ETA tlačiť?", en: "Do I need to print the UK ETA?" },
        a: {
          sk: "Nie. ETA je naviazaná elektronicky na váš pas, netreba nič tlačiť ani nosiť so sebou.",
          en: "No. The ETA is linked electronically to your passport — nothing to print or carry.",
        },
      },
      {
        q: { sk: "Stačí mi občiansky preukaz?", en: "Can I travel with a national ID card?" },
        a: {
          sk: "Nie. Do UK vstupujete výhradne s platným cestovným pasom, nie s občianskym preukazom.",
          en: "No. Entry to the UK requires a valid passport, not a national ID card.",
        },
      },
    ],
    available: true,
    fields: ukFields,
  },
  {
    slug: "ca-eta",
    type: "eta",
    country: "CA",
    flag: "🇨🇦",
    name: { sk: "Kanada – eTA", en: "Canada – eTA" },
    destination: { sk: "Kanada", en: "Canada" },
    summary: {
      sk: "Elektronická autorizácia pre let do Kanady.",
      en: "Electronic authorization for air travel to Canada.",
    },
    govFee: 5,
    serviceFee: 44,
    processingDays: { sk: "do 72 hodín", en: "within 72 hours" },
    validity: { sk: "5 rokov", en: "5 years" },
    stay: { sk: "max 180 dní na pobyt", en: "up to 180 days per stay" },
    facts: [
      { sk: "Platí len pri vstupe lietadlom", en: "Valid for air travel only" },
      { sk: "Len elektronická – netreba tlačiť", en: "Fully electronic – nothing to print" },
    ],
    available: true,
    fields: caFields,
  },
  {
    slug: "au-eta",
    type: "eta",
    country: "AU",
    flag: "🇦🇺",
    name: { sk: "Austrália – ETA", en: "Australia – ETA" },
    destination: { sk: "Austrália", en: "Australia" },
    summary: {
      sk: "Elektronické vízum (subclass 601) pre turistiku a biznis.",
      en: "Electronic visa (subclass 601) for tourism and business.",
    },
    govFee: 12,
    serviceFee: 37,
    processingDays: { sk: "do 3 dní", en: "within 3 days" },
    validity: { sk: "12 mesiacov", en: "12 months" },
    stay: { sk: "max 3 mesiace na pobyt", en: "up to 3 months per stay" },
    facts: [
      { sk: "Len elektronická", en: "Fully electronic" },
      { sk: "Niekedy treba doplniť dokumenty (test GTE)", en: "Extra documents sometimes required (GTE)" },
    ],
    faq: [
      {
        q: { sk: "Čo je GTE?", en: "What is GTE?" },
        a: {
          sk: "GTE (Genuine Temporary Entrant) posudzuje, či je vaša cesta naozaj dočasná. Pri niektorých žiadostiach úrad vyžiada doplňujúce doklady — pomôžeme vám ich pripraviť.",
          en: "GTE (Genuine Temporary Entrant) assesses whether your trip is genuinely temporary. Some applications need extra documents — we help you prepare them.",
        },
      },
    ],
    available: true,
    fields: auFields,
  },
  {
    slug: "nz-eta",
    type: "eta",
    country: "NZ",
    flag: "🇳🇿",
    name: { sk: "Nový Zéland – NZeTA", en: "New Zealand – NZeTA" },
    destination: { sk: "Nový Zéland", en: "New Zealand" },
    summary: {
      sk: "Elektronická autorizácia pre vstup na Nový Zéland.",
      en: "Electronic authorization for entry to New Zealand.",
    },
    govFee: 32,
    serviceFee: 83,
    processingDays: { sk: "do 72 hodín", en: "within 72 hours" },
    validity: { sk: "2 roky", en: "2 years" },
    stay: { sk: "max 3 mesiace na pobyt", en: "up to 3 months per stay" },
    facts: [
      { sk: "Potrebné aj pri samotnom tranzite", en: "Required even for transit" },
      { sk: "Pozor na prísnu biokontrolu na letisku", en: "Strict biosecurity checks on arrival" },
    ],
    available: true,
    fields: nzFields,
  },
  {
    slug: "kr-keta",
    type: "eta",
    country: "KR",
    flag: "🇰🇷",
    name: { sk: "Južná Kórea – K-ETA", en: "South Korea – K-ETA" },
    destination: { sk: "Južná Kórea", en: "South Korea" },
    summary: {
      sk: "Elektronická cestovná autorizácia do Kórey.",
      en: "Electronic travel authorization for Korea.",
    },
    govFee: 7,
    serviceFee: 42,
    processingDays: { sk: "do 72 hodín", en: "within 72 hours" },
    validity: { sk: "3 roky", en: "3 years" },
    stay: { sk: "max 90 dní na pobyt", en: "up to 90 days per stay" },
    facts: [
      { sk: "Deti do 17 r. a osoby nad 65 r. K-ETA nepotrebujú", en: "Under-17s and over-65s don't need K-ETA" },
      { sk: "Len elektronická", en: "Fully electronic" },
    ],
    available: true,
    fields: krFields,
  },
  {
    slug: "in-evisa",
    type: "evisa",
    country: "IN",
    flag: "🇮🇳",
    name: { sk: "India – e-Visa", en: "India – e-Visa" },
    destination: { sk: "India", en: "India" },
    summary: {
      sk: "Elektronické turistické vízum do Indie.",
      en: "Electronic tourist visa for India.",
    },
    govFee: 20,
    serviceFee: 49,
    processingDays: { sk: "3–5 dní", en: "3–5 days" },
    validity: { sk: "30 dní / 1 rok / 5 rokov", en: "30 days / 1 year / 5 years" },
    stay: { sk: "max 30–90 dní v kuse", en: "up to 30–90 days at a time" },
    facts: [
      { sk: "30 dní (2 vstupy) 69 € · 1 rok 99 € · 5 rokov 149 €", en: "30 days (2 entries) €69 · 1 year €99 · 5 years €149" },
      { sk: "Platba kartou +2,5 % poplatok", en: "Card payment +2.5% fee" },
      { sk: "Povinné vytlačiť", en: "Must be printed" },
      { sk: "Pas musí mať min. 2 voľné strany", en: "Passport needs at least 2 blank pages" },
    ],
    available: true,
    fields: inFields,
  },
  {
    slug: "eg-evisa",
    type: "evisa",
    country: "EG",
    flag: "🇪🇬",
    name: { sk: "Egypt – e-Visa", en: "Egypt – e-Visa" },
    destination: { sk: "Egypt", en: "Egypt" },
    summary: {
      sk: "Elektronické vízum pre dovolenku v Egypte.",
      en: "Electronic visa for a holiday in Egypt.",
    },
    govFee: 25,
    serviceFee: 54,
    processingDays: { sk: "3–7 dní", en: "3–7 days" },
    validity: { sk: "single 90 dní / multi 130 dní", en: "single 90 days / multi 130 days" },
    stay: { sk: "max 30 dní na pobyt", en: "up to 30 days per stay" },
    facts: [
      { sk: "Single vstup 79 € · Multi vstup 99 €", en: "Single entry €79 · Multi entry €99" },
      { sk: "Povinné vytlačiť", en: "Must be printed" },
    ],
    available: true,
    fields: egFields,
  },
  {
    slug: "vn-evisa",
    type: "evisa",
    country: "VN",
    flag: "🇻🇳",
    name: { sk: "Vietnam – e-Visa", en: "Vietnam – e-Visa" },
    destination: { sk: "Vietnam", en: "Vietnam" },
    summary: {
      sk: "Elektronické vízum do Vietnamu.",
      en: "Electronic visa for Vietnam.",
    },
    govFee: 19,
    serviceFee: 50,
    processingDays: { sk: "do 2 týždňov", en: "up to 2 weeks" },
    validity: { sk: "max 90 dní", en: "up to 90 days" },
    stay: { sk: "max 90 dní", en: "up to 90 days" },
    facts: [
      { sk: "Single 69 € · Multi-entry 99 €", en: "Single €69 · Multi-entry €99" },
      { sk: "Vyžaduje presný dátum vstupu", en: "Requires an exact entry date" },
      { sk: "Povinné vytlačiť (nie elektronické)", en: "Must be printed (not electronic)" },
      { sk: "Povinné zdravotné vyhlásenie", en: "Mandatory health declaration" },
    ],
    available: true,
    fields: vnFields,
  },
  {
    slug: "lk-eta",
    type: "eta",
    country: "LK",
    flag: "🇱🇰",
    name: { sk: "Srí Lanka – ETA", en: "Sri Lanka – ETA" },
    destination: { sk: "Srí Lanka", en: "Sri Lanka" },
    summary: {
      sk: "Elektronická autorizácia na vstup na Srí Lanku.",
      en: "Electronic travel authorization for Sri Lanka.",
    },
    govFee: 46,
    serviceFee: 53,
    processingDays: { sk: "do 3 dní", en: "within 3 days" },
    validity: { sk: "30 dní (predĺženie do 60)", en: "30 days (extendable to 60)" },
    stay: { sk: "dvojnásobný vstup", en: "double entry" },
    facts: [
      { sk: "Dvojnásobný vstup (double entry)", en: "Double entry" },
      { sk: "Súčasťou je online arrival card", en: "Includes the online arrival card" },
    ],
    available: true,
    fields: lkFields,
  },
  {
    slug: "tr-evisa",
    type: "evisa",
    country: "TR",
    flag: "🇹🇷",
    name: { sk: "Turecko – e-Visa", en: "Türkiye – e-Visa" },
    destination: { sk: "Turecko", en: "Türkiye" },
    summary: {
      sk: "Elektronické vízum do Turecka.",
      en: "Electronic visa for Türkiye.",
    },
    govFee: 50,
    serviceFee: 25,
    processingDays: { sk: "do 24 hodín", en: "up to 24 hours" },
    validity: { sk: "180 dní", en: "180 days" },
    available: true,
    fields: trFields,
  },
  {
    slug: "id-evoa",
    type: "evisa",
    country: "ID",
    flag: "🇮🇩",
    name: { sk: "Indonézia / Bali – e-VOA", en: "Indonesia / Bali – e-VOA" },
    destination: { sk: "Indonézia", en: "Indonesia" },
    summary: {
      sk: "Elektronické vízum po príchode pre Bali a Indonéziu.",
      en: "Electronic visa on arrival for Bali and Indonesia.",
    },
    govFee: 19,
    serviceFee: 50,
    processingDays: { sk: "1–3 dni", en: "1–3 days" },
    validity: { sk: "B1 30 dní / C1 60 dní", en: "B1 30 days / C1 60 days" },
    stay: { sk: "B1 30 dní / C1 60 dní", en: "B1 30 days / C1 60 days" },
    facts: [
      { sk: "B1 30 dní 69 € (online predĺženie +30 dní) · C1 60 dní 149 €", en: "B1 30 days €69 (online extension +30 days) · C1 60 days €149" },
      { sk: "Žiadne čakanie v rade na letisku", en: "Skip the airport queue" },
      { sk: "Platba kartou +2–3 %", en: "Card payment +2–3%" },
      { sk: "Turistická daň +15 €", en: "Tourist tax +€15" },
    ],
    available: true,
    fields: idFields,
  },
  {
    slug: "tz-evisa",
    type: "evisa",
    country: "TZ",
    flag: "🇹🇿",
    name: { sk: "Tanzánia – e-Visa", en: "Tanzania – e-Visa" },
    destination: { sk: "Tanzánia", en: "Tanzania" },
    summary: {
      sk: "Elektronické vízum do Tanzánie a na Zanzibar.",
      en: "Electronic visa for Tanzania and Zanzibar.",
    },
    govFee: 45,
    serviceFee: 54,
    processingDays: { sk: "do 10 dní", en: "up to 10 days" },
    validity: { sk: "90 dní", en: "90 days" },
    stay: { sk: "max 90 dní na pobyt", en: "up to 90 days per stay" },
    facts: [
      { sk: "Povinné vytlačiť", en: "Must be printed" },
      { sk: "Vyžaduje sa očkovanie (žltá zimnica)", en: "Vaccination required (yellow fever)" },
    ],
    available: true,
    fields: tzFields,
  },
  {
    slug: "eu-etias",
    type: "etias",
    country: "EU",
    flag: "🇪🇺",
    name: { sk: "EÚ – ETIAS", en: "EU – ETIAS" },
    destination: { sk: "European Union (Schengen)", en: "European Union (Schengen)" },
    summary: { sk: "Upcoming authorization for non-EU travellers (launch Q4 2026).", en: "Upcoming authorization for non-EU travellers (launch Q4 2026)." },
    govFee: 20,
    serviceFee: 55,
    processingDays: { sk: "usually within 30 min · guaranteed within 72 h", en: "usually within 30 min · guaranteed within 72 h" },
    validity: { sk: "3 years", en: "3 years" },
    stay: { sk: "max 90 dní", en: "up to 90 days" },
    available: false, // čoskoro
    fields: euFields,
  },
  {
    slug: "cn-evisa",
    type: "evisa",
    country: "CN",
    flag: "🇨🇳",
    name: { sk: "Čína – e-Visa", en: "China – e-Visa" },
    destination: { sk: "Čína", en: "China" },
    summary: {
      sk: "Pripravujeme elektronické vízum do Číny.",
      en: "Electronic visa for China — coming soon.",
    },
    govFee: 60,
    serviceFee: 49,
    processingDays: { sk: "pripravujeme", en: "coming soon" },
    validity: { sk: "—", en: "—" },
    stay: { sk: "—", en: "—" },
    available: false,
    fields: cnFields,
  },
];

// ── Pomocné funkcie ──────────────────────────────────────────────────────────

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const productPrice = (p: Product): number => p.govFee + p.serviceFee;

// Expresné spracovanie — platený upsell (prednostné vybavenie z našej strany).
// Doplnkové služby (platené upselly). Účtujú sa za každú žiadosť (jedného cestujúceho).
export const EXPRESS_PCT = 0.5; // expresné spracovanie = +50 % zo sumy
export const PROTECTION_FEE = 19; // ochrana kupujúceho = 19 € s DPH za osobu, nevratné

export const expressAmount = (price: number): number => Math.round(price * EXPRESS_PCT);

export const EXPRESS: { pct: number; label: Localized; desc: Localized } = {
  pct: EXPRESS_PCT,
  label: {
    sk: "Expresné spracovanie",
    en: "Express processing",
    cs: "Expresní zpracování",
    uk: "Термінове опрацювання",
    de: "Express-Bearbeitung",
  },
  desc: {
    sk: "Prednostné vybavenie a podanie do 24 hodín. Príplatok je 50 % zo sumy a je nevratný.",
    en: "Priority handling and submission within 24 hours. A 50% surcharge applies and is non-refundable.",
    cs: "Přednostní vyřízení a podání do 24 hodin. Příplatek činí 50 % z částky a je nevratný.",
    uk: "Пріоритетне опрацювання та подання протягом 24 годин. Доплата становить 50 % від суми та не повертається.",
    de: "Vorrangige Bearbeitung und Einreichung innerhalb von 24 Stunden. Der Aufschlag beträgt 50 % und ist nicht erstattungsfähig.",
  },
};
export const PROTECTION: { fee: number; label: Localized; desc: Localized } = {
  fee: PROTECTION_FEE,
  label: {
    sk: "Ochrana kupujúceho",
    en: "Buyer protection",
    cs: "Ochrana kupujícího",
    uk: "Захист покупця",
    de: "Käuferschutz",
  },
  desc: {
    sk: "Ak úrad žiadosť zamietne napriek správne a pravdivo poskytnutým údajom, vrátime vám celú pôvodnú sumu. Poplatok 19 € je nevratný a nekryje zamietnutie pre chybné či zatajené údaje.",
    en: "If the authority refuses your application despite correctly and truthfully provided details, we refund the full original amount. The €19 fee is non-refundable and does not cover refusals caused by incorrect or concealed information.",
    cs: "Pokud úřad žádost zamítne navzdory správně a pravdivě poskytnutým údajům, vrátíme vám celou původní částku. Poplatek 19 € je nevratný a nekryje zamítnutí kvůli chybným či zatajeným údajům.",
    uk: "Якщо орган відхилить заяву попри правильно та правдиво надані дані, ми повернемо вам усю початкову суму. Збір 19 € не повертається і не покриває відмову через хибні чи приховані дані.",
    de: "Lehnt die Behörde Ihren Antrag trotz korrekt und wahrheitsgemäß angegebener Daten ab, erstatten wir Ihnen den vollen ursprünglichen Betrag. Die Gebühr von 19 € ist nicht erstattungsfähig und deckt keine Ablehnungen aufgrund falscher oder verschwiegener Angaben.",
  },
};
