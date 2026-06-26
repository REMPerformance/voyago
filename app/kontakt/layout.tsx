import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Kontakt a podpora",
  description: "Potrebujete poradiť s vízom alebo cestovným povolením? Napíšte nám — pomôžeme vám v slovenčine.",
  alternates: { canonical: `${site.url}/kontakt` },
  openGraph: { title: "Kontakt | Voyago", description: "Sme tu pre vás — poradíme s vízami a cestovnými povoleniami.", url: `${site.url}/kontakt`, type: "website" },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
