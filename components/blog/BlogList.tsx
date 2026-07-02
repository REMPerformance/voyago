"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { POSTS, estimateReadMins } from "@/config/blog";

export function BlogList() {
  const { t, lang } = useLang();
  const fmt = (d: string) => new Date(d).toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const [featured, ...rest] = POSTS;

  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">{t({ sk: "Blog", en: "Blog" })}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{t({ sk: "Sprievodcovia a novinky", en: "Guides & news" })}</h1>
        <p className="mt-4 text-lg text-ink-soft">{t({ sk: "Praktické rady k vízam a cestovným povoleniam — zrozumiteľne a podľa krajiny.", en: "Practical advice on visas and travel authorizations — clear and by country." })}</p>
      </div>

      {/* Hlavný článok */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-12 grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ink to-navy-soft lg:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.image} alt={t(featured.imageAlt)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-brass">{t(featured.tag)}</span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{t(featured.title)}</h2>
            <p className="mt-3 text-ink-soft">{t(featured.excerpt)}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft/70">
              <span>{fmt(featured.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {estimateReadMins(featured)} min</span>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:gap-2.5">{t({ sk: "Čítať článok", en: "Read article" })} <ArrowRight size={15} /></span>
          </div>
        </Link>
      )}

      {/* Ostatné */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ink to-navy-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={t(p.imageAlt)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-brass">{t(p.tag)}</span>
              <h2 className="mt-2 font-display text-lg font-bold leading-snug text-ink">{t(p.title)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft line-clamp-3">{t(p.excerpt)}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 text-xs text-ink-soft/70">
                <span>{fmt(p.date)}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {estimateReadMins(p)} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
