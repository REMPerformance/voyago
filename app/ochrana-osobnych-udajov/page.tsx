import { LegalShell, H } from "@/components/Legal";

export const metadata = { title: "Ochrana osobných údajov — Voyago" };

export default function Page() {
  return (
    <LegalShell title="Zásady ochrany osobných údajov (GDPR)" updated="20. 6. 2026">
      <p>
        Tieto zásady vysvetľujú, ako spracúvame osobné údaje v súlade s Nariadením (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z.
        o ochrane osobných údajov.
      </p>

      <H>1. Prevádzkovateľ</H>
      <p>
        Prevádzkovateľom je [Obchodné meno], so sídlom [sídlo], IČO: [IČO], e-mail: [e-mail], telefón: [telefón]. Vo veciach ochrany
        osobných údajov nás kontaktujte na uvedenom e-maile.
      </p>

      <H>2. Kategórie spracúvaných údajov</H>
      <p>
        Na účely vybavenia žiadosti spracúvame najmä: <strong>identifikačné údaje</strong> (meno, priezvisko, dátum a miesto
        narodenia, pohlavie, štátna príslušnosť, prípadne mená rodičov), <strong>údaje z cestovného dokladu</strong> (číslo pasu,
        krajina a dátum vydania, platnosť), <strong>kontaktné a adresné údaje</strong> (e-mail, telefón, adresa), <strong>údaje
        o ceste</strong> (účel, dátum, ubytovanie), <strong>nahraté dokumenty</strong> (sken pasu, fotografia) a v odôvodnených
        prípadoch <strong>ďalšie údaje vyžadované konkrétnym úradom</strong> (napr. zamestnanie, referencie, bezpečnostné vyhlásenia).
        Pri niektorých krajinách môžu byť vyžadované aj údaje týkajúce sa zdravia (napr. zdravotné vyhlásenie); tieto spracúvame len
        v nevyhnutnom rozsahu a na základe vášho súhlasu alebo na splnenie podmienok cieľovej krajiny.
      </p>

      <H>3. Účely a právne základy spracúvania</H>
      <p>
        (a) <strong>Plnenie zmluvy</strong> — príprava, podanie a vybavenie žiadosti (čl. 6 ods. 1 písm. b GDPR);
        (b) <strong>Súhlas</strong> — tam, kde je potrebný, najmä pri osobitných kategóriách údajov a marketingu (čl. 6 ods. 1 písm. a,
        príp. čl. 9 ods. 2 písm. a);
        (c) <strong>Zákonná povinnosť</strong> — účtovníctvo a daňové povinnosti (čl. 6 ods. 1 písm. c);
        (d) <strong>Oprávnený záujem</strong> — ochrana práv, bezpečnosť a zlepšovanie služby (čl. 6 ods. 1 písm. f).
      </p>

      <H>4. Zdroj údajov</H>
      <p>Osobné údaje získavame priamo od vás. Poskytnutie údajov je nevyhnutné na uzavretie a plnenie zmluvy; bez nich nie je možné žiadosť vybaviť.</p>

      <H>5. Príjemcovia a sprostredkovatelia</H>
      <p>
        Údaje sprístupňujeme: <strong>príslušným úradom a oficiálnym portálom cieľových krajín</strong> (nevyhnutné na podanie žiadosti);
        poskytovateľovi platobnej brány (<strong>Stripe</strong>); poskytovateľom IT a cloudovej infraštruktúry a úložiska
        (<strong>Supabase</strong>, <strong>Vercel</strong>); poskytovateľovi e-mailových služieb (<strong>Resend</strong>);
        prípadne účtovníkovi a poradcom. Všetci sprostredkovatelia spracúvajú údaje na základe zmluvy a v súlade s GDPR.
      </p>

      <H>6. Prenos do tretích krajín</H>
      <p>
        Keďže žiadosti smerujú do krajín mimo EÚ (napr. USA, India, Egypt, Vietnam), je prenos údajov príslušným úradom týchto krajín
        <strong> nevyhnutný na plnenie zmluvy</strong> a uskutočňuje sa v zmysle čl. 49 ods. 1 písm. b GDPR. Pri sprostredkovateľoch
        využívame primerané záruky (napr. štandardné zmluvné doložky).
      </p>

      <H>7. Doba uchovávania</H>
      <p>
        Údaje uchovávame po dobu nevyhnutnú na vybavenie žiadosti a na splnenie zákonných (najmä účtovných a daňových) povinností.
        <strong>Nahraté doklady (sken pasu, fotografia) mažeme bezodkladne po vybavení žiadosti</strong>, ak osobitný predpis
        nevyžaduje inak.
      </p>

      <H>8. Vaše práva</H>
      <p>
        Máte právo na: prístup k údajom, opravu, výmaz („právo na zabudnutie"), obmedzenie spracúvania, prenosnosť údajov, namietať
        proti spracúvaniu a kedykoľvek odvolať súhlas (bez vplyvu na zákonnosť spracúvania pred odvolaním). Tieto práva si uplatníte
        na [e-mail]. Máte tiež právo podať sťažnosť dozornému orgánu — <strong>Úrad na ochranu osobných údajov SR</strong>,
        Hraničná 12, 820 07 Bratislava (dataprotection.gov.sk).
      </p>

      <H>9. Automatizované rozhodovanie a profilovanie</H>
      <p>Nevykonávame automatizované rozhodovanie ani profilovanie s právnymi účinkami pre dotknutú osobu.</p>

      <H>10. Bezpečnosť</H>
      <p>
        Prijímame primerané technické a organizačné opatrenia na ochranu údajov (zabezpečený prenos, riadenie prístupov, šifrované
        úložisko, prístup k dokladom len pre poverené osoby).
      </p>

      <H>11. Cookies a zmeny zásad</H>
      <p>
        Používanie cookies upravuje dokument <a href="/cookies">Súbory cookie</a>. Tieto zásady môžeme aktualizovať; aktuálne znenie
        je vždy dostupné na tejto stránke.
      </p>
    </LegalShell>
  );
}
