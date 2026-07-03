"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, disclaimer } from "@/config/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t, tr, lang } = useLang();
  const year = new Date().getFullYear();
  const c = site.company;

  const cols = [
    {
      title: t({ sk: "Destinácie", en: "Destinations" }),
      links: [
        { label: "USA – ESTA", href: "/apply/us-esta" },
        { label: "UK – ETA", href: "/apply/uk-eta" },
        { label: "Kanada – eTA", href: "/apply/ca-eta" },
        { label: t({ sk: "Všetky destinácie", en: "All destinations" }), href: "/destinations" },
      ],
    },
    {
      title: t({ sk: "Spoločnosť", en: "Company" }),
      links: [
        { label: tr("nav.wizard"), href: "/wizard" },
        { label: t({ sk: "Sledovať žiadosť", en: "Track application" }), href: "/stav" },
        { label: t({ sk: "Foto na vízum", en: "Visa photo" }), href: "/foto-poziadavky" },
        { label: t({ sk: "Kontakt a podpora", en: "Contact & support" }), href: "/kontakt" },
        { label: tr("gc.title"), href: "/green-card" },
        { label: t({ sk: "Pre firmy", en: "For business" }), href: "/pre-firmy" },
        { label: t({ sk: "Partnerský program", en: "Affiliate program" }), href: "/partnersky-program" },
      ],
    },
    {
      title: t({ sk: "Právne", en: "Legal" }),
      links: [
        { label: t({ sk: "Obchodné podmienky", en: "Terms & conditions" }), href: "/obchodne-podmienky" },
        { label: t({ sk: "Reklamácie a odstúpenie", en: "Refunds & withdrawal" }), href: "/reklamacie" },
        { label: t({ sk: "Ochrana osobných údajov", en: "Privacy policy" }), href: "/ochrana-osobnych-udajov" },
        { label: t({ sk: "Súbory cookie", en: "Cookies" }), href: "/cookies" },
      ],
    },
  ];

  const socials = [
    { Icon: Facebook, href: site.social.facebook },
    { Icon: Instagram, href: site.social.instagram },
    { Icon: Linkedin, href: site.social.linkedin },
    { Icon: Youtube, href: site.social.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 secure-bg text-cream">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="text-cream">
              <Logo variant="full" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{t(site.tagline)}</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm text-cream/80 hover:text-cream">{site.email}</a>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-2.5">
                {socials.map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-brass-light hover:text-brass-light">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-brass-light">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-cream/75 hover:text-cream">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Právne vyhlásenie (sprostredkovateľ + transparentnosť ceny) */}
        <div className="mt-12 rounded-xl border border-cream/10 bg-black/15 p-5">
          <p className="text-xs leading-relaxed text-cream/65">{t(disclaimer)}</p>
        </div>

        <div className="mt-8 border-t border-cream/10 pt-6">
          <p className="mrz !text-cream/30">
            P&lt;{site.brand.toUpperCase()}&lt;&lt;{lang === "sk" ? "SPROSTREDKOVATEL" : "INTERMEDIARY"}&lt;&lt;&lt;&lt;&lt;{year}
          </p>
          <p className="mt-3 text-xs text-cream/45">© {year} Voyago. {tr("footer.rights")}</p>
          <p className="mt-2 text-[0.7rem] text-cream/35">
            {t({ sk: "Ikony:", en: "Icons:" })} game-icons.net (CC BY 3.0) · {t({ sk: "Vlajky:", en: "Flags:" })} flagcdn.com
          </p>
        </div>
      </div>
    </footer>
  );
}
