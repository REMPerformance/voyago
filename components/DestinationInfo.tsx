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
    "{gov}": money(product.govFee, lang),
    "{service}": money(product.serviceFee, lang),
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

          {/* Transparentnosť: kto sme a čo si účtujeme */}
          <article className="rounded-2xl border border-line bg-paper/50 p-5">
            <h3 className="font-display text-base font-bold text-ink">
              {t({ sk: "Kto vašu žiadosť vybavuje", en: "Who handles your application", uk: "Хто оформлює вашу заяву", de: "Wer Ihren Antrag bearbeitet" })}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t({
                sk: `Službu prevádzkuje ${site.company.legalName}, IČO ${site.company.ico}, so sídlom ${site.company.address}. ${site.company.register}. Sme súkromný sprostredkovateľ, nie štátny orgán ani oficiálny vládny portál. Údaje si môžete overiť vo verejnom živnostenskom registri Slovenskej republiky.`,
                en: `The service is operated by ${site.company.legalName}, company ID ${site.company.ico}, registered at ${site.company.address}. We are a private intermediary, not a government authority or an official government portal. Our details can be verified in the public trade register of the Slovak Republic.`,
                uk: `Послугу надає ${site.company.legalName}, ІН ${site.company.ico}, адреса ${site.company.address}. Ми приватний посередник, а не державний орган чи офіційний урядовий портал. Дані можна перевірити в публічному реєстрі Словацької Республіки.`,
                de: `Der Dienst wird betrieben von ${site.company.legalName}, Firmennummer ${site.company.ico}, mit Sitz in ${site.company.address}. Wir sind ein privater Vermittler, keine Behörde und kein offizielles Regierungsportal. Unsere Angaben können im öffentlichen Gewerberegister der Slowakischen Republik überprüft werden.`,
              })}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t({
                sk: `Z ceny ${money(productPrice(product), lang)} tvorí ${money(product.govFee, lang)} štátny poplatok, ktorý odvádzame úradu, a ${money(product.serviceFee, lang)} je náš poplatok za sprostredkovanie. Rovnakú žiadosť si viete podať aj sami priamo na oficiálnom portáli a zaplatiť len štátny poplatok.`,
                en: `Of the ${money(productPrice(product), lang)} price, ${money(product.govFee, lang)} is the government fee we pay to the authority and ${money(product.serviceFee, lang)} is our service fee. You can submit the same application yourself on the official portal and pay only the government fee.`,
                uk: `З ціни ${money(productPrice(product), lang)} становить ${money(product.govFee, lang)} державне мито, яке ми сплачуємо органу, а ${money(product.serviceFee, lang)} це наш сервісний збір. Ту саму заяву ви можете подати самостійно на офіційному порталі, сплативши лише мито.`,
                de: `Von den ${money(productPrice(product), lang)} entfallen ${money(product.govFee, lang)} auf die Amtsgebühr, die wir an die Behörde abführen, und ${money(product.serviceFee, lang)} auf unsere Servicegebühr. Denselben Antrag können Sie selbst über das offizielle Portal stellen und nur die Amtsgebühr zahlen.`,
              })}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
