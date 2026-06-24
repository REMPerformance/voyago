import type { ReactNode } from "react";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Právne informácie</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft">Naposledy aktualizované: {updated}</p>
        <div className="legal mt-8 space-y-5 text-[0.95rem] leading-relaxed text-ink-soft">{children}</div>
      </div>
    </section>
  );
}

export function H({ children }: { children: ReactNode }) {
  return <h2 className="!mt-9 font-display text-xl font-bold text-ink">{children}</h2>;
}
