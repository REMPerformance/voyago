export type Loc = { sk: string; en: string };

// Správne zásady pre fotku na vízum / cestovné povolenie
export const PHOTO_DO: { title: Loc; desc: Loc }[] = [
  { title: { sk: "Neutrálny výraz", en: "Neutral expression" }, desc: { sk: "Ústa zatvorené, oči otvorené a jasne viditeľné.", en: "Mouth closed, eyes open and clearly visible." } },
  { title: { sk: "Svetlé jednofarebné pozadie", en: "Plain light background" }, desc: { sk: "Biele alebo svetlosivé pozadie bez tieňov a predmetov.", en: "White or light-grey background, no shadows or objects." } },
  { title: { sk: "Pohľad priamo do objektívu", en: "Face the camera" }, desc: { sk: "Hlava rovno a vycentrovaná, ramená rovnobežne.", en: "Head straight and centred, shoulders level." } },
  { title: { sk: "Rovnomerné osvetlenie", en: "Even lighting" }, desc: { sk: "Bez odleskov, tieňov v tvári a efektu červených očí.", en: "No glare, face shadows or red-eye." } },
  { title: { sk: "Aktuálna a farebná", en: "Recent and in colour" }, desc: { sk: "Nie staršia ako 6 mesiacov, verné farby pleti.", en: "No older than 6 months, true skin tones." } },
  { title: { sk: "Celá hlava v zábere", en: "Whole head visible" }, desc: { sk: "Od temena po vrch ramien, tvár nezakrytá.", en: "From crown to top of shoulders, face unobstructed." } },
];

// Najčastejšie chyby (zhodujú sa s vizuálnymi príkladmi nižšie)
export const PHOTO_DONT: { key: BadVariant; title: Loc; desc: Loc }[] = [
  { key: "tooClose", title: { sk: "Tvár príliš blízko/ďaleko", en: "Face too close / far" }, desc: { sk: "Tvár má zaberať približne 70–80 % výšky.", en: "The face should fill roughly 70–80% of the height." } },
  { key: "smile", title: { sk: "Úsmev so zubami", en: "Smiling with teeth" }, desc: { sk: "Výraz musí byť neutrálny.", en: "Expression must be neutral." } },
  { key: "glasses", title: { sk: "Okuliare a odlesky", en: "Glasses and glare" }, desc: { sk: "Bez okuliarov; tónované sklá sú zakázané.", en: "No glasses; tinted lenses are not allowed." } },
  { key: "shadow", title: { sk: "Tiene na tvári/pozadí", en: "Shadows on face/background" }, desc: { sk: "Nasvieťte tvár rovnomerne, odstúpte od steny.", en: "Light the face evenly, step away from the wall." } },
  { key: "busy", title: { sk: "Rušivé pozadie", en: "Busy background" }, desc: { sk: "Žiadne vzory, farby ani ďalšie osoby.", en: "No patterns, colours or other people." } },
  { key: "hat", title: { sk: "Pokrývka hlavy", en: "Head covering" }, desc: { sk: "Bez čiapky/klobúka (okrem náboženských, tvár voľná).", en: "No hat/cap (except religious, face uncovered)." } },
];

export type BadVariant = "tooClose" | "smile" | "glasses" | "shadow" | "busy" | "hat";

// Orientačné rozmery fotky podľa destinácie
export const PHOTO_SIZES: { region: Loc; size: Loc }[] = [
  { region: { sk: "USA (ESTA / vízum)", en: "USA (ESTA / visa)" }, size: { sk: "51 × 51 mm (2×2\"), min. 600 × 600 px, štvorec", en: "51 × 51 mm (2×2\"), min. 600 × 600 px, square" } },
  { region: { sk: "Schengen / EÚ", en: "Schengen / EU" }, size: { sk: "35 × 45 mm", en: "35 × 45 mm" } },
  { region: { sk: "Spojené kráľovstvo (ETA)", en: "United Kingdom (ETA)" }, size: { sk: "Digitálna – portál automaticky oreže; tvár 50–90 % rámu", en: "Digital – portal auto-crops; face 50–90% of the frame" } },
  { region: { sk: "Kanada (eTA / vízum)", en: "Canada (eTA / visa)" }, size: { sk: "35 × 45 mm", en: "35 × 45 mm" } },
  { region: { sk: "India (e-Visa)", en: "India (e-Visa)" }, size: { sk: "51 × 51 mm, štvorec", en: "51 × 51 mm, square" } },
  { region: { sk: "Austrália / N. Zéland", en: "Australia / New Zealand" }, size: { sk: "Digitálna podľa portálu (35 × 45 mm pri tlači)", en: "Digital per portal (35 × 45 mm when printed)" } },
  { region: { sk: "Egypt / Turecko / Vietnam a i.", en: "Egypt / Turkey / Vietnam etc." }, size: { sk: "35 × 45 mm (bežný štandard)", en: "35 × 45 mm (common standard)" } },
];

