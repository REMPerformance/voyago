"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/config/products";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span>{lang}</span>
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* neviditeľný overlay na zatvorenie */}
      <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`} onClick={() => setOpen(false)} />

      {/* dropdown — vždy v DOM kvôli plynulému prechodu */}
      <ul
        role="listbox"
        className={`absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lift transition-all duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {LANGS.map((l) => (
          <li key={l.code}>
            <button
              onClick={() => { setLang(l.code); setOpen(false); }}
              role="option"
              aria-selected={lang === l.code}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-paper/70 ${lang === l.code ? "text-ink" : "text-ink-soft"}`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {lang === l.code && <Check size={14} className="text-brass" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
