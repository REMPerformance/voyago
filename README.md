# Voyago

Webová platforma na sprostredkovanie cestovných povolení a e-víz (ESTA, ETA, e-Visa, ETIAS…).
Postavené na **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. SK/EN.

> ⚠️ **Dôležité — právny rámec:** Voyago je *nezávislá asistenčná služba*, nie štátna inštitúcia.
> Vyhlásenie o nezávislosti je v `config/site.ts` a zobrazuje sa v pätičke aj pri žiadosti.
> Bez neho hrozí zablokovanie reklamného účtu (Google Ads politika „Government documents
> and official services"). Neodstraňuj ho.

---

## Spustenie

```bash
npm install
npm run dev
```

Otvor `http://localhost:3000`.

Produkčný build:

```bash
npm run build
npm start
```

> Fonty (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono) sa načítavajú z Google Fonts
> cez `<link>` v `app/layout.tsx` — na dev/build stačí internet v prehliadači.

---

## Ako to celé funguje (architektúra)

```
config/
  site.ts          ← značka, mena, kontakt, POVINNÝ disclaimer (mení sa na 1 mieste)
  products.ts      ← CORE ENGINE: katalóg krajín + definícia formulárových polí
lib/
  i18n.tsx         ← jazyk SK/EN + slovník UI textov
  eligibility.ts   ← logika sprievodcu (občianstvo × destinácia × účel × dĺžka)
  cart.tsx         ← košík (localStorage)
  format.ts        ← formátovanie ceny
components/
  Wizard.tsx       ← sprievodca „aké vízum potrebujem"
  DynamicForm.tsx  ← formulár, ktorý sa vykresľuje z configu produktu
  ProductCard, Hero, Header, Footer, Stamp, HowItWorks …
app/
  page.tsx              ← domov (hero + destinácie + ako to funguje)
  wizard/page.tsx       ← sprievodca
  destinations/page.tsx ← katalóg
  apply/[productId]/    ← žiadosť pre konkrétny produkt
  cart/page.tsx         ← košík
  checkout/page.tsx     ← zhrnutie + platba (zatiaľ demo)
```

### Pridať novú krajinu = pridať jeden objekt

Otvor `config/products.ts`, skopíruj existujúci produkt v poli `PRODUCTS` a uprav.
Formuláre sa skladajú z hotových skupín polí (`authForm`, `evisaForm`) — netreba programovať
novú stránku. Nový slug automaticky funguje na `/apply/<slug>` aj v katalógu.

### Pridať krajinu do sprievodcu

V `lib/eligibility.ts` doplň destináciu do `DESTINATIONS` a pravidlo do `determine()`.
Pravidlá sú **zjednodušené MVP** — ostrá verzia musí čerpať z oficiálnych štátnych webov
(štandard v odvetví je databáza IATA Timatic), nie z natvrdo napísaných podmienok.

---

## Ďalšie kroky (postupne)

1. **Stripe checkout** — nahradiť demo platbu reálnou Checkout Session + webhook.
2. **Admin panel + databáza** — objednávky a skeny pasov padajú do zabezpečeného úložiska
   (Supabase), na e-mail chodí len notifikácia. Raw skeny **neposielať e-mailom** (GDPR).
3. **Plné i18n** — prejsť z klientskeho prepínača na `next-intl` s URL `/sk` a `/en` (lepšie SEO).
4. **Reálne dáta pravidiel** — nahradiť `eligibility.ts` dátovým zdrojom.
5. **Sezónne landing pages** pre Google Ads (UK ETA teraz, ETIAS Q4 2026).
```
