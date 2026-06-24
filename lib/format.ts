import { site } from "@/config/site";
import type { Lang } from "@/config/products";

// Formátovanie ceny podľa jazyka (napr. "55 €").
export function money(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(site.locale[lang], {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
