export type UpdateCategory = "delay" | "new_requirement" | "price" | "closure" | "general";
export type UpdateSeverity = "info" | "warning" | "critical";

export interface VisaUpdate {
  id: string;
  created_at: string;
  published_at: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  countries: string[];
  category: UpdateCategory;
  severity: UpdateSeverity;
  restrictions: string;
  source_url: string;
  published: boolean;
}

export const CATEGORY_LABEL: Record<UpdateCategory, { sk: string; en: string }> = {
  delay: { sk: "Odklad / pozastavenie", en: "Delay / suspension" },
  new_requirement: { sk: "Nová požiadavka", en: "New requirement" },
  price: { sk: "Zmena ceny", en: "Price change" },
  closure: { sk: "Uzávierka / obmedzenie", en: "Closure / restriction" },
  general: { sk: "Všeobecná novinka", en: "General update" },
};

export const SEVERITY_STYLE: Record<UpdateSeverity, string> = {
  info: "border-teal/30 bg-teal/[0.06] text-teal",
  warning: "border-brass/40 bg-brass/[0.08] text-brass",
  critical: "border-terra/40 bg-terra/[0.08] text-terra",
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}
