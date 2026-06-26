"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, RotateCcw, Check, X, ShieldCheck, Camera, AlertTriangle,
  Globe2, Palmtree, Briefcase, PlaneTakeoff, Hammer, Clock3, CalendarRange,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { money } from "@/lib/format";
import { getProduct, productPrice } from "@/config/products";
import { useFinalPrice } from "@/lib/discounts";
import { Stamp } from "@/components/Stamp";
import {
  determine, CITIZENSHIPS, DESTINATIONS, PURPOSES, DURATIONS,
  type Citizenship, type Destination, type Purpose, type Duration,
} from "@/lib/eligibility";

type StepKey = "destination" | "citizenship" | "purpose" | "duration" | "passport";
interface Answers { citizenship?: Citizenship; destination?: Destination; purpose?: Purpose; duration?: Duration; passport?: "valid" | "expiring"; }

const TYPE_LABEL: Record<string, string> = { esta: "ESTA", eta: "ETA", evisa: "e-Visa", etias: "ETIAS" };
const CIT_FLAG: Record<string, string> = { eu: "eu", uk: "gb", us: "us", ca: "ca", au: "au" };
const PURPOSE_ICON: Record<string, any> = { tourism: Palmtree, business: Briefcase, transit: PlaneTakeoff, work: Hammer };
const DUR_ICON: Record<string, any> = { short: Clock3, long: CalendarRange };

function Tile({ icon, flag, label, onClick }: { icon?: React.ReactNode; flag?: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-card"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-paper text-brass transition-colors group-hover:bg-brass/12">
        {flag ? (
          <img src={`https://flagcdn.com/w80/${flag}.png`} alt="" className="h-6 w-8 rounded-[3px] object-cover" />
        ) : (
          icon
        )}
      </span>
      <span className="flex-1 text-[0.95rem] font-medium text-ink">{label}</span>
      <ArrowRight size={15} className="text-brass opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </button>
  );
}

