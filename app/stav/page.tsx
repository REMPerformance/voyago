"use client";

import { useState } from "react";
import { Search, Check, AlertTriangle, XCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { getProduct } from "@/config/products";
import { ORDER_STAGES, ORDER_SIDE, stageIndex, isSideStatus } from "@/config/orderStages";

export default function Page() {
  const { t } = useLang();
  const [ref, setRef] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!supabaseEnabled || !supabase || !ref.trim() || !email.trim()) return;
    setLoading(true);
    const { data } = await supabase.rpc("voyago_app_status", { p_ref: ref.trim().toUpperCase(), p_email: email.trim() });
    setResult((data && (data as any[])[0]) || null);
    setLoading(false);
  };

  const status: string = result?.status ?? "";
  const idx = stageIndex(status);
  const side = isSideStatus(status) ? ORDER_SIDE[status] : null;
  const product = result ? getProduct(result.product_slug) : null;

  return (
    <section className="container-page max-w-2xl py-16">
      <p className="eyebrow">{t({ sk: "Sledovanie", en: "Tracking" })}</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">{t({ sk: "Stav vašej žiadosti", en: "Your application status" })}</h1>
      <p className="mt-3 text-ink-soft">{t({ sk: "Zadajte referenčné číslo a e-mail, ktorý ste použili pri objednávke.", en: "Enter the reference number and the email you used when ordering." })}</p>

      <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-[1fr_1fr_auto]">
        <input value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="VYG-XXXXXX" className="input !mt-0 uppercase" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="e-mail" type="email" className="input !mt-0" />
        <button onClick={search} disabled={loading} className="btn-primary"><Search size={15} /> {loading ? "…" : t({ sk: "Zistiť", en: "Check" })}</button>
      </div>

      {result === null && (
        <p className="mt-8 rounded-xl border border-line bg-surface p-5 text-sm text-ink-soft">{t({ sk: "Žiadosť sme nenašli. Skontrolujte referenčné číslo a e-mail.", en: "We couldn't find that application. Check the reference and email." })}</p>
      )}

      {result && (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
          {/* Hlavička */}
          <div className="flex items-center justify-between gap-3 border-b border-line-soft pb-5">
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-wider text-ink-soft">{t({ sk: "Žiadosť", en: "Application" })} · {ref}</p>
              <p className="truncate font-display text-lg font-bold">{product ? t(product.name) : result.product_slug}</p>
            </div>
            <span className={`shrink-0 text-[0.62rem] font-bold uppercase tracking-wider ${result.paid ? "text-green" : "text-brass"}`}>
              {result.paid ? t({ sk: "zaplatené", en: "paid" }) : t({ sk: "nezaplatené", en: "unpaid" })}
            </span>
          </div>

          {/* Vedľajší stav (doplniť / zamietnuté) */}
          {side && (
            <div className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${side.tone === "error" ? "border-terra/30 bg-terra/[0.06]" : "border-brass/30 bg-brass/[0.07]"}`}>
              {side.tone === "error" ? <XCircle size={20} className="mt-0.5 shrink-0 text-terra" /> : <AlertTriangle size={20} className="mt-0.5 shrink-0 text-brass" />}
              <div>
                <p className={`font-semibold ${side.tone === "error" ? "text-terra" : "text-ink"}`}>{t(side.label)}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{t(side.desc)}</p>
              </div>
            </div>
          )}

          {/* Loading stages */}
          {!side && (
            <ol className="mt-6">
              {ORDER_STAGES.map((s, i) => {
                const done = i < idx;
                const current = i === idx;
                const last = i === ORDER_STAGES.length - 1;
                return (
                  <li key={s.key} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* spojnica */}
                    {!last && <span className={`absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5 ${done ? "bg-green" : "bg-line"}`} />}
                    {/* bod */}
                    <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-green text-white" : current ? "bg-brass text-ink ring-4 ring-brass/20" : "bg-line-soft text-ink-soft/50"}`}>
                      {done ? <Check size={16} /> : i + 1}
                    </span>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-semibold ${current ? "text-ink" : done ? "text-ink" : "text-ink-soft/55"}`}>{t(s.label)}</p>
                        {current && <span className="text-[0.52rem] uppercase tracking-wider text-brass">{t({ sk: "aktuálne", en: "current" })}</span>}
                      </div>
                      <p className={`mt-0.5 text-sm ${current || done ? "text-ink-soft" : "text-ink-soft/45"}`}>{t(s.desc)}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </section>
  );
}
