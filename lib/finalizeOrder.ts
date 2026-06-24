import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EMAIL } from "@/config/email";

function confirmationHtml(app: any): string {
  const ref = app.ref || "—";
  const greeting = `Dobrý deň,`;
  return `
<div style="background:#EFF1F0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#0F2236">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #E2E0D9;border-radius:14px;overflow:hidden">
    <tr><td style="background:#0A1622;padding:20px 28px">
      <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#fff">Voyago<span style="color:#C99A4E">.</span></span>
    </td></tr>
    <tr><td style="padding:28px">
      <p style="margin:0 0 16px;font-size:16px">${greeting}</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#52616F">ďakujeme za platbu — vašu žiadosť sme prijali a začíname ju spracúvať. O ďalšom postupe vás budeme informovať e-mailom.</p>
      <table cellpadding="0" cellspacing="0" style="margin:8px 0 4px;background:#FBF3E2;border:1px solid #EBD9B4;border-radius:10px"><tr><td style="padding:12px 16px">
        <span style="font-size:12px;color:#86601F">Vaše referenčné číslo</span><br/>
        <span style="font-family:monospace;font-size:20px;font-weight:bold;color:#0F2236;letter-spacing:1px">${ref}</span>
      </td></tr></table>
      <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#52616F">Stav žiadosti môžete sledovať na <strong>${EMAIL.web}/stav</strong> (zadáte referenčné číslo a e-mail).</p>
      <hr style="border:none;border-top:1px solid #E2E0D9;margin:24px 0"/>
      <p style="margin:0;font-size:14px;line-height:1.55"><strong>${EMAIL.signatureName}</strong><br/><span style="color:#52616F">${EMAIL.signatureRole}<br/>${EMAIL.phone} · ${EMAIL.web}</span></p>
    </td></tr>
    <tr><td style="background:#0A1622;padding:14px 28px;font-size:11px;color:#9FB0BE">${EMAIL.company} — súkromný sprostredkovateľ víz. Posledné slovo pri vstupe má pohraničný orgán cieľovej krajiny.</td></tr>
  </table>
</div>`.trim();
}

/** Po úspešnej platbe: označí ako zaplatené, pošle potvrdenie, započíta promo. Idempotentné. */
export async function finalizePaidApplication(appId: string) {
  if (!appId || !supabaseAdmin) return;
  const { data: app } = await supabaseAdmin.from("applications").select("*").eq("id", appId).single();
  if (!app) return;
  if (app.confirm_email_sent) {
    if (!app.paid) await supabaseAdmin.from("applications").update({ paid: true }).eq("id", appId);
    return;
  }

  const patch: any = { paid: true, status: app.status === "new" ? "processing" : app.status, confirm_email_sent: true };

  if (process.env.RESEND_API_KEY && app.email) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `${EMAIL.fromName} <${process.env.EMAIL_FROM || EMAIL.fromAddress}>`,
          to: [app.email],
          subject: `Potvrdenie žiadosti ${app.ref || ""}`.trim(),
          html: confirmationHtml(app),
        }),
      });
    } catch { /* nech finalizácia nezlyhá kvôli e-mailu */ }
  }

  await supabaseAdmin.from("applications").update(patch).eq("id", appId);

  if (app.promo_code) {
    const { data: pc } = await supabaseAdmin.from("promo_codes").select("used").eq("code", app.promo_code).maybeSingle();
    if (pc) await supabaseAdmin.from("promo_codes").update({ used: (pc.used || 0) + 1 }).eq("code", app.promo_code);
  }
}
