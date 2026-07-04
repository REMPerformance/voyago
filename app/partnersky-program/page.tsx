import type { Metadata } from "next";
import { Link2, MousePointerClick, Wallet, BarChart3, Ban, Check, Percent, CalendarClock, Landmark } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Partnerský program — zarábajte na odporúčaniach | Voyago",
  description: "Affiliate program Voyago: 12 % provízia zo servisného poplatku z každej zaplatenej objednávky, 30-dňové cookie, mesačné výplaty od 50 €. Pre blogy, cestovateľské weby a tvorcov.",
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
  { q: "Koľko reálne zarobím?", a: "12 % zo servisného poplatku každej zaplatenej objednávky. Pri typickej objednávke je to 5–8 € — cestovateľský článok s 50 objednávkami mesačne tak zarobí 250–400 €." },
  { q: "Kedy sa provízia započíta?", a: "Po zaplatení objednávky. Ak zákazník využije Ochranu kupujúceho a objednávka sa refunduje, provízia sa v danom mesiaci odpočíta." },
  { q: "Ako dostanem peniaze?", a: "Mesačný report objednávok aj výplatu na IBAN posielame vždy do 15. dňa za predchádzajúci mesiac, pri zostatku aspoň 50 €." },
  { q: "Dostanem podklady?", a: "Áno — bannery, textové odkazy a hotové popisy destinácií. Na požiadanie pripravíme aj vlastný zľavový kód pre vaše publikum." },
  { q: "Musím byť firma?", a: "Nie. Spolupracujeme s podnikateľmi (faktúra) aj jednotlivcami (príležitostný príjem / autorská zmluva podľa dohody)." },
];

export default function Page() {
  return (
    <section className="container-page py-14">
      {/* Hero */}
      <Reveal className="max-w-3xl border-b border-line pb-10">
        <p className="eyebrow">Partnerský program</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Odporúčajte Voyago a zarábajte z každej objednávky</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Píšete o cestovaní, točíte videá alebo máte publikum, ktoré lieta do USA, Anglicka či Ázie?
          Pridajte svoj odkaz a získajte podiel z každej vybavenej žiadosti. Transparentné podmienky, mesačné
          vyúčtovanie a podpora partnera od prvého dňa.
        </p>
      </Reveal>

      {/* Kľúčové čísla */}
      <Reveal className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {[
          { v: "12 %", l: "Provízia zo servisného poplatku každej zaplatenej objednávky" },
          { v: "30 dní", l: "Platnosť vášho odporúčania od kliknutia na odkaz" },
          { v: "od 50 €", l: "Mesačné výplaty na účet — nevyplatený zostatok sa prenáša" },
        ].map((it) => (
          <div key={it.v} className="border-t-2 border-ink pt-4">
            <p className="font-display text-4xl font-extrabold text-ink">{it.v}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{it.l}</p>
          </div>
        ))}
      </Reveal>

      {/* Ako to funguje */}
      <Reveal className="mt-16">
        <h2 className="font-display text-3xl font-bold">Ako program funguje</h2>
      </Reveal>
      <ol className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((st, i) => (
          <Reveal key={st.t} delay={i * 90}>
            <li className="border-t border-line pt-4">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-brass">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-lg font-bold text-ink">{st.t.replace(/^\d+ · /, "")}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{st.d}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* Pravidlá */}
      <Reveal className="mt-16 grid gap-4 lg:grid-cols-2">
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
      </Reveal>

      {/* FAQ + prihláška */}
      <Reveal className="mt-16 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
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
          <a href="/voyago-media-kit.pdf" download className="mb-4 inline-flex items-center gap-2 rounded-lg border border-line bg-paper/50 px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-brass/50">📄 Stiahnuť media kit (PDF)</a>
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
      </Reveal>
    </section>
  );
}
