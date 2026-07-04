"use client";

import { useEffect, useState } from "react";
import { X, Mail, Check, Copy } from "lucide-react";
import { useLang } from "@/lib/i18n";

const KEY = "voyago.nlpopup";
const CODE = "CESTUJEME5";

export function EmailPopup() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
      const id = setTimeout(() => setOpen(true), 6000);
      return () => clearTimeout(id);
    } catch { /* ignore */ }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
  };

  const submit = async () => {
    if (state === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("error"); return; }
    setState("loading");
    try {
      const r = await fetch("/api/notify-signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, topic: "newsletter" }) });
      const d = await r.json();
      if (d.ok) { setState("done"); try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ } }
      else setState("error");
    } catch { setState("error"); }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-line bg-surface p-5 shadow-lift">
      <button onClick={dismiss} aria-label="Zavrieť" className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink">
        <X size={15} />
      </button>

      {state === "done" ? (
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Check size={18} className="text-green" /> {t({ sk: "Hotovo! Váš kód:", en: "Done! Your code:" })}</p>
          <button
            onClick={() => { navigator.clipboard?.writeText(CODE); setCopied(true); }}
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-brass/40 bg-brass/[0.08] px-4 py-3 font-mono text-lg font-bold tracking-widest text-brass"
          >
            {CODE} <span className="inline-flex items-center gap-1 text-xs font-semibold">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? t({ sk: "skopírované", en: "copied" }) : t({ sk: "kopírovať", en: "copy" })}</span>
          </button>
          <p className="mt-2 text-xs text-ink-soft">{t({ sk: "Zadajte ho pri platbe a získate 5 % zľavu na objednávku.", en: "Enter it at checkout for a 5% discount." })}</p>
        </div>
      ) : (
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Mail size={17} className="text-brass" /> {t({ sk: "5 % zľava na prvú cestu", en: "5% off your first trip" })}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {t({ sk: "Nechajte nám e-mail — pošleme zľavy, nové destinácie a dôležité zmeny pravidiel. Ako poďakovanie dostanete hneď 5 % kód.", en: "Leave your email — we'll send discounts, new destinations and important rule changes. You'll get a 5% code right away." })}
          </p>
          <div className="mt-3 flex gap-2">
            <input
              type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="vas@email.sk"
              className="input h-11 flex-1"
            />
            <button onClick={submit} disabled={state === "loading"} className="btn-accent h-11 shrink-0 !px-4 disabled:opacity-60">
              {state === "loading" ? "…" : t({ sk: "Získať", en: "Get it" })}
            </button>
          </div>
          {state === "error" && <p className="mt-1.5 text-xs text-terra">{t({ sk: "Zadajte platný e-mail.", en: "Enter a valid email." })}</p>}
          <p className="mt-2 text-[0.65rem] text-ink-soft/60">{t({ sk: "Žiadny spam — max. 2 e-maily mesačne, odhlásenie jedným klikom.", en: "No spam — max 2 emails a month, one-click unsubscribe." })}</p>
        </div>
      )}
    </div>
  );
}
