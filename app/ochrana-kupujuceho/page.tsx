import type { Metadata } from "next";
import Link from "next/link";
import { Umbrella, Check, X, ArrowRight, FileCheck, RefreshCw, Clock } from "lucide-react";
import { PROTECTION_FEE } from "@/config/products";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Ochrana kupujúceho — vrátenie peňazí pri zamietnutí | Voyago",
  description: `Doplnok za ${PROTECTION_FEE} € na osobu: ak úrad žiadosť zamietne napriek správne poskytnutým údajom, vrátime vám celú pôvodnú sumu. Ako to funguje, čo kryje a čo nie.`,
  alternates: { canonical: `${site.url}/ochrana-kupujuceho` },
};

const COVERED = [
  "Úrad žiadosť zamietne, hoci ste poskytli pravdivé, správne a úplné údaje aj podklady.",
  "Zamietnutie na základe voľnej úvahy úradu pri riadne podanej žiadosti.",
  "Vrátime celú pôvodnú sumu — štátny poplatok aj poplatok za sprostredkovanie.",
];
const NOT_COVERED = [
  "Nesprávne, neúplné alebo nepravdivé údaje či podklady z vašej strany.",
  "Zatajené skutočnosti — predchádzajúce zamietnutia, zákazy vstupu, trestná minulosť, prekročenia pobytu.",
  "Nedostavenie sa na pohovor/biometriu, nedodanie vyžiadaných podkladov, stiahnutie žiadosti.",
  "Neplatný alebo poškodený cestovný doklad.",
  "Prihlášky do americkej DV lotérie (zelená karta) — na tie sa ochrana nevzťahuje.",
  `Samotný poplatok ${PROTECTION_FEE} € a príplatok za expresné spracovanie — tie sú nevratné.`,
];
const STEPS = [
  { icon: <FileCheck size={18} />, t: "Pridáte k žiadosti", d: `Pri vypĺňaní žiadosti (alebo v košíku) zapnete prepínač Ochrana kupujúceho — ${PROTECTION_FEE} € za každého cestujúceho.` },
  { icon: <Clock size={18} />, t: "Ak príde zamietnutie", d: "Pošlete nám rozhodnutie úradu o zamietnutí e-mailom do 14 dní od doručenia. Nič iné netreba." },
  { icon: <RefreshCw size={18} />, t: "Vrátime pôvodnú sumu", d: "Po overení podmienok vám do 14 dní vrátime celú pôvodnú sumu rovnakým spôsobom, akým ste platili." },
];

export default function Page() {
  return (
    <section className="container-page py-14">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-lg bg-brass/12 px-3 py-1.5 text-xs font-bold text-brass"><Umbrella size={14} /> Doplnková služba · {PROTECTION_FEE} € / osoba</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">Ochrana kupujúceho</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Zamietnutie žiadosti je zriedkavé — no keď príde, štátny poplatok úrad nevracia. S Ochranou kupujúceho vám
          v takom prípade <strong className="text-ink">vrátime celú pôvodnú sumu</strong>, ak ste nám poskytli správne
          a pravdivé údaje. Cestujete s istotou, riziko nesieme my.
        </p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={i} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{s.icon}</span>
              <span className="font-display text-2xl font-extrabold text-ink/10">0{i + 1}</span>
            </div>
            <p className="mt-3 font-display text-base font-bold text-ink">{s.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-green/30 bg-green/[0.05] p-6 sm:p-7">
          <p className="font-display text-lg font-bold text-ink">Čo ochrana kryje</p>
          <ul className="mt-4 space-y-2.5">
            {COVERED.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-green" /> {c}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-terra/30 bg-terra/[0.04] p-6 sm:p-7">
          <p className="font-display text-lg font-bold text-ink">Na čo sa nevzťahuje</p>
          <ul className="mt-4 space-y-2.5">
            {NOT_COVERED.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft"><X size={16} className="mt-0.5 shrink-0 text-terra" /> {c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper/50 p-6 text-sm leading-relaxed text-ink-soft">
        <strong className="text-ink">V skratke:</strong> ochrana je férová poistka proti rozhodnutiu úradu, nie proti chybám
        v žiadosti — tie za vás ale chytáme my kontrolou pred podaním. Presné podmienky, lehoty a výluky nájdete v{" "}
        <Link href="/obchodne-podmienky" className="font-semibold text-brass underline underline-offset-2">obchodných podmienkach (čl. 8)</Link>.
        Nárok sa uplatňuje e-mailom na {site.email} do 14 dní od doručenia rozhodnutia; vraciame do 14 dní od overenia,
        maximálne raz na jednu žiadosť a najviac do výšky pôvodnej sumy.
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Pridajte si ochranu k najbližšej ceste</h2>
          <p className="mt-1 text-cream/70">Prepínač nájdete priamo pri žiadosti — {PROTECTION_FEE} € s DPH za osobu.</p>
        </div>
        <Link href="/destinations" className="btn-accent shrink-0">Vybrať destináciu <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
