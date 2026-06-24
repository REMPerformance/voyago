"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { Globe } from "@/components/Globe";

export function WorldReach() {
  const { t } = useLang();
  return (
    <section className="secure-bg text-cream">
      <div className="container-page py-14 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-brass-light">{t({ sk: "Celosvetové pokrytie", en: "Worldwide coverage" })}</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.05] sm:text-4xl">
            {t({ sk: "Z Európy do celého sveta", en: "From Europe to the whole world" })}
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-9">
          <Globe />
        </Reveal>
      </div>
    </section>
  );
}
