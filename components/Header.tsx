"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Timer, Phone, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { LanguageToggle } from "@/components/LanguageToggle";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/config/site";

export function Header() {
  const { t, tr } = useLang();
  const { count } = useCart();
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
      <header className="border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label={site.brand} className="text-ink" onClick={() => setOpen(false)}>
            <Logo variant="full" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <GlobalSearch />
            <div className="hidden sm:block"><ThemeToggle /></div>
            <LanguageToggle />
            <Link
              href="/cart"
              aria-label={tr("nav.cart")}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-terra font-mono text-[0.62rem] font-semibold text-cream">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/wizard"
              className="btn-accent hidden h-10 items-center gap-2 !px-5 !py-0 shadow-[0_3px_14px_rgba(201,154,78,0.40)] transition-shadow hover:shadow-[0_4px_18px_rgba(201,154,78,0.55)] sm:inline-flex"
            >
              <Timer size={15} />
              {tr("cta.start")}
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
          <div className="border-t border-line bg-paper md:hidden">
            <nav className="container-page flex flex-col py-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line-soft py-3.5 text-[0.95rem] font-medium text-ink"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/wizard"
                onClick={() => setOpen(false)}
                className="btn-accent mt-3 h-11 w-full justify-center gap-2"
              >
                <Timer size={16} />
                {tr("cta.start")}
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
