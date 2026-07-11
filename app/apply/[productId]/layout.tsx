import type { Metadata } from "next";
import { getProduct, productPrice } from "@/config/products";
import { DestinationPosts } from "@/components/DestinationPosts";
import { site } from "@/config/site";

export function generateMetadata({ params }: { params: { productId: string } }): Metadata {
  const p = getProduct(params.productId);
  if (!p) return { title: "Žiadosť | Voyago" };

  // ETIAS je pre prichádzajúcich do EÚ — metadáta po anglicky.
  if (p.slug === "eu-etias") {
    const url = `${site.url}/apply/${p.slug}`;
    const title = "ETIAS for US Citizens & Non-EU Travellers — Application, Fee, Requirements (2026)";
    const description = "ETIAS guide for travellers from the USA, UK, Canada & Australia: who needs it, cost, 3-year validity, 30 covered countries and how to apply when registrations open in late 2026.";
    return {
      title,
      description,
      keywords: ["ETIAS", "ETIAS application", "ETIAS for US citizens", "ETIAS USA", "ETIAS UK", "ETIAS Canada", "Europe travel authorization", "Schengen ETIAS", "ETIAS requirements", "ETIAS 2026", "ETIAS cost", "ETIAS visa waiver"],
      alternates: { canonical: url },
      openGraph: { title: `${title} | ${site.brand}`, description, url, type: "website", locale: "en_US" },
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
    alternates: {
      canonical: url,
      languages: { "sk-SK": url, "en-GB": url, "uk-UA": url, "de-DE": url, "x-default": url },
    },
    openGraph: { title: `${title} | ${site.brand}`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.brand}`, description },
  };
}

export default async function ApplyLayout({ children, params }: { children: React.ReactNode; params: { productId: string } }) {
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

  const serviceLd = p
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${p.name.sk} — ${p.destination.sk}`,
        serviceType: "Sprostredkovanie cestovného povolenia",
        description: p.summary?.sk || `Sprostredkovanie vybavenia ${p.name.sk} pre cestu do krajiny ${p.destination.sk}.`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "Slovakia" },
        url,
        offers: {
          "@type": "Offer",
          price: String(productPrice(p)),
          priceCurrency: "EUR",
          url,
          availability: p.available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: String(productPrice(p)),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
        },
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {children}
      <DestinationPosts destinationSlug={params.productId} />
    </>
  );
}
