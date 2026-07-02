"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Check, HelpCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getPost, POSTS, estimateReadMins } from "@/config/blog";

export function BlogArticle({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const post = getPost(slug);
  const fmt = (d: string) => new Date(d).toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (!post) {
    return (
      <section className="container-page py-16">
        <p className="text-ink-soft">{t({ sk: "Článok sme nenašli.", en: "Article not found." })}</p>
        <Link href="/blog" className="btn-primary mt-6">{t({ sk: "Späť na blog", en: "Back to blog" })}</Link>
      </section>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-16">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden bg-gradient-to-br from-ink to-navy-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt={t(post.imageAlt)} className="h-full w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0">
          <div className="max-w-3xl pb-8 text-paper">
            <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-brass-light">{t(post.tag)}</span>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{t(post.title)}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-paper/75">
              <span>{fmt(post.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {estimateReadMins(post)} min</span>
              {post.updated && <span>{t({ sk: "Aktualizované", en: "Updated" })}: {fmt(post.updated)}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page">
        <Link href="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"><ArrowLeft size={15} /> {t({ sk: "Všetky články", en: "All articles" })}</Link>

        <div className="mx-auto mt-6 max-w-3xl">
          {/* Perex */}
          <p className="border-l-2 border-brass pl-4 text-lg leading-relaxed text-ink">{t(post.excerpt)}</p>

          {/* Telo */}
          <div className="mt-8 space-y-6">
            {post.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="font-display text-2xl font-bold text-ink">{t(b.h)}</h2>}
                {b.p && <p className="mt-2 leading-relaxed text-ink-soft">{t(b.p)}</p>}
                {b.list && (
                  <ul className="mt-3 space-y-2">
                    {b.list.map((li, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-ink-soft"><Check size={18} className="mt-0.5 shrink-0 text-green" /> <span>{t(li)}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* FAQ */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink">{t({ sk: "Časté otázky", en: "Frequently asked questions" })}</h2>
              <div className="mt-4 divide-y divide-line-soft border-y border-line-soft">
                {post.faq.map((f, i) => (
                  <details key={i} className="group py-4">
                    <summary className="flex cursor-pointer items-start gap-2.5 font-semibold text-ink marker:content-['']">
                      <HelpCircle size={18} className="mt-0.5 shrink-0 text-brass" /> {t(f.q)}
                    </summary>
                    <p className="mt-2 pl-7 leading-relaxed text-ink-soft">{t(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-ink p-8 text-paper">
            <h3 className="font-display text-xl font-bold">{t({ sk: "Vybavíme to za vás", en: "We'll handle it for you" })}</h3>
            <p className="mt-1.5 text-paper/70">{t({ sk: "Nechajte papierovačky na nás — vy len doplníte pár údajov a my žiadosť skontrolujeme aj podáme.", en: "Leave the paperwork to us — you fill in a few details and we check and file your application." })}</p>
            <Link href="/destinations" className="btn-accent mt-5">{t({ sk: "Vybrať destináciu", en: "Choose a destination" })}</Link>
          </div>
        </div>

        {/* Súvisiace */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="font-display text-2xl font-bold text-ink">{t({ sk: "Ďalšie články", en: "More articles" })}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ink to-navy-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={t(p.imageAlt)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div className="p-5">
                    <span className="text-[0.64rem] font-semibold uppercase tracking-wider text-brass">{t(p.tag)}</span>
                    <p className="mt-2 font-display font-bold leading-snug text-ink">{t(p.title)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
