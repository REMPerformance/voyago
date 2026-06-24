import { LegalShell, H } from "@/components/Legal";
import { site } from "@/config/site";

export const metadata = { title: "Reklamácie a odstúpenie od zmluvy" };

export default function Page() {
  return (
    <LegalShell title="Reklamácie a odstúpenie od zmluvy" updated="24. 6. 2026">
      <p>
        {site.company.legalName} (ďalej „poskytovateľ") poskytuje platenú službu sprostredkovania a kontroly žiadostí
        o cestovné povolenia a víza. Nie sme štátny orgán. Cena zahŕňa štátny poplatok a poplatok za našu službu.
      </p>

      <H>1. Odstúpenie od zmluvy (14 dní)</H>
      <p>
        Spotrebiteľ má pri zmluve uzavretej na diaľku právo odstúpiť do 14 dní bez udania dôvodu. Keďže ide o službu,
        začatím poskytovania služby pred uplynutím lehoty (na základe výslovného súhlasu zákazníka) môže právo na
        odstúpenie zaniknúť, prípadne sa kráti o pomernú časť už poskytnutej služby v zmysle § 7 a nasl. zákona
        č. 102/2014 Z. z.
      </p>

      <H>2. Kedy už nie je možné vrátenie</H>
      <p>
        Po odoslaní žiadosti na príslušný úrad je služba z podstatnej časti poskytnutá; štátny poplatok a poplatok za
        spracovanie už nie je možné vrátiť. Pred odoslaním kontaktujte podporu a vieme proces zastaviť.
      </p>

      <H>3. Zamietnutie žiadosti úradom</H>
      <p>
        O výsledku rozhoduje výlučne príslušný štátny orgán. Poskytovateľ negarantuje schválenie a nezodpovedá za
        rozhodnutie úradu. V prípade zamietnutia poskytneme súčinnosť a informácie o ďalších možnostiach.
      </p>

      <H>4. Chybne zadané údaje</H>
      <p>
        Zákazník zodpovedá za správnosť zadaných údajov. Pred odoslaním žiadosť kontrolujeme; ak zistíme nezrovnalosť,
        ozveme sa. Opätovné podanie kvôli chybným údajom zo strany zákazníka môže byť spoplatnené.
      </p>

      <H>5. Ako reklamovať</H>
      <p>
        Reklamáciu zašlite e-mailom na <a href={`mailto:${site.email}`}>{site.email}</a> s číslom objednávky a opisom.
        Reklamáciu vybavíme bezodkladne, najneskôr do 30 dní. O výsledku vás budeme informovať e-mailom.
      </p>

      <H>6. Alternatívne riešenie sporov</H>
      <p>
        Spotrebiteľ má právo obrátiť sa na subjekt alternatívneho riešenia sporov (napr. Slovenská obchodná inšpekcia)
        alebo využiť platformu RSO Európskej komisie.
      </p>
    </LegalShell>
  );
}
