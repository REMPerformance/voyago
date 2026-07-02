"use client";

import { ShieldCheck, RefreshCw, Eye, Headset, Umbrella, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PROTECTION } from "@/config/products";

export function Guarantee() {
  const { t } = useLang();

  const points = [
    { icon: <Eye size={18} />, title: { sk: "Kontrola pred podaním", en: "Reviewed before submission" }, desc: { sk: "Každú žiadosť ručne skontrolujeme, kým je všetko správne.", en: "We manually check every application before it's filed." } },
    { icon: <RefreshCw size={18} />, title: { sk: "Vrátenie pri našej chybe", en: "Refund on our mistake" }, desc: { sk: "Ak pochybíme na našej strane, servisný poplatok vrátime.", en: "If we slip up on our side, we refund the service fee." } },
    { icon: <Headset size={18} />, title: { sk: "Podpora v slovenčine", en: "Support in your language" }, desc: { sk: "Reálni ľudia, ktorí odpovedia do 24 hodín.", en: "Real people who reply within 24 hours." } },
  ];

  return (
    <section className="relative isolate w-full overflow-hidden bg-ink py-20 text-paper sm:py-24">
      {/* Geometrické pozadie — pretínajúce sa trojuholníky */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
        <defs>
          <linearGradient id="g-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C99A4E" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#C99A4E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="1200,0 1200,420 760,0" fill="url(#g-fade)" />
        <polygon points="1200,140 1200,600 700,600" fill="#11202e" />
        <polygon points="0,600 360,600 0,300" fill="#0e1b27" />
        <polygon points="980,0 1200,0 1200,260" fill="none" stroke="#C99A4E" strokeOpacity="0.22" strokeWidth="1.5" />
        <polygon points="1040,90 1200,360 880,360" fill="none" stroke="#C99A4E" strokeOpacity="0.16" strokeWidth="1.5" />
        <polygon points="120,520 300,200 480,520" fill="none" stroke="#3a5364" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="0" y1="120" x2="1200" y2="40" stroke="#3a5364" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      <div className="container-page relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brass-light">
            <ShieldCheck size={14} /> {t({ sk: "Náš sľub", en: "Our promise" })}
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] sm:text-[2.75rem]">
            {t({ sk: "Vaša cesta, naša radosť.", en: "Your journey, our joy." })}
          </h2>
          <p className="mt-4 max-w-xl text-paper/70">
            {t({ sk: "Vaše bezstarostné cestovanie je to, čo nás ženie vpred. Papierovačky nechajte na nás — vy myslite len na cestu.", en: "Your worry-free travel is what drives us forward. Leave the paperwork to us — you just think about the trip." })}
          </p>
        </div>

        {/* Hlavný banner — Ochrana kupujúceho */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-brass/30 bg-gradient-to-r from-brass/[0.14] to-brass/[0.03]">
          <div className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex items-start gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brass text-ink">
                <Umbrella size={26} />
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-xl font-bold sm:text-2xl">{t(PROTECTION.label)}</h3>
                  <span className="rounded-md bg-brass px-2 py-0.5 text-xs font-bold text-ink">+{PROTECTION.fee} €</span>
                </div>
                <p className="mt-1.5 max-w-lg text-paper/75">
                  {t({ sk: "Ak úrad žiadosť zamietne napriek správne poskytnutým údajom, vrátime vám celú pôvodnú sumu. Doplnok k žiadosti za 22 € na osobu.", en: "If the authority refuses your application despite correctly provided details, we refund the full original amount. Add it to any application for €22 per traveller." })}
                </p>
              </div>
            </div>
            <Link href="/destinations" className="btn-accent inline-flex shrink-0 items-center gap-2">
              {t({ sk: "Začať žiadosť", en: "Start application" })} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Ostatné záruky */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title.sk} className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/15 text-brass">{p.icon}</span>
              <h3 className="mt-4 font-display text-base font-bold">{t(p.title)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{t(p.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
