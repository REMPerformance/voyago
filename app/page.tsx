"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Specializations } from "@/components/Specializations";
import { GreenCardBand } from "@/components/GreenCardBand";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { WorldReach } from "@/components/WorldReach";
import { Testimonials } from "@/components/Testimonials";
import { Guarantee } from "@/components/Guarantee";
import { Payments } from "@/components/Payments";
import { Faq } from "@/components/Faq";
import { HomeStructuredData, HomeFaqText } from "@/components/HomeStructuredData";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import { PRODUCTS } from "@/config/products";

export default function HomePage() {
  const { t, tr } = useLang();
  const featured = PRODUCTS.filter((p) => p.available).slice(0, 6);

  return (
    <>
      <Hero />
      <GreenCardBand />

      <section className="container-page py-12">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">{tr("dest.title")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {t({ sk: "Najčastejšie destinácie", en: "Popular destinations" })}
            </h2>
          </div>
          <Link href="/destinations" className="hidden items-center gap-1.5 text-sm font-semibold text-ink hover:underline sm:inline-flex">
            {tr("cta.browse")} <ArrowRight size={15} />
          </Link>
        </Reveal>
        <div className="dest-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-9 flex justify-center">
          <Link href="/destinations" className="btn-primary !px-7 !py-3.5 text-base">
            {t({ sk: "Zobraziť všetky destinácie", en: "View all destinations" })}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <WorldReach />
      <Specializations />
      <WhyUs />
      <About />
      <Testimonials />
      <Guarantee />

      <section className="container-page py-12">
        <Payments />
      </section>

      <Faq />
      <HomeFaqText />
      <HomeStructuredData />
    </>
  );
}
