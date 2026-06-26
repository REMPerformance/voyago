"use client";

import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/config/site";

export default function ContactPage() {
  const { t } = useLang();
  const c = site.company;

  const items = [
    { icon: <Mail size={18} />, label: t({ sk: "E-mail", en: "Email" }), value: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={18} />, label: t({ sk: "Telefón", en: "Phone" }), value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: <MapPin size={18} />, label: t({ sk: "Sídlo", en: "Address" }), value: c.address },
    { icon: <Clock size={18} />, label: t({ sk: "Podpora", en: "Support" }), value: t({ sk: "Po – Pia, 9:00 – 17:00", en: "Mon – Fri, 9:00 – 17:00" }) },
  ];

  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">{t({ sk: "Kontakt", en: "Contact" })}</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{t({ sk: "Sme tu pre vás", en: "We're here for you" })}</h1>
        <p className="mt-4 text-lg text-ink-soft">
          {t({
            sk: "Napíšte nám alebo zavolajte — radi pomôžeme s výberom povolenia aj s vyplnením žiadosti.",
            en: "Write or call us — we're happy to help you choose the right authorization and complete your application.",
          })}
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper text-brass">{it.icon}</span>
            <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-ink-soft/60">{it.label}</p>
            {it.href ? (
              <a href={it.href} className="mt-0.5 block font-semibold text-ink hover:text-brass">{it.value}</a>
            ) : (
              <p className="mt-0.5 font-semibold text-ink">{it.value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-teal/30 bg-teal/[0.05] p-5">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal" />
        <p className="text-sm leading-relaxed text-ink-soft">
          {t({
            sk: "Voyago je súkromný sprostredkovateľ — nie sme štátny orgán. Pri žiadosti platíte štátny poplatok aj poplatok za našu službu.",
            en: "Voyago is a private intermediary — not a government body. Your payment covers the government fee plus our service fee.",
          })}
        </p>
      </div>
    </section>
  );
}
