# Voyago — nastavenie konzoly a backendu

## 1. Supabase (oznamy + admin konzola)
1. Vytvor projekt na https://supabase.com
2. V **SQL Editor** spusti obsah súboru `supabase/schema.sql`.
3. V **Project Settings → API** skopíruj `Project URL` a `anon public key`.
4. Vytvor súbor `.env.local` (podľa `.env.example`) a vyplň:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. V **Authentication → Users** vytvor používateľa (e-mail + heslo) — to bude tvoj admin login.
6. Spusti web a choď na **`/admin`**, prihlás sa a spravuj bannery/popupy.

> Kým nie je Supabase nastavené, web používa zástupný oznam zo súboru
> `config/announcements.ts` a `/admin` zobrazí pokyny.

## Ako fungujú oznamy
- **Horný banner** (`bar`) alebo **popup okno** (`popup`).
- Štýly: `info`, `warning`, `success`, `promo`.
- Platnosť: nastav „Od"/„Do" — prázdne „Do" = **do odvolania**.
- „Zatvárateľný" → návštevník ho môže zavrieť (zapamätá sa).

## 2. Právne stránky
`/obchodne-podmienky`, `/ochrana-osobnych-udajov`, `/cookies` — doplň reálne firemné údaje
(miesta označené `[IČO]`, `[DIČ]`, `[sídlo]`, `[e-mail]`…). **Odporúčam dať skontrolovať právnikovi.**

## 3. Ďalší krok (pripravené v schéme)
- **Doručovanie formulárov**: tabuľka `applications` + Storage bucket pre nahraté súbory.
- **Platby**: Stripe (`STRIPE_SECRET_KEY`, webhooky) → po úhrade vznikne objednávka.