export function Wizard() {
  const { t, tr } = useLang();
  const searchParams = useSearchParams();

  const presetDest = useMemo<Destination | undefined>(() => {
    const d = searchParams.get("dest");
    return DESTINATIONS.some((x) => x.value === d) ? (d as Destination) : undefined;
  }, [searchParams]);

  const steps: StepKey[] = presetDest
    ? ["citizenship", "purpose", "duration", "passport"]
    : ["destination", "citizenship", "purpose", "duration", "passport"];

  const [answers, setAnswers] = useState<Answers>({ destination: presetDest });
  const [i, setI] = useState(0);
  const finished = i >= steps.length;

  const choose = (patch: Partial<Answers>) => { setAnswers((a) => ({ ...a, ...patch })); setI((n) => n + 1); };
  const restart = () => { setAnswers({ destination: presetDest }); setI(0); };

  const questionKey: Record<StepKey, string> = { destination: "wiz.q2", citizenship: "wiz.q1", purpose: "wiz.q3", duration: "wiz.q4", passport: "" };
  const stepHint: Record<StepKey, { sk: string; en: string }> = {
    destination: { sk: "Vyberte cieľovú krajinu", en: "Choose your destination" },
    citizenship: { sk: "Akým pasom cestujete", en: "Which passport you travel on" },
    purpose: { sk: "Dôvod vašej cesty", en: "The reason for your trip" },
    duration: { sk: "Ako dlho sa zdržíte", en: "How long you'll stay" },
    passport: { sk: "Platnosť cestovného pasu", en: "Passport validity" },
  };

  if (finished && answers.citizenship && answers.destination && answers.purpose && answers.duration) {
    return (
      <div className="mx-auto max-w-2xl">
        <Result c={answers.citizenship} d={answers.destination} p={answers.purpose} dur={answers.duration} passport={answers.passport} onRestart={restart} />
      </div>
    );
  }

  const key = steps[i];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        {/* progress header */}
        <div className="border-b border-line-soft bg-paper/40 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft/70">
              {tr("wiz.step")} {i + 1} {tr("wiz.of")} {steps.length}
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-brass">
              {Math.round((i / steps.length) * 100)}%
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-brass transition-all duration-500 ease-out" style={{ width: `${(i / steps.length) * 100}%` }} />
          </div>
        </div>

        {/* question */}
        <div className="px-6 py-7 sm:px-8">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-brass">{t(stepHint[key])}</p>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-[1.7rem]">{key === "passport" ? t({ sk: "Platí váš pas aspoň 6 mesiacov po návrate?", en: "Is your passport valid 6+ months after return?" }) : tr(questionKey[key])}</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {key === "destination" &&
              DESTINATIONS.map((d) => (
                <Tile key={d.value} flag={d.value.toLowerCase()} label={t(d.label)} onClick={() => choose({ destination: d.value })} />
              ))}
            {key === "citizenship" &&
              CITIZENSHIPS.map((c) => (
                <Tile
                  key={c.value}
                  flag={CIT_FLAG[c.value]}
                  icon={<Globe2 size={18} />}
                  label={tr(c.key)}
                  onClick={() => choose({ citizenship: c.value })}
                />
              ))}
            {key === "purpose" &&
              PURPOSES.map((p) => {
                const Icon = PURPOSE_ICON[p.value] ?? Globe2;
                return <Tile key={p.value} icon={<Icon size={18} />} label={tr(p.key)} onClick={() => choose({ purpose: p.value })} />;
              })}
            {key === "duration" &&
              DURATIONS.map((d) => {
                const Icon = DUR_ICON[d.value] ?? Clock3;
                return <Tile key={d.value} icon={<Icon size={18} />} label={tr(d.key)} onClick={() => choose({ duration: d.value })} />;
              })}
            {key === "passport" &&
              ([
                { value: "valid" as const, icon: <ShieldCheck size={18} />, label: { sk: "Áno, platný 6+ mesiacov", en: "Yes, valid 6+ months" } },
                { value: "expiring" as const, icon: <Clock3 size={18} />, label: { sk: "Vyprší skoro / neviem", en: "Expiring soon / not sure" } },
              ]).map((o) => (
                <Tile key={o.value} icon={o.icon} label={t(o.label)} onClick={() => choose({ passport: o.value })} />
              ))}
          </div>

          {i > 0 && (
            <button
              onClick={() => setI((n) => n - 1)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} /> {tr("cta.back")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Result({ c, d, p, dur, passport, onRestart }: { c: Citizenship; d: Destination; p: Purpose; dur: Duration; passport?: "valid" | "expiring"; onRestart: () => void }) {
  const { t, tr, lang } = useLang();
  const finalPrice = useFinalPrice();
  const res = determine(c, d, p, dur);
  const product = res.slug ? getProduct(res.slug) : undefined;
  const needsPhoto = !!product?.fields?.some((fl) => fl.type === "file" && /foto|photo|selfie|tv[aá]r|face|sn[ií]mka|portr/i.test(`${fl.name} ${fl.label?.sk || ""}`));

  const titleKey =
    res.kind === "product" ? "wiz.res.needTitle"
      : res.kind === "visa-free" ? "wiz.res.freeTitle"
        : res.kind === "soon" ? "wiz.res.soonTitle" : "wiz.res.embassyTitle";

  const stamp =
    res.kind === "product" ? { label: tr("wiz.res.cleared"), tone: "handled" as const }
      : res.kind === "visa-free" ? { label: tr("wiz.res.free"), tone: "free" as const }
        : res.kind === "soon" ? { label: tr("cta.soon"), tone: "approved" as const }
          : { label: tr("wiz.res.referred"), tone: "referred" as const };

  const isProduct = res.kind === "product";
  const isSoon = res.kind === "soon";
  const accent = isProduct ? "bg-green" : isSoon ? "bg-brass" : res.kind === "visa-free" ? "bg-green" : "bg-terra";
  const panel = isProduct ? "border-green/30 bg-green/[0.06]" : isSoon ? "border-brass/35 bg-brass/[0.07]" : "border-line bg-paper/50";
  const code = isProduct ? "text-green" : isSoon ? "text-brass" : "text-ink";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className={`h-1.5 w-full ${accent}`} />
      <div className="flex justify-center px-8 pt-9">
        <Stamp label={stamp.label} tone={stamp.tone} />
      </div>

      <div className="px-6 pb-9 pt-6 text-center sm:px-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{tr(titleKey)}</h2>

        {product && (isProduct || isSoon) && (
          <div className={`mx-auto mt-6 max-w-md rounded-xl2 border p-6 ${panel}`}>
            <div className="flex items-center justify-center gap-3">
              <img
                src={`https://flagcdn.com/w160/${product.country.toLowerCase()}.png`}
                alt={t(product.destination)}
                className="h-9 w-14 rounded-md border border-line object-cover shadow-sm"
              />
              <div className="text-left">
                <p className="font-display text-lg font-bold leading-tight">{t(product.destination)}</p>
                <p className="text-xs uppercase tracking-wider text-ink-soft/70">{t(product.name)}</p>
              </div>
            </div>
            <p className={`mt-4 font-display text-5xl font-extrabold ${code}`}>{TYPE_LABEL[product.type] ?? product.type}</p>
            {isProduct && (
              <p className="mt-3 font-display text-3xl font-extrabold text-ink">
                <span className="align-middle text-sm font-semibold text-ink-soft/70">{tr("dest.from")} </span>
                {money(finalPrice(product), lang)}
              </p>
            )}
            {isSoon && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(res.note)}</p>}
            {isProduct && (
              <>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-1 text-ink-soft"><Clock3 size={12} /> {t(product.processingDays)}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-paper px-2 py-1 text-ink-soft"><CalendarRange size={12} /> {t(product.validity)}</span>
                </div>
                {needsPhoto && (
                  <a href={`/foto-poziadavky?dest=${product.slug}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brass transition-colors hover:text-brass-light"><Camera size={13} /> {t({ sk: "Ako má vyzerať fotka?", en: "How should the photo look?" })}</a>
                )}
              </>
            )}
          </div>
        )}

        {(res.kind === "visa-free" || res.kind === "embassy") && (
          <div className="mx-auto mt-6 flex max-w-md items-start gap-3 rounded-xl2 border border-line bg-paper/50 p-5 text-left">
            <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${res.kind === "visa-free" ? "bg-green/12 text-green" : "bg-terra/12 text-terra"}`}>
              {res.kind === "visa-free" ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">{t(res.note)}</p>
          </div>
        )}

        {passport === "expiring" && (
          <div className="mx-auto mt-5 flex max-w-md items-start gap-3 rounded-xl2 border border-brass/35 bg-brass/[0.07] p-4 text-left">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-brass" />
            <p className="text-sm leading-relaxed text-ink-soft">{t({ sk: "Skontrolujte si platnosť pasu — väčšina krajín vyžaduje platnosť minimálne 6 mesiacov po plánovanom návrate. Ak treba, obnovte si pas včas.", en: "Check your passport validity — most countries require at least 6 months beyond your planned return. Renew it in time if needed." })}</p>
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {isProduct && product && (
            <Link href={`/apply/${product.slug}`} className="btn inline-flex bg-green text-white hover:-translate-y-0.5 hover:bg-green-soft">
              {tr("cta.apply")} <ArrowRight size={16} />
            </Link>
          )}
          {(res.kind === "visa-free" || res.kind === "embassy") && (
            <Link href="/destinations" className="btn-primary">
              {tr("cta.browse")} <ArrowRight size={16} />
            </Link>
          )}
          <button onClick={onRestart} className="btn-ghost">
            <RotateCcw size={15} /> {tr("wiz.restart")}
          </button>
        </div>
      </div>
    </div>
  );
}
