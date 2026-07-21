"use client";

import { Building2, BadgePercent, Zap, FileText, Users2, Headset } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { useLang } from "@/lib/i18n";

export function B2BContent() {
  const { t } = useLang();

  const benefits = [
    {
      icon: <BadgePercent size={18} />,
      t: t({ sk: "Zvýhodnené ceny pri objeme", en: "Volume-based pricing", uk: "Знижки за обсяг", de: "Mengenrabatte" }),
      d: t({
        sk: "Pri stálom odbere pripravíme individuálny cenník. Čím viac ciest ročne, tým lepšie podmienky. Ceny na opýtanie.",
        en: "For regular cooperation we prepare an individual price list. The more trips per year, the better the terms. Prices on request.",
        uk: "Для постійної співпраці готуємо індивідуальний прайс. Що більше поїздок на рік, то кращі умови. Ціни за запитом.",
        de: "Bei regelmäßiger Zusammenarbeit erstellen wir eine individuelle Preisliste. Je mehr Reisen pro Jahr, desto bessere Konditionen. Preise auf Anfrage.",
      }),
    },
    {
      icon: <Zap size={18} />,
      t: t({ sk: "Prioritné spracovanie", en: "Priority processing", uk: "Пріоритетне опрацювання", de: "Vorrangige Bearbeitung" }),
      d: t({
        sk: "Firemné žiadosti spracúvame prednostne. Ak služobná cesta začína o tri dni, vieme, čo to znamená.",
        en: "Corporate applications are handled first. If a business trip starts in three days, we know what that means.",
        uk: "Корпоративні заяви опрацьовуємо першочергово. Якщо відрядження за три дні, ми розуміємо, що це означає.",
        de: "Firmenanträge bearbeiten wir vorrangig. Wenn die Dienstreise in drei Tagen beginnt, wissen wir, was das bedeutet.",
      }),
    },
    {
      icon: <FileText size={18} />,
      t: t({ sk: "Jedna faktúra, poriadok v dokladoch", en: "One invoice, clean bookkeeping", uk: "Один рахунок, порядок у документах", de: "Eine Rechnung, saubere Buchhaltung" }),
      d: t({
        sk: "Mesačná fakturácia na firmu namiesto desiatok platieb kartou. Súčasťou je prehľad vybavených povolení.",
        en: "Monthly invoicing to your company instead of dozens of card payments, including an overview of issued permits.",
        uk: "Щомісячне виставлення рахунків замість десятків платежів карткою, разом з оглядом оформлених дозволів.",
        de: "Monatliche Rechnungsstellung an Ihr Unternehmen statt dutzender Kartenzahlungen, inklusive Übersicht der erteilten Genehmigungen.",
      }),
    },
    {
      icon: <Users2 size={18} />,
      t: t({ sk: "Hromadné žiadosti", en: "Bulk applications", uk: "Групові заяви", de: "Sammelanträge" }),
      d: t({
        sk: "Celý tím na veľtrh do USA alebo montážnici do Kórey. Pošlete zoznam, my vybavíme všetkých naraz.",
        en: "A whole team heading to a US trade fair, or technicians to Korea. Send us the list and we handle everyone at once.",
        uk: "Уся команда на виставку до США або монтажники до Кореї. Надішліть список, і ми оформимо всіх одночасно.",
        de: "Ein ganzes Team zur Messe in die USA oder Monteure nach Korea. Senden Sie uns die Liste, wir erledigen alle auf einmal.",
      }),
    },
    {
      icon: <Headset size={18} />,
      t: t({ sk: "Vyhradený kontakt", en: "A dedicated contact", uk: "Виділений контакт", de: "Fester Ansprechpartner" }),
      d: t({
        sk: "Žiadne call centrum. Máte jedného človeka, ktorý pozná vašu firmu a odpovedá prednostne.",
        en: "No call centre. You have one person who knows your company and replies with priority.",
        uk: "Жодного колл-центру. У вас є одна людина, яка знає вашу компанію та відповідає першочергово.",
        de: "Kein Callcenter. Sie haben eine Person, die Ihr Unternehmen kennt und vorrangig antwortet.",
      }),
    },
    {
      icon: <Building2 size={18} />,
      t: t({ sk: "Pre cestovné kancelárie a agentúry", en: "For travel agencies", uk: "Для турагенцій", de: "Für Reisebüros" }),
      d: t({
        sk: "Vybavujeme aj pre cestovné kancelárie a relokačné agentúry. Povolenia pre vašich klientov pod vašou alebo našou značkou.",
        en: "We also serve travel agencies and relocation agencies. Permits for your clients under your brand or ours.",
        uk: "Працюємо також з турагенціями та релокаційними агенціями. Дозволи для ваших клієнтів під вашим або нашим брендом.",
        de: "Wir arbeiten auch für Reisebüros und Relocation-Agenturen. Genehmigungen für Ihre Kunden unter Ihrer oder unserer Marke.",
      }),
    },
  ];

  return (
    <section className="container-page py-14">
      <div className="grid items-start gap-12 grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">{t({ sk: "Pre firmy", en: "For companies", uk: "Для компаній", de: "Für Unternehmen" })}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {t({
              sk: "Služobné cesty bez čakania na víza",
              en: "Business trips without waiting on visas",
              uk: "Відрядження без очікування на візи",
              de: "Dienstreisen ohne Warten auf Visa",
            })}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            {t({
              sk: "Vybavujeme víza a cestovné povolenia pre zamestnancov firiem, od jednorazových ciest po stály odber s individuálnymi cenami. Vy sa venujete podnikaniu, administratívu prevezmeme my.",
              en: "We arrange visas and travel authorizations for company employees, from one-off trips to ongoing cooperation with individual pricing. You focus on business, we take over the paperwork.",
              uk: "Оформлюємо візи та дозволи на подорож для працівників компаній, від разових поїздок до постійної співпраці з індивідуальними цінами. Ви займаєтесь бізнесом, ми беремо на себе документи.",
              de: "Wir organisieren Visa und Reisegenehmigungen für Mitarbeitende von Unternehmen, von einmaligen Reisen bis zur laufenden Zusammenarbeit mit individuellen Preisen. Sie kümmern sich ums Geschäft, wir übernehmen den Papierkram.",
            })}
          </p>

          <h2 className="mt-10 font-display text-2xl font-bold">
            {t({ sk: "Čo pre vás zabezpečíme", en: "What we provide", uk: "Що ми забезпечуємо", de: "Was wir bieten" })}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.t} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{b.icon}</span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{b.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">
            {t({ sk: "Nezáväzný dopyt", en: "Non-binding enquiry", uk: "Необов'язковий запит", de: "Unverbindliche Anfrage" })}
          </h2>
          <p className="mb-4 mt-1 text-sm text-ink-soft">
            {t({
              sk: "Ozveme sa do 24 hodín s ponukou na mieru.",
              en: "We will get back to you within 24 hours with a tailored offer.",
              uk: "Ми відповімо протягом 24 годин з індивідуальною пропозицією.",
              de: "Wir melden uns innerhalb von 24 Stunden mit einem maßgeschneiderten Angebot.",
            })}
          </p>
          <LeadForm
            endpoint="/api/b2b"
            cta={t({ sk: "Odoslať dopyt", en: "Send enquiry", uk: "Надіслати запит", de: "Anfrage senden" })}
            success={t({
              sk: "Ďakujeme. Ozveme sa vám do 24 hodín.",
              en: "Thank you. We will get back to you within 24 hours.",
              uk: "Дякуємо. Ми зв'яжемося з вами протягом 24 годин.",
              de: "Vielen Dank. Wir melden uns innerhalb von 24 Stunden.",
            })}
            fields={[
              { key: "company", label: t({ sk: "Názov firmy *", en: "Company name *", uk: "Назва компанії *", de: "Firmenname *" }), required: true },
              { key: "ico", label: t({ sk: "IČO (voliteľné)", en: "Company ID (optional)", uk: "ЄДРПОУ (необов'язково)", de: "Firmennummer (optional)" }) },
              { key: "email", label: t({ sk: "Firemný e-mail *", en: "Company e-mail *", uk: "Корпоративна пошта *", de: "Firmen-E-Mail *" }), type: "email", required: true },
              { key: "phone", label: t({ sk: "Telefón", en: "Phone", uk: "Телефон", de: "Telefon" }) },
              {
                key: "volume",
                label: t({ sk: "Približný počet ciest ročne", en: "Approximate trips per year", uk: "Приблизна кількість поїздок на рік", de: "Ungefähre Reisen pro Jahr" }),
                type: "select",
                options: [
                  t({ sk: "1–10 ciest", en: "1–10 trips", uk: "1–10 поїздок", de: "1–10 Reisen" }),
                  t({ sk: "10–50 ciest", en: "10–50 trips", uk: "10–50 поїздок", de: "10–50 Reisen" }),
                  t({ sk: "50–200 ciest", en: "50–200 trips", uk: "50–200 поїздок", de: "50–200 Reisen" }),
                  t({ sk: "200+ ciest", en: "200+ trips", uk: "200+ поїздок", de: "200+ Reisen" }),
                  t({ sk: "Sme cestovka alebo agentúra", en: "We are a travel agency", uk: "Ми турагенція", de: "Wir sind ein Reisebüro" }),
                ],
              },
              {
                key: "message",
                label: t({
                  sk: "Do akých krajín cestujete a čo potrebujete?",
                  en: "Which countries do you travel to and what do you need?",
                  uk: "До яких країн ви подорожуєте і що вам потрібно?",
                  de: "In welche Länder reisen Sie und was benötigen Sie?",
                }),
                type: "textarea",
              },
            ]}
          />
          <p className="mt-3 text-xs text-ink-soft/70">
            {t({
              sk: "Odoslaním súhlasíte so spracovaním údajov na účely odpovede na dopyt.",
              en: "By submitting you agree to your data being processed in order to answer your enquiry.",
              uk: "Надсилаючи запит, ви погоджуєтесь на обробку даних для відповіді.",
              de: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Beantwortung der Anfrage zu.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
