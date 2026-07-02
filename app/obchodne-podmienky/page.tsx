import { LegalShell, H } from "@/components/Legal";
import { site } from "@/config/site";
import { EXPRESS_PCT, PROTECTION_FEE } from "@/config/products";

export const metadata = { title: "Obchodné podmienky — Voyago" };

const EXPRESS_PCT_LABEL = Math.round(EXPRESS_PCT * 100);
const c = site.company;

export default function Page() {
  return (
    <LegalShell title="Všeobecné obchodné podmienky" updated="27. 6. 2026">
      <H>1. Úvodné ustanovenia a vymedzenie pojmov</H>
      <p>
        Tieto všeobecné obchodné podmienky (ďalej len „VOP") upravujú práva a povinnosti zmluvných strán pri poskytovaní
        služieb prostredníctvom webovej stránky prevádzkovateľa. „Poskytovateľ" je subjekt uvedený v čl. 2. „Zákazník" je
        fyzická alebo právnická osoba, ktorá si objedná službu. „Spotrebiteľ" je fyzická osoba, ktorá pri uzatváraní zmluvy
        nekoná v rámci predmetu svojej podnikateľskej činnosti. „Služba" je sprostredkovanie podania žiadosti o elektronické
        cestovné povolenie alebo e-vízum. „Cestovné povolenie" zahŕňa najmä ESTA, ETA, e-Visa, ETIAS a podobné elektronické
        autorizácie. „Štátny poplatok" je poplatok účtovaný príslušným úradom cieľovej krajiny. „Poplatok za sprostredkovanie"
        je odmena poskytovateľa za jeho službu. „Pôvodná suma" je cena za vízum/povolenie, t. j. súčet štátneho poplatku a
        poplatku za sprostredkovanie, bez príplatku za expresné spracovanie a bez poplatku za ochranu kupujúceho. „Doplnkové
        služby" sú nepovinné platené služby podľa čl. 7 a 8 (expresné spracovanie a ochrana kupujúceho).
      </p>

      <H>2. Identifikácia poskytovateľa</H>
      <p>
        {c.legalName}, so sídlom {c.address}, IČO: {c.ico}, DIČ: {c.dic}
        {c.icDph ? <>, IČ DPH: {c.icDph}</> : null}, e-mail: {site.email}, telefón: {site.phone} (ďalej len „poskytovateľ").
        Orgánom dozoru je Slovenská obchodná inšpekcia (SOI).
      </p>

      <H>3. Povaha služby — poskytovateľ nie je štátny orgán</H>
      <p>
        Poskytovateľ je <strong>súkromný sprostredkovateľ</strong>. <strong>Nie je</strong> štátnym orgánom, vládnou inštitúciou,
        ambasádou ani s nimi nie je personálne, majetkovo ani inak prepojený a nekoná v ich mene. Cena poskytovateľa zahŕňa štátny poplatok aj poplatok za sprostredkovanie (kontrola, podanie, podpora).
      </p>

      <H>4. Predmet a rozsah služby</H>
      <p><strong>Poskytovateľ pre zákazníka:</strong> posúdi vhodný typ povolenia, skontroluje úplnosť a formálnu správnosť
        poskytnutých údajov a podkladov, vyplní a podá žiadosť cez oficiálny portál príslušného úradu, uhradí v mene zákazníka
        štátny poplatok a doručí výsledok konania na e-mail zákazníka.
      </p>
      <p><strong>Predmetom služby nie je:</strong> zastupovanie v správnom alebo súdnom konaní, právne poradenstvo, garancia
        schválenia žiadosti, ovplyvňovanie rozhodnutia úradu, ani zabezpečenie vstupu do cieľovej krajiny.
      </p>

      <H>5. Objednávka a uzavretie zmluvy</H>
      <p>
        Zmluva vzniká odoslaním objednávky zákazníkom a jej potvrdením, resp. úhradou ceny. Odoslaním objednávky zákazník
        potvrdzuje, že sa oboznámil s týmito VOP a so Zásadami ochrany osobných údajov a súhlasí s nimi.
      </p>

      <H>6. Cena, poplatky a daňový doklad</H>
      <p>
        Cena pri každej destinácii je uvedená vrátane štátneho poplatku a poplatku za sprostredkovanie a <strong>vrátane DPH</strong>.
        Pri viacúrovňových povoleniach je uvedená cena „od". K cene si zákazník môže nepovinne pripočítať doplnkové služby
        podľa čl. 7 a 8. Po úhrade poskytovateľ vystaví a elektronicky zašle daňový doklad. Ceny môžu byť ovplyvnené aktuálnymi
        zľavami zverejnenými na webe.
      </p>

      <H>7. Doplnková služba — Expresné spracovanie</H>
      <p>
        Expresné spracovanie je nepovinná platená služba za príplatok vo výške <strong>{EXPRESS_PCT_LABEL} % z Pôvodnej sumy</strong>,
        účtovaný za každú jednu žiadosť (jedného cestujúceho). Pri tejto službe poskytovateľ spracuje a podá žiadosť
        <strong> prednostne, spravidla do 24 hodín</strong> od doplnenia všetkých potrebných údajov a podkladov zo strany zákazníka.
      </p>
      <p>
        Expresné spracovanie sa týka výlučne <strong>rýchlosti práce poskytovateľa</strong>. <strong>Negarantuje</strong> rýchlejšie
        rozhodnutie ani schválenie zo strany príslušného úradu, keďže lehoty a rozhodnutie závisia výlučne od úradu. Príplatok za
        expresné spracovanie je <strong>nevratný</strong> aj v prípade zamietnutia žiadosti.
      </p>

      <H>8. Doplnková služba — Ochrana kupujúceho</H>
      <p>
        Ochrana kupujúceho je nepovinná platená služba za poplatok <strong>{PROTECTION_FEE} € s DPH za každú jednu žiadosť</strong>
        (jedného cestujúceho). Ak je žiadosť, ku ktorej bola ochrana zakúpená, <strong>zamietnutá príslušným úradom cieľovej krajiny
        napriek tomu, že zákazník poskytol pravdivé, správne a úplné údaje a podklady a poskytol potrebnú súčinnosť</strong>,
        poskytovateľ vráti zákazníkovi <strong>Pôvodnú sumu</strong> (štátny poplatok + poplatok za sprostredkovanie). Ochrana kupujúceho
        teda kryje výlučne zamietnutie z dôvodov, ktoré nie sú pripísateľné zákazníkovi (napr. voľná úvaha úradu pri riadne podanej žiadosti).
      </p>
      <p>
        Poplatok za ochranu kupujúceho ({PROTECTION_FEE} €) je <strong>nevratný</strong> a do vrátenej sumy sa nezapočítava. Rovnako sa
        nevracia prípadný príplatok za expresné spracovanie. Vracia sa <strong>výlučne Pôvodná suma</strong>.
      </p>
      <p><strong>Ochrana kupujúceho sa nevzťahuje na prípady, keď:</strong></p>
      <ul>
        <li>zamietnutie je čo i len sčasti pripísateľné údajom, podkladom, opomenutiam alebo konaniu zákazníka; splnenie podmienok posúdi poskytovateľ na základe odôvodnenia úradu a údajov zo žiadosti;</li>
        <li>žiadosť bola zamietnutá pre nepravdivé, nesprávne, neúplné alebo zastarané údaje či podklady poskytnuté zákazníkom;</li>
        <li>zákazník zatajil podstatné skutočnosti (napr. predchádzajúce zamietnutie, zákaz vstupu, trestnú činnosť, predchádzajúce prekročenie povoleného pobytu);</li>
        <li>zákazník sa nedostavil na pohovor, biometriu alebo nedoručil vyžiadané podklady v stanovenom čase;</li>
        <li>zákazník žiadosť sám zrušil, stiahol alebo zmenil po jej podaní;</li>
        <li>úrad nevydal rozhodnutie o zamietnutí (napr. žiadosť je v konaní, vyžaduje doplnenie, alebo došlo k omeškaniu);</li>
        <li>cestovný doklad zákazníka bol neplatný, poškodený alebo nespĺňal požiadavky cieľovej krajiny;</li>
        <li>k zamietnutiu došlo v dôsledku vyššej moci alebo konania tretích strán mimo kontroly poskytovateľa.</li>
      </ul>
      <p>
        <strong>Uplatnenie:</strong> nárok na vrátenie Pôvodnej sumy si zákazník uplatní e-mailom na {site.email} a predloží
        doklad o zamietnutí vydaný príslušným úradom, a to najneskôr do <strong>14 dní</strong> odo dňa, keď sa o zamietnutí dozvedel.
        Po overení poskytovateľ vráti Pôvodnú sumu do <strong>14 dní</strong> rovnakým platobným prostriedkom, akým bola uhradená,
        ak sa strany nedohodnú inak. Na jednu žiadosť prislúcha najviac jedno vrátenie, a to maximálne do výšky Pôvodnej sumy.
        Ochrana kupujúceho je doplnková zmluvná služba poskytovateľa a nie je poistným produktom v zmysle osobitných predpisov.
      </p>

      <H>9. Platobné podmienky</H>
      <p>
        Platba sa realizuje vopred cez zabezpečenú platobnú bránu (Stripe; Visa, Mastercard, Apple Pay, Google Pay). Poskytovateľ
        neuchováva údaje o platobných kartách. Spracovanie žiadosti sa začína po pripísaní platby.
      </p>

      <H>10. Súčinnosť a povinnosti zákazníka</H>
      <p>
        Zákazník je povinný poskytnúť <strong>pravdivé, správne, úplné a aktuálne</strong> údaje a platný cestovný doklad a
        poskytnúť potrebnú súčinnosť. Zákazník zodpovedá za obsah a pravdivosť poskytnutých údajov a podkladov. Poskytovateľ
        nezodpovedá za následky vyplývajúce z nesprávnych, neúplných alebo nepravdivých údajov poskytnutých zákazníkom.
      </p>

      <H>11. Postup a lehoty vybavenia</H>
      <p>
        Orientačné lehoty uvedené pri destináciách sú informatívne a <strong>nie sú zo strany poskytovateľa garantované</strong>,
        keďže závisia výlučne od príslušného úradu. Poskytovateľ nezodpovedá za omeškanie spôsobené úradom, výpadkom alebo
        zmenou oficiálnych portálov, vyššou mocou ani konaním tretích strán.
      </p>

      <H>12. Záruky poskytovateľa a vylúčenie zodpovednosti</H>
      <p><strong>Poskytovateľ garantuje:</strong> (a) spracovanie žiadosti s odbornou starostlivosťou; (b) vyplnenie žiadosti
        v súlade s údajmi poskytnutými zákazníkom; (c) podanie žiadosti na príslušný úrad / oficiálny portál cieľovej krajiny;
        (d) úhradu štátneho poplatku a (e) doručenie výsledku konania zákazníkovi.
      </p>
      <p><strong>Poskytovateľ negarantuje a nezodpovedá za:</strong> (a) <strong>schválenie</strong> žiadosti príslušným úradom;
        (b) <strong>vstup zákazníka do cieľovej krajiny</strong>; (c) rozhodnutia a lehoty úradov; (d) konanie pohraničných a
        imigračných orgánov; (e) zmeny vízových pravidiel a podmienok cieľových krajín; (f) následky nesprávnych údajov zákazníka.
      </p>
      <p>
        Zákazník výslovne berie na vedomie, že <strong>posledné slovo pri vstupe do krajiny má vždy pohraničný alebo imigračný
        orgán cieľovej krajiny</strong> a že <strong>platné cestovné povolenie ani vízum samo o sebe nezaručuje vstup</strong>.
      </p>
      <p>
        Celková zodpovednosť poskytovateľa za škodu je obmedzená do výšky zaplateného <strong>poplatku za sprostredkovanie</strong>
        (t. j. bez štátneho poplatku a bez poplatkov za doplnkové služby), pokiaľ tomu nebráni kogentné ustanovenie zákona. Tým
        nie sú dotknuté nároky z Ochrany kupujúceho podľa čl. 8. Poskytovateľ nezodpovedá za nepriame, následné alebo ušlé škody
        (napr. zmeškaný let, ubytovanie, ušlý zisk) v rozsahu, v akom to pripúšťa právny poriadok.
      </p>

      <H>13. Nevratné položky a vrátenie peňazí</H>
      <p>
        V prípade zamietnutia žiadosti príslušným úradom je <strong>štátny poplatok zo strany úradu spravidla nevratný</strong>;
        jeho vrátenie zákazníkovi zabezpečuje výlučne Ochrana kupujúceho podľa čl. 8, ak bola zakúpená. <strong>Poplatok za
        sprostredkovanie</strong> pokrýva už vykonanú prácu poskytovateľa a po začatí poskytovania služby je nevratný.
        <strong> Príplatok za expresné spracovanie</strong> a <strong>poplatok za ochranu kupujúceho</strong> sú nevratné.
      </p>

      <H>14. Odstúpenie od zmluvy</H>
      <p>
        Ide o zmluvu o poskytnutí služby na diaľku. Zákazník (spotrebiteľ) udeľuje súhlas so začatím poskytovania služby pred
        uplynutím lehoty na odstúpenie a berie na vedomie, že po úplnom poskytnutí služby <strong>stráca právo na odstúpenie</strong>
        v zmysle príslušných ustanovení zákona o ochrane spotrebiteľa pri zmluvách uzatváraných na diaľku. Ak služba ešte nebola
        začatá, zákazník môže od zmluvy odstúpiť v zákonnej lehote 14 dní.
      </p>

      <H>15. Reklamácie a alternatívne riešenie sporov</H>
      <p>
        Reklamácie sa uplatňujú na {site.email}. Poskytovateľ vybaví reklamáciu v zákonnej lehote. Podrobnosti upravuje dokument{" "}
        <a href="/reklamacie">Reklamácie a odstúpenie</a>. Spotrebiteľ má právo obrátiť sa na subjekt alternatívneho riešenia
        sporov (Slovenská obchodná inšpekcia) alebo využiť platformu RSO Európskej komisie (ec.europa.eu/consumers/odr).
      </p>

      <H>16. Ochrana osobných údajov</H>
      <p>Spracúvanie osobných údajov upravuje dokument <a href="/ochrana-osobnych-udajov">Ochrana osobných údajov</a>.</p>

      <H>17. Zmeny VOP a záverečné ustanovenia</H>
      <p>
        Poskytovateľ je oprávnený VOP meniť; pre konkrétnu objednávku platí znenie účinné v čase jej odoslania. Vzťahy sa riadia
        právnym poriadkom Slovenskej republiky. Ak je niektoré ustanovenie VOP neplatné, ostatné ustanovenia zostávajú v platnosti
        (salvátorská klauzula).
      </p>
    </LegalShell>
  );
}
