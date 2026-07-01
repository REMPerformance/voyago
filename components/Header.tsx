"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Phone, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GlobalSearch } from "@/components/GlobalSearch";
import { CartMenu } from "@/components/CartMenu";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/config/site";

export function Header() {
  const { t, tr } = useLang();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/destinations", label: tr("nav.destinations") },
    { href: "/wizard", label: tr("nav.wizard") },
    { href: "/#how", label: tr("nav.how") },
    { href: "/blog", label: "Blog" },
    { href: "/foto-poziadavky", label: t({ sk: "Foto na vízum", en: "Visa photo" }) },
    { href: "/stav", label: t({ sk: "Sledovať stav", en: "Track status" }) },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Slim trust bar */}
      <div className="secure-bg text-cream">
        <div className="container-page flex h-9 items-center justify-between text-[0.72rem]">
          <span className="inline-flex items-center gap-1.5 text-cream/80">
            <ShieldCheck size={13} className="text-brass-light" />
            {tr("trust.handling")}
          </span>
          <div className="hidden items-center gap-4 text-cream/65 sm:flex">
            <a href="/obchodne-podmienky" className="hover:text-cream">
              {t({ sk: "Obchodné podmienky", en: "Terms & conditions" })}
            </a>
            <span className="text-cream/25">·</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-cream">
              <Phone size={12} className="text-brass-light" /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-line bg-surface/95 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label={site.brand} className="shrink-0 text-ink" onClick={() => setOpen(false)}>
            <Logo variant="full" />
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap text-sm font-medium text-ink-soft transition-colors hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <GlobalSearch />
            <div className="hidden sm:block"><ThemeToggle /></div>
            <LanguageToggle />
            <CartMenu />

            {/* CTA — voyago štýl (navy + šípka), na hover sa rozšíri */}
            <Link
              href="/wizard"
              className="group hidden h-10 items-center overflow-hidden rounded-lg bg-ink px-4 text-sm font-semibold text-paper shadow-card transition-colors hover:bg-navy-soft sm:inline-flex"
            >
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8rem] text-brass-light opacity-0 transition-all duration-300 ease-out group-hover:mr-2 group-hover:max-w-[240px] group-hover:opacity-100">
                {t({ sk: "Neviete sa rozhodnúť? Pomôžeme vám zadarmo", en: "Can't decide? We'll help you for free" })}
              </span>
              <span className="whitespace-nowrap">{tr("cta.start")}</span>
              <ArrowRight size={15} className="ml-1.5 shrink-0" />
            </Link>

            {/* Hamburger – len mobil */}
            <button
              type="button"
              aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobilné menu */}
        {open && (
          <div className="border-t border-line bg-surface md:hidden">
            <nav className="container-page flex flex-col py-2">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line-soft py-3.5 text-[0.95rem] font-medium text-ink">
                  {n.label}
                </Link>
              ))}
              <Link href="/wizard" onClick={() => setOpen(false)} className="btn-primary mt-3 h-11 w-full justify-center gap-2">
                {tr("cta.start")}
                <ArrowRight size={16} />
              </Link>
              <div className="mt-3 flex items-center justify-between pb-1 pt-1 text-xs text-ink-soft">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5">
                  <Phone size={13} className="text-brass" /> {site.phone}
                </a>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
