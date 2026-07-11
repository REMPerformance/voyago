"use client";

import Link from "next/link";
import { Umbrella, Check, X, ArrowRight, FileCheck, RefreshCw, Clock } from "lucide-react";
import { PROTECTION_FEE } from "@/config/products";
import { site } from "@/config/site";
import { useLang } from "@/lib/i18n";

export function ProtectionContent() {
  const { t } = useLang();
  const F = PROTECTION_FEE;

  const covered = [
    t({
      sk: "Úrad žiadosť zamietne, hoci ste poskytli pravdivé, správne a úplné údaje aj podklady.",
      en: "The authority refuses the application even though you provided truthful, correct and complete details and documents.",
      uk: "Орган відхиляє заяву, хоча ви надали правдиві, правильні та повні дані й документи.",
      de: "Die Behörde lehnt den Antrag ab, obwohl Sie wahrheitsgemäße, korrekte und vollständige Angaben gemacht haben.",
    }),
    t({
      sk: "Zamietnutie na základe voľnej úvahy úradu pri riadne podanej žiadosti.",
      en: "A refusal based on the authority's discretion despite a properly submitted application.",
      uk: "Відмова на розсуд органу попри належно подану заяву.",
      de: "Eine Ablehnung nach Ermessen der Behörde trotz ordnungsgemäß eingereichtem Antrag.",
    }),
    t({
      sk: "Vrátime celú pôvodne uhradenú sumu v plnej výške.",
      en: "We refund the full amount you originally paid.",
      uk: "Ми повертаємо всю початково сплачену суму в повному обсязі.",
      de: "Wir erstatten den vollen ursprünglich gezahlten Betrag.",
    }),
  ];

  const notCovered = [
    t({
      sk: "Nesprávne, neúplné alebo nepravdivé údaje či podklady z vašej strany.",
      en: "Incorrect, incomplete or untruthful details or documents provided by you.",
      uk: "Неправильні, неповні або неправдиві дані чи документи з вашого боку.",
      de: "Von Ihnen bereitgestellte falsche, unvollständige oder unwahre Angaben oder Unterlagen.",
    }),
    t({
      sk: "Zatajené skutočnosti, napríklad predchádzajúce zamietnutia, zákazy vstupu, trestná minulosť či prekročenia pobytu.",
      en: "Concealed facts such as previous refusals, entry bans, criminal record or overstays.",
      uk: "Приховані факти, як-от попередні відмови, заборони в'їзду, судимість чи перевищення терміну перебування.",
      de: "Verschwiegene Tatsachen wie frühere Ablehnungen, Einreiseverbote, Vorstrafen oder Überschreitungen der Aufenthaltsdauer.",
    }),
    t({
      sk: "Nedostavenie sa na pohovor alebo biometriu, nedodanie vyžiadaných podkladov, stiahnutie žiadosti.",
      en: "Failing to attend an interview or biometrics, not supplying requested documents, or withdrawing the application.",
      uk: "Неявка на співбесіду чи біометрію, ненадання запитаних документів, відкликання заяви.",
      de: "Nichterscheinen zum Interview oder zur Biometrie, Nichtvorlage angeforderter Unterlagen oder Rücknahme des Antrags.",
    }),
    t({
      sk: "Neplatný alebo poškodený cestovný doklad.",
      en: "An invalid or damaged travel document.",
      uk: "Недійсний або пошкоджений проїзний документ.",
      de: "Ein ungültiges oder beschädigtes Reisedokument.",
    }),
    t({
      sk: "Prihlášky do americkej DV lotérie (zelená karta). Na tie sa ochrana nevzťahuje.",
      en: "Entries to the US DV lottery (green card). Protection does not apply to those.",
      uk: "Заявки на американську DV лотерею (грін-карта). Захист на них не поширюється.",
      de: "Anmeldungen zur US-DV-Lotterie (Green Card). Der Schutz gilt hierfür nicht.",
    }),
    t({
      sk: `Samotný poplatok ${F} € a príplatok za expresné spracovanie, tie sú nevratné.`,
      en: `The ${F} € fee itself and the express processing surcharge, which are non-refundable.`,
      uk: `Сам збір ${F} € та доплата за термінове опрацювання, вони не повертаються.`,
      de: `Die Gebühr von ${F} € selbst sowie der Express-Aufschlag, diese sind nicht erstattungsfähig.`,
    }),
  ];

  const steps = [
    {
      icon: <FileCheck size={18} />,
      t: t({ sk: "Pridáte k žiadosti", en: "Add it to your application", uk: "Додаєте до заяви", de: "Zum Antrag hinzufügen" }),
      d: t({
        sk: `Pri vypĺňaní žiadosti alebo v košíku zapnete prepínač Ochrana kupujúceho, ${F} € za každého cestujúceho.`,
        en: `While filling in the application or in the cart you switch on Buyer protection, ${F} € per traveller.`,
        uk: `Під час заповнення заяви або в кошику вмикаєте Захист покупця, ${F} € за кожного мандрівника.`,
        de: `Beim Ausfüllen des Antrags oder im Warenkorb aktivieren Sie den Käuferschutz, ${F} € pro reisender Person.`,
      }),
    },
    {
      icon: <Clock size={18} />,
      t: t({ sk: "Ak príde zamietnutie", en: "If a refusal arrives", uk: "Якщо надійде відмова", de: "Falls eine Ablehnung kommt" }),
      d: t({
        sk: "Pošlete nám rozhodnutie úradu o zamietnutí e-mailom do 14 dní od doručenia. Nič iné netreba.",
        en: "Send us the authority's refusal decision by e-mail within 14 days of receiving it. Nothing else is needed.",
        uk: "Надішліть нам рішення про відмову електронною поштою протягом 14 днів. Більше нічого не потрібно.",
        de: "Senden Sie uns den Ablehnungsbescheid innerhalb von 14 Tagen nach Erhalt per E-Mail. Mehr ist nicht nötig.",
      }),
    },
    {
      icon: <RefreshCw size={18} />,
      t: t({ sk: "Vrátime pôvodnú sumu", en: "We refund the original amount", uk: "Повертаємо початкову суму", de: "Wir erstatten den ursprünglichen Betrag" }),
      d: t({
        sk: "Po overení podmienok vám do 14 dní vrátime celú pôvodnú sumu rovnakým spôsobom, akým ste platili.",
        en: "After verifying the conditions we refund the full original amount within 14 days, using your original payment method.",
        uk: "Після перевірки умов повертаємо всю початкову суму протягом 14 днів тим самим способом оплати.",
        de: "Nach Prüfung der Bedingungen erstatten wir den vollen Betrag innerhalb von 14 Tagen über Ihr ursprüngliches Zahlungsmittel.",
      }),
    },
  ];

  return (
    <section className="container-page py-14">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-lg bg-brass/12 px-3 py-1.5 text-xs font-bold text-brass">
          <Umbrella size={14} /> {t({ sk: "Doplnková služba", en: "Optional add-on", uk: "Додаткова послуга", de: "Zusatzleistung" })} · {F} €{" "}
          / {t({ sk: "osoba", en: "person", uk: "особа", de: "Person" })}
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
          {t({ sk: "Ochrana kupujúceho", en: "Buyer protection", uk: "Захист покупця", de: "Käuferschutz" })}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {t({
            sk: "Zamietnutie žiadosti je zriedkavé, no keď príde, úrad zaplatenú sumu nevracia. S Ochranou kupujúceho vám v takom prípade vrátime celú pôvodne uhradenú sumu, ak ste nám poskytli správne a pravdivé údaje.",
            en: "Refusals are rare, but when one comes, the authority does not return the government fee. With Buyer protection we refund the full original amount, provided you gave us correct and truthful details.",
            uk: "Відмови трапляються рідко, але держмито орган не повертає. Із Захистом покупця ми повернемо всю початкову суму, якщо ви надали правильні та правдиві дані.",
            de: "Ablehnungen sind selten, doch die Amtsgebühr wird nicht erstattet. Mit dem Käuferschutz erstatten wir den vollen ursprünglichen Betrag, sofern Sie korrekte und wahrheitsgemäße Angaben gemacht haben.",
          })}
        </p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">
        {t({ sk: "Ako to funguje", en: "How it works", uk: "Як це працює", de: "So funktioniert es" })}
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={i} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{s.icon}</span>
              <span className="font-display text-2xl font-extrabold text-ink/10">0{i + 1}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-bold text-ink">{s.t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-green/30 bg-green/[0.05] p-6 sm:p-7">
          <h2 className="font-display text-lg font-bold text-ink">
            {t({ sk: "Čo ochrana kryje", en: "What protection covers", uk: "Що покриває захист", de: "Was der Schutz abdeckt" })}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {covered.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-green" /> {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-terra/30 bg-terra/[0.04] p-6 sm:p-7">
          <h2 className="font-display text-lg font-bold text-ink">
            {t({ sk: "Na čo sa nevzťahuje", en: "What it does not cover", uk: "На що не поширюється", de: "Was nicht abgedeckt ist" })}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {notCovered.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <X size={16} className="mt-0.5 shrink-0 text-terra" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper/50 p-6 text-sm leading-relaxed text-ink-soft">
        <strong className="text-ink">{t({ sk: "V skratke:", en: "In short:", uk: "Коротко:", de: "Kurz gesagt:" })}</strong>{" "}
        {t({
          sk: "ochrana je férová poistka proti rozhodnutiu úradu, nie proti chybám v žiadosti. Tie za vás však chytáme kontrolou pred podaním. Presné podmienky, lehoty a výluky nájdete v obchodných podmienkach (čl. 8).",
          en: "protection is a fair safeguard against the authority's decision, not against mistakes in the application. Those we catch for you during the pre-submission check. Exact terms, deadlines and exclusions are in our terms and conditions (art. 8).",
          uk: "захист це справедлива гарантія проти рішення органу, а не проти помилок у заяві. Їх ми виявляємо під час перевірки перед поданням. Точні умови, строки та винятки в умовах (ст. 8).",
          de: "Der Schutz ist eine faire Absicherung gegen die Entscheidung der Behörde, nicht gegen Fehler im Antrag. Diese fangen wir bei der Prüfung vor der Einreichung ab. Genaue Bedingungen, Fristen und Ausschlüsse finden Sie in den AGB (Art. 8).",
        })}{" "}
        <Link href="/obchodne-podmienky" className="font-semibold text-brass underline underline-offset-2">
          {t({ sk: "Obchodné podmienky", en: "Terms and conditions", uk: "Умови", de: "AGB" })}
        </Link>
        . {t({ sk: "Nárok sa uplatňuje e-mailom na", en: "Claims are submitted by e-mail to", uk: "Претензія подається на", de: "Ansprüche werden per E-Mail gesendet an" })}{" "}
        {site.email}
        {t({
          sk: " do 14 dní od doručenia rozhodnutia. Vraciame do 14 dní od overenia, maximálne raz na jednu žiadosť a najviac do výšky pôvodnej sumy.",
          en: " within 14 days of receiving the decision. We refund within 14 days of verification, once per application and up to the original amount.",
          uk: " протягом 14 днів з моменту отримання рішення. Повертаємо протягом 14 днів після перевірки, один раз на заяву, до розміру початкової суми.",
          de: " innerhalb von 14 Tagen nach Erhalt der Entscheidung. Wir erstatten innerhalb von 14 Tagen nach Prüfung, einmal pro Antrag und maximal bis zur Höhe des ursprünglichen Betrags.",
        })}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">
            {t({
              sk: "Pridajte si ochranu k najbližšej ceste",
              en: "Add protection to your next trip",
              uk: "Додайте захист до наступної поїздки",
              de: "Fügen Sie den Schutz Ihrer nächsten Reise hinzu",
            })}
          </h2>
          <p className="mt-1 text-cream/70">
            {t({
              sk: `Prepínač nájdete priamo pri žiadosti, ${F} € s DPH za osobu.`,
              en: `You will find the switch right in the application, ${F} € incl. VAT per person.`,
              uk: `Перемикач знайдете просто в заяві, ${F} € з ПДВ за особу.`,
              de: `Den Schalter finden Sie direkt im Antrag, ${F} € inkl. MwSt. pro Person.`,
            })}
          </p>
        </div>
        <Link href="/destinations" className="btn-accent shrink-0">
          {t({ sk: "Vybrať destináciu", en: "Choose a destination", uk: "Обрати напрямок", de: "Reiseziel wählen" })} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
