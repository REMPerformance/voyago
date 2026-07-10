import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORY_LABEL, SEVERITY_STYLE, type VisaUpdate } from "@/lib/updates";
import { site } from "@/config/site";
import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Novinky o vízach a cestovných povoleniach | Voyago",
  description:
    "Aktuálne zmeny vo vízach a cestovných povoleniach: odklady, nové požiadavky, zmeny cien a obmedzenia podľa krajín. Sledujte, čo sa mení, skôr než vycestujete.",
  keywords: ["novinky víza", "zmeny cestovné povolenia", "ESTA zmeny", "ETA novinky", "vízové obmedzenia", "DV lotéria novinky"],
  alternates: {
    canonical: `${site.url}/updates`,
    languages: { "sk-SK": `${site.url}/updates`, "en-GB": `${site.url}/updates`, "uk-UA": `${site.url}/updates`, "de-DE": `${site.url}/updates`, "x-default": `${site.url}/updates` },
  },
  openGraph: { title: "Novinky o vízach | Voyago", description: "Aktuálne zmeny vo vízach a cestovných povoleniach podľa krajín.", url: `${site.url}/updates`, type: "website" },
};

async function getUpdates(): Promise<VisaUpdate[]> {
  if (!supabaseAdmin) return [];
  const { data } = await supabaseAdmin.from("visa_updates").select("*").eq("published", true).order("published_at", { ascending: false }).limit(100);
  return (data as VisaUpdate[]) || [];
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

export default async function Page() {
  const updates = await getUpdates();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Novinky o vízach a cestovných povoleniach",
    url: `${site.url}/updates`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: "Aktuálne zmeny vo vízových pravidlách a cestovných povoleniach.",
    hasPart: updates.slice(0, 20).map((u) => ({
      "@type": "NewsArticle",
      headline: u.title,
      datePublished: u.published_at,
      url: `${site.url}/updates/${u.slug}`,
      publisher: { "@id": `${site.url}/#organization` },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-page py-14">
        <p className="eyebrow">Latest updates</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Novinky o vízach</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Vízové pravidlá sa menia. Tu nájdete aktuálne odklady, nové požiadavky, zmeny cien a obmedzenia podľa jednotlivých krajín, aby vás na ceste nič neprekvapilo.
        </p>

        {updates.length === 0 ? (
          <p className="mt-10 rounded-xl border border-line bg-surface p-6 text-ink-soft">Zatiaľ tu nie sú žiadne novinky. Pozrite sa neskôr.</p>
        ) : (
          <div className="mt-10 space-y-4">
            {updates.map((u) => (
              <Link
                key={u.id}
                href={`/updates/${u.slug}`}
                className="group block rounded-2xl border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brass/40 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`rounded-lg border px-2.5 py-1 text-[0.68rem] font-bold ${SEVERITY_STYLE[u.severity]}`}>
                    {CATEGORY_LABEL[u.category].sk}
                  </span>
                  {u.countries.slice(0, 4).map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 rounded-lg bg-paper px-2 py-1 text-[0.68rem] font-medium text-ink-soft">
                      <Globe2 size={11} /> {c}
                    </span>
                  ))}
                  <time className="ml-auto text-xs text-ink-soft/70">{fmt(u.published_at)}</time>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold text-ink transition-colors group-hover:text-brass">{u.title}</h2>
                {u.summary && <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft line-clamp-2">{u.summary}</p>}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brass">
                  Čítať viac <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