// ─────────────────────────────────────────────────────────────
//  Detailné požiadavky podľa destinácie (oficiálne zdroje)
//  US/DV: travel.state.gov · UK: gov.uk/Home Office · Schengen: ICAO
// ─────────────────────────────────────────────────────────────
export type DestSpec = {
  code: string;
  label: Loc;
  frameW: number; // šírka rámu (pre pravítko)
  frameH: number; // výška rámu
  unit: "mm" | "px";
  tick: number; // krok pravítka
  headPct: [number, number]; // podiel výšky hlavy
  sizeLabel: Loc;
  fileLabel: Loc;
  headLabel: Loc;
  bg: Loc;
  glasses: Loc;
  glassesDv?: Loc;
  expression: Loc;
  recent: Loc;
  extra?: Loc[];
  allowDv?: boolean;
};

const US: DestSpec = {
  code: "US",
  label: { sk: "USA – vízum / DV lotéria", en: "USA – visa / DV lottery" },
  frameW: 51, frameH: 51, unit: "mm", tick: 10, headPct: [0.5, 0.69],
  sizeLabel: { sk: "51 × 51 mm (2×2″), štvorec", en: "51 × 51 mm (2×2″), square" },
  fileLabel: { sk: "JPEG, 600×600 – 1200×1200 px, ≤ 240 KB, sRGB", en: "JPEG, 600×600 – 1200×1200 px, ≤ 240 KB, sRGB" },
  headLabel: { sk: "Hlava 50–69 % výšky · oči 56–69 % od spodu", en: "Head 50–69% of height · eyes 56–69% from bottom" },
  bg: { sk: "Biele alebo krémové, jednofarebné, bez tieňov.", en: "White or off-white, plain, no shadows." },
  glasses: { sk: "Okuliare sú zakázané (od r. 2016).", en: "Glasses are not allowed (since 2016)." },
  glassesDv: { sk: "DV lotéria: okuliare úplne zakázané — zložte ich.", en: "DV lottery: glasses fully prohibited — take them off." },
  expression: { sk: "Neutrálny výraz, ústa zatvorené, oči otvorené.", en: "Neutral expression, mouth closed, eyes open." },
  recent: { sk: "Nie staršia ako 6 mesiacov.", en: "No older than 6 months." },
  extra: [
    { sk: "Tvár priamo do objektívu, hlava vycentrovaná.", en: "Face the camera directly, head centred." },
    { sk: "Bez pokrývky hlavy (okrem náboženskej, tvár voľná).", en: "No head covering (except religious, face uncovered)." },
  ],
  allowDv: true,
};

const GB: DestSpec = {
  code: "GB",
  label: { sk: "Spojené kráľovstvo – ETA", en: "United Kingdom – ETA" },
  frameW: 600, frameH: 750, unit: "px", tick: 150, headPct: [0.6, 0.82],
  sizeLabel: { sk: "Digitálna – min. 600 × 750 px", en: "Digital – min. 600 × 750 px" },
  fileLabel: { sk: "JPEG, 50 KB – 10 MB, farebná, bez filtrov", en: "JPEG, 50 KB – 10 MB, colour, no filters" },
  headLabel: { sk: "Hlava aj ramená v zábere", en: "Head and shoulders in frame" },
  bg: { sk: "Svetlé pozadie – biele, krémové alebo svetlosivé.", en: "Light background – white, cream or light grey." },
  glasses: { sk: "Okuliare zložte (odlesky kazia rozpoznanie tváre).", en: "Remove glasses (glare disrupts face recognition)." },
  expression: { sk: "Neutrálny výraz, bez úsmevu, ústa zatvorené.", en: "Neutral expression, no smile, mouth closed." },
  recent: { sk: "Nie staršia ako 30 dní.", en: "No older than 30 days." },
  extra: [
    { sk: "Druhá fotka: dátová strana pasu (vrátane MRZ).", en: "Second photo: passport data page (incl. MRZ)." },
    { sk: "Bez filtrov, šperkov na tvári a efektu červených očí.", en: "No filters, facial jewellery or red-eye." },
  ],
};

