"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, type Product } from "@/config/products";

const ALIASES: Record<string, string> = {
  esta: "esta usa amerika spojené štáty united states",
  eta: "eta electronic travel authorisation",
  evisa: "e-visa evisa vízum visa",
  etias: "etias eu európa schengen",
};

export function GlobalSearch() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // index pre vyhľadávanie
  const index = useMemo(
    () =>
      PRODUCTS.map((p) => ({
        p,
        hay: `${t(p.name)} ${t(p.destination)} ${p.type} ${p.country} ${ALIASES[p.type] || ""}`.toLowerCase(),
      })),
    [t],
  );

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return PRODUCTS.filter((p) => p.available).slice(0, 6);
    return index.filter((e) => query.split(/\s+/).every((w) => e.hay.includes(w))).slice(0, 8).map((e) => e.p);
  }, [q, index]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const go = (p: Product) => { setOpen(false); setQ(""); router.push(`/apply/${p.slug}`); };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t({ sk: "Hľadať", en: "Search" })}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
      >
        <Search size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="shrink-0 text-ink-soft" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(results[0]); }}
                placeholder={t({ sk: "Hľadajte krajinu, ESTA, vízum…", en: "Search a country, ESTA, visa…" })}
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-ink-soft/50"
              />
              <button onClick={() => setOpen(false)} aria-label="Zavrieť" className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-ink-soft hover:bg-paper-dim">
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {q.trim() === "" && <p className="px-3 pb-1.5 pt-2 text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft/60">{t({ sk: "Obľúbené", en: "Popular" })}</p>}
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-ink-soft">{t({ sk: "Nič sme nenašli. Skúste iný názov krajiny alebo typ povolenia.", en: "Nothing found. Try another country or permit type." })}</p>
              ) : (
                results.map((p) => (
                  <button key={p.slug} onClick={() => go(p)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-paper-dim">
                    <span className="text-2xl">{p.flag}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{t(p.destination)}</span>
                      <span className="block truncate text-xs text-ink-soft">{t(p.name)}</span>
                    </span>
                    {!p.available && <span className="rounded-md bg-paper-dim px-2 py-0.5 text-[0.62rem] font-semibold text-ink-soft">{t({ sk: "čoskoro", en: "soon" })}</span>}
                    <span className="rounded-md bg-ink/[0.06] px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-ink-soft">{p.type}</span>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-line bg-paper-dim/40 px-4 py-2 text-[0.7rem] text-ink-soft/70">
              <CornerDownLeft size={12} /> {t({ sk: "Enter pre prvý výsledok", en: "Enter for the first result" })}
              <span className="ml-auto">Esc</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
