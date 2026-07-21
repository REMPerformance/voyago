"use client";

import Link from "next/link";
import { Compass, ShieldCheck, HeartHandshake, MapPinned, ArrowRight, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/config/site";

export function AboutContent() {
  const { t } = useLang();

  const values = [
    {
      icon: <ShieldCheck size={20} />,
      h: t({ sk: "Kontroluje človek, nie robot", en: "A person checks it, not a bot", uk: "Перевіряє людина, не робот", de: "Ein Mensch prüft, kein Bot" }),
      p: t({
        sk: "Každú žiadosť si pred podaním prejde skutočný človek. Preklep v mene či zlá fotka sú najčastejšie dôvody zamietnutia a práve tie chytáme skôr, než sa dostanú na úrad.",
        en: "Every application is reviewed by a real person before filing. A typo in a name or a wrong photo are the most common reasons for refusal, and those are exactly what we catch first.",
        uk: "Кожну заяву перед поданням переглядає жива людина. Помилка в імені чи невдале фото — найчастіші причини відмови, і саме їх ми виявляємо першими.",
        de: "Jeder Antrag wird vor der Einreichung von einem echten Menschen geprüft. Ein Tippfehler im Namen oder ein falsches Foto sind die häufigsten Ablehnungsgründe, und genau die fangen wir zuerst ab.",
      }),
    },
    {
      icon: <HeartHandshake size={20} />,
      h: t({ sk: "Sme s vami aj po vybavení", en: "We stay with you after it's done", uk: "Ми з вами й після оформлення", de: "Wir bleiben auch danach an Ihrer Seite" }),
      p: t({
        sk: "Nekončíme doručením povolenia. Poradíme počas cesty, po návrate aj o rok, keď budete cestovať znova a nebudete si istí, čo platí. Stačí napísať alebo zavolať.",
        en: "We don't stop at delivery. We advise you during your trip, after you return, and a year later when you travel again and aren't sure what applies. Just write or call.",
        uk: "Ми не зупиняємось на видачі дозволу. Радимо під час поїздки, після повернення й через рік, коли подорожуватимете знову. Досить написати чи зателефонувати.",
        de: "Wir hören nicht bei der Zustellung auf. Wir beraten Sie während der Reise, nach der Rückkehr und ein Jahr später, wenn Sie wieder reisen. Schreiben oder rufen Sie einfach an.",
      }),
    },
    {
      icon: <MapPinned size={20} />,
      h: t({ sk: "Rozumieme cestovaniu", en: "We understand travel", uk: "Ми розуміємось на подорожах", de: "Wir verstehen das Reisen" }),
      p: t({
        sk: "Voyago nerobí niekto od stola. Vieme, aké je to zháňať povolenie na poslednú chvíľu pred odletom, a preto sme celý proces postavili tak, aby bol rýchly a zrozumiteľný.",
        en: "Voyago isn't run from behind a desk. We know what it's like to sort a permit at the last minute before a flight, so we built the whole process to be fast and clear.",
        uk: "Voyago не роблять «від столу». Ми знаємо, як це — оформлювати дозвіл в останню мить перед вильотом, тому зробили весь процес швидким і зрозумілим.",
        de: "Voyago wird nicht vom Schreibtisch aus betrieben. Wir wissen, wie es ist, kurz vor dem Abflug noch eine Genehmigung zu besorgen, deshalb haben wir den ganzen Ablauf schnell und klar gestaltet.",
      }),
    },
  ];

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <path d="M-50 480 Q 300 300 600 420 T 1250 360" fill="none" stroke="#C99A4E" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
            <path d="M-50 520 Q 400 420 700 500 T 1250 460" fill="none" stroke="#C99A4E" strokeWidth="1" strokeDasharray="2 12" strokeLinecap="round" opacity="0.6" />
            <circle cx="600" cy="420" r="4" fill="#E7C48A" />
            <circle cx="1180" cy="372" r="4" fill="#E7C48A" />
          </svg>
        </div>
        <div className="container-page relative py-16 sm:py-20">
          <p className="eyebrow !text-brass-light">{t({ sk: "O nás", en: "About us", uk: "Про нас", de: "Über uns" })}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            {t({
              sk: "Vízum má byť riadok v zozname, nie stres pred cestou.",
              en: "A visa should be a line on a checklist, not pre-trip stress.",
              uk: "Віза має бути рядком у списку, а не стресом перед поїздкою.",
              de: "Ein Visum sollte ein Punkt auf der Liste sein, kein Stress vor der Reise.",
            })}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/75">
            {t({
              sk: "Voyago je slovenská služba, ktorá cestovateľom vybavuje elektronické víza a cestovné povolenia do celého sveta. Založil ju jeden človek s jednoduchou myšlienkou: nech sa ľudia tešia na cestu a papierovačky nechajú na niekoho, kto ich má rád.",
              en: "Voyago is a Slovak service that arranges electronic visas and travel authorizations worldwide. It was founded by one person with a simple idea: let people look forward to the trip and leave the paperwork to someone who actually enjoys it.",
              uk: "Voyago — словацька служба, що оформлює електронні візи та дозволи на подорож по всьому світу. Її заснувала одна людина з простою ідеєю: нехай люди тішаться подорожжю, а паперову роботу залишать тому, хто її любить.",
              de: "Voyago ist ein slowakischer Dienst, der weltweit elektronische Visa und Reisegenehmigungen organisiert. Gegründet von einer Person mit einer einfachen Idee: Menschen sollen sich auf die Reise freuen und den Papierkram jemandem überlassen, der ihn gerne macht.",
            })}
          </p>
        </div>
      </section>

      {/* Príbeh */}
      <section className="container-page py-14">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              {t({ sk: "Ako Voyago vzniklo", en: "How Voyago began", uk: "Як з'явилося Voyago", de: "Wie Voyago entstand" })}
            </h2>
            <div className="mt-5 space-y-4 text-[0.97rem] leading-relaxed text-ink-soft">
              <p>
                {t({
                  sk: "Volám sa Lukáš Tonkovič a cestovanie ma sprevádza odkedy si pamätám. Postupne som prešiel desiatky krajín a naučil sa, že najhoršia časť každej cesty nie je dlhý let ani balenie kufra, ale vypĺňanie cudzojazyčných formulárov, kde jedna zlá kolónka dokáže pokaziť celú dovolenku.",
                  en: "My name is Lukáš Tonkovič and travel has been part of my life for as long as I can remember. Over the years I've been through dozens of countries and learned that the worst part of any trip isn't the long flight or packing, but filling in foreign-language forms where one wrong field can ruin the whole holiday.",
                  uk: "Мене звати Лукаш Тонкович, і подорожі супроводжують мене, скільки себе пам'ятаю. За ці роки я побував у десятках країн і зрозумів: найгірша частина будь-якої поїздки — не довгий переліт чи збори, а заповнення іншомовних анкет, де одне неправильне поле може зіпсувати всю відпустку.",
                  de: "Ich heiße Lukáš Tonkovič, und Reisen begleitet mich, solange ich denken kann. Über die Jahre habe ich Dutzende Länder bereist und gelernt, dass der schlimmste Teil jeder Reise nicht der lange Flug oder das Packen ist, sondern das Ausfüllen fremdsprachiger Formulare, bei denen ein falsches Feld den ganzen Urlaub ruinieren kann.",
                })}
              </p>
              <p>
                {t({
                  sk: "Sám som si niekoľkokrát vybavoval ESTA, ETA aj e-víza a zakaždým ma prekvapilo, aké je to zbytočne komplikované a koľko pochybných stránok sa na tom priživuje. Povedal som si, že to musí ísť aj inak: čestne, zrozumiteľne a s človekom, ktorý zdvihne telefón.",
                  en: "I've arranged ESTA, ETA and e-visas for myself several times, and each time I was struck by how needlessly complicated it is and how many shady sites feed off it. I decided it had to be possible differently: honestly, clearly, and with a person who actually picks up the phone.",
                  uk: "Я сам кілька разів оформлював ESTA, ETA та е-візи, і щоразу дивувався, наскільки це невиправдано складно і скільки сумнівних сайтів на цьому наживаються. Я вирішив, що має бути інакше: чесно, зрозуміло і з людиною, яка бере слухавку.",
                  de: "Ich habe mehrmals selbst ESTA, ETA und E-Visa beantragt und war jedes Mal erstaunt, wie unnötig kompliziert das ist und wie viele zwielichtige Seiten davon leben. Ich beschloss, dass es auch anders gehen muss: ehrlich, verständlich und mit einem Menschen, der ans Telefon geht.",
                })}
              </p>
              <p>
                {t({
                  sk: "Tak vzniklo Voyago. Nie anonymný portál, ale konkrétna slovenská firma so sídlom, telefónom a menom, za ktoré si stojím. Vybavíme za vás kontrolu, podanie aj komunikáciu s úradmi a vy sa venujete tomu podstatnému, teste sa na cestu.",
                  en: "That's how Voyago came about. Not an anonymous portal, but a specific Slovak business with an address, a phone number and a name I stand behind. We take care of the check, the filing and the communication with the authorities, so you can focus on what matters, looking forward to your trip.",
                  uk: "Так з'явилося Voyago. Не анонімний портал, а конкретна словацька фірма з адресою, телефоном та іменем, за яке я відповідаю. Ми беремо на себе перевірку, подання та спілкування з органами, а ви робите головне — тішитеся подорожжю.",
                  de: "So entstand Voyago. Kein anonymes Portal, sondern ein konkretes slowakisches Unternehmen mit Adresse, Telefonnummer und einem Namen, für den ich einstehe. Wir kümmern uns um die Prüfung, die Einreichung und die Kommunikation mit den Behörden, damit Sie sich auf das Wesentliche freuen können: Ihre Reise.",
                })}
              </p>
            </div>

            <figure className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card">
              <Quote size={22} className="text-brass" />
              <blockquote className="mt-2 font-display text-lg font-medium leading-relaxed text-ink">
                {t({
                  sk: "„Chcem, aby ste sa na cestu tešili od chvíle, keď si ju zarezervujete. O zvyšok sa postaráme my.“",
                  en: "\"I want you to enjoy the trip from the moment you book it. We'll take care of the rest.\"",
                  uk: "«Хочу, щоб ви тішилися подорожжю з миті, коли її забронювали. Про решту подбаємо ми.»",
                  de: "„Ich möchte, dass Sie sich ab der Buchung auf die Reise freuen. Um den Rest kümmern wir uns.“",
                })}
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-ink-soft">Lukáš Tonkovič — {t({ sk: "zakladateľ Voyago", en: "founder of Voyago", uk: "засновник Voyago", de: "Gründer von Voyago" })}</figcaption>
            </figure>
          </div>

          {/* Bočný panel: overiteľné údaje */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <div className="flex items-center gap-2 text-brass">
                <Compass size={18} />
                <p className="font-display text-base font-bold text-ink">{t({ sk: "Kto stojí za Voyago", en: "Who is behind Voyago", uk: "Хто стоїть за Voyago", de: "Wer hinter Voyago steht" })}</p>
              </div>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t({ sk: "Prevádzkovateľ", en: "Operator", uk: "Оператор", de: "Betreiber" })}</dt><dd className="text-right font-medium text-ink">{site.company.legalName}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">IČO</dt><dd className="font-medium text-ink">{site.company.ico}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">IČ DPH</dt><dd className="font-medium text-ink">{site.company.icDph}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t({ sk: "Sídlo", en: "Address", uk: "Адреса", de: "Sitz" })}</dt><dd className="text-right font-medium text-ink">{site.company.address}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-soft">{t({ sk: "Podpora", en: "Support", uk: "Підтримка", de: "Support" })}</dt><dd className="font-medium text-ink">{site.support.days} {site.support.hours}</dd></div>
              </dl>
              <p className="mt-4 border-t border-line-soft pt-3 text-xs leading-relaxed text-ink-soft">
                {t({
                  sk: "Údaje si viete overiť vo verejnom živnostenskom registri Slovenskej republiky.",
                  en: "You can verify these details in the public trade register of the Slovak Republic.",
                  uk: "Дані можна перевірити в публічному реєстрі Словацької Республіки.",
                  de: "Die Angaben können im öffentlichen Gewerberegister der Slowakischen Republik überprüft werden.",
                })}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/kontakt" className="btn-primary w-full justify-center">{t({ sk: "Kontaktovať nás", en: "Contact us", uk: "Зв'язатися", de: "Kontakt" })}</Link>
                <Link href="/destinations" className="btn-ghost w-full justify-center">{t({ sk: "Vybrať destináciu", en: "Choose a destination", uk: "Обрати напрямок", de: "Reiseziel wählen" })}</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Hodnoty */}
      <section className="container-page pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.h} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass/12 text-brass">{v.icon}</span>
              <h3 className="mt-4 font-display text-base font-bold text-ink">{v.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">{t({ sk: "Kam to bude?", en: "Where to next?", uk: "Куди далі?", de: "Wohin als Nächstes?" })}</h2>
            <p className="mt-1 text-cream/70">{t({ sk: "Vyberte destináciu a o papierovačky sa postaráme my.", en: "Pick a destination and we'll handle the paperwork.", uk: "Оберіть напрямок, а папери — на нас.", de: "Wählen Sie ein Reiseziel, den Papierkram übernehmen wir." })}</p>
          </div>
          <Link href="/destinations" className="btn-accent shrink-0">{t({ sk: "Prezrieť destinácie", en: "Browse destinations", uk: "Переглянути напрямки", de: "Reiseziele ansehen" })} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
