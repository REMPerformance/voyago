"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock, CalendarCheck, MapPin, ShieldCheck, Mail, CreditCard,
  Plane, AlertTriangle, Check, Info, FileText, Search, ArrowRight,
} from "lucide-react";
import { NotifySignup } from "@/components/NotifySignup";
import { EuropeMap } from "@/components/EuropeMap";
import { EUROPE } from "@/config/europeMap";
import { getProduct } from "@/config/products";

const P = getProduct("eu-etias");
const PRICE = (P?.govFee ?? 20) + (P?.serviceFee ?? 55); // všetko v jednom

const FACTS = [
  { icon: <CalendarCheck size={20} />, label: "Validity", value: "3 years", note: "Or until your passport expires" },
  { icon: <Clock size={20} />, label: "Stay", value: "90 / 180 days", note: "Short stays, multiple entries" },
  { icon: <MapPin size={20} />, label: "Coverage", value: "30 countries", note: "29 Schengen + Cyprus" },
];
const STEPS = [
  "Complete the online form — personal details, passport information and a few background questions.",
  "Pay online; most applications are approved automatically within minutes.",
  "Your authorisation arrives by email and is linked electronically to your passport.",
  "Present your passport at the border — staff verify the authorisation against it.",
];
const NEED = [
  { icon: <FileText size={16} />, text: "A valid passport (machine-readable, valid for at least 3 months beyond departure)." },
  { icon: <Mail size={16} />, text: "An email address where your authorisation will be sent." },
  { icon: <CreditCard size={16} />, text: "A credit or debit card to pay." },
];
const FAQ = [
  { q: "Is ETIAS a visa?", a: "No. ETIAS is a travel authorisation for visa-exempt visitors — similar to the US ESTA or Canada eTA. It does not replace a visa for working, studying or long stays." },
  { q: "Does ETIAS guarantee entry?", a: "No. A border officer still makes the final decision on arrival. Refusals are rare for genuine travellers with a valid passport." },
  { q: "Do I need ETIAS for a connecting flight?", a: "Yes. If your connection passes through a Schengen airport you are entering the Schengen Area and will need an ETIAS." },
  { q: "Is ETIAS the same as the UK ETA?", a: "No. The United Kingdom is not in the Schengen Area and runs its own Electronic Travel Authorisation." },
  { q: "When can I apply?", a: "The official portal is not open yet. ETIAS is expected to start in the last quarter of 2026. We'll email you the moment it opens." },
];

