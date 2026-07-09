import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@/components/Analytics";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION },
  title: {
    default: `${site.brand} — ${site.tagline.sk}`,
    template: `%s · ${site.brand}`,
  },
  description:
    "Voyago vybaví ESTA do USA, ETA do Veľkej Británie a Kanady, e-víza do Ázie aj Afriky. Slovenský sprostredkovateľ so sídlom v Bratislave, IČO 57 321 205. Cena vrátane štátneho poplatku, kontrola pred podaním, podpora v slovenčine.",
  applicationName: site.brand,
  authors: [{ name: site.company.legalName }],
  creator: site.company.legalName,
  publisher: site.company.legalName,
  alternates: {
    canonical: site.url,
    languages: {
      "sk-SK": site.url,
      "en-GB": site.url,
      "uk-UA": site.url,
      "de-DE": site.url,
      "x-default": site.url,
    },
  },
  keywords: ["ESTA", "ETA", "ETIAS", "e-vízum", "cestovné povolenie", "víza", "USA", "UK", "Kanada", "Austrália"],
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} — ${site.tagline.sk}`,
    description: "Slovenský sprostredkovateľ cestovných povolení. ESTA, ETA, e-víza. Cena vrátane štátneho poplatku, kontrola pred podaním.",
    url: site.url,
    locale: "sk_SK",
    alternateLocale: ["en_GB", "uk_UA", "de_DE"],
  },
  twitter: { card: "summary_large_image", title: site.brand, description: site.tagline.sk },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('voyago.theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,700;6..72,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              "@id": `${site.url}/#organization`,
              name: site.company.legalName,
              alternateName: site.brand,
              legalName: site.company.legalName,
              url: site.url,
              logo: `${site.url}/icon.png`,
              image: `${site.url}/icon.png`,
              email: site.email,
              telephone: site.phone,
              vatID: site.company.icDph,
              taxID: site.company.dic,
              identifier: [
                { "@type": "PropertyValue", name: "IČO", value: site.company.ico.replace(/\s/g, "") },
                { "@type": "PropertyValue", name: "IČ DPH", value: site.company.icDph },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: site.company.addressStreet,
                addressLocality: site.company.addressCity,
                postalCode: site.company.addressZip,
                addressCountry: site.company.addressCountry,
              },
              sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin, site.social.youtube].filter(Boolean),
              areaServed: { "@type": "Country", name: "Slovakia" },
              priceRange: "€€",
              description:
                "Sprostredkovanie elektronických víz a cestovných povolení (ESTA, ETA, e-vízum) pre slovenských cestovateľov. Prevádzkovateľ je registrovaný živnostník so sídlom v Slovenskej republike.",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: site.email,
                  telephone: site.phone,
                  availableLanguage: ["sk", "en", "uk", "de"],
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: site.support.opens,
                    closes: site.support.closes,
                  },
                },
              ],
              disambiguatingDescription:
                "Voyago je súkromný sprostredkovateľ. Nie je štátnym orgánom ani oficiálnym vládnym portálom.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              name: site.brand,
              url: site.url,
              publisher: { "@id": `${site.url}/#organization` },
              inLanguage: ["sk", "en", "uk", "de"],
            }),
          }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
