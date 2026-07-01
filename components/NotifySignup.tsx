"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function NotifySignup({
  topic = "etias", english = false, ctaLabel, hideNote = false,
}: { topic?: string; english?: boolean; ctaLabel?: string; hideNote?: boolean }) {
  const { t } = useLang();
  const L = (sk: string, en: string) => (english ? en : t({ sk, en }));
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async () => {
    if (state === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("error"); return; }
    setState("loading");
    try {
      const r = await fetch("/api/notify-signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, topic, website }) });
      const d = await r.json();
      setState(d.ok ? "done" : "error");
    } catch { setState("error"); }
  };

  if (state === "done")
    return (
      <div className="inline-flex items-center gap-2 rounded-lg bg-green/12 px-4 py-3 text-sm font-semibold text-green">
        <Check size={16} /> {L("Hotovo — ozveme sa hneď, ako to spustíme.", "Done — we'll email you the moment registrations open.")}
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-md text-left">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={L("Váš e-mail", "Your email")}
          className="input flex-1"
        />
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button onClick={submit} disabled={state === "loading"} className="btn-accent inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60">
          <Bell size={15} /> {state === "loading" ? L("Posielam…", "Sending…") : (ctaLabel || L("Upozornite ma", "Notify me"))}
        </button>
      </div>
      {state === "error" && <p className="mt-1.5 text-xs text-terra">{L("Zadajte platný e-mail, prosím.", "Please enter a valid email.")}</p>}
      {!hideNote && <p className="mt-2 text-xs text-ink-soft/70">{L("Žiadny spam. E-mail použijeme len na toto jedno upozornenie.", "No spam. We'll only use it for this one notification.")}</p>}
    </div>
  );
}
