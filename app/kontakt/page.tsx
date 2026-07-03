"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { useLang } from "@/lib/i18n";
import { site } from "@/config/site";

export default function ContactPage() {
  const { t } = useLang();
  const c = site.company;

  const items = [
    { icon: <Mail size={18} />, label: t({ sk: "E-mail", en: "Email" }), value: site.email, href: `mailto:${site.email}` },
    { icon: <Phone size={18} />, label: t({ sk: "Telefón", en: "Phone" }), value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: <MapPin size={18} />, label: t({ sk: "Sídlo", en: "Address" }), value: c.address },
    { icon: <Clock size={18} />, label: t({ sk: "Podpora", en: "Support" }), value: t({ sk: "Po – Ne, 8:00 – 21:00", en: "Mon – Sun, 8:00 – 21:00" }) },
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

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-display text-2xl font-bold">{t({ sk: "Napíšte nám", en: "Write to us" })}</h2>
          <p className="mt-2 max-w-md text-ink-soft">
            {t({ sk: "Otázka k destinácii, k rozpracovanej žiadosti alebo čokoľvek iné — odpovedáme do 24 hodín, zvyčajne oveľa skôr.", en: "A question about a destination, an ongoing application or anything else — we reply within 24 hours, usually much sooner." })}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
          <LeadForm
            endpoint="/api/contact"
            cta={t({ sk: "Odoslať správu", en: "Send message" })}
            success={t({ sk: "Správa odoslaná! Odpovieme čo najskôr.", en: "Message sent! We'll reply as soon as possible." })}
            fields={[
              { key: "name", label: t({ sk: "Meno *", en: "Name *" }), required: true },
              { key: "email", label: "E-mail *", type: "email", required: true },
              { key: "subject", label: t({ sk: "Predmet", en: "Subject" }) },
              { key: "message", label: t({ sk: "Vaša správa *", en: "Your message *" }), type: "textarea", required: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
