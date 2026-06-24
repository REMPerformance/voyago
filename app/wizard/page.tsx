"use client";

import { Suspense } from "react";
import { Wizard } from "@/components/Wizard";
import { useLang } from "@/lib/i18n";

function WizardHeader() {
  const { tr } = useLang();
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="eyebrow">{tr("nav.wizard")}</p>
      <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{tr("wiz.title")}</h1>
      <p className="mt-3 text-ink-soft">{tr("wiz.sub")}</p>
    </div>
  );
}

export default function WizardPage() {
  return (
    <section className="container-page py-16">
      <WizardHeader />
      <Suspense fallback={<div className="mx-auto max-w-2xl text-center text-ink-soft">…</div>}>
        <Wizard />
      </Suspense>
    </section>
  );
}
