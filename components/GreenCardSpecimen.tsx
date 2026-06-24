import { Seal } from "@/components/Seal";

/** Zväčšený „specimen" americkej zelenej karty (server-safe). */
export function GreenCardSpecimen() {
  return (
    <div className="relative w-full max-w-md">
      <div className="secure-bg relative aspect-[1.586/1] overflow-hidden rounded-2xl border border-cream/25 bg-gradient-to-br from-green-soft to-green p-6 text-cream shadow-pass">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "repeating-linear-gradient(125deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 9px)" }} />
        <span className="pointer-events-none absolute inset-0 grid -rotate-[14deg] place-items-center font-display text-5xl font-extrabold uppercase tracking-[0.25em] text-cream/10">
          Specimen
        </span>
        <div className="relative flex items-start justify-between">
          <div>
            <p className="font-display text-base font-bold leading-tight text-cream">UNITED STATES OF AMERICA</p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-cream/70">Permanent Resident Card</p>
          </div>
          <Seal size={52} className="text-brass-light" />
        </div>
        <div className="relative mt-5 flex gap-4">
          <div className="grid h-24 w-[4.5rem] place-items-center rounded-md border border-cream/25 bg-cream/10 font-mono text-[0.6rem] uppercase text-cream/45">Foto</div>
          <div className="flex-1 space-y-2 pt-1">
            {[["Surname", "VZOR"], ["Given name", "CESTUJÚCI"], ["Category", "DV1"], ["Card expires", "—"]].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cream/55">{k}</p>
                <p className="font-mono text-sm font-semibold text-cream">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative mt-4 truncate font-mono text-[0.6rem] tracking-[0.18em] text-cream/55">
          C2USA0000000000VZOR&lt;&lt;SPECIMEN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </p>
      </div>
      <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-soft/60">
        Ilustračný vzor · Diversity Visa
      </p>
    </div>
  );
}
