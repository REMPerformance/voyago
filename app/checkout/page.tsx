"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Check, Tag, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { Stamp } from "@/components/Stamp";
import { getProduct } from "@/config/products";
import { submitApplication } from "@/lib/applications";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function CheckoutPage() {
  const { t, tr, lang } = useLang();
  const { items, total, clear } = useCart();
  const [paid, setPaid] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const [consent, setConsent] = useState(false);
  const [consentErr, setConsentErr] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);

  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoPct, setPromoPct] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const payable = promoPct ? Math.round(total * (1 - promoPct / 100)) : total;

  useEffect(() => {
    if (TURNSTILE_KEY && !document.getElementById("cf-turnstile-script")) {
      const sc = document.createElement("script");
      sc.id = "cf-turnstile-script";
      sc.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      sc.async = true; sc.defer = true;
      document.head.appendChild(sc);
    }
    const sid = new URLSearchParams(window.location.search).get("session_id");
    if (sid) {
      setPaid(true);
      clear();
      fetch(`/api/checkout/confirm?session_id=${sid}`)
        .then((r) => r.json())
        .then((d) => { if (d?.ref) setRef(d.ref); })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyPromo = async () => {
    const code = promo.trim();
    if (!code) return;
    try {
      const res = await fetch(`/api/promo/validate?code=${encodeURIComponent(code)}`);
      const d = await res.json();
      if (d?.valid) {
        setAppliedPromo(d.code); setPromoPct(d.percent);
        setPromoMsg({ ok: true, text: t({ sk: `Zľava −${d.percent}% uplatnená.`, en: `−${d.percent}% discount applied.` }) });
      } else {
        setAppliedPromo(""); setPromoPct(0);
        setPromoMsg({ ok: false, text: t({ sk: "Neplatný alebo expirovaný kód.", en: "Invalid or expired code." }) });
      }
    } catch {
      setPromoMsg({ ok: false, text: t({ sk: "Kód sa nepodarilo overiť.", en: "Could not verify code." }) });
    }
  };

  const pay = async () => {
    if (!consent) { setConsentErr(true); return; }
    setBusy(true);
    const turnstileToken = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value || "";
    const r = await submitApplication(items, payable, { consent, honeypot, promoCode: appliedPromo, turnstileToken });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId: r?.id, slugs: items.map((i) => i.slug), origin: window.location.origin, promo: appliedPromo }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) { window.location.href = url; return; }
      }
    } catch { /* fallback */ }
    // Stripe nenastavený → demo režim
    if (r?.ref) setRef(r.ref);
    setPaid(true);
    clear();
    setBusy(false);
  };

  if (paid) {
    return (
      <section className="container-page py-24 text-center">
        <div className="flex justify-center">
          <Stamp label={tr("checkout.done")} tone="approved" />
        </div>
        <p className="mx-auto mt-8 max-w-md text-lg text-ink-soft">{tr("checkout.thanks")}</p>
        {ref && (
          <div className="mx-auto mt-6 inline-block rounded-xl border border-brass/30 bg-brass/[0.06] px-6 py-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-brass">{t({ sk: "Referenčné číslo", en: "Reference number" })}</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-ink">{ref}</p>
            <p className="mt-2 text-xs text-ink-soft">{t({ sk: "Stav sledujte na stránke", en: "Track status at" })} <Link href="/stav" className="font-semibold text-teal underline">/stav</Link></p>
          </div>
        )}
        <div className="mt-8"><Link href="/" className="btn-primary">{tr("cta.back")}</Link></div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-page py-24 text-center">
        <p className="text-ink-soft">{tr("cart.empty")}</p>
        <Link href="/destinations" className="btn-primary mt-6">{tr("cart.emptyCta")}</Link>
      </section>
    );
  }

  return (
    <section className="container-page py-16">
      <h1 className="text-4xl font-extrabold">{tr("checkout.title")}</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card p-6 sm:p-8">
          <p className="eyebrow">{tr("checkout.summary")}</p>
          <ul className="mt-4 divide-y divide-line">
            {items.map((item) => {
              const product = getProduct(item.slug);
              if (!product) return null;
              const name = [item.data.givenNames, item.data.surname].filter(Boolean).join(" ");
              return (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <span className="text-2xl">{product.flag}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{t(product.name)}</p>
                    {name && <p className="text-xs text-ink-soft">{name}</p>}
                  </div>
                  <span className="font-mono text-sm">{money(item.price, lang)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-xl border border-dashed border-line bg-paper-dim/40 p-4">
            <p className="text-xs leading-relaxed text-ink-soft">{tr("checkout.demoNote")}</p>
          </div>
        </div>

        <aside>
          <div className="card sticky top-20 p-6">
            {/* Promo kód */}
            <label className="label"><span>{t({ sk: "Promo kód", en: "Promo code" })}</span></label>
            <div className="flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value.toUpperCase())}
                placeholder={t({ sk: "napr. LETO10", en: "e.g. SUMMER10" })}
                className="input !mt-0 flex-1 uppercase"
              />
              <button onClick={applyPromo} className="btn-ghost shrink-0"><Tag size={15} /> {t({ sk: "Použiť", en: "Apply" })}</button>
            </div>
            {promoMsg && <p className={`mt-1.5 text-xs ${promoMsg.ok ? "text-green" : "text-terra"}`}>{promoMsg.text}</p>}

            <div className="mt-5 space-y-1.5 border-t border-line pt-4">
              {promoPct > 0 && (
                <div className="flex items-center justify-between text-sm text-ink-soft">
                  <span>{t({ sk: "Medzisúčet", en: "Subtotal" })}</span>
                  <span className="line-through">{money(total, lang)}</span>
                </div>
              )}
              {promoPct > 0 && (
                <div className="flex items-center justify-between text-sm text-green">
                  <span>{t({ sk: "Zľava", en: "Discount" })} −{promoPct}%</span>
                  <span>−{money(total - payable, lang)}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-semibold">{tr("cart.total")}</span>
                <span className="font-display text-3xl font-extrabold">{money(payable, lang)}</span>
              </div>
              <p className="mt-1 text-right text-[0.68rem] text-ink-soft/70">{t({ sk: "Ceny sú s DPH", en: "Prices incl. VAT" })}</p>
            </div>

            {/* Súhlas */}
            <label className={`mt-5 flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-xs leading-relaxed ${consentErr && !consent ? "border-terra bg-terra/[0.04]" : "border-line bg-paper/40"}`}>
              <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentErr(false); }} className="mt-0.5" />
              <span className="text-ink-soft">
                {t({ sk: "Súhlasím s", en: "I agree to the" })}{" "}
                <Link href="/obchodne-podmienky" className="font-semibold text-ink underline">{t({ sk: "obchodnými podmienkami", en: "Terms" })}</Link>{" "}
                {t({ sk: "a so", en: "and" })}{" "}
                <Link href="/ochrana-osobnych-udajov" className="font-semibold text-ink underline">{t({ sk: "spracúvaním osobných údajov", en: "Privacy Policy" })}</Link>.
              </span>
            </label>

            {/* Honeypot (anti-spam) */}
            <input
              type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            {TURNSTILE_KEY && <div className="cf-turnstile mt-3" data-sitekey={TURNSTILE_KEY} />}

            <button onClick={pay} disabled={busy} className="btn-accent mt-5 w-full">
              <Lock size={15} /> {busy ? t({ sk: "Spracúvam…", en: "Processing…" }) : tr("checkout.pay")}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft/70">
              <Check size={13} className="text-teal" /> Stripe · Apple&nbsp;Pay · Google&nbsp;Pay
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
