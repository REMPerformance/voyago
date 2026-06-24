import { LegalShell, H } from "@/components/Legal";

export const metadata = { title: "Súbory cookie — Voyago" };

export default function Page() {
  return (
    <LegalShell title="Súbory cookie" updated="20. 6. 2026">
      <H>1. Čo sú cookies</H>
      <p>Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači a pomáhajú webu fungovať a zapamätať si vaše preferencie.</p>
      <H>2. Aké cookies používame</H>
      <p>
        <strong>Nevyhnutné</strong> — potrebné na fungovanie webu (napr. uloženie jazyka, režimu, obsahu košíka). <br />
        <strong>Preferenčné</strong> — pamätajú si vaše nastavenia (svetlý/tmavý režim). <br />
        <strong>Analytické</strong> — ak sú nasadené, pomáhajú nám pochopiť používanie webu (len so súhlasom).
      </p>
      <H>3. Správa súhlasu</H>
      <p>Pri prvej návšteve vám zobrazíme cookie lištu, kde môžete súhlas udeliť alebo odmietnuť. Voľbu môžete kedykoľvek zmeniť vymazaním cookies v prehliadači.</p>
      <H>4. Tretie strany</H>
      <p>Niektoré služby (platobná brána, prípadné analytické nástroje) môžu nastavovať vlastné cookies v súlade s ich zásadami.</p>
    </LegalShell>
  );
}
