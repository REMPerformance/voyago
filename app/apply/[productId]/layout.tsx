import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { site } from "@/config/site";

export function generateMetadata({ params }: { params: { productId: string } }): Metadata {
  const p = getProduct(params.productId);
  if (!p) return { title: "Žiadosť | Voyago" };
  const dest = p.destination.sk;
  const name = p.name.sk;
  const url = `${site.url}/apply/${p.slug}`;
  const title = `${name} — ${dest}`;
  const description = (p.summary?.sk || `Vybavte ${name} pre ${dest} jednoducho a bez stresu. Kontrolu, podanie aj komunikáciu s úradom vyriešime za vás.`).slice(0, 158);
  return {
    title,
    description,
    keywords: [name, dest, "vízum", "cestovné povolenie", p.type.toUpperCase()],
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${site.brand}`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.brand}`, description },
  };
}

export default function ApplyLayout({ children, params }: { children: React.ReactNode; params: { productId: string } }) {
  const p = getProduct(params.productId);
  const url = p ? `${site.url}/apply/${p.slug}` : site.url;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: site.url },
      { "@type": "ListItem", position: 2, name: "Destinácie", item: `${site.url}/destinations` },
      ...(p ? [{ "@type": "ListItem", position: 3, name: p.destination.sk, item: url }] : []),
    ],
  };
  const faqLd = p?.faq && p.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q.sk, acceptedAnswer: { "@type": "Answer", text: f.a.sk } })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {children}
    </>
  );
}
