"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Camera, ShieldCheck, Ruler, Image as ImageIcon, Glasses, Smile, Clock, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PhotoExample } from "@/components/PhotoExample";
import { PhotoGuideAnimation } from "@/components/PhotoGuideAnimation";
import { PhotoChecker } from "@/components/PhotoChecker";
import { PHOTO_DO, PHOTO_DONT, PHOTO_SIZES, getPhotoSpec } from "@/config/photoSpec";
import { getProduct } from "@/config/products";

function PhotoGuideInner() {
  const { t } = useLang();
  const params = useSearchParams();
  const dest = params.get("dest") || "";
  const isDv = /green|dv/i.test(dest);
  const product = dest ? getProduct(dest) : undefined;
  const spec = getPhotoSpec(isDv ? "US" : product?.country);

  const destName = product ? t(product.destination) : t(spec.label);

  const specRows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Ruler size={15} />, label: t({ sk: "Rozmer", en: "Size" }), value: t(spec.sizeLabel) },
    { icon: <ImageIcon size={15} />, label: t({ sk: "Súbor", en: "File" }), value: t(spec.fileLabel) },
    { icon: <Camera size={15} />, label: t({ sk: "Hlava / tvár", en: "Head / face" }), value: t(spec.headLabel) },
    { icon: <span className="block h-3.5 w-3.5 rounded-full border border-current" />, label: t({ sk: "Pozadie", en: "Background" }), value: t(spec.bg) },
    { icon: <Glasses size={15} />, label: t({ sk: "Okuliare", en: "Glasses" }), value: t(isDv && spec.glassesDv ? spec.glassesDv : spec.glasses) },
    { icon: <Smile size={15} />, label: t({ sk: "Výraz", en: "Expression" }), value: t(spec.expression) },
    { icon: <Clock size={15} />, label: t({ sk: "Vek fotky", en: "Recency" }), value: t(spec.recent) },
  ];

  return (
    <section className="container-page py-16">
      {/* Úvod */}
      <div className="max-w-2xl">
        <p className="eyebrow">{t({ sk: "Pomôcka", en: "Guide" })}</p>
        <h1 className="mt-3 flex items-center gap-3 text-4xl font-extrabold sm:text-5xl">
          <Camera className="hidden text-brass sm:block" size={40} /> {t({ sk: "Foto na vízum: ako má vyzerať", en: "Visa photo: how it should look" })}
        </h1>
        {dest ? (
          <p className="mt-4 text-lg text-ink-soft">{t({ sk: "Presné požiadavky na fotku pre", en: "Exact photo requirements for" })} <span className="font-semibold text-ink">{destName}</span>. {t({ sk: "Postupujte podľa animácie nižšie — a fotku vám pred podaním ešte raz skontrolujeme.", en: "Follow the animation below — and we'll check your photo again before submission." })}</p>
        ) : (
          <p className="mt-4 text-lg text-ink-soft">{t({ sk: "Zlá fotka je najčastejší dôvod zdržania žiadosti. Podľa tohto návodu ju spravíte správne na prvýkrát — a my ju pred podaním ešte raz skontrolujeme.", en: "A bad photo is the top cause of application delays. This guide helps you get it right the first time — and we check it again before submission." })}</p>
        )}
      </div>

      {/* Animovaný sprievodca */}
      <div className="mt-10">
        <PhotoGuideAnimation spec={spec} defaultDv={isDv} />
      </div>

      {/* Skúste si svoju fotku */}
      <div className="mt-8">
        <PhotoChecker spec={spec} />
      </div>

      {/* Presná špecifikácia (karta) */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-line">
        <div className="flex items-center justify-between border-b border-line bg-paper/50 px-5 py-3">
          <h2 className="font-display text-lg font-bold">{t({ sk: "Presné požiadavky", en: "Exact requirements" })}: {destName}</h2>
          <span className="text-xs font-semibold text-brass">{spec.code === "generic" ? t({ sk: "štandard", en: "standard" }) : spec.code}</span>
        </div>
        <dl className="divide-y divide-line">
          {specRows.map((r, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3 sm:gap-5">
              <dt className="flex w-32 shrink-0 items-center gap-2 text-sm font-semibold text-ink-soft"><span className="text-brass">{r.icon}</span> {r.label}</dt>
              <dd className="text-sm text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
        {spec.extra && spec.extra.length > 0 && (
          <ul className="space-y-1.5 border-t border-line bg-paper/30 px-5 py-3">
            {spec.extra.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-soft"><Check size={14} className="mt-0.5 shrink-0 text-green" /> {t(e)}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Pravidlá v skratke */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold">{t({ sk: "Pravidlá v skratke", en: "Rules at a glance" })}</h2>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTO_DO.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/12 text-green"><Check size={13} strokeWidth={3} /></span>
              <span><span className="font-semibold text-ink">{t(r.title)}.</span> <span className="text-sm text-ink-soft">{t(r.desc)}</span></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Časté chyby */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold">{t({ sk: "Časté chyby, ktorým sa vyhni", en: "Common mistakes to avoid" })}</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PHOTO_DONT.map((d) => (
            <div key={d.key} className="text-center">
              <PhotoExample variant={d.key} />
              <p className="mt-3 text-sm font-semibold text-ink">{t(d.title)}</p>
              <p className="mt-1 text-xs text-ink-soft">{t(d.desc)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rozmery podľa krajiny */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold">{t({ sk: "Rozmery podľa krajiny", en: "Sizes by country" })}</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line">
          {PHOTO_SIZES.map((s, i) => (
            <div key={i} className={`flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between ${i % 2 ? "bg-surface" : "bg-paper/40"}`}>
              <span className="font-semibold text-ink">{t(s.region)}</span>
              <span className="text-sm text-ink-soft">{t(s.size)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-soft/70">{t({ sk: "Rozmery sú orientačné; pri každej objednávke fotku upravíme presne podľa noriem danej krajiny.", en: "Sizes are indicative; with every order we adjust the photo precisely to each country's spec." })}</p>
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-ink p-8 text-paper sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brass/15 text-brass"><ShieldCheck size={24} /></span>
          <div>
            <h3 className="font-display text-xl font-bold">{t({ sk: "Fotku vám skontrolujeme zdarma", en: "We check your photo for free" })}</h3>
            <p className="mt-1 text-paper/70">{t({ sk: "Pri každej objednávke fotku posúdime a upravíme podľa noriem — bez ďalších poplatkov.", en: "With every order we review and adjust your photo to spec — at no extra cost." })}</p>
          </div>
        </div>
        {product ? (
          <Link href={`/apply/${product.slug}`} className="btn-accent inline-flex shrink-0 items-center gap-2">{t({ sk: "Späť na žiadosť", en: "Back to application" })} <ArrowRight size={16} /></Link>
        ) : (
          <Link href="/destinations" className="btn-accent shrink-0">{t({ sk: "Vybrať destináciu", en: "Choose a destination" })}</Link>
        )}
      </div>
    </section>
  );
}

export default function PhotoGuidePage() {
  return (
    <Suspense fallback={<div className="container-page py-24" />}>
      <PhotoGuideInner />
    </Suspense>
  );
}
