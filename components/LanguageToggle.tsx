"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/config/products";

const LANGS: { code: Lang; label: string }[] = [
  { code: "sk", label: "Slovenčina" },
  { code: "cs", label: "Čeština" },
  { code: "en", label: "English" },
  { code: "hu", label: "Magyar" },
  { code: "uk", label: "Українська" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs uppercase tracking-wider text-ink-soft transition-colors hover:bg-paper hover:text-ink"
      >
        <Globe size={14} /> {lang}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul role="listbox" className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lift">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  role="option"
                  aria-selected={lang === l.code}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-paper/70 ${lang === l.code ? "text-ink" : "text-ink-soft"}`}
                >
                  <span><span className="text-[0.65rem] uppercase tracking-wider text-brass">{l.code}</span> · {l.label}</span>
                  {lang === l.code && <Check size={14} className="text-brass" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
