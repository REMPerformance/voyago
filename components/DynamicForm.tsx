"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus, ShoppingBag, Upload, Check, X, Info, ChevronDown, AlertTriangle,
  User, FileText, Mail, Briefcase, Plane, ShieldCheck, FileSignature, Users,
  ClipboardCheck, ArrowLeft, Save, Trash2,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { uploadFile } from "@/lib/applications";
import { supabaseEnabled } from "@/lib/supabase";
import { DIAL_CODES } from "@/config/dialCodes";
import { consentLabelFor } from "@/config/products";
import type { Field, Product, Localized } from "@/config/products";

interface Props {
  product: Product;
  travelerIndex: number;
  onAdd: (data: Record<string, string>, goToCart: boolean) => void;
}

const isWide = (f: Field) => f.type === "checkbox" || f.type === "file" || f.type === "select" || f.type === "toggle" || f.type === "phoneIntl";

// Logické sekcie — formulár sa skladá z plochého poľa polí, tu ich zoskupíme.
const NAME_SECTION: Record<string, string> = {};
const put = (ids: string[], section: string) => ids.forEach((n) => (NAME_SECTION[n] = section));
put(["givenNames","surname","otherNames","sex","dob","placeOfBirth","countryOfBirth","nationality","otherNationality","religion","education","marks","marital","fatherGiven","fatherSurname","motherGiven","motherSurname","fatherName","fatherNat","motherName","spouseName"], "personal");
put(["passportNumber","passportIssueCountry","passportIssue","passportExpiry","nationalId","otherPassport","geMember","geNumber"], "passport");
put(["email","phone","homeAddress","homeHouseNo","ukHouseNo","homeCity","homePostcode","homeCountry"], "contact");
put(["employmentStatus","occupation","employerName","employerAddress"], "work");
put(["purpose","arrivalDate","entryType","idVisaType","destAddress","usAddress","usPocName","usPocPhone","emName","emEmail","emPhone","krAddress","lkAddress","egHotel","trAddress","idPort","idHotel","tzHost","vnEntry","vnExit","vnPort","vnAddress","portArrival","euFirstCountry","visitedCountries","saarc","refIndiaName","refIndiaAddress","refIndiaPhone","refHomeName","refHomeAddress"], "travel");
put(["secDisease","secArrest","secDrugs","secTerror","secFraud","secDeny","ukCrime","ukRefused","caRefused","caCrime","caTb","auCitizen","auCrime","auTb","auRefused","nzDeport","nzCrime","krBefore","krCrime","euCrime","euWar","euDeport"], "security");
put(["passportScan","portrait","ukPassportPhoto","ukSelfie"], "docs");
put(["ukStayWhere"], "travel");
put(["ukHasPhone","homeAddr2","homeAddr3"], "contact");
put(["ukFatherGiven","ukFatherSurname","ukMotherGiven","ukMotherSurname","ukParentPhone","ukParentEmail"], "guardian");
put(["ukOtherNat","ukOtherNatList","ukOtherNatDoc"], "personal");
put(["secWar","secExtreme","secEspionage","secSabotage","secWork","secOverstay","secCountries"], "security");
put(["usDualRestricted","usOtherNat","usOtherNatList","usOtherNatDoc"], "personal");
put(["usHouseNo","usSocial"], "contact");
put(["usDeparture"], "travel");

const SECTIONS: { id: string; title: Localized; icon: any }[] = [
  { id: "personal", icon: User, title: { sk: "Osobné údaje", en: "Personal details" } },
  { id: "passport", icon: FileText, title: { sk: "Cestovný doklad", en: "Travel document" } },
  { id: "contact", icon: Mail, title: { sk: "Kontakt a adresa", en: "Contact & address" } },
  { id: "guardian", icon: Users, title: { sk: "Rodičia", en: "Parents" } },
  { id: "work", icon: Briefcase, title: { sk: "Zamestnanie", en: "Employment" } },
  { id: "travel", icon: Plane, title: { sk: "Cesta a pobyt", en: "Trip & stay" } },
  { id: "security", icon: ShieldCheck, title: { sk: "Bezpečnostné otázky", en: "Security questions" } },
  { id: "docs", icon: Upload, title: { sk: "Doklady na nahratie", en: "Documents to upload" } },
  { id: "declarations", icon: FileSignature, title: { sk: "Vyhlásenia a súhlasy", en: "Declarations & consent" } },
];

