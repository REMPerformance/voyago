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
