import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Aké vízum potrebujem? — sprievodca za 30 sekúnd",
  description: "Krátky dotazník vám za 30 sekúnd povie, aké cestovné povolenie alebo vízum potrebujete podľa krajiny a účelu cesty.",
  alternates: { canonical: `${site.url}/wizard` },
  openGraph: { title: "Aké vízum potrebujem? | Voyago", description: "Zistite za 30 sekúnd, čo potrebujete na svoju cestu.", url: `${site.url}/wizard`, type: "website" },
};

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
