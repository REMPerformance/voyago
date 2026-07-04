"use client";

import { X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function HowItWorks() {
  const { tr } = useLang();

  const hard = [tr("how.hard.1"), tr("how.hard.2"), tr("how.hard.3"), tr("how.hard.4"), tr("how.hard.5"), tr("how.hard.6")];
  const easy = [
    { n: "01", t: tr("how.1.t"), d: tr("how.1.d") },
    { n: "02", t: tr("how.2.t"), d: tr("how.2.d") },
    { n: "03", t: tr("how.3.t"), d: tr("how.3.d") },
    { n: "04", t: tr("how.4.t"), d: tr("how.4.d") },
    { n: "05", t: tr("how.5.t"), d: tr("how.5.d") },
  ];

  return (
    <section id="how" className="container-page scroll-mt-24 py-20">
      <div className="max-w-3xl">
        <p className="eyebrow">{tr("how.title")}</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-[2.6rem]">{tr("how.head")}</h2>
      </div>

      {/* Kroky — horizontálny tok */}
      <ol className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
        {easy.map((s) => (
          <li key={s.n} className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brass/45">
            <span aria-hidden className="pointer-events-none absolute -right-3 -top-4 font-display text-[5rem] font-extrabold leading-none text-ink/[0.04] transition-colors group-hover:text-brass/10">{s.n}</span>
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-paper">{s.n}</span>
            <h3 className="relative mt-4 font-display text-base font-bold text-ink">{s.t}</h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>

      {/* Kontrast — bez nás */}
      <div className="mt-10 rounded-2xl border border-line bg-paper-dim/40 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-terra">{tr("how.hardTitle")}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {hard.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink-soft">
              <X size={13} strokeWidth={3} className="shrink-0 text-terra" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
