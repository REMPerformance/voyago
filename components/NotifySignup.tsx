"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function NotifySignup({ topic = "etias" }: { topic?: string }) {
  const { t } = useLang();
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
        <Check size={16} /> {t({ sk: "Hotovo — ozveme sa hneď, ako to spustíme.", en: "Done — we'll email you the moment it launches." })}
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
          placeholder={t({ sk: "Váš e-mail", en: "Your email" })}
          className="input flex-1"
        />
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button onClick={submit} disabled={state === "loading"} className="btn-accent inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60">
          <Bell size={15} /> {state === "loading" ? t({ sk: "Posielam…", en: "Sending…" }) : t({ sk: "Upozornite ma", en: "Notify me" })}
        </button>
      </div>
      {state === "error" && <p className="mt-1.5 text-xs text-terra">{t({ sk: "Zadajte platný e-mail, prosím.", en: "Please enter a valid email." })}</p>}
      <p className="mt-2 text-xs text-ink-soft/70">{t({ sk: "Žiadny spam. E-mail použijeme len na toto jedno upozornenie.", en: "No spam. We'll only use it for this one notification." })}</p>
    </div>
  );
}
