import { site } from "@/config/site";

/* ============================================================
   1) Odosielanie e-mailov cez Resend REST API (bez závislosti).
      Aktivuje sa po nastavení RESEND_API_KEY (+ voliteľne EMAIL_FROM).
   ============================================================ */
type SendArgs = { to: string; subject: string; html: string };

export async function sendEmail({ to, subject, html }: SendArgs): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY chýba – e-mail sa neodoslal.");
    return { ok: false, error: "missing_api_key" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_FROM ?? "Voyago <onboarding@resend.dev>", to, subject, html }),
    });
    if (!res.ok) return { ok: false, error: `resend_${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/* ============================================================
   2) Šablóny pre admin (renderEmail / TEMPLATES / EmailTemplate)
   ============================================================ */
export type EmailTemplate = "submitted" | "approved" | "needsInfo" | "rejected";

export const TEMPLATES: Record<EmailTemplate, { label: string; subject: string }> = {
  submitted: { label: "Žiadosť prijatá", subject: "Vaša žiadosť bola prijatá" },
  approved: { label: "Schválené ✅", subject: "Vaše cestovné povolenie je schválené" },
  needsInfo: { label: "Doplniť údaje", subject: "Potrebujeme doplniť údaje k žiadosti" },
  rejected: { label: "Zamietnuté úradom", subject: "Aktualizácia stavu vašej žiadosti" },
};

const BODY: Record<EmailTemplate, string> = {
  submitted: "vašu žiadosť sme prijali a začíname ju spracúvať. O ďalšom postupe vás budeme informovať e-mailom.",
  approved: "vaše cestovné povolenie bolo úspešne schválené. Detaily a dokument nájdete nižšie alebo v prílohe.",
  needsInfo: "na dokončenie vašej žiadosti potrebujeme doplniť niekoľko údajov. Prosíme, odpovedzte na tento e-mail.",
  rejected: "k vašej žiadosti máme aktualizáciu od príslušného úradu. Pre ďalší postup nás, prosím, kontaktujte.",
};

export function wrapEmail(title: string, inner: string): string {
  return wrap(title, inner);
}

function wrap(title: string, inner: string): string {
  return `<!doctype html><html><body style="margin:0;background:#eff1f0;font-family:Arial,Helvetica,sans-serif;color:#0a1622">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <div style="background:#0a1622;color:#fff;border-radius:16px 16px 0 0;padding:22px 26px">
      <span style="font-size:20px;font-weight:800">${site.brand}<span style="color:#c99a4e">.</span></span>
    </div>
    <div style="background:#fff;border-radius:0 0 16px 16px;padding:26px">
      <h1 style="margin:0 0 14px;font-size:19px">${title}</h1>
      ${inner}
      <hr style="border:none;border-top:1px solid #e6e8e7;margin:22px 0"/>
      <p style="font-size:12px;color:#6b7280;line-height:1.6">${site.company.legalName} · ${site.company.address}<br/>${site.brand} je súkromný sprostredkovateľ víz a cestovných povolení, nie je štátnym orgánom.</p>
    </div>
  </div></body></html>`;
}

export function renderEmail({ template, name, message, hasAttachments }: { template: EmailTemplate; name?: string; message?: string; hasAttachments?: number }): { subject: string; html: string } {
  const subject = TEMPLATES[template].subject;
  const hi = `Dobrý deň${name ? " " + name : ""},`;
  const msg = message ? `<p style="font-size:14px;line-height:1.6;white-space:pre-line">${message}</p>` : "";
  const att = hasAttachments ? `<p style="font-size:13px;color:#6b7280">📎 Priložené súbory: ${hasAttachments}</p>` : "";
  const html = wrap(TEMPLATES[template].label.replace(/[✅]/g, "").trim(), `<p style="font-size:14px;line-height:1.6">${hi}</p><p style="font-size:14px;line-height:1.6">${BODY[template]}</p>${msg}${att}`);
  return { subject, html };
}

/* ============================================================
   3) Transakčné šablóny (objednávka / stav) pre /api/notify
   ============================================================ */
export function orderConfirmationHtml(o: { name?: string; orderId: string; destination: string; total: string }): string {
  return wrap("Potvrdenie objednávky", `<p style="font-size:14px;line-height:1.6">Dobrý deň${o.name ? " " + o.name : ""},</p><p style="font-size:14px;line-height:1.6">ďakujeme za objednávku. Žiadosť o <strong>${o.destination}</strong> sme prijali a spracúvame.</p><p style="font-size:14px;line-height:1.6"><strong>Objednávka:</strong> ${o.orderId}<br/><strong>Suma:</strong> ${o.total}</p>`);
}

export function statusUpdateHtml(o: { name?: string; orderId: string; destination: string; status: string }): string {
  return wrap("Aktualizácia stavu žiadosti", `<p style="font-size:14px;line-height:1.6">Dobrý deň${o.name ? " " + o.name : ""},</p><p style="font-size:14px;line-height:1.6">stav žiadosti o <strong>${o.destination}</strong> (objednávka ${o.orderId}):</p><p style="font-size:16px;font-weight:700;color:#c99a4e">${o.status}</p>`);
}


/* ============================================================
   3) Ďalšie brandové e-maily: uvítací, newsletter, žiadosť o recenziu
   ============================================================ */
const BTN = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#0a1622;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:10px">${label}</a>`;

const UNSUB = (email: string) =>
  `<p style="font-size:11px;color:#9aa4ad;margin-top:16px">Nechcete tieto e-maily? Odhláste sa <a href="${site.url}/odhlasit?email=${encodeURIComponent(email)}" style="color:#9aa4ad">tu</a>.</p>`;

/** Uvítací e-mail po zadaní e-mailu do okna na stránke (so zľavovým kódom). */
export function welcomeEmail(email: string, code = "CESTUJEME5"): { subject: string; html: string } {
  const inner = `
    <p style="font-size:14px;line-height:1.6">Vitajte vo Voyago! Ďakujeme, že ste sa prihlásili.</p>
    <p style="font-size:14px;line-height:1.6">Budeme vám posielať novinky, nové destinácie a občasné zľavy — nič otravné. Ako poďakovanie máte hneď <b>5 % zľavu</b> na prvú objednávku:</p>
    <div style="text-align:center;margin:18px 0">
      <div style="display:inline-block;border:1.5px solid #c99a4e;background:#faf4ea;color:#a8772e;font-weight:800;font-size:20px;letter-spacing:3px;padding:12px 24px;border-radius:10px">${code}</div>
    </div>
    <p style="font-size:14px;line-height:1.6">Kód zadáte pri platbe. Platí na cestovné povolenia v našej ponuke.</p>
    <div style="text-align:center;margin:20px 0">${BTN(site.url + "/destinations", "Vybrať destináciu")}</div>
    ${UNSUB(email)}`;
  return { subject: "Vitajte vo Voyago — máte 5 % zľavu 🎉", html: wrap("Vitajte vo Voyago", inner) };
}

/** Hromadný newsletter (predmet + telo v jednoduchom formáte). */
export function newsletterEmail(email: string, title: string, bodyHtml: string): { subject: string; html: string } {
  const inner = `${bodyHtml}<div style="text-align:center;margin:22px 0">${BTN(site.url, "Otvoriť Voyago")}</div>${UNSUB(email)}`;
  return { subject: title, html: wrap(title, inner) };
}

/** Žiadosť o recenziu po vybavení objednávky. */
export function reviewRequestEmail(email: string, name?: string, reviewUrl?: string): { subject: string; html: string } {
  const url = reviewUrl || `${site.url}/kontakt`;
  const inner = `
    <p style="font-size:14px;line-height:1.6">Dobrý deň${name ? " " + name : ""},</p>
    <p style="font-size:14px;line-height:1.6">ďakujeme, že ste svoje cestovné povolenie vybavili cez Voyago. Ako sa vám s nami spolupracovalo?</p>
    <p style="font-size:14px;line-height:1.6">Budeme veľmi vďační za krátku recenziu — pomôže ďalším cestovateľom a nám zabrať pár minút.</p>
    <div style="text-align:center;margin:20px 0">${BTN(url, "Napísať recenziu")}</div>
    <p style="font-size:13px;color:#6b7280;line-height:1.6">Ak ste s niečím neboli spokojní, odpovedzte prosím priamo na tento e-mail — radi to napravíme.</p>`;
  return { subject: "Ako sa vám páčila naša služba? — Voyago", html: wrap("Povedzte nám váš názor", inner) };
}
