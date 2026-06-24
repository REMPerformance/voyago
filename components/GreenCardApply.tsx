"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { GreenCardForm } from "@/components/GreenCardForm";

export function GreenCardApply() {
  const { t } = useLang();
  return (
    <section className="container-page py-16">
      <Link href="/green-card" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
        <ArrowLeft size={15} /> {t({ sk: "Späť na zelenú kartu", en: "Back to Green Card" })}
      </Link>
      <p className="eyebrow mt-6">USA · Diversity Visa Lottery</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.05]">{t({ sk: "Prihláška do lotérie o zelenú kartu", en: "Green Card lottery entry" })}</h1>
      <p className="mt-3 text-ink-soft">{t({ sk: "Vyplňte údaje presne ako v cestovnom pase. Údaje skontrolujeme, fotografiu posúdime podľa noriem a prihlášku podáme za vás v najbližšom októbrovom okne.", en: "Fill in your details exactly as in your passport. We'll verify the data, check your photo against the standards, and file your entry in the next October window." })}</p>
      <div className="mt-8 max-w-5xl"><GreenCardForm /></div>
    </section>
  );
}
