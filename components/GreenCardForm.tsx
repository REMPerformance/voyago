"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Upload, Loader2, Plus, Trash2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { uploadFile } from "@/lib/applications";
import { supabaseEnabled } from "@/lib/supabase";

type L = { sk: string; en: string };
type Opt = [string, string, string];

const GENDER: Opt[] = [["male", "Muž", "Male"], ["female", "Žena", "Female"]];
const MARITAL: Opt[] = [
  ["unmarried", "Slobodný/á", "Unmarried"],
  ["married", "Ženatý/Vydatá (manžel/ka nie je občan/rezident USA)", "Married (spouse not U.S. citizen/LPR)"],
  ["married_us", "Ženatý/Vydatá (manžel/ka je občan/rezident USA)", "Married (spouse IS U.S. citizen/LPR)"],
  ["divorced", "Rozvedený/á", "Divorced"],
  ["widowed", "Ovdovený/á", "Widowed"],
  ["separated", "Súdne odlúčený/á", "Legally separated"],
];
const EDU: Opt[] = [
  ["primary", "Len základná škola", "Primary school only"],
  ["some_hs", "Stredná bez maturity", "Some high school, no diploma"],
  ["hs", "Stredná s maturitou", "High school diploma"],
  ["vocational", "Vyššie odborné", "Vocational school"],
  ["some_uni", "Niekoľko VŠ kurzov", "Some university courses"],
  ["uni", "Vysokoškolský titul (Bc./Mgr.)", "University degree"],
  ["some_grad", "Niekoľko postgrad. kurzov", "Some graduate-level courses"],
  ["master", "Magisterský titul", "Master's degree"],
  ["some_doc", "Niekoľko doktorand. kurzov", "Some doctoral-level courses"],
  ["doctorate", "Doktorát", "Doctorate"],
];

interface Child { name: string; dob: string; gender: string; cityBirth: string; countryBirth: string }

