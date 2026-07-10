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
                sk: `Službu prevádzkuje ${site.company.legalName}, IČO ${site.company.ico}, IČ DPH ${site.company.icDph}, so sídlom ${site.company.address}. ${site.company.register}. Údaje si môžete overiť vo verejnom živnostenskom registri Slovenskej republiky. Sme registrovaný slovenský podnikateľ s reálnou adresou, telefónom aj podporou v slovenčine.`,
                en: `The service is operated by ${site.company.legalName}, company ID ${site.company.ico}, VAT ID ${site.company.icDph}, registered at ${site.company.address}. Our details can be verified in the public trade register of the Slovak Republic. We are a registered Slovak business with a real address, phone number and human support.`,
                uk: `Послугу надає ${site.company.legalName}, ІН ${site.company.ico}, ПДВ ${site.company.icDph}, адреса ${site.company.address}. Дані можна перевірити в публічному реєстрі Словацької Республіки. Ми зареєстрований словацький підприємець із реальною адресою, телефоном і живою підтримкою.`,
                de: `Der Dienst wird betrieben von ${site.company.legalName}, Firmennummer ${site.company.ico}, USt-IdNr. ${site.company.icDph}, mit Sitz in ${site.company.address}. Die Angaben können im öffentlichen Gewerberegister der Slowakischen Republik überprüft werden. Wir sind ein registriertes slowakisches Unternehmen mit echter Adresse, Telefonnummer und persönlichem Support.`,
              })}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {t({
                sk: `Cena ${money(productPrice(product), lang)} je konečná, s DPH. Tvorí ju štátny poplatok ${money(product.govFee, lang)}, ktorý odvádzame priamo úradu, a poplatok za sprostredkovanie ${money(product.serviceFee, lang)} za ručnú kontrolu, podanie žiadosti, sledovanie stavu a podporu. Nič sa nedopláca a cenu poznáte vopred.`,
                en: `The price of ${money(productPrice(product), lang)} is final, including VAT. It consists of the government fee of ${money(product.govFee, lang)}, which we pay directly to the authority, and the service fee of ${money(product.serviceFee, lang)} for the manual check, filing, status monitoring and support. Nothing is added later and you know the price upfront.`,
                uk: `Ціна ${money(productPrice(product), lang)} остаточна, з ПДВ. Її складають державне мито ${money(product.govFee, lang)}, яке ми сплачуємо органу, і сервісний збір ${money(product.serviceFee, lang)} за ручну перевірку, подання, відстеження статусу та підтримку. Жодних доплат, ціну знаєте наперед.`,
                de: `Der Preis von ${money(productPrice(product), lang)} ist endgültig, inklusive MwSt. Er setzt sich aus der Amtsgebühr von ${money(product.govFee, lang)}, die wir direkt an die Behörde abführen, und der Servicegebühr von ${money(product.serviceFee, lang)} für die manuelle Prüfung, Einreichung, Statusverfolgung und den Support zusammen. Es kommt nichts hinzu, und Sie kennen den Preis im Voraus.`,
              })}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
