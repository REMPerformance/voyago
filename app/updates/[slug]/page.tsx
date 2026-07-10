import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORY_LABEL, SEVERITY_STYLE, type VisaUpdate } from "@/lib/updates";
import { site } from "@/config/site";
import Link from "next/link";
import { ArrowLeft, Globe2, AlertTriangle, ExternalLink } from "lucide-react";

export const revalidate = 120;

async function getUpdate(slug: string): Promise<VisaUpdate | null> {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin.from("visa_updates").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return (data as VisaUpdate) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const u = await getUpdate(params.slug);
  if (!u) return { title: "Novinka nenájdená | Voyago" };
  const url = `${site.url}/updates/${u.slug}`;
  const desc = u.summary || `${CATEGORY_LABEL[u.category].sk} — ${u.title}. ${u.countries.join(", ")}`.slice(0, 300);
  return {
    title: `${u.title} | Novinky o vízach | Voyago`,
    description: desc,
    keywords: [...u.countries, "víza", "cestovné povolenie", CATEGORY_LABEL[u.category].sk, "novinka"],
    alternates: {
      canonical: url,
      languages: { "sk-SK": url, "en-GB": url, "uk-UA": url, "de-DE": url, "x-default": url },
    },
    openGraph: { title: u.title, description: desc, url, type: "article", publishedTime: u.published_at },
  };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

function renderBody(body: string) {
  return body.split(/\n{2,}/).map((block, i) => {
    const t = block.trim();
    if (!t) return null;
    if (t.startsWith("## ")) return <h2 key={i} className="mt-8 font-display text-xl font-bold text-ink">{t.slice(3)}</h2>;
    if (/^-\s+/m.test(t)) {
      return (
        <ul key={i} className="mt-3 space-y-1.5">
          {t.split("\n").filter((l) => l.startsWith("- ")).map((l, k) => (
            <li key={k} className="flex gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" /> {l.slice(2)}
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{t}</p>;
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const u = await getUpdate(params.slug);
  if (!u) notFound();

  const url = `${site.url}/updates/${u.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: u.title,
    description: u.summary,
    datePublished: u.published_at,
    dateModified: u.created_at,
    inLanguage: "sk",
    url,
    mainEntityOfPage: url,
    publisher: { "@id": `${site.url}/#organization` },
    author: { "@id": `${site.url}/#organization` },
    about: u.countries.map((c) => ({ "@type": "Country", name: c })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container-page py-14">
        <div className="mx-auto max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft size={15} /> Všetky novinky
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className={`rounded-lg border px-2.5 py-1 text-[0.68rem] font-bold ${SEVERITY_STYLE[u.severity]}`}>
              {CATEGORY_LABEL[u.category].sk}
            </span>
            <time className="text-xs text-ink-soft/70">{fmt(u.published_at)}</time>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{u.title}</h1>
          {u.summary && <p className="mt-3 text-lg leading-relaxed text-ink-soft">{u.summary}</p>}

          {u.countries.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft/60">Týka sa krajín:</span>
              {u.countries.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1 text-xs font-medium text-ink">
                  <Globe2 size={12} /> {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8">{renderBody(u.body)}</div>

          {u.restrictions && (
            <div className="mt-8 rounded-2xl border border-brass/30 bg-brass/[0.07] p-5">
              <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
                <AlertTriangle size={17} className="text-brass" /> Obmedzenia a dopad
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{u.restrictions}</p>
            </div>
          )}

          {u.source_url && (
            <a href={u.source_url} target="_blank" rel="noopener noreferrer nofollow" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:underline">
              Oficiálny zdroj <ExternalLink size={13} />
            </a>
          )}

          <div className="mt-10 rounded-2xl bg-navy p-6 text-cream sm:p-7">
            <p className="font-display text-lg font-bold">Potrebujete vybaviť cestovné povolenie?</p>
            <p className="mt-1 text-cream/70">Vyberte destináciu a my sa postaráme o kontrolu údajov aj podanie žiadosti.</p>
            <Link href="/destinations" className="btn-accent mt-4">Vybrať destináciu</Link>
          </div>
        </div>
      </article>
    </>
  );
}
