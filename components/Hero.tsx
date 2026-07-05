"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Plane } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { tr } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(id);
  }, []);

  const reveal = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(22px)",
    transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}s`,
  });

  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-8 py-10 sm:gap-10 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-24">
        {/* LEFT COPY */}
        <div>
          <p className="eyebrow" style={reveal(0)}>
            {tr("hero.eyebrow")}
          </p>
          <h1
            className="mt-4 font-display text-[2.05rem] font-bold leading-[1.06] tracking-tight sm:mt-5 sm:text-6xl sm:leading-[1.03] lg:text-[4rem]"
            style={reveal(0.08)}
          >
            {tr("hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg" style={reveal(0.16)}>
            {tr("hero.sub")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:mt-9 sm:gap-4" style={reveal(0.24)}>
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 rounded-lg bg-brass px-5 py-3 text-[0.95rem] font-bold sm:px-7 sm:py-4 sm:text-base text-navy shadow-[0_14px_30px_-12px_rgba(201,154,78,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brass-light"
            >
              {tr("hero.cta")} <ArrowRight size={18} />
            </Link>
            <Link
              href="/destinations"
              className="border-b-[1.5px] border-brass pb-0.5 font-semibold text-ink transition-colors hover:text-brass"
            >
              {tr("cta.browse")} →
            </Link>
          </div>

        </div>

        {/* RIGHT: boarding pass */}
        <div
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(40px)",
            transition: "opacity .8s cubic-bezier(.2,.75,.25,1) .12s, transform .8s cubic-bezier(.2,.75,.25,1) .12s",
          }}
        >
          {/* mobil: rovnaká letenka ako na PC, len zmenšená (zoom nemení rozmery, len veľkosť) */}
          <div className="origin-top [zoom:0.52] sm:hidden">
            <div style={{ transform: "rotate(-4deg)" }}>
              <BoardingPass />
            </div>
          </div>
          {/* desktop: plná veľkosť + 3D náklon za myšou */}
          <div className="hidden sm:block lg:[zoom:1.08] xl:[zoom:1.14]">
            <TiltPass />
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltPass() {
  const [t, setT] = useState<string>("rotate(-4deg)");
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT(`perspective(1400px) rotateY(${px * 9}deg) rotateX(${-py * 7}deg) rotate(-4deg)`);
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setT("rotate(-4deg)")}
      className="transition-transform duration-200 ease-out [backface-visibility:hidden] [transform:translateZ(0)]"
      style={{ transform: t }}
    >
      <BoardingPass />
    </div>
  );
}

function BoardingPass() {
  return (
    <div className="relative">
      {/* torn notches on the seam (desktop) */}
      <span className="absolute z-20 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-paper sm:block" style={{ right: "9.5rem", top: 0 }} />
      <span className="absolute z-20 hidden h-4 w-4 translate-y-1/2 rounded-full bg-paper sm:block" style={{ right: "9.5rem", bottom: 0 }} />

      <div className="flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface shadow-pass sm:flex-row">
        {/* MAIN */}
        <div className="relative flex-1">
          <div className="secure-bg flex items-center justify-between px-5 py-3 text-cream">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-brass-light font-display text-xs font-bold text-brass-light">
                V
              </span>
              <span className="font-display text-base font-bold">VOYAGO</span>
            </div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cream/55">Boarding Pass</span>
          </div>

          <div className="px-5 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="mrz">From</p>
                <p className="font-display text-4xl font-extrabold leading-none text-ink">BTS</p>
                <p className="mt-1 text-[0.7rem] text-ink-soft">Bratislava</p>
              </div>
              <div className="flex flex-1 flex-col items-center px-4">
                <Plane size={18} className="text-brass" />
                <div className="mt-1.5 h-px w-full border-t border-dashed border-line" />
                <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft/55">Direct</span>
              </div>
              <div className="text-right">
                <p className="mrz">To</p>
                <p className="font-display text-4xl font-extrabold leading-none text-ink">ANY</p>
                <p className="mt-1 text-[0.7rem] text-ink-soft">Worldwide</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-3 border-t border-line pt-3">
              <div className="col-span-2">
                <p className="mrz">Passenger</p>
                <p className="mt-0.5 font-display text-sm font-bold text-ink">CESTUJÚCI / VZOR</p>
              </div>
              <div>
                <p className="mrz">Document</p>
                <p className="mt-0.5 font-display text-sm font-bold text-ink">ESTA</p>
              </div>
              <div>
                <p className="mrz">Valid</p>
                <p className="mt-0.5 font-display text-sm font-bold text-ink">2 YRS</p>
              </div>
            </div>

            <p className="mrz mt-4 truncate">
              P&lt;SVKCESTUJUCI&lt;&lt;VZOR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;1203A
            </p>
          </div>
        </div>

        {/* SEAM */}
        <div className="hidden w-px border-l-2 border-dashed border-line sm:block" />

        {/* STUB */}
        <div className="flex w-full flex-col border-t-2 border-dashed border-line bg-surface px-5 py-4 sm:w-[9rem] sm:border-t-0">
          <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-1">
            <span className="font-display text-sm font-bold text-ink">VOYAGO</span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink-soft/55">Stub</span>
          </div>
          <div className="mt-3 flex gap-4 sm:mt-4 sm:block sm:space-y-2.5">
            {[
              ["Ref", "VYG-7F3A"],
              ["Type", "ESTA"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="mrz">{k}</p>
                <p className="font-mono text-xs font-semibold text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="barcode mt-3 h-10 w-full rounded-sm opacity-90 sm:mt-auto sm:h-12" />
        </div>
      </div>

      {/* approved seal */}
      <div className="absolute right-3 top-[9.5rem] z-30 grid rotate-[-12deg] place-items-center rounded-full border-[4px] border-double border-brass bg-paper px-5 py-4 text-center sm:right-[6.5rem] sm:top-[68%]">
        <span className="font-mono text-base font-bold uppercase leading-[1.15] tracking-[0.16em] text-brass">
          Approved
          <br />
          Voyago
        </span>
      </div>
    </div>
  );
}
