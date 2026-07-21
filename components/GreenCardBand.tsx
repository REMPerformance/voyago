"use client";

import Link from "next/link";
import { ArrowRight, Clock3, CalendarRange, Stars } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Seal } from "@/components/Seal";
import { Reveal } from "@/components/Reveal";

function GreenCardMock() {
  return (
    <div className="relative w-full max-w-[17.5rem]" style={{ transform: "rotate(3deg)" }}>
      <div className="relative aspect-[1.586/1] overflow-hidden rounded-lg border border-cream/25 bg-gradient-to-br from-green-soft to-green p-3 shadow-pass">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ backgroundImage: "repeating-linear-gradient(125deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 7px)" }}
        />
        <span className="pointer-events-none absolute inset-0 grid -rotate-[16deg] place-items-center font-display text-2xl font-extrabold uppercase tracking-[0.2em] text-cream/10">
          Specimen
        </span>
        <div className="relative flex items-start justify-between">
          <div>
            <p className="font-display text-[0.6rem] font-bold leading-tight text-cream">UNITED STATES OF AMERICA</p>
            <p className="font-mono text-[0.44rem] uppercase tracking-[0.2em] text-cream/70">Permanent Resident</p>
          </div>
          <Seal size={26} className="text-brass-light" />
        </div>
        <div className="relative mt-2 flex gap-2">
          <div className="grid h-9 w-7 place-items-center rounded-sm border border-cream/25 bg-cream/10 font-mono text-[0.4rem] uppercase text-cream/45">
            Foto
          </div>
          <div className="flex-1 space-y-1 pt-0.5">
            {[
              ["Surname", "VZOR"],
              ["Category", "DV1"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[0.4rem] uppercase tracking-[0.15em] text-cream/55">{k}</p>
                <p className="font-mono text-[0.55rem] font-semibold text-cream">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative mt-1.5 truncate font-mono text-[0.42rem] tracking-[0.12em] text-cream/55">
          C2USA0000000000VZOR&lt;&lt;SPECIMEN&lt;&lt;&lt;&lt;
        </p>
      </div>
    </div>
  );
}

export function GreenCardBand() {
  const { t, tr } = useLang();

  return (
    <section className="container-page py-12">
      <div className="gc-band grid gap-6 grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
        {/* Green Card — text + mockup */}
        <Reveal>
          <div className="secure-bg relative h-full overflow-hidden rounded-[1.4rem] border border-green-soft/50 bg-green p-5 text-cream shadow-pass ring-1 ring-brass/25 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brass/25 blur-3xl" />
            <div className="pointer-events-none absolute right-6 top-6 -rotate-6 rounded-md border border-brass-light/50 bg-brass/15 px-2.5 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em] text-brass-light">
              DV Lotéria
            </div>
            <div className="relative grid items-center gap-7 grid-cols-1 sm:grid-cols-[1.05fr_auto]">
              <div>
                <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-brass-light">
                  {tr("gc.eyebrow")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-extrabold leading-[1.04] sm:text-[2.6rem]">{tr("gc.title")}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/85">{tr("gc.sub")}</p>

                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-cream/80">
                  <li className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-brass-light" /> Kontrola fotky</li>
                  <li className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-brass-light" /> Podáme za vás</li>
                  <li className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-brass-light" /> Manželia zvlášť</li>
                </ul>

                <div className="mt-5 flex items-end gap-2">
                  <span className="font-mono text-[0.58rem] uppercase tracking-wider text-cream/60">{tr("dest.from")}</span>
                  <span className="font-display text-2xl font-extrabold sm:text-3xl">49 €</span>
                  <span className="pb-1 text-xs text-cream/60">s DPH / prihláška</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <Link href="/green-card" className="btn inline-flex !px-6 !py-3 text-sm font-bold bg-cream text-green hover:-translate-y-0.5 hover:bg-white">
                    {tr("gc.btn")} <ArrowRight size={15} />
                  </Link>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-cream/20 bg-black/10 px-3.5 py-2 text-xs font-medium text-cream/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-light" />
                    {t({ sk: "Registrácia DV-2027 dočasne pozastavená", en: "DV-2027 registration temporarily paused", uk: "Реєстрацію DV-2027 тимчасово призупинено", de: "DV-2027-Registrierung vorübergehend ausgesetzt" })}
                  </span>
                </div>
              </div>

              <div className="flex justify-center sm:justify-end">
                <GreenCardMock />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ETIAS — English */}
        <Reveal delay={120}>
          <div
            className="relative h-full overflow-hidden rounded-[1.4rem] border border-teal/40 bg-navy p-5 text-cream sm:p-9"
            style={{ backgroundImage: "radial-gradient(120% 120% at 85% -10%, rgba(61,122,214,0.28), transparent 55%)" }}
          >
            <div className="absolute right-7 top-7 grid h-14 w-14 place-items-center rounded-full border border-teal-light/40 text-teal-light">
              <Stars size={24} />
            </div>
            <p className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.22em] text-teal-light">
              European Union · ETIAS
            </p>
            <h2 className="mt-3 max-w-[16ch] font-display text-xl font-extrabold leading-[1.06] sm:text-3xl">
              ETIAS travel authorisation
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
              From late 2026, visa-exempt travellers will need an ETIAS to enter the Schengen Area. We prepare and file it for you — no forms, no jargon.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/85">
              <span className="inline-flex items-center gap-1.5">
                <CalendarRange size={15} className="text-teal-light" /> Valid 3 years
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} className="text-teal-light" /> Decision in minutes
              </span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link href="/apply/eu-etias" className="btn inline-flex !px-5 !py-2.5 text-sm bg-cream text-navy hover:-translate-y-0.5 hover:bg-white">
                Learn more <ArrowRight size={14} />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-lg border border-cream/20 bg-black/10 px-3.5 py-2 text-xs font-medium text-cream/80">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-light" />
                Coming soon
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
