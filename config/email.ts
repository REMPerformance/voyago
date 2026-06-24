/**
 * Nastavenie e-mailov — uprav si tu odosielateľa a PODPIS.
 * Odosielateľská adresa musí byť z domény overenej v Resend.
 */
export const EMAIL = {
  fromName: "Voyago",
  fromAddress: "info@voyago.sk", // zmeň na svoju overenú adresu (alebo nastav EMAIL_FROM v env)
  company: "Voyago",
  // ── Custom podpis ──────────────────────────────────────────────
  signatureName: "Tím Voyago",
  signatureRole: "Vízové oddelenie",
  phone: "+421 900 000 000",
  web: "voyago.sk",
};
