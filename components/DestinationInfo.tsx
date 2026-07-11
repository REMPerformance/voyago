"use client";

import { useLang } from "@/lib/i18n";
import { money } from "@/lib/format";
import { DESTINATION_COPY } from "@/config/destinationCopy";
import type { Product } from "@/config/products";
import { productPrice } from "@/config/products";
import { site } from "@/config/site";

/**
 * Informačná sekcia pod formulárom. Dáva stránke destinácie skutočný obsah,
 * ktorý Google vie zaindexovať, a zároveň zákazníkovi vysvetlí, čo si kupuje.
 */
export function DestinationInfo({ product }: { product: Product }) {
  const { t, lang } = useLang();
  const blocks = DESTINATION_COPY[product.type];
  if (!blocks) return null;

  const vars: Record<string, string> = {
    "{country}": t(product.destination),
    "{permit}": t(product.name).split("–").pop()?.trim() || t(product.name),
    "{validity}": t(product.validity),
    "{processing}": t(product.processingDays),
    "{stay}": product.stay ? t(product.stay) : t({ sk: "podľa rozhodnutia úradu", en: "as decided by the authority", uk: "за рішенням органу", de: "nach Entscheidung der Behörde" }),
    "{price}": money(productPrice(product), lang),
  };

  const fill = (s: string) => Object.entries(vars).reduce((acc, [k, v]) => acc.split(k).join(v), s);

  return (
    <section className="container-page border-t border-line py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {fill(
            t({
              sk: "{permit} do krajiny {country}: čo potrebujete vedieť",
              en: "{permit} for {country}: what you need to know",
              uk: "{permit} до країни {country}: що треба знати",
              de: "{permit} für {country}: was Sie wissen sollten",
            }),
          )}
        </h2>

        <div className="mt-8 space-y-9">
          {blocks.map((b, i) => (
            <article key={i}>
              <h3 className="font-display text-lg font-bold text-ink">{fill(t(b.heading))}</h3>
              <div className="mt-2.5 space-y-3">
                {b.body.map((p, k) => (
                  <p key={k} className="text-[0.95rem] leading-relaxed text-ink-soft">
                    {fill(t(p))}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {product.facts && product.facts.length > 0 && (
            <article>
              <h3 className="font-display text-lg font-bold text-ink">
                {t({ sk: "Dobré vedieť", en: "Good to know", uk: "Корисно знати", de: "Gut zu wissen" })}
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {product.facts.map((f, i) => (
                  <li key={i} className="flex gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                    {t(f)}
                  </li>
                ))}
              </ul>
            </article>
          )}

        </div>
      </div>
    </section>
  );
}