const EU: DestSpec = {
  code: "EU",
  label: { sk: "Schengen / EÚ – vízum", en: "Schengen / EU – visa" },
  frameW: 35, frameH: 45, unit: "mm", tick: 5, headPct: [0.7, 0.8],
  sizeLabel: { sk: "35 × 45 mm", en: "35 × 45 mm" },
  fileLabel: { sk: "JPEG, vysoké rozlíšenie (pri tlači 600 DPI)", en: "JPEG, high resolution (600 DPI when printed)" },
  headLabel: { sk: "Tvár 70–80 % · hlava 32–36 mm (brada–temeno)", en: "Face 70–80% · head 32–36 mm (chin–crown)" },
  bg: { sk: "Biele alebo svetlosivé, jednofarebné.", en: "White or light grey, plain." },
  glasses: { sk: "Len číre okuliare bez odleskov — radšej zložte.", en: "Only clear glasses without glare — better remove them." },
  expression: { sk: "Neutrálny výraz, ústa zatvorené, bez úsmevu.", en: "Neutral expression, mouth closed, no smile." },
  recent: { sk: "Nie staršia ako 6 mesiacov.", en: "No older than 6 months." },
  extra: [
    { sk: "Náboženská pokrývka len ak je tvár úplne voľná.", en: "Religious covering only if the face stays fully visible." },
    { sk: "Bez tieňov za hlavou a efektu červených očí.", en: "No shadows behind the head and no red-eye." },
  ],
};

const IN: DestSpec = {
  code: "IN",
  label: { sk: "India – e-Visa", en: "India – e-Visa" },
  frameW: 51, frameH: 51, unit: "mm", tick: 10, headPct: [0.6, 0.8],
  sizeLabel: { sk: "51 × 51 mm (štvorec)", en: "51 × 51 mm (square)" },
  fileLabel: { sk: "JPEG, min. 350 × 350 px", en: "JPEG, min. 350 × 350 px" },
  headLabel: { sk: "Tvár vycentrovaná, celá hlava v zábere", en: "Face centred, whole head in frame" },
  bg: { sk: "Biele, jednofarebné.", en: "White, plain." },
  glasses: { sk: "Radšej bez okuliarov, bez odleskov.", en: "Preferably no glasses, no glare." },
  expression: { sk: "Neutrálny výraz, ústa zatvorené.", en: "Neutral expression, mouth closed." },
  recent: { sk: "Aktuálna fotka.", en: "Recent photo." },
  extra: [{ sk: "Druhá fotka: dátová strana pasu.", en: "Second photo: passport data page." }],
};

const GENERIC: DestSpec = {
  code: "generic",
  label: { sk: "Cestovné povolenie / e-Visa", en: "Travel authorisation / e-Visa" },
  frameW: 35, frameH: 45, unit: "mm", tick: 5, headPct: [0.7, 0.8],
  sizeLabel: { sk: "35 × 45 mm (bežný štandard)", en: "35 × 45 mm (common standard)" },
  fileLabel: { sk: "JPEG, podľa portálu danej krajiny", en: "JPEG, per the country's portal" },
  headLabel: { sk: "Tvár 70–80 %, hlava vycentrovaná", en: "Face 70–80%, head centred" },
  bg: { sk: "Biele alebo svetlé, jednofarebné.", en: "White or light, plain." },
  glasses: { sk: "Radšej bez okuliarov, bez odleskov.", en: "Preferably no glasses, no glare." },
  expression: { sk: "Neutrálny výraz, ústa zatvorené.", en: "Neutral expression, mouth closed." },
  recent: { sk: "Nie staršia ako 6 mesiacov.", en: "No older than 6 months." },
  extra: [{ sk: "Presné rozmery podľa oficiálneho portálu krajiny.", en: "Exact size per the country's official portal." }],
};

const BY_CODE: Record<string, DestSpec> = { US, GB, EU, IN };

export function getPhotoSpec(country?: string): DestSpec {
  if (!country) return GENERIC;
  return BY_CODE[country.toUpperCase()] || GENERIC;
}
