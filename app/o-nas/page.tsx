import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "O nás — kto stojí za Voyago | Voyago",
  description:
    "Voyago je slovenská služba na vybavenie elektronických víz a cestovných povolení. Založil ju Lukáš Tonkovič s cieľom spraviť vízovú byrokraciu jednoduchou, čestnou a s reálnou podporou v slovenčine.",
  keywords: ["o Voyago", "kto je Voyago", "Lukáš Tonkovič", "vízová služba Slovensko", "sprostredkovateľ víz"],
  alternates: {
    canonical: `${site.url}/o-nas`,
    languages: {
      "sk-SK": `${site.url}/o-nas`,
      "en-GB": `${site.url}/o-nas`,
      "uk-UA": `${site.url}/o-nas`,
      "de-DE": `${site.url}/o-nas`,
      "x-default": `${site.url}/o-nas`,
    },
  },
  openGraph: {
    title: "O nás — kto stojí za Voyago",
    description: "Slovenská služba na vybavenie víz a cestovných povolení. Za značkou stojí konkrétny človek, nie anonymný portál.",
    url: `${site.url}/o-nas`,
    type: "profile",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${site.url}/o-nas#aboutpage`,
      url: `${site.url}/o-nas`,
      name: "O nás — Voyago",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      inLanguage: "sk",
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: "Lukáš Tonkovič",
      jobTitle: "Zakladateľ",
      worksFor: { "@id": `${site.url}/#organization` },
      description: "Zakladateľ Voyago, slovenskej služby na vybavenie elektronických víz a cestovných povolení.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutContent />
    </>
  );
}
