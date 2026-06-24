// Jednotné stavy objednávky/žiadosti – zdieľané medzi /stav (verejné sledovanie) a adminom.
// Kľúče (new/processing/submitted/done/needs_info/rejected) sa NESMÚ meniť – sú v databáze.

export type Loc = { sk: string; en: string };
export type OrderStatus = "new" | "processing" | "submitted" | "done" | "needs_info" | "rejected";

// Hlavná postupnosť ("loading stages")
export const ORDER_STAGES: { key: OrderStatus; label: Loc; desc: Loc }[] = [
  { key: "new", label: { sk: "Prijaté", en: "Received" }, desc: { sk: "Vašu objednávku sme prijali a evidujeme.", en: "We have received and logged your order." } },
  { key: "processing", label: { sk: "Spracúva sa", en: "In review" }, desc: { sk: "Kontrolujeme zadané údaje a doklady.", en: "We are checking your details and documents." } },
  { key: "submitted", label: { sk: "Podané úradu", en: "Submitted" }, desc: { sk: "Žiadosť sme podali príslušnému úradu.", en: "Your application was submitted to the authority." } },
  { key: "done", label: { sk: "Vybavené", en: "Completed" }, desc: { sk: "Povolenie je vybavené — posielame ho e-mailom.", en: "Your authorization is ready — we'll email it to you." } },
];

// Vedľajšie stavy (mimo postupnosti)
export const ORDER_SIDE: Record<"needs_info" | "rejected", { label: Loc; desc: Loc; tone: "warn" | "error" }> = {
  needs_info: {
    label: { sk: "Potrebné doplniť", en: "Action needed" },
    desc: { sk: "Potrebujeme od vás doplniť údaje — pozrite si, prosím, e-mail.", en: "We need additional information — please check your email." },
    tone: "warn",
  },
  rejected: {
    label: { sk: "Zamietnuté úradom", en: "Rejected" },
    desc: { sk: "Žiadosť bola úradom zamietnutá. Kontaktujte nás pre ďalší postup.", en: "The application was rejected by the authority. Please contact us." },
    tone: "error",
  },
};

// Poradie pre admin dropdown
export const ALL_STATUSES: OrderStatus[] = ["new", "processing", "submitted", "done", "needs_info", "rejected"];

export function stageIndex(status: string): number {
  return ORDER_STAGES.findIndex((s) => s.key === status);
}

export function isSideStatus(status: string): status is "needs_info" | "rejected" {
  return status === "needs_info" || status === "rejected";
}

export function statusLabel(status: string, lang: "sk" | "en" = "sk"): string {
  const main = ORDER_STAGES.find((s) => s.key === status);
  if (main) return main.label[lang];
  if (isSideStatus(status)) return ORDER_SIDE[status].label[lang];
  return status;
}
