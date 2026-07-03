import type { Metadata } from "next";
import { Link2, MousePointerClick, Wallet, BarChart3, Ban, Check, Percent, CalendarClock, Landmark } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Partnerský program — zarábajte na odporúčaniach | Voyago",
  description: "Affiliate program Voyago: 20 % provízia zo servisného poplatku z každej zaplatenej objednávky, 30-dňové cookie, mesačné výplaty od 50 €. Pre blogy, cestovateľské weby a tvorcov.",
  alternates: { canonical: `${site.url}/partnersky-program` },
};

const STEPS = [
  { icon: <Link2 size={18} />, t: "1 · Registrácia a kód", d: "Vyplníte prihlášku nižšie. Po schválení (do 48 h) dostanete e-mailom svoj partnerský kód a odkaz v tvare voyago.sk/?ref=VASKOD." },
  { icon: <MousePointerClick size={18} />, t: "2 · Zdieľate odkaz", d: "Odkaz vložíte do článku, videa, newslettra či bio. Návšteva sa k vám počíta 30 dní od kliknutia (cookie/localStorage)." },
  { icon: <BarChart3 size={18} />, t: "3 · Objednávky sa pripisujú", d: "Každá zaplatená objednávka z vášho odkazu sa automaticky priradí k vášmu kódu — vidíme to my aj vy v mesačnom reporte." },
  { icon: <Wallet size={18} />, t: "4 · Mesačná výplata", d: "Provízie posielame raz mesačne na účet (IBAN), po prekročení 50 €. Nevyplatený zostatok sa prenáša ďalej." },
];

const RULES_OK = [
  "Vlastný web, blog, YouTube, podcast, newsletter alebo sociálne siete s cestovateľským obsahom.",
  "Recenzie, návody a porovnania s vaším partnerským odkazom.",
  "Zľavové/kupónové weby po individuálnom schválení.",
];
const RULES_NO = [
  "PPC reklamy na značku „Voyago“ a preklepové domény (brand bidding).",
  "Spam, nevyžiadané e-maily, automatizované klikanie a motivované kliky.",
  "Vlastné objednávky cez vlastný odkaz a zavádzajúce tvrdenia (napr. „oficiálny štátny portál“).",
];

const FAQ = [
  { q: "Koľko reálne zarobím?", a: "20 % zo servisného poplatku každej zaplatenej objednávky. Pri typickej objednávke je to 8–15 € — cestovateľský článok s 50 objednávkami mesačne tak zarobí 400–750 €." },
  { q: "Kedy sa provízia započíta?", a: "Po zaplatení objednávky. Ak zákazník využije Ochranu kupujúceho a objednávka sa refunduje, provízia sa v danom mesiaci odpočíta." },
  { q: "Ako dostanem peniaze?", a: "Bankovým prevodom na IBAN raz mesačne, vždy do 15. dňa za predchádzajúci mesiac, pri zostatku aspoň 50 €." },
  { q: "Dostanem podklady?", a: "Áno — bannery, textové odkazy a hotové popisy destinácií. Na požiadanie pripravíme aj vlastný zľavový kód pre vaše publikum." },
  { q: "Musím byť firma?", a: "Nie. Spolupracujeme s podnikateľmi (faktúra) aj jednotlivcami (príležitostný príjem / autorská zmluva podľa dohody)." },
];

export default function Page() {
  return (
    <section className="container-page py-14">
      {/* Hero */}
      <div className="max-w-3xl">
        <p className="eyebrow">Partnerský program</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Odporúčajte Voyago a zarábajte z každej objednávky</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Píšete o cestovaní, točíte videá alebo máte publikum, ktoré lieta do USA, Anglicka či Ázie?
          Pridajte svoj odkaz a získajte podiel z každej vybavenej žiadosti.
        </p>
      </div>

      {/* Kľúčové čísla */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: <Percent size={20} />, v: "20 %", l: "provízia zo servisného poplatku každej zaplatenej objednávky" },
          { icon: <CalendarClock size={20} />, v: "30 dní", l: "platnosť vášho odporúčania od kliknutia na odkaz" },
          { icon: <Landmark size={20} />, v: "od 50 €", l: "mesačné výplaty na účet, zostatok sa prenáša" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brass/12 text-brass">{s.icon}</span>
            <p className="mt-3 font-display text-3xl font-extrabold text-ink">{s.v}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Ako to funguje */}
      <h2 className="mt-14 font-display text-2xl font-bold">Ako to funguje</h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.t} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{s.icon}</span>
            <p className="mt-3 font-display text-[0.95rem] font-bold text-ink">{s.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>

      {/* Pravidlá */}
      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-green/30 bg-green/[0.05] p-6 sm:p-7">
          <p className="font-display text-lg font-bold text-ink">Čo vítame</p>
          <ul className="mt-4 space-y-2.5">
            {RULES_OK.map((r, i) => <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft"><Check size={16} className="mt-0.5 shrink-0 text-green" /> {r}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-terra/30 bg-terra/[0.04] p-6 sm:p-7">
          <p className="font-display text-lg font-bold text-ink">Čo vedie k vylúčeniu</p>
          <ul className="mt-4 space-y-2.5">
            {RULES_NO.map((r, i) => <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft"><Ban size={16} className="mt-0.5 shrink-0 text-terra" /> {r}</li>)}
          </ul>
        </div>
      </div>

      {/* FAQ + prihláška */}
      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold">Časté otázky partnerov</h2>
          <div className="mt-5 space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line bg-surface px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-ink">
                  {f.q}<span className="text-brass transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-soft/70">
            Provízia sa počíta zo servisného poplatku (bez štátneho poplatku a doplnkov). Posledné kliknutie vyhráva.
            Program môžeme upraviť s oznámením 30 dní vopred; nároky do zmeny ostávajú zachované. Vyplatenie podlieha
            overeniu objednávok (storná a refundácie sa odpočítavajú).
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Prihláška do programu</h2>
          <p className="mb-4 mt-1 text-sm text-ink-soft">Schvaľujeme do 48 hodín. Kód a odkaz dostanete e-mailom.</p>
          <LeadForm
            endpoint="/api/affiliate"
            cta="Odoslať prihlášku"
            success="Prihláška prijatá! Ozveme sa do 48 hodín s vaším partnerským kódom."
            fields={[
              { key: "name", label: "Meno / značka *", required: true },
              { key: "email", label: "E-mail *", type: "email", required: true },
              { key: "channel", label: "Web / kanál (URL)", placeholder: "https://…" },
              { key: "audience", label: "Veľkosť publika", type: "select", options: ["do 1 000", "1 000 – 10 000", "10 000 – 50 000", "50 000+"] },
              { key: "note", label: "Ako plánujete Voyago propagovať?", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
