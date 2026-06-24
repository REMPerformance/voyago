import type { Metadata } from "next";
import { GreenCardApply } from "@/components/GreenCardApply";

export const metadata: Metadata = {
  title: "Prihláška do lotérie o zelenú kartu | Voyago",
  description: "Online prihláška do lotérie o americkú zelenú kartu (Diversity Visa). Vyplňte údaje, nahrajte fotografiu a my prihlášku skontrolujeme a podáme za vás. Od 49 €.",
  alternates: { canonical: "/green-card/prihlaska" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <GreenCardApply />;
}