const sectionOf = (f: Field) => (f.type === "checkbox" ? "declarations" : NAME_SECTION[f.name] ?? "travel");

export function DynamicForm({ product, travelerIndex, onAdd }: Props) {
  const { t, tr } = useLang();

  // Súhlas dostane text podľa krajiny
  const formFields = useMemo(
    () => product.fields.map((f) => (f.name === "consent" ? { ...f, label: consentLabelFor(product.country) } : f)),
    [product]
  );
  const draftKey = `voyago:draft:${product.slug}:${travelerIndex}`;

  const initValues = () => {
    const init: Record<string, string> = {};
    formFields.forEach((f) => { if (f.type === "toggle" && !f.required) init[f.name] = "no"; });
    return init;
  };
  const [values, setValues] = useState<Record<string, string>>(initValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [restored, setRestored] = useState(false);
  const [review, setReview] = useState<null | boolean>(null); // null = formulár; boolean = zhrnutie (true = do košíka)

  // Obnova rozpracovaného konceptu (až po pripojení, aby nevznikol SSR mismatch)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(draftKey) : null;
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === "object" && Object.keys(saved).length) {
          setValues((v) => ({ ...v, ...saved }));
          setRestored(true);
        }
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // Auto-uloženie konceptu pri zmene
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const hasData = Object.values(values).some((v) => v && v !== "no");
      if (hasData) window.localStorage.setItem(draftKey, JSON.stringify(values));
      else window.localStorage.removeItem(draftKey);
    } catch { /* ignore */ }
  }, [values, draftKey]);

  // Prepočet platnosti pasu pri zmene dátumov cesty (živá kontrola)
  useEffect(() => {
    if (!(values.passportExpiry ?? "")) return;
    const f = formFields.find((x) => x.name === "passportExpiry");
    if (f) setErrors((prev) => ({ ...prev, passportExpiry: fieldError(f, values) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.arrivalDate, values.usDeparture, values.passportExpiry]);

  const clearDraft = () => {
    try { if (typeof window !== "undefined") window.localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setValues(initValues());
    setErrors({});
    setRestored(false);
  };

  // Formátovanie vstupov pri písaní
  const formatField = (name: string, value: string) =>
    name === "passportNumber" ? value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) : value;

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: formatField(name, value) }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  // Validácia jedného poľa — používa sa pre mikro-kontroly (onBlur) aj súhrnnú kontrolu
  const fieldError = (f: Field, vals: Record<string, string>): string => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (f.showIf && (vals[f.showIf.field] ?? "") !== f.showIf.value) return "";
    const v = (vals[f.name] ?? "").trim();
    if (f.type === "phoneIntl") {
      const sp = v.indexOf(" ");
      const num = sp >= 0 ? v.slice(sp + 1).trim() : (v.startsWith("+") ? "" : v);
      return f.required && !num ? tr("form.errRequired") : "";
    }
    if (f.type === "toggle") {
      if (f.required && v !== "yes" && v !== "no") return tr("form.errRequired");
      if (f.flagYes?.level === "block" && v === "yes") return t({ sk: "Pri tejto odpovedi nemôžeme pokračovať — potrebujete vízum.", en: "We can't proceed with this answer — you need a visa." });
      return "";
    }
    if (f.required && (f.type === "checkbox" ? v !== "true" : !v)) return tr("form.errRequired");
    if (!v || f.type === "checkbox") return "";
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return t({ sk: "Zadajte platný e-mail.", en: "Enter a valid email." });
    if (f.name === "passportNumber" && !/^[A-Za-z0-9]{5,12}$/.test(v)) return t({ sk: "Číslo pasu: 5–12 znakov (písmená a čísla).", en: "Passport no.: 5–12 letters/digits." });
    if (f.type === "date") {
      const d = new Date(v);
      if (!isNaN(d.getTime())) {
        if (f.name === "dob" && d >= today) return t({ sk: "Dátum narodenia musí byť v minulosti.", en: "Date of birth must be in the past." });
        if (f.name === "passportIssue" && d > today) return t({ sk: "Dátum vydania nemôže byť v budúcnosti.", en: "Issue date cannot be in the future." });
        if (f.name === "passportExpiry") {
          if (d <= today) return t({ sk: "Pas musí byť platný (dátum v budúcnosti).", en: "Passport must be valid (future date)." });
          const trip = (vals["usDeparture"] || vals["arrivalDate"] || "").trim();
          const td = trip ? new Date(trip) : null;
          if (td && !isNaN(td.getTime())) {
            const m = product.passportValidityMonths ?? 6; // štandard: pas platný 6 mes. po návrate
            const need = new Date(td); need.setMonth(need.getMonth() + m);
            if (d < need) {
              const dd = `${String(need.getDate()).padStart(2, "0")}.${String(need.getMonth() + 1).padStart(2, "0")}.${need.getFullYear()}`;
              return t({
                sk: `Pas musí platiť aspoň ${m} mesiacov po návrate (min. do ${dd}). Ak nie, vybavte si nový pas — inak vám môžu zamietnuť vstup.`,
                en: `Passport must be valid for at least ${m} months after return (until ${dd} at the latest). If not, get a new passport — otherwise entry may be refused.`,
              });
            }
          }
        }
        if (f.dateAfter) {
          const other = (vals[f.dateAfter.field] ?? "").trim();
          const o = other ? new Date(other) : null;
          if (o && !isNaN(o.getTime())) {
            if (d <= o) return t({ sk: "Musí byť po dátume príchodu.", en: "Must be after the arrival date." });
            if (f.dateAfter.maxDays && (d.getTime() - o.getTime()) / 86400000 > f.dateAfter.maxDays)
              return t({ sk: `Pobyt môže trvať najviac ${f.dateAfter.maxDays} dní.`, en: `The stay can last at most ${f.dateAfter.maxDays} days.` });
          }
        }
      }
    }
    return "";
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of formFields) { const e = fieldError(f, values); if (e) next[f.name] = e; }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const blurCheck = (f: Field) => setErrors((prev) => ({ ...prev, [f.name]: fieldError(f, values) }));

  const displayValue = (f: Field, val: string): string => {
    if (!val) return "";
    if (f.type === "toggle") return val === "yes" ? t({ sk: "Áno", en: "Yes" }) : t({ sk: "Nie", en: "No" });
    if (f.type === "checkbox") return val === "true" ? "✓" : "";
    if (f.type === "select") { const o = f.options?.find((x) => x.value === val); return o ? t(o.label) : val; }
    if (f.type === "file") return `${val.split(",").filter(Boolean).length} ${t({ sk: "súbor(ov)", en: "file(s)" })}`;
    return val;
  };

  const submit = (goToCart: boolean) => {
    if (!validate()) {
      setReview(null);
      setTimeout(() => document.querySelector("[data-error='true']")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setReview(goToCart); // najprv ukáž zhrnutie
  };

  const confirmAdd = () => {
    const goToCart = review === true;
    onAdd(values, goToCart);
    try { if (typeof window !== "undefined") window.localStorage.removeItem(draftKey); } catch { /* ignore */ }
    setValues(initValues());
    setErrors({});
    setRestored(false);
    setReview(null);
    if (!goToCart) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* hlavička cestujúceho */}
      <div className="flex items-center gap-3 border-b border-line pb-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-paper">
          {travelerIndex}
        </span>
        <div>
          <p className="font-display text-base font-bold leading-tight">
            {tr("form.traveler")} {travelerIndex}
          </p>
          <p className="text-xs text-ink-soft">
            {t({ sk: "Údaje vyplňte presne podľa pasu.", en: "Enter details exactly as in the passport." })}
          </p>
        </div>
      </div>

      {restored && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-teal/40 bg-teal/[0.05] px-3 py-2 text-xs text-ink">
          <Save size={14} className="shrink-0 text-teal" />
          <span className="flex-1">{t({ sk: "Obnovili sme vašu rozpracovanú žiadosť.", en: "We restored your saved draft." })}</span>
          <button type="button" onClick={clearDraft} className="inline-flex items-center gap-1 font-semibold text-terra">
            <Trash2 size={13} /> {t({ sk: "Vymazať", en: "Clear" })}
          </button>
        </div>
      )}

      <div className="mt-2">
        {SECTIONS.map((sec) => {
          const fields = formFields.filter(
            (f) => sectionOf(f) === sec.id && (!f.showIf || (values[f.showIf.field] ?? "") === f.showIf.value)
          );
          if (fields.length === 0) return null;
          return (
            <fieldset key={sec.id} className="mt-8 first:mt-6">
              <legend className="mb-5 flex w-full items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper text-brass">
                  <sec.icon size={16} />
                </span>
                <span className="font-display text-base font-bold text-ink">{t(sec.title)}</span>
                <span className="ml-1 h-px flex-1 bg-line-soft" />
              </legend>

              <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div
                    key={f.name}
                    className={`${isWide(f) ? "sm:col-span-2" : ""}${f.showIf ? " animate-slide-down" : ""}`}
                    data-error={errors[f.name] ? "true" : undefined}
                    onBlur={() => blurCheck(f)}
                  >
                    <FieldControl field={f} value={values[f.name] ?? ""} onChange={(v) => set(f.name, v)} invalid={!!errors[f.name]} />
                    {f.help && f.type !== "checkbox" && <p className="help">{t(f.help)}</p>}
                    {f.flagYes && values[f.name] === "yes" && (
                      <div
                        className={`mt-2 flex items-start gap-2 rounded-lg border p-3 text-xs leading-snug ${
                          f.flagYes.level === "block" ? "border-terra/50 bg-terra/[0.06] text-terra" : "border-brass/50 bg-brass/[0.07] text-ink"
                        }`}
                      >
                        <AlertTriangle size={15} className={`mt-0.5 shrink-0 ${f.flagYes.level === "block" ? "text-terra" : "text-brass"}`} />
                        <span>{t(f.flagYes.text)}</span>
                      </div>
                    )}
                    {errors[f.name] && <p className="err">{errors[f.name]}</p>}
                  </div>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        <button onClick={() => submit(false)} className="btn-ghost">
          <Plus size={16} /> {tr("form.addTraveler")}
        </button>
        <button onClick={() => submit(true)} className="btn-accent sm:ml-auto">
          <ShoppingBag size={16} /> {tr("form.addAndCart")}
        </button>
      </div>

      {review !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <ClipboardCheck size={20} className="text-teal" />
              <h3 className="font-display text-lg font-bold text-ink">{t({ sk: "Skontrolujte údaje pred pridaním", en: "Review your details before adding" })}</h3>
            </div>
            <div className="mt-4 max-h-[55vh] space-y-5 overflow-y-auto pr-1">
              {SECTIONS.map((sec) => {
                const fs = formFields.filter(
                  (f) =>
                    sectionOf(f) === sec.id &&
                    (!f.showIf || (values[f.showIf.field] ?? "") === f.showIf.value) &&
                    displayValue(f, (values[f.name] ?? "").trim())
                );
                if (!fs.length) return null;
                return (
                  <div key={sec.id}>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-soft">
                      <sec.icon size={13} /> {t(sec.title)}
                    </p>
                    <dl className="grid gap-x-4 sm:grid-cols-2">
                      {fs.map((f) => (
                        <div key={f.name} className="flex flex-col border-b border-line/60 py-1">
                          <dt className="text-[0.7rem] text-ink-soft/70">
                            {f.type === "checkbox" ? (f.name === "consent" ? t({ sk: "Súhlas", en: "Consent" }) : t({ sk: "Vyhlásenie", en: "Declaration" })) : t(f.label)}
                          </dt>
                          <dd className="break-words text-sm text-ink">{displayValue(f, (values[f.name] ?? "").trim())}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row">
              <button type="button" onClick={() => setReview(null)} className="btn-ghost">
                <ArrowLeft size={16} /> {t({ sk: "Upraviť", en: "Edit" })}
              </button>
              <button type="button" onClick={confirmAdd} className="btn-accent sm:ml-auto">
                <Check size={16} /> {review ? t({ sk: "Potvrdiť a do košíka", en: "Confirm & add to cart" }) : t({ sk: "Potvrdiť cestujúceho", en: "Confirm traveler" })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldControl({
  field, value, onChange, invalid,
}: {
  field: Field; value: string; onChange: (v: string) => void; invalid?: boolean;
}) {
  const { t, tr } = useLang();
  const [uploading, setUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (field.type === "checkbox") {
    const checked = value === "true";
    return (
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
          checked ? "border-teal bg-teal/[0.05]" : invalid ? "border-terra" : "border-line bg-surface hover:border-ink/30"
        }`}
      >
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
            checked ? "border-teal bg-teal text-white" : "border-line bg-surface"
          }`}
        >
          {checked && <Check size={13} strokeWidth={3} />}
        </span>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked ? "true" : "")} className="sr-only" />
        <span className="text-sm leading-relaxed text-ink">{t(field.label)}</span>
      </label>
    );
  }

  const labelRow = (
    <span className="label">
      <span>{t(field.label)}</span>
      <span className={field.required ? "req" : "opt"}>
        {field.required ? tr("form.required") : tr("form.optional")}
      </span>
    </span>
  );

  if (field.type === "select") {
    return (
      <label className="block">
        {labelRow}
        <div className="relative">
          <select className={`input appearance-none pr-10 ${invalid ? "border-terra" : ""}`} value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">—</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>{t(o.label)}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/60">▾</span>
        </div>
      </label>
    );
  }

  if (field.type === "file") {
    return (
      <label className="block">
        {labelRow}

        {/* Samotné nahrávanie súborov — čisté a samostatné */}
        <div
          className={`flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 transition-colors ${
            value ? "border-teal/50 bg-teal/[0.03]" : invalid ? "border-terra" : "border-line bg-surface hover:border-ink/30"
          }`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper text-teal">
            {uploading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal/30 border-t-teal" /> : value ? <Check size={16} strokeWidth={3} /> : <Upload size={16} />}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">
            {uploading ? tr("form.uploading") : value ? `${value.split(",").filter(Boolean).length}${field.maxFiles ? ` / max ${field.maxFiles}` : ""} ${t({ sk: "súbor(ov)", en: "file(s)" })}` : `${tr("form.upload")}${field.maxFiles ? ` · ${t({ sk: "max", en: "max" })} ${field.maxFiles}` : ""}`}
          </span>
          <input
            type="file"
            multiple
            accept={field.accept}
            onChange={async (e) => {
              let files = Array.from(e.target.files || []);
              if (!files.length) return;
              if (field.maxFiles) files = files.slice(0, field.maxFiles);
              if (supabaseEnabled) {
                setUploading(true);
                const paths = (await Promise.all(files.map((f) => uploadFile(f)))).filter(Boolean) as string[];
                setUploading(false);
                onChange(paths.join(","));
              } else {
                onChange(files.map((f) => f.name).join(","));
              }
            }}
            className="text-xs text-ink-soft file:mr-0 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper"
          />
        </div>
        {field.maxFiles && (
          <p className="mt-1.5 text-xs text-ink-soft/70">{t({ sk: `Môžete nahrať najviac ${field.maxFiles} súbory.`, en: `You can upload up to ${field.maxFiles} files.` })}</p>
        )}

        {/* Návod a príklady — odložené bokom, rozbaľovacie */}
        {field.guidance && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowGuide((s) => !s)}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal-dark"
            >
              <Info size={16} className="shrink-0" />
              <span className="underline decoration-teal/30 underline-offset-2 group-hover:decoration-teal">
                {t({ sk: "Ako má fotografia vyzerať — vzor a príklady", en: "How the photo should look — guide and examples" })}
              </span>
              <ChevronDown size={15} className={`shrink-0 transition-transform ${showGuide ? "rotate-180" : ""}`} />
            </button>

            {showGuide && (
              <div className="mt-3 rounded-xl border border-line bg-paper/50 p-4">
                {field.guidance.intro && <p className="text-sm text-ink-soft">{t(field.guidance.intro)}</p>}
                <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                  {field.guidance.reqs.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink-soft">
                      <Check size={13} className="mt-0.5 shrink-0 text-green" /> {t(r)}
                    </li>
                  ))}
                </ul>
                {(field.guidance.good || field.guidance.bad) && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {field.guidance.good && (
                      <div className="overflow-hidden rounded-lg border border-green-soft/40 bg-green/[0.04]">
                        <p className="flex items-center gap-1.5 bg-green/[0.08] px-3 py-2 text-xs font-bold text-green">
                          <Check size={13} strokeWidth={3} /> {t({ sk: "Správna fotografia", en: "Correct photo" })}
                        </p>
                        {field.guidance.goodImages?.length ? (
                          <div className="flex flex-wrap gap-2 p-2">
                            {field.guidance.goodImages.map((src, gi) => (
                              <figure key={gi} className="flex min-w-0 flex-1 flex-col">
                                <img src={src} alt="" className="mx-auto max-h-72 w-auto max-w-full rounded border border-green-soft/20 bg-paper object-contain" />
                                {field.guidance!.goodImageCaptions?.[gi] && (
                                  <figcaption className="mt-1.5 text-center text-[0.7rem] font-semibold text-green">{t(field.guidance!.goodImageCaptions![gi])}</figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        ) : (
                          <div className="flex h-20 items-center justify-center">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-green/15 text-green"><Check size={18} strokeWidth={3} /></span>
                          </div>
                        )}
                        <p className="px-3 pb-2.5 pt-1 text-[0.7rem] leading-snug text-ink-soft">{t(field.guidance.good)}</p>
                      </div>
                    )}
                    {field.guidance.bad && (
                      <div className="overflow-hidden rounded-lg border border-terra/40 bg-terra/[0.04]">
                        <p className="flex items-center gap-1.5 bg-terra/[0.08] px-3 py-2 text-xs font-bold text-terra">
                          <X size={13} strokeWidth={3} /> {t({ sk: "Nesprávna fotografia", en: "Incorrect photo" })}
                        </p>
                        {field.guidance.badImages?.length ? (
                          <div className="flex flex-wrap gap-2 p-2">
                            {field.guidance.badImages.map((src, bi) => (
                              <figure key={bi} className="flex min-w-0 flex-1 flex-col">
                                <img src={src} alt="" className="mx-auto max-h-72 w-auto max-w-full rounded border border-terra/20 bg-paper object-contain" />
                                {field.guidance!.badImageCaptions?.[bi] && (
                                  <figcaption className="mt-1.5 text-center text-[0.7rem] font-semibold text-terra">{t(field.guidance!.badImageCaptions![bi])}</figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        ) : (
                          <div className="flex h-20 items-center justify-center">
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-terra/15 text-terra"><X size={18} strokeWidth={3} /></span>
                          </div>
                        )}
                        <p className="px-3 pb-2.5 pt-1 text-[0.7rem] leading-snug text-ink-soft">{t(field.guidance.bad)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </label>
    );
  }

  if (field.type === "toggle") {
    const isYes = value === "yes";
    const isNo = value === "no";
    return (
      <div
        className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 transition-colors ${
          isYes
            ? "border-terra/60 bg-terra/[0.06]"
            : isNo
            ? "border-green-soft/60 bg-green/[0.06]"
            : invalid
            ? "border-terra"
            : "border-line bg-surface"
        }`}
      >
        <span className="text-sm font-medium text-ink">{t(field.label)}</span>
        <span className="flex shrink-0 overflow-hidden rounded-lg border border-line">
          <button
            type="button"
            onClick={() => onChange("no")}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${isNo ? "bg-green text-white" : "bg-surface text-ink-soft hover:bg-paper"}`}
          >
            {t({ sk: "Nie", en: "No" })}
          </button>
          <button
            type="button"
            onClick={() => onChange("yes")}
            className={`border-l border-line px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${isYes ? "bg-terra text-white" : "bg-surface text-ink-soft hover:bg-paper"}`}
          >
            {t({ sk: "Áno", en: "Yes" })}
          </button>
        </span>
      </div>
    );
  }

  if (field.type === "phoneIntl") {
    const sp = value.indexOf(" ");
    const dial = sp >= 0 ? value.slice(0, sp) : (value.startsWith("+") ? value : "+421");
    const number = sp >= 0 ? value.slice(sp + 1) : (value.startsWith("+") ? "" : value);
    return (
      <label className="block">
        {labelRow}
        <div className="flex gap-2">
          <select
            value={dial}
            onChange={(e) => onChange(`${e.target.value} ${number}`.trim())}
            className="input w-[42%] max-w-[200px] appearance-none"
          >
            {DIAL_CODES.map((c) => (
              <option key={c.iso} value={c.dial}>{c.dial} · {t({ sk: c.sk, en: c.en })}</option>
            ))}
          </select>
          <input
            type="tel"
            className={`input flex-1 ${invalid ? "border-terra focus:border-terra focus:ring-terra/10" : ""}`}
            value={number}
            placeholder="900 123 456"
            onChange={(e) => onChange(`${dial} ${e.target.value}`)}
          />
        </div>
      </label>
    );
  }

  return (
    <label className="block">
      {labelRow}
      <input
        type={field.type}
        className={`input ${invalid ? "border-terra focus:border-terra focus:ring-terra/10" : ""}`}
        value={value}
        placeholder={field.placeholder ? t(field.placeholder) : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
