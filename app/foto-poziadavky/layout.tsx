import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Foto na vízum — rozmery a požiadavky",
  description: "Ako má vyzerať fotka na vízum či cestovné povolenie: pozadie, výraz, rozmery podľa krajiny a najčastejšie chyby. Fotku vám pri objednávke skontrolujeme.",
  alternates: { canonical: `${site.url}/foto-poziadavky` },
  openGraph: { title: "Foto na vízum — požiadavky | Voyago", description: "Rozmery a pravidlá pre fotku na vízum, plus časté chyby.", url: `${site.url}/foto-poziadavky`, type: "website" },
};

export default function PhotoGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
