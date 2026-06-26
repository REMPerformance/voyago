"use client";

import { useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Plus, Clock, ShieldCheck, Plane, BadgeCheck, Layers, Users, MapPin } from "lucide-react";
import { DynamicForm } from "@/components/DynamicForm";
import { NotifySignup } from "@/components/NotifySignup";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProduct, productPrice } from "@/config/products";
import { useFinalPrice, useDiscountPercent } from "@/lib/discounts";
import { useProcessed } from "@/lib/stats";
import { CountryHero } from "@/components/CountryHero";
import { HERO_ATLAS } from "@/config/heroAtlas";
import { HERO_ICON_SETS } from "@/components/heroIcons";
import { ServiceNotice } from "@/components/ServiceNotice";
import { site } from "@/config/site";

export default function ApplyPage() {
  const params = useParams<{ productId: string }>();
  const router = useRouter();
  const { t, tr, lang } = useLang();
  const finalPrice = useFinalPrice();
  const discountPercent = useDiscountPercent();
  const { add } = useCart();

  const product = getProduct(params.productId);
  const processed = useProcessed(product?.slug ?? "");
  const [added, setAdded] = useState<string[]>([]); // mená pridaných cestujúcich

  if (!product) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <Link href="/destinations" className="btn-primary mt-6">
          {tr("cta.browse")}
        </Link>
      </section>
    );
  }

  if (!product.available) {
    return (
      <section className="container-page py-24 text-center">
        <p className="eyebrow">{t(product.destination)}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">{t(product.name)}</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">{t({ sk: "Túto službu pripravujeme — čoskoro ju spustíme. Nechajte nám e-mail a ozveme sa vám hneď, ako bude dostupná.", en: "We're preparing this service — launching soon. Leave us your email and we'll notify you the moment it's available." })}</p>
        <div className="mt-7 flex justify-center">
          <NotifySignup topic={product.slug} />
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/destinations" className="btn-primary">{tr("cta.browse")}</Link>
          <Link href="/blog" className="btn-ghost">{t({ sk: "Čítať novinky", en: "Read updates" })}</Link>
        </div>
      </section>
    );
  }

  const handleAdd = (data: Record<string, string>, goToCart: boolean) => {
    add(product.slug, data);
    const name = [data.givenNames, data.surname].filter(Boolean).join(" ") || `#${added.length + 1}`;
    setAdded((a) => [...a, name]);
    if (goToCart) router.push("/cart");
  };

  const pct = discountPercent(product.slug);
  const base = productPrice(product);
  const total = finalPrice(product);
  const typeLabel = TYPE_LABEL[product.type] ?? product.type.toUpperCase();
  const hero = HERO[product.country] ?? { cities: [] as string[], motifs: ["🌍", "✈️", "🧳"] };
  const nameParts = t(product.name).split("–").map((s) => s.trim());
  const titleMain = nameParts[0] ?? t(product.name);
  const titleAccent = nameParts[1] ?? "";

  return (
    <section className="container-page pt-12 pb-28 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${t(product.destination)} – ${typeLabel}`,
            description: t(product.summary),
            brand: { "@type": "Brand", name: site.brand },
            offers: {
              "@type": "Offer",
              price: total,
              priceCurrency: site.currency,
              availability: product.available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
              url: `${site.url}/apply/${product.slug}`,
            },
          }),
        }}
      />
      <Link
        href="/destinations"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={15} /> {tr("nav.destinations")}
      </Link>

      {/* Hero pre danú destináciu */}
      {HERO_ATLAS[product.country] ? (
        <CountryHero
          cc={product.country}
          titleMain={titleMain}
          titleAccent={titleAccent}
          subtitle={t(HERO_SUBTITLE[product.country] ?? product.summary)}
          iconNames={HERO_ICON_SETS[product.country]}
        />
      ) : (
        <div className="relative mt-5 min-h-[260px] overflow-hidden rounded-3xl bg-ink text-paper shadow-card sm:min-h-[300px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <GlobeMotif className="absolute -bottom-28 -left-24 h-[30rem] w-[30rem] text-paper/[0.07] sm:h-[34rem] sm:w-[34rem]" />
            {hero.motifs.map((m, i) => (
              <span key={i} className="absolute select-none leading-none text-paper opacity-[0.08] grayscale" style={{ fontSize: `${MOTIF_POS[i]?.size ?? 6}rem`, top: MOTIF_POS[i]?.top, left: MOTIF_POS[i]?.left, right: MOTIF_POS[i]?.right }}>{m}</span>
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://flagcdn.com/${product.country.toLowerCase()}.svg`} alt="" className="absolute right-6 top-1/2 w-[30%] max-w-[330px] -translate-y-1/2 rotate-[-7deg] rounded-md opacity-95 shadow-2xl ring-1 ring-paper/15 sm:right-10" />
            <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          </div>
          <div className="relative max-w-xl px-6 py-9 sm:px-10 sm:py-12">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-brass">{typeLabel} · {t(product.destination)}</p>
            <h1 className="mt-1.5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">{t(product.name)}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/80">{t(product.summary)}</p>
            {hero.cities.length > 0 && (
              <div className="mt-6">
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-paper/45">{t({ sk: "Najväčšie mestá", en: "Major cities" })}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {hero.cities.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 rounded-lg bg-paper/[0.08] px-3 py-1 text-xs font-medium text-paper/90 ring-1 ring-paper/10">
                      <MapPin size={11} className="text-brass" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {processed > 0 && (
              <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-paper/70">
                <Users size={14} className="text-brass" />
                <strong className="font-semibold text-paper">{processed.toLocaleString(lang === "sk" ? "sk-SK" : "en-US")}</strong>
                {t({ sk: "vybavených žiadostí cez Voyago", en: "applications processed via Voyago" })}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Formulár */}
        <div className="card order-2 p-6 sm:p-8 lg:order-1">
          <ServiceNotice className="mb-6" />
          <div className="mt-1">
            <DynamicForm product={product} travelerIndex={added.length + 1} onAdd={handleAdd} />
          </div>
        </div>

        {/* Bočný panel */}
        <aside id="objednavka" className="order-1 lg:order-2">
          <div className="card lg:sticky lg:top-20 overflow-hidden !p-0">
            {/* Cena – tmavá hlavička pre kontrast a čitateľnosť */}
            <div className="bg-ink px-6 py-6 text-paper">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-paper/10 text-2xl ring-1 ring-paper/15">{product.flag}</span>
                <span className="font-display text-sm font-bold text-paper">{t(product.destination)}</span>
                <span className="ml-auto text-[0.6rem] uppercase tracking-wider text-paper/70">{typeLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-paper/55">
                  {t({ sk: "Cena za 1 cestujúceho", en: "Price per traveler" })}
                </p>
                {pct > 0 && (
                  <span className="rounded-md bg-brass px-2 py-0.5 text-[0.65rem] font-bold text-ink">−{pct}%</span>
                )}
              </div>
              <div className="mt-2 flex items-end gap-2.5">
                <span className="font-display text-[2.75rem] font-extrabold leading-none text-paper">{money(total, lang)}</span>
                {pct > 0 && <span className="mb-1 font-display text-lg font-bold text-paper/40 line-through">{money(base, lang)}</span>}
              </div>
              <p className="mt-2 text-xs text-paper/65">{t({ sk: "Vrátane štátneho poplatku · s DPH", en: "Incl. government fee · VAT included" })}</p>
            </div>

            {/* Rozpis ceny */}
            <div className="space-y-2 border-b border-line px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{t({ sk: "Štátny poplatok", en: "Government fee" })}</span>
                <span className="font-semibold text-ink">{money(product.govFee, lang)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{t({ sk: "Naša asistencia", en: "Our assistance" })}</span>
                <span className="font-semibold text-ink">{money(product.serviceFee, lang)}</span>
              </div>
              {pct > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green">{t({ sk: "Zľava", en: "Discount" })}</span>
                  <span className="font-semibold text-green">−{money(base - total, lang)}</span>
                </div>
              )}
              <div className="mt-1 flex items-center justify-between border-t border-line pt-2.5">
                <span className="text-sm font-bold text-ink">{t({ sk: "Spolu", en: "Total" })}</span>
                <span className="font-display text-lg font-extrabold text-ink">{money(total, lang)}</span>
              </div>
            </div>

            {/* Kľúčové parametre s ikonami */}
            <dl className="divide-y divide-line-soft">
              <DetailRow icon={<Clock size={17} />} label={tr("dest.processing")} value={t(product.processingDays)} />
              <DetailRow icon={<ShieldCheck size={17} />} label={tr("dest.validity")} value={t(product.validity)} />
              {product.stay && <DetailRow icon={<Plane size={17} />} label={tr("dest.stay")} value={t(product.stay)} />}
              <DetailRow
                icon={<BadgeCheck size={17} />}
                label={t({ sk: "Platnosť pasu", en: "Passport validity" })}
                value={t({ sk: "min. 6 mes. po návrate", en: "min. 6 months after return" })}
              />
              <DetailRow
                icon={<Layers size={17} />}
                label={t({ sk: "Forma", en: "Format" })}
                value={t({ sk: "100 % online", en: "100% online" })}
              />
            </dl>

            {/* Čo získate */}
            <div className="border-t border-line bg-paper/60 px-6 py-5">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft/70">
                {t({ sk: "Čo získate", en: "What you get" })}
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  ...(product.facts ?? []),
                  { sk: "Kontrola údajov pred odoslaním", en: "Details reviewed before submission" },
                  { sk: "Sledovanie stavu žiadosti online", en: "Track your application status online" },
                  { sk: "Podpora v slovenčine", en: "Support in your language" },
                ].map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-green/15 text-green">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                    {t(fact)}
                  </li>
                ))}
              </ul>
            </div>

            {added.length > 0 && (
              <div className="border-t border-line p-6">
                <p className="eyebrow">{tr("form.traveler")} · {added.length}</p>
                <ul className="mt-2 space-y-1.5">
                  {added.map((name, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-ink">
                      <Check size={14} className="text-teal" /> {name}
                    </li>
                  ))}
                </ul>
                <Link href="/cart" className="btn-primary mt-4 w-full">{tr("cart.checkout")}</Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Sticky mobilná lišta s cenou + CTA */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "max(0.7rem, env(safe-area-inset-bottom))" }}
      >
        <div className="container-page flex items-center justify-between gap-3 py-2.5">
          <div>
            <p className="text-[0.55rem] uppercase tracking-wider text-ink-soft/60">{tr("dest.from")} · {t(product.destination)}</p>
            <p className="font-display text-xl font-extrabold leading-none text-ink">
              {money(total, lang)} <span className="text-[0.6rem] font-semibold text-ink-soft/55">{t({ sk: "s DPH", en: "VAT" })}</span>
            </p>
          </div>
          <a href="#objednavka" className="btn-primary h-11 !px-6">
            {t({ sk: "Objednať", en: "Order" })} <ArrowRight size={16} />
          </a>
        </div>
      </div>
      {/* Fakty + FAQ */}
      {product.facts?.length || product.faq?.length ? (
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            {product.facts && product.facts.length > 0 && (
              <div>
                <p className="eyebrow">{tr("facts.title")}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.facts.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-brass" /> {t(f)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.faq && product.faq.length > 0 && (
              <div>
                <p className="eyebrow">{tr("faq.title")}</p>
                <div className="mt-4 divide-y divide-line rounded-xl2 border border-line bg-surface">
                  {product.faq.map((item, i) => (
                    <details key={i} className="group px-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-ink">
                        {t(item.q)}
                        <Plus size={16} className="shrink-0 text-ink-soft transition-transform group-open:rotate-45" />
                      </summary>
                      <p className="pb-5 text-sm leading-relaxed text-ink-soft">{t(item.a)}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* "Môžem žiadať?" → krátky dotazník (sprievodca) */}
          <aside>
            <div className="card lg:sticky lg:top-20 p-6">
              <p className="font-display text-lg font-bold">{tr("faq.eligTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tr("faq.eligText")}</p>
              <Link href={`/wizard?dest=${product.country}`} className="btn-accent mt-4 w-full">
                {tr("faq.eligCta")} <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}

const TYPE_LABEL: Record<string, string> = {
  eta: "eTA",
  esta: "ESTA",
  evisa: "e-Vízum",
  etias: "ETIAS",
};

// Formálnejší podnadpis v hero (per krajina). Fallback je product.summary.
const HERO_SUBTITLE: Record<string, { sk: string; en: string }> = {
  US: {
    sk: "Oficiálne povolenie pre bezvízový vstup do USA v rámci programu Visa Waiver.",
    en: "Official authorization for visa-free entry to the USA under the Visa Waiver Program.",
  },
  GB: {
    sk: "Povinné cestovné povolenie pre vstup do Spojeného kráľovstva, aj pre občanov EÚ.",
    en: "Mandatory travel authorization for entry to the United Kingdom, also for EU citizens.",
  },
};

// Dekoratívna „zemeguľa" – mriežka poludníkov a rovnobežiek, použitá ako jemný motív na pozadí.
function GlobeMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="96" strokeOpacity="0.6" />
      {/* rovnobežky */}
      <ellipse cx="100" cy="100" rx="96" ry="30" />
      <ellipse cx="100" cy="100" rx="96" ry="62" />
      <line x1="4" y1="100" x2="196" y2="100" />
      {/* poludníky */}
      <ellipse cx="100" cy="100" rx="30" ry="96" />
      <ellipse cx="100" cy="100" rx="62" ry="96" />
      <line x1="100" y1="4" x2="100" y2="196" />
      {/* zvýraznený „pin" – aktuálna destinácia */}
      <circle cx="66" cy="74" r="7" fill="currentColor" fillOpacity="0.9" stroke="none" />
      <circle cx="66" cy="74" r="13" strokeOpacity="0.9" />
    </svg>
  );
}

// Pozície/veľkosti jemných motívov (emoji) na pozadí hero.
const MOTIF_POS: { top?: string; left?: string; right?: string; size: number }[] = [
  { top: "8%", left: "40%", size: 7 },
  { top: "46%", left: "30%", size: 5.5 },
  { top: "12%", right: "34%", size: 6 },
  { top: "58%", left: "8%", size: 5 },
];

// Najväčšie mestá + krajinné motívy (emoji) pre každú destináciu.
const HERO: Record<string, { cities: string[]; motifs: string[] }> = {
  US: { cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco"], motifs: ["🗽", "🌉", "🏙️", "🦅"] },
  GB: { cities: ["Londýn", "Manchester", "Birmingham", "Edinburgh", "Liverpool"], motifs: ["🎡", "🏰", "🚌", "☕"] },
  CA: { cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"], motifs: ["🍁", "🏔️", "🦌", "🏒"] },
  AU: { cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"], motifs: ["🦘", "🏖️", "🐨", "🌊"] },
  NZ: { cities: ["Auckland", "Wellington", "Christchurch", "Queenstown"], motifs: ["🥝", "🏔️", "🐑", "🌋"] },
  KR: { cities: ["Soul", "Busan", "Inčchon", "Daegu"], motifs: ["🏯", "🍜", "🏮", "🎎"] },
  IN: { cities: ["Dillí", "Bombaj", "Bengalúr", "Čennaí", "Kalkata"], motifs: ["🕌", "🛕", "🐘", "🪷"] },
  EG: { cities: ["Káhira", "Alexandria", "Gíza", "Luxor"], motifs: ["🐫", "🕌", "🏜️", "🌅"] },
  VN: { cities: ["Hanoj", "Ho Či Min", "Da Nang", "Hai Phong"], motifs: ["🛶", "⛩️", "🍜", "🏝️"] },
  LK: { cities: ["Kolombo", "Kandy", "Galle", "Jaffna"], motifs: ["🐘", "🏖️", "🍃", "🛕"] },
  TR: { cities: ["Istanbul", "Ankara", "Izmir", "Antalya"], motifs: ["🕌", "🌙", "☕", "🛶"] },
  ID: { cities: ["Jakarta", "Bali", "Surabaja", "Bandung"], motifs: ["🏝️", "🌋", "🛕", "🐠"] },
  TZ: { cities: ["Dar es Salaam", "Zanzibar", "Arusha", "Dodoma"], motifs: ["🦁", "🐘", "🦒", "🏔️"] },
  EU: { cities: ["Paríž", "Berlín", "Rím", "Madrid", "Amsterdam"], motifs: ["🗼", "🏛️", "🎡", "🚄"] },
  CN: { cities: ["Peking", "Šanghaj", "Kanton", "Šen-čen"], motifs: ["🐉", "🏯", "🏮", "🥢"] },
};

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-brass">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[0.7rem] font-medium uppercase tracking-wide text-ink-soft/70">{label}</dt>
        <dd className="text-sm font-semibold leading-snug text-ink">{value}</dd>
      </div>
    </div>
  );
}
