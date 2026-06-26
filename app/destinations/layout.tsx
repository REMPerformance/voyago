import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Destinácie — víza a cestovné povolenia",
  description: "Vyberte si krajinu a vybavte ESTA, ETA alebo e-Visa jednoducho. Kontrolu, podanie aj komunikáciu s úradom vyriešime za vás.",
  alternates: { canonical: `${site.url}/destinations` },
  openGraph: { title: "Destinácie | Voyago", description: "Vyberte si krajinu a vybavte cestovné povolenie bez stresu.", url: `${site.url}/destinations`, type: "website" },
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
