"use client";

import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";
import { PRODUCTS } from "@/config/products";

export default function DestinationsPage() {
  const { tr } = useLang();

  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">{tr("dest.title")}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{tr("dest.title")}</h1>
        <p className="mt-4 text-lg text-ink-soft">{tr("dest.sub")}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
