import type { Metadata } from "next";
import { getProduct } from "@/config/products";
import { site } from "@/config/site";

export function generateMetadata({ params }: { params: { productId: string } }): Metadata {
  const p = getProduct(params.productId);
  if (!p) return { title: "Žiadosť | Voyago" };

  // ETIAS je pre prichádzajúcich do EÚ — metadáta po anglicky.
  if (p.slug === "eu-etias") {
    const url = `${site.url}/apply/${p.slug}`;
    const title = "ETIAS — EU Travel Authorisation (launching 2026)";
    const description = "Everything about ETIAS: who needs it, the €20 fee, 3-year validity and how to apply. Registrations aren't open yet — get notified the moment they do.";
    return {
      title,
      description,
      keywords: ["ETIAS", "EU travel authorisation", "Schengen", "ETIAS 2026", "ETIAS fee", "ETIAS application"],
      alternates: { canonical: url },
      openGraph: { title: `${title} | ${site.brand}`, description, url, type: "website", locale: "en" },
      twitter: { card: "summary_large_image", title: `${title} | ${site.brand}`, description },
    };
  }

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
  const etiasFaq = p?.slug === "eu-etias"
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { q: "Is ETIAS a visa?", a: "No. ETIAS is a travel authorisation for visa-exempt visitors, similar to the US ESTA or Canada eTA. It does not replace a visa for working, studying or long stays." },
          { q: "How much does ETIAS cost?", a: "The fee is €20 per application. Travellers under 18 or over 70 are exempt from the fee." },
          { q: "How long is ETIAS valid?", a: "Three years, or until the passport used in the application expires, whichever comes first. It allows multiple short stays." },
          { q: "When does ETIAS launch?", a: "ETIAS is expected to start in the last quarter of 2026. The application portal is not open yet." },
          { q: "Is ETIAS the same as the UK ETA?", a: "No. The UK is not part of the Schengen Area and runs its own Electronic Travel Authorisation, separate from ETIAS." },
        ].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  const faqLd = etiasFaq || (p?.faq && p.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q.sk, acceptedAnswer: { "@type": "Answer", text: f.a.sk } })),
      }
    : null);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {children}
    </>
  );
}
