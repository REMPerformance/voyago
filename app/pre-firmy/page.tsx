import type { Metadata } from "next";
import { Building2, BadgePercent, Zap, FileText, Users2, Headset } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Pre firmy — víza a cestovné povolenia pre zamestnancov | Voyago",
  description: "Firemná spolupráca: víza a cestovné povolenia pre vašich zamestnancov s prioritným spracovaním a zvýhodnenými cenami pri stálom odbere. Ceny na opýtanie.",
  alternates: { canonical: `${site.url}/pre-firmy` },
};

const BENEFITS = [
  { icon: <BadgePercent size={18} />, t: "Zvýhodnené ceny pri objeme", d: "Pri stálom odbere pripravíme individuálny cenník. Čím viac ciest ročne, tým lepšie podmienky — ceny na opýtanie." },
  { icon: <Zap size={18} />, t: "Prioritné spracovanie", d: "Firemné žiadosti idú v našej fronte prednostne. Služobná cesta o tri dni? Vieme, čo to znamená." },
  { icon: <FileText size={18} />, t: "Jedna faktúra, poriadok v dokladoch", d: "Mesačná fakturácia na firmu namiesto desiatok platieb kartou. Prehľad vybavených povolení k tomu." },
  { icon: <Users2 size={18} />, t: "Hromadné žiadosti", d: "Celý tím na veľtrh do USA či montážnici do Kórey — pošlete zoznam, my vybavíme všetkých naraz." },
  { icon: <Headset size={18} />, t: "Vyhradený kontakt", d: "Žiadne call centrum. Máte jedného človeka, ktorý pozná vašu firmu a odpovedá prednostne." },
  { icon: <Building2 size={18} />, t: "Pre cestovky a agentúry", d: "Vybavujeme aj pre cestovné kancelárie a relokačné agentúry — povolenia pre vašich klientov pod vašou značkou alebo našou." },
];

export default function Page() {
  return (
    <section className="container-page py-14">
      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">Pre firmy</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Služobné cesty bez čakania na víza</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Vybavujeme víza a cestovné povolenia pre zamestnancov firiem — od jednorazových ciest po stály odber
            s individuálnymi cenami. Vy riešite biznis, my papierovačky.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div key={b.t} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brass/12 text-brass">{b.icon}</span>
                <p className="mt-3 font-display text-base font-bold text-ink">{b.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.d}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Nezáväzný dopyt</h2>
          <p className="mb-4 mt-1 text-sm text-ink-soft">Ozveme sa do 24 hodín s ponukou na mieru.</p>
          <LeadForm
            endpoint="/api/b2b"
            cta="Odoslať dopyt"
            success="Ďakujeme! Ozveme sa vám do 24 hodín."
            fields={[
              { key: "company", label: "Názov firmy *", required: true },
              { key: "ico", label: "IČO (voliteľné)" },
              { key: "email", label: "Firemný e-mail *", type: "email", required: true },
              { key: "phone", label: "Telefón" },
              { key: "volume", label: "Približný počet ciest ročne", type: "select", options: ["1–10 ciest", "10–50 ciest", "50–200 ciest", "200+ ciest", "Sme cestovka / agentúra"] },
              { key: "message", label: "Do akých krajín cestujete a čo potrebujete?", type: "textarea" },
            ]}
          />
          <p className="mt-3 text-xs text-ink-soft/70">Odoslaním súhlasíte so spracovaním údajov na účely odpovede na dopyt.</p>
        </div>
      </div>
    </section>
  );
}
