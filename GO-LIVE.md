# Voyago — checklist pred spustením

## 1) Skutočné údaje firmy (`config/site.ts`)
- [ ] `url` → skutočná doména (napr. `https://voyago.sk`) — používa sa pre SEO/canonical/sitemap
- [ ] `email` → reálny e-mail (teraz placeholder `@voyago.example`)
- [ ] `phone` → reálne telefónne číslo
- [ ] `company.ico`, `company.dic`, `company.icDph` → reálne identifikátory (povinné na faktúrach/pätičke)
- [ ] `social.*` → odkazy na profily (nepovinné, prázdne sa skryjú)

## 2) Premenné prostredia
- [ ] Skopíruj `.env.example` → `.env.local` a vyplň
- [ ] Tie isté premenné nastav na Verceli

## 3) Databáza (Supabase)
- [ ] Spusti `VOYAGO_DB_SETUP.sql` (objednávky, RPC sledovania, úložisko)
- [ ] Spusti `VOYAGO_CHAT.sql` (chat)
- [ ] Vytvor admin používateľa: Authentication → Users → Add user

## 4) Platby (Stripe)
- [ ] V Stripe → Developers → Webhooks pridaj endpoint `https://TVOJADOMENA/api/stripe/webhook`
- [ ] Skopíruj „Signing secret" do `STRIPE_WEBHOOK_SECRET`
- [ ] Otestuj testovaciu platbu → objednávka sa označí ako zaplatená

## 5) E-maily (Resend)
- [ ] Over doménu v Resend (SPF/DKIM), nastav `EMAIL_FROM` na overenú doménu
- [ ] Test: zmena stavu objednávky → zákazníkovi príde e-mail; nová správa v chate → tebe príde e-mail

## 6) Captcha (Turnstile)
- [ ] Vytvor site v Cloudflare Turnstile, doplň `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`

## 7) Po nasadení
- [ ] Over `tvojadomena/sitemap.xml` a `tvojadomena/robots.txt`
- [ ] Pridaj web do Google Search Console a pošli sitemap
- [ ] Skontroluj rich výsledky (Google Rich Results Test) pre blog/produkt stránky