export function GreenCardForm() {
  const { t } = useLang();
  const [v, setV] = useState<Record<string, string>>({});
  const [children, setChildren] = useState<Child[]>([]);
  const [photo, setPhoto] = useState(""); const [photoName, setPhotoName] = useState(""); const [upPhoto, setUpPhoto] = useState(false);
  const [spousePhoto, setSpousePhoto] = useState(""); const [spousePhotoName, setSpousePhotoName] = useState(""); const [upSpouse, setUpSpouse] = useState(false);
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ref, setRef] = useState<string | null>(null);

  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));
  const married = v.maritalStatus === "married";

  const up = async (file: File | undefined, setVal: (s: string) => void, setName: (s: string) => void, setU: (b: boolean) => void) => {
    if (!file) return;
    setName(file.name);
    if (supabaseEnabled) { setU(true); const p = await uploadFile(file); setU(false); setVal(p ?? ""); }
  };

  const addChild = () => setChildren((c) => [...c, { name: "", dob: "", gender: "", cityBirth: "", countryBirth: "" }]);
  const setChild = (i: number, k: keyof Child, val: string) => setChildren((c) => c.map((ch, idx) => idx === i ? { ...ch, [k]: val } : ch));
  const delChild = (i: number) => setChildren((c) => c.filter((_, idx) => idx !== i));

  const submit = async () => {
    const req = ["surname", "firstName", "gender", "dob", "cityOfBirth", "countryOfBirth", "countryOfEligibility", "education", "maritalStatus", "email", "liveCountry", "addrCity", "addrCountry"];
    for (const k of req) if (!(v[k] || "").trim()) { setErr(t({ sk: "Vyplňte prosím všetky povinné polia.", en: "Please fill in all required fields." })); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || "")) { setErr(t({ sk: "Zadajte platný e-mail.", en: "Enter a valid email." })); return; }
    if (!photo && supabaseEnabled) { setErr(t({ sk: "Nahrajte prosím fotografiu.", en: "Please upload your photo." })); return; }
    if (!consent) { setErr(t({ sk: "Potvrďte súhlas so spracovaním údajov.", en: "Please confirm consent." })); return; }
    setErr(""); setBusy(true);
    try {
      const data: Record<string, string> = { ...v, photo, spousePhoto, children: JSON.stringify(children) };
      const files = [photo, spousePhoto].filter(Boolean);
      const res = await fetch("/api/applications", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_slug: "us-greencard", email: v.email.trim(), travelers: [{ slug: "us-greencard", data }], files, amount_cents: 4900, consent_vop: true, consent_gdpr: true, honeypot: hp }),
      });
      if (res.ok) { const d = await res.json(); setRef(d.ref); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else setErr(t({ sk: "Nepodarilo sa odoslať. Skúste znova.", en: "Could not submit. Try again." }));
    } catch { setErr(t({ sk: "Nepodarilo sa odoslať.", en: "Could not submit." })); }
    setBusy(false);
  };

  if (ref) {
    return (
      <div className="rounded-2xl border border-green-soft/40 bg-green/[0.05] p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green"><Check size={28} /></div>
        <h2 className="mt-4 font-display text-2xl font-bold">{t({ sk: "Prihláška odoslaná!", en: "Application submitted!" })}</h2>
        <p className="mt-2 text-ink-soft">{t({ sk: "Údaje sme prijali. Prihlášku podáme v najbližšom októbrovom okne. Vaša referencia:", en: "We received your details. We'll file your entry in the next October window. Your reference:" })}</p>
        <p className="mt-3 font-mono text-2xl font-bold tracking-wider text-brass">{ref}</p>
        <p className="mt-3 text-sm text-ink-soft">{t({ sk: "Stav sledujte na", en: "Track status at" })} <Link href="/stav" className="font-semibold text-teal underline">/stav</Link></p>
      </div>
    );
  }

  const F = ({ name, label, type = "text", ph, wide }: { name: string; label: L; type?: string; ph?: L; wide?: boolean }) => (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="label"><span>{t(label)}</span></span>
      <input className="input" type={type} value={v[name] || ""} onChange={(e) => set(name, e.target.value)} placeholder={ph ? t(ph) : undefined} />
    </label>
  );
  const S = ({ name, label, opts }: { name: string; label: L; opts: Opt[] }) => (
    <label className="block">
      <span className="label"><span>{t(label)}</span></span>
      <select className="input appearance-none" value={v[name] || ""} onChange={(e) => set(name, e.target.value)}>
        <option value="">{t({ sk: "— vyberte —", en: "— select —" })}</option>
        {opts.map(([val, sk, en]) => <option key={val} value={val}>{t({ sk, en })}</option>)}
      </select>
    </label>
  );
  const Group = ({ title, hint, children: ch }: { title: L; hint?: L; children: React.ReactNode }) => (
    <div>
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brass">{t(title)}</p>
      {hint && <p className="mt-1 text-xs text-ink-soft">{t(hint)}</p>}
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ch}</div>
    </div>
  );
  const Photo = ({ name, val, fn, uploading, onPick }: { name: L; val: string; fn: string; uploading: boolean; onPick: (f?: File) => void }) => (
    <label className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-paper/40 px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper text-teal">{uploading ? <Loader2 size={16} className="animate-spin" /> : val ? <Check size={16} strokeWidth={3} /> : <Upload size={16} />}</span>
      <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">{uploading ? t({ sk: "Nahrávam…", en: "Uploading…" }) : fn || t(name)}</span>
      <input type="file" accept="image/*" onChange={(e) => onPick(e.target.files?.[0])} className="text-xs text-ink-soft file:mr-0 file:cursor-pointer file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper" />
    </label>
  );

  return (
    <div className="space-y-8 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <Group title={{ sk: "Meno (presne ako v pase)", en: "Name (exactly as in passport)" }}>
        <F name="surname" label={{ sk: "Priezvisko", en: "Last / family name" }} />
        <F name="firstName" label={{ sk: "Krstné meno", en: "First name" }} />
        <F name="middleName" label={{ sk: "Stredné meno (ak je v pase)", en: "Middle name (if in passport)" }} />
        <S name="gender" label={{ sk: "Pohlavie", en: "Gender" }} opts={GENDER} />
        <F name="dob" label={{ sk: "Dátum narodenia", en: "Date of birth" }} type="date" />
      </Group>

      <Group title={{ sk: "Narodenie a oprávnenosť", en: "Birth & eligibility" }} hint={{ sk: "Krajina oprávnenosti je zvyčajne krajina narodenia.", en: "Country of eligibility is usually your country of birth." }}>
        <F name="cityOfBirth" label={{ sk: "Mesto narodenia", en: "City of birth" }} />
        <F name="countryOfBirth" label={{ sk: "Krajina narodenia", en: "Country of birth" }} />
        <F name="countryOfEligibility" label={{ sk: "Krajina oprávnenosti", en: "Country of eligibility" }} />
        <F name="chargeabilityNote" label={{ sk: "Ak krajina oprávnenosti nie je krajina narodenia, vysvetlite prečo (voliteľné)", en: "If country of eligibility differs from country of birth, explain why (optional)" }} wide />
      </Group>

      <Group title={{ sk: "Vzdelanie a rodinný stav", en: "Education & marital status" }}>
        <S name="education" label={{ sk: "Najvyššie dosiahnuté vzdelanie", en: "Highest level of education" }} opts={EDU} />
        <S name="maritalStatus" label={{ sk: "Rodinný stav", en: "Marital status" }} opts={MARITAL} />
      </Group>

      {married && (
        <Group title={{ sk: "Manžel / manželka", en: "Spouse" }} hint={{ sk: "Manžela/ku musíte uviesť, aj keď s vami nepricestuje.", en: "You must list your spouse even if they won't immigrate." }}>
          <F name="spouseName" label={{ sk: "Meno a priezvisko", en: "Full name" }} />
          <F name="spouseDob" label={{ sk: "Dátum narodenia", en: "Date of birth" }} type="date" />
          <S name="spouseGender" label={{ sk: "Pohlavie", en: "Gender" }} opts={GENDER} />
          <F name="spouseCityBirth" label={{ sk: "Mesto narodenia", en: "City of birth" }} />
          <F name="spouseCountryBirth" label={{ sk: "Krajina narodenia", en: "Country of birth" }} />
          <div className="sm:col-span-2"><Photo name={{ sk: "Foto manžela/ky", en: "Spouse photo" }} val={spousePhoto} fn={spousePhotoName} uploading={upSpouse} onPick={(f) => up(f, setSpousePhoto, setSpousePhotoName, setUpSpouse)} /></div>
        </Group>
      )}

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brass">{t({ sk: "Deti do 21 rokov (slobodné)", en: "Children under 21 (unmarried)" })}</p>
          <button type="button" onClick={addChild} className="btn-ghost !px-3 !py-1.5 text-xs"><Plus size={13} /> {t({ sk: "Pridať dieťa", en: "Add child" })}</button>
        </div>
        {children.length === 0 && <p className="mt-2 text-xs text-ink-soft">{t({ sk: "Uveďte všetky živé slobodné deti do 21 rokov (vlastné, nevlastné aj adoptované).", en: "List all living unmarried children under 21 (natural, step, adopted)." })}</p>}
        <div className="mt-3 space-y-3">
          {children.map((ch, i) => (
            <div key={i} className="rounded-xl border border-line-soft bg-paper/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.6rem] uppercase tracking-wider text-ink-soft">{t({ sk: "Dieťa", en: "Child" })} {i + 1}</span>
                <button type="button" onClick={() => delChild(i)} className="text-terra"><Trash2 size={14} /></button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="input !mt-0" placeholder={t({ sk: "Meno a priezvisko", en: "Full name" })} value={ch.name} onChange={(e) => setChild(i, "name", e.target.value)} />
                <input className="input !mt-0" type="date" value={ch.dob} onChange={(e) => setChild(i, "dob", e.target.value)} />
                <select className="input !mt-0 appearance-none" value={ch.gender} onChange={(e) => setChild(i, "gender", e.target.value)}>
                  <option value="">{t({ sk: "Pohlavie", en: "Gender" })}</option>
                  {GENDER.map(([val, sk, en]) => <option key={val} value={val}>{t({ sk, en })}</option>)}
                </select>
                <input className="input !mt-0" placeholder={t({ sk: "Mesto narodenia", en: "City of birth" })} value={ch.cityBirth} onChange={(e) => setChild(i, "cityBirth", e.target.value)} />
                <input className="input !mt-0 sm:col-span-2" placeholder={t({ sk: "Krajina narodenia", en: "Country of birth" })} value={ch.countryBirth} onChange={(e) => setChild(i, "countryBirth", e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Group title={{ sk: "Kontakt a adresa", en: "Contact & mailing address" }}>
        <F name="email" label={{ sk: "E-mail (budete ho mať do mája budúceho roka)", en: "Email (keep access through next May)" }} type="email" wide />
        <F name="phone" label={{ sk: "Telefón (voliteľné)", en: "Phone (optional)" }} type="tel" />
        <F name="liveCountry" label={{ sk: "Krajina, kde teraz žijete", en: "Country where you live today" }} />
        <F name="addrCareOf" label={{ sk: "Adresát / na ruky (voliteľné)", en: "In care of (optional)" }} />
        <F name="addrLine1" label={{ sk: "Ulica a číslo", en: "Address line 1" }} />
        <F name="addrLine2" label={{ sk: "Doplnok adresy (voliteľné)", en: "Address line 2 (optional)" }} />
        <F name="addrCity" label={{ sk: "Mesto", en: "City / town" }} />
        <F name="addrState" label={{ sk: "Okres/kraj/štát", en: "District / province / state" }} />
        <F name="addrZip" label={{ sk: "PSČ", en: "Postal / ZIP code" }} />
        <F name="addrCountry" label={{ sk: "Krajina", en: "Country" }} />
      </Group>

      <div>
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brass">{t({ sk: "Fotografia (norma DV)", en: "Photo (DV standard)" })}</p>
        <p className="mt-1 text-xs text-ink-soft">{t({ sk: "Farebná, 600×600 px, JPEG do 240 kB, biele pozadie, nie staršia ako 6 mesiacov, bez okuliarov. Skontrolujeme ju za vás.", en: "Color, 600×600 px, JPEG ≤240 kB, white background, not older than 6 months, no glasses. We'll check it for you." })}</p>
        <div className="mt-3"><Photo name={{ sk: "Nahrajte vašu fotografiu", en: "Upload your photo" }} val={photo} fn={photoName} uploading={upPhoto} onPick={(f) => up(f, setPhoto, setPhotoName, setUpPhoto)} /></div>
      </div>

      <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        <span>{t({ sk: "Potvrdzujem správnosť údajov a súhlasím so spracúvaním osobných údajov podľa", en: "I confirm the data is correct and agree to processing per the" })} <Link href="/ochrana-osobnych-udajov" className="font-semibold text-ink underline">{t({ sk: "zásad ochrany osobných údajov", en: "Privacy Policy" })}</Link>.</span>
      </label>

      {err && <p className="text-sm text-terra">{err}</p>}

      <button onClick={submit} disabled={busy} className="btn-accent w-full !py-3.5 text-base">
        {busy ? t({ sk: "Odosielam…", en: "Submitting…" }) : t({ sk: "Odoslať prihlášku · od 49 € s DPH", en: "Submit entry · from €49 incl. VAT" })}
      </button>
      <p className="text-center text-xs text-ink-soft/70">{t({ sk: "Cena od 49 € s DPH zahŕňa kompletnú službu — kontrolu, správne vyplnenie a podanie prihlášky.", en: "Price from €49 incl. VAT covers the full service — checking, correctly completing and filing your entry." })}</p>
    </div>
  );
}
