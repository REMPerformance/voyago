"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

type Field = { key: string; label: string; placeholder?: string; type?: "text" | "email" | "textarea" | "select"; options?: string[]; required?: boolean };

export function LeadForm({ endpoint, fields, cta = "Odoslať", success }: { endpoint: string; fields: Field[]; cta?: string; success: string }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async () => {
    if (state === "loading") return;
    for (const f of fields) if (f.required && !(vals[f.key] || "").trim()) { setState("error"); return; }
    setState("loading");
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...vals, website: hp }) });
      const d = await r.json();
      setState(d.ok ? "done" : "error");
    } catch { setState("error"); }
  };

  if (state === "done")
    return (
      <div className="flex items-center gap-2.5 rounded-xl bg-green/12 px-4 py-4 text-sm font-semibold text-green">
        <Check size={17} /> {success}
      </div>
    );

  return (
    <div className="space-y-2.5">
      {fields.map((f) => {
        const common = "input w-full";
        const set = (v: string) => { setVals((p) => ({ ...p, [f.key]: v })); if (state === "error") setState("idle"); };
        if (f.type === "textarea")
          return <textarea key={f.key} rows={4} value={vals[f.key] || ""} onChange={(e) => set(e.target.value)} placeholder={f.placeholder || f.label} className={common} />;
        if (f.type === "select")
          return (
            <select key={f.key} value={vals[f.key] || ""} onChange={(e) => set(e.target.value)} className={common}>
              <option value="">{f.label}</option>
              {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          );
        return <input key={f.key} type={f.type || "text"} value={vals[f.key] || ""} onChange={(e) => set(e.target.value)} placeholder={f.placeholder || f.label} className={common} />;
      })}
      <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button onClick={submit} disabled={state === "loading"} className="btn-primary inline-flex w-full items-center justify-center gap-2 !py-3 disabled:opacity-60">
        <Send size={15} /> {state === "loading" ? "Odosielam…" : cta}
      </button>
      {state === "error" && <p className="text-xs text-terra">Vyplňte, prosím, povinné polia (názov/meno a platný e-mail).</p>}
    </div>
  );
}
