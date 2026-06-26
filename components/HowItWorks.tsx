"use client";

import { X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function HowItWorks() {
  const { tr } = useLang();

  const hard = [
    tr("how.hard.1"),
    tr("how.hard.2"),
    tr("how.hard.3"),
    tr("how.hard.4"),
    tr("how.hard.5"),
    tr("how.hard.6"),
  ];

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
        <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-[2.6rem]">{tr("how.head")}</h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Komplikovaná realita */}
        <div className="rounded-xl2 border border-line bg-paper-dim/50 p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-terra">{tr("how.hardTitle")}</p>
          <ul className="mt-6 space-y-4">
            {hard.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-terra/12 text-terra">
                  <X size={12} strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Jednoduchý proces s nami */}
        <div className="relative rounded-xl2 border border-ink/15 bg-surface p-7 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">{tr("how.easyTitle")}</p>
          <ol className="mt-6 space-y-6">
            {easy.map((s, i) => (
              <li key={s.n} className="relative flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-brass font-display text-sm font-bold text-brass">
                    {s.n}
                  </span>
                  {i < easy.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                </div>
                <div className="pb-1">
                  <h3 className="font-display text-lg font-bold text-ink">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
