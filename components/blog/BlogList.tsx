"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search, Globe2 } from "lucide-react";
import type { UnifiedPost } from "@/lib/posts";

const CAT_LABEL: Record<string, string> = {
  delay: "Odklad", new_requirement: "Nová požiadavka", price: "Zmena ceny", closure: "Obmedzenie", general: "Novinka",
};

export function BlogList({ posts }: { posts: UnifiedPost[] }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "blog" | "update">("all");

  const fmt = (d: string) => new Date(d).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter !== "all" && p.kind !== filter) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tag.toLowerCase().includes(needle) ||
        p.countries.some((c) => c.toLowerCase().includes(needle))
      );
    });
  }, [posts, q, filter]);

  const [featured, ...rest] = filtered;

  return (
    <section className="container-page py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Sprievodcovia a novinky</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">Praktické rady k vízam a cestovným povoleniam aj aktuálne zmeny podľa krajín. Všetko na jednom mieste.</p>
      </div>

      {/* Vyhľadávač + filter */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Hľadať podľa témy alebo krajiny…"
            className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brass"
          />
        </div>
        <div className="inline-flex rounded-lg border border-line p-0.5">
          {([["all", "Všetko"], ["blog", "Sprievodcovia"], ["update", "Novinky"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${filter === k ? "bg-brass text-navy" : "text-ink-soft hover:text-ink"}`}>{l}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <p className="mt-10 rounded-xl border border-line bg-surface p-6 text-ink-soft">Nič sa nenašlo. Skúste iný výraz.</p>}

      {/* Vybraný príspevok */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-8 grid gap-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all hover:-translate-y-0.5 hover:border-brass/40 md:grid-cols-2">
          {featured.image ? (
            <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
              <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ) : (
            <div className="aspect-[16/10] bg-navy md:aspect-auto" />
          )}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs">
              <span className={`rounded-md px-2 py-0.5 font-bold ${featured.kind === "blog" ? "bg-teal/12 text-teal" : "bg-brass/12 text-brass"}`}>{featured.kind === "blog" ? (featured.tag || "Sprievodca") : CAT_LABEL[featured.category]}</span>
              <span className="text-ink-soft/70">{fmt(featured.date)}</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink transition-colors group-hover:text-brass">{featured.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft line-clamp-2">{featured.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">Čítať <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>
      )}

      {/* Mriežka ostatných */}
      {rest.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all hover:-translate-y-1 hover:border-brass/40">
              {p.image ? (
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-gradient-to-br from-navy to-[#12233a]" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem]">
                  <span className={`rounded-md px-1.5 py-0.5 font-bold ${p.kind === "blog" ? "bg-teal/12 text-teal" : "bg-brass/12 text-brass"}`}>{p.kind === "blog" ? (p.tag || "Sprievodca") : CAT_LABEL[p.category]}</span>
                  {p.countries.slice(0, 2).map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 rounded-md bg-paper px-1.5 py-0.5 font-medium text-ink-soft"><Globe2 size={10} /> {c}</span>
                  ))}
                </div>
                <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brass">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft line-clamp-3">{p.excerpt}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-ink-soft/70">
                  <span>{fmt(p.date)}</span>
                  {p.readMins ? <span className="inline-flex items-center gap-1"><Clock size={12} /> {p.readMins} min</span> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
