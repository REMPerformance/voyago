import type { Metadata } from "next";
import { B2BContent } from "@/components/B2BContent";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Víza pre firmy a zamestnancov | Voyago",
  description:
    "Vybavíme ESTA, ETA a e-víza pre zamestnancov firiem. Prioritné spracovanie, hromadné žiadosti, mesačná faktúra a vyhradený kontakt. Individuálny cenník pri stálom odbere. Prevádzkovateľ: Lukáš Tonkovič – REM Performance, IČO 57 321 205.",
  keywords: ["víza pre firmy", "služobné cesty", "ESTA pre zamestnancov", "firemné víza", "hromadné žiadosti", "cestovné povolenia firmy"],
  alternates: {
    canonical: `${site.url}/pre-firmy`,
    languages: {
      "sk-SK": `${site.url}/pre-firmy`,
      "en-GB": `${site.url}/pre-firmy`,
      "uk-UA": `${site.url}/pre-firmy`,
      "de-DE": `${site.url}/pre-firmy`,
      "x-default": `${site.url}/pre-firmy`,
    },
  },
  openGraph: {
    title: "Víza pre firmy a zamestnancov | Voyago",
    description: "Prioritné spracovanie, hromadné žiadosti a mesačná faktúra. Individuálny cenník pri stálom odbere.",
    url: `${site.url}/pre-firmy`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vybavenie víz a cestovných povolení pre firmy",
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "Country", name: "Slovakia" },
  serviceType: "Sprostredkovanie cestovných povolení pre firemných klientov",
  description:
    "Sprostredkovanie elektronických víz a cestovných povolení pre zamestnancov firiem vrátane prioritného spracovania, hromadných žiadostí a mesačnej fakturácie.",
  offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <B2BContent />
    </>
  );
}
