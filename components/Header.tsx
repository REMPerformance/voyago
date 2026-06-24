"use client";

import Link from "next/link";
import { ShoppingBag, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/config/site";

export function Header() {
  const { t, tr } = useLang();
  const { count } = useCart();

  const nav = [
    { href: "/destinations", label: tr("nav.destinations") },
    { href: "/wizard", label: tr("nav.wizard") },
    { href: "/#how", label: tr("nav.how") },
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
            <a href="#" className="hover:text-cream">
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
          <Link href="/" aria-label={site.brand} className="text-ink">
            <Logo variant="full" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
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
            <Link href="/wizard" className="btn-primary hidden h-10 !px-5 !py-0 sm:inline-flex">
              {tr("cta.start")}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