export function EtiasDetail() {
  const [sel, setSel] = useState<string | null>(null);
  const [mq, setMq] = useState("");

  const covered = useMemo(() => EUROPE.filter((c) => c.covered).sort((a, b) => a.name.localeCompare(b.name)), []);
  const matches = useMemo(() => {
    const q = mq.trim().toLowerCase();
    if (!q) return [];
    return covered.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [covered, mq]);
  const selName = covered.find((c) => c.iso === sel)?.name;

  const pick = (iso: string) => { setSel(iso); setMq(""); };

  return (
    <section className="container-page py-14">
      <Link href="/destinations" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">← Back to destinations</Link>

      {/* HERO — obsah vľavo, mapa + search vpravo */}
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Obsah */}
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass/12 text-brass"><Clock size={20} /></span>
            <div>
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-ink-soft/70">Launching</p>
              <p className="font-display text-base font-extrabold text-ink">Late 2026</p>
            </div>
          </div>

          <h1 className="mt-5 font-display text-6xl font-extrabold leading-[1.0] text-ink sm:text-7xl">ETIAS</h1>
          <p className="mt-3 text-lg font-medium text-ink-soft">European Travel Information &amp; Authorisation System</p>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            A new travel authorisation for visa-exempt visitors to Europe. From late 2026, travellers from countries such as the
            US, UK, Canada and Australia will need an approved ETIAS — linked to their passport — to enter
            <strong className="text-ink"> 30 European countries</strong> for short stays.
          </p>

          {/* Jedna cena */}
          <div className="mt-7 flex flex-wrap items-end gap-2.5">
            <span className="font-display text-5xl font-extrabold leading-none text-ink">€{PRICE}</span>
            <span className="pb-1 text-sm font-semibold text-ink-soft">all-in · incl. VAT</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-soft/80">Everything handled for you — one price, no hidden fees.</p>

          <a href="#notify" className="btn-accent mt-7 inline-flex w-full items-center justify-center gap-2 !py-3.5 text-base sm:w-auto sm:!px-8">
            Notify me when it opens <ArrowRight size={16} />
          </a>
        </div>

        {/* Mapa + search */}
        <div className="relative rounded-3xl bg-ink p-5 shadow-card sm:p-7">
          <div className="relative z-20">
            <div className="flex items-center gap-2 rounded-lg border border-paper/15 bg-paper/[0.06] px-3 focus-within:border-brass/50">
              <Search size={16} className="shrink-0 text-paper/55" />
              <input
                value={mq}
                onChange={(e) => setMq(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) pick(matches[0].iso); }}
                placeholder="Search a country…"
                className="w-full bg-transparent py-2.5 text-sm text-paper outline-none placeholder:text-paper/40"
              />
              {(mq || sel) && (
                <button onClick={() => { setMq(""); setSel(null); }} aria-label="Clear" className="text-paper/50 hover:text-paper">×</button>
              )}
            </div>
            {matches.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 overflow-hidden rounded-lg border border-line bg-paper shadow-2xl">
                {matches.map((m) => (
                  <button key={m.iso} onClick={() => pick(m.iso)} className="block w-full px-3.5 py-2.5 text-left text-sm font-medium text-ink hover:bg-paper-dim">{m.name}</button>
                ))}
              </div>
            )}
            {selName && !mq && (
              <p className="mt-2 text-xs text-paper/70">Showing on map: <strong className="text-brass-light">{selName}</strong></p>
            )}
          </div>

          <div className="relative mt-4">
            <div className="pointer-events-none absolute left-1 top-0 z-10">
              <span className="block font-display text-5xl font-extrabold leading-none text-brass">30</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-paper/60">countries covered</span>
            </div>
            <EuropeMap selected={sel} onSelect={setSel} className="mx-auto h-auto w-full" />
          </div>
        </div>
      </div>

      {/* Notify */}
      <div id="notify" className="mt-16 scroll-mt-24 rounded-2xl border border-brass/30 bg-brass/[0.06] p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-bold">Registrations aren't open yet</h2>
          <p className="max-w-xl text-ink-soft">You don't need ETIAS for trips before it launches — your valid passport is enough for now. Leave your email and we'll let you know the moment applications open.</p>
          <NotifySignup topic="eu-etias" english hideNote ctaLabel="Notify me when registrations open" />
        </div>
      </div>

      {/* Facts */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.label} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-paper text-brass">{f.icon}</span>
            <p className="mt-3 text-xs uppercase tracking-wider text-ink-soft/70">{f.label}</p>
            <p className="mt-0.5 font-display text-2xl font-extrabold text-ink">{f.value}</p>
            <p className="mt-1 text-xs text-ink-soft">{f.note}</p>
          </div>
        ))}
      </div>

      {/* What is / Who needs */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">What is ETIAS?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">ETIAS is an electronic travel authorisation — not a visa. You complete a short online application that is screened against EU security databases. Once approved, it is linked to your passport and allows multiple short stays of up to 90 days in any 180-day period.</p>
          <p className="mt-3 leading-relaxed text-ink-soft">It works alongside the Entry/Exit System (EES), the biometric border check. EES happens at the border; ETIAS is obtained online before you travel.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Who needs ETIAS?</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">Nationals of around 59 visa-exempt countries — including the US, UK, Canada, Australia, New Zealand, Japan and South Korea — will need an approved ETIAS to visit the participating countries for tourism, business or transit.</p>
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-paper/50 p-4">
            <Info size={16} className="mt-0.5 shrink-0 text-teal" />
            <p className="text-sm text-ink-soft">EU, EEA and Swiss nationals don't need ETIAS. Holders of a valid Schengen residence permit or long-stay visa are also exempt. Every traveller needs their own authorisation, including children.</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold">How it will work</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm font-bold text-paper">{i + 1}</span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Need / Good to know */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">What you'll need</h2>
          <ul className="mt-5 space-y-3">
            {NEED.map((n, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass/12 text-brass">{n.icon}</span>
                <span className="text-sm text-ink-soft">{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Good to know</h2>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li className="flex items-start gap-2.5"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-green" /> ETIAS is for short stays only — tourism, business or transit. It does not allow work or study.</li>
            <li className="flex items-start gap-2.5"><Plane size={16} className="mt-0.5 shrink-0 text-green" /> Once live, airlines may check for an approved ETIAS before boarding, so apply a few days ahead.</li>
            <li className="flex items-start gap-2.5"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-terra" /> No application portal exists yet. Any site selling ETIAS today is not legitimate — beware of scams.</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {FAQ.map((f, i) => (
            <details key={i} className="group rounded-xl border border-line bg-surface px-5 py-4 open:bg-paper/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-ink">
                {f.q}<span className="text-brass transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-ink p-8 text-paper sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brass/15 text-brass"><Check size={24} /></span>
          <div>
            <h3 className="font-display text-xl font-bold">We'll handle the paperwork when ETIAS opens</h3>
            <p className="mt-1 text-paper/70">Meanwhile, explore other travel authorisations you may need right now.</p>
          </div>
        </div>
        <Link href="/destinations" className="btn-accent shrink-0">Browse destinations</Link>
      </div>
    </section>
  );
}
