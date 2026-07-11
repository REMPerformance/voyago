import type { Localized } from "@/config/products";

/**
 * Dlhší, informatívny text pre stránky destinácií.
 *
 * Prečo to takto: každá destinácia potrebuje vlastný obsah, inak ju Google
 * vyhodnotí ako „tenkú stránku" a nezaindexuje ju. Text sa skladá zo šablóny
 * podľa typu povolenia a doplní sa údajmi konkrétnej krajiny, takže výsledok
 * je vecný, presný a pre každú krajinu iný.
 *
 * Zástupné výrazy: {country} {permit} {validity} {processing} {stay} {price}
 */

export type CopyBlock = { heading: Localized; body: Localized[] };

const ESTA: CopyBlock[] = [
  {
    heading: {
      sk: "Čo je {permit} a kedy ju potrebujete",
      en: "What {permit} is and when you need it",
      uk: "Що таке {permit} і коли він потрібен",
      de: "Was {permit} ist und wann Sie es brauchen",
    },
    body: [
      {
        sk: "{permit} je elektronická cestovná registrácia, ktorú pred cestou do krajiny {country} vyžaduje tamojší úrad od cestujúcich z krajín bezvízového styku. Nie je to vízum. Je to povolenie nastúpiť na palubu a požiadať o vstup na hranici, pričom o samotnom vstupe rozhoduje pohraničník až po prílete.",
        en: "{permit} is an electronic travel registration required by the authorities of {country} from travellers of visa-waiver countries. It is not a visa. It is a permission to board and to request entry at the border, while the actual entry is decided by the border officer upon arrival.",
        uk: "{permit} це електронна реєстрація, яку органи країни {country} вимагають від мандрівників із країн безвізового режиму. Це не віза. Це дозвіл на посадку в літак і на звернення про в'їзд на кордоні, а рішення про в'їзд ухвалює прикордонник після прильоту.",
        de: "{permit} ist eine elektronische Reiseregistrierung, die die Behörden von {country} von Reisenden aus visumfreien Ländern verlangen. Es ist kein Visum. Es ist die Erlaubnis, an Bord zu gehen und an der Grenze um Einreise zu bitten. Über die Einreise entscheidet der Grenzbeamte bei der Ankunft.",
      },
      {
        sk: "Držitelia slovenského pasu o ňu žiadajú pri turistike, obchodnej ceste aj pri tranzite. Bez platnej registrácie vás letecká spoločnosť spravidla nepustí na palubu, preto ju odporúčame vybaviť s predstihom aspoň niekoľkých dní.",
        en: "Holders of a Slovak passport apply for it for tourism, business travel and transit alike. Without a valid registration the airline will usually refuse boarding, so we recommend arranging it at least several days in advance.",
        uk: "Власники словацького паспорта оформлюють його для туризму, ділових поїздок і транзиту. Без чинної реєстрації авіакомпанія зазвичай не пустить на борт, тому радимо оформити її щонайменше за кілька днів.",
        de: "Inhaber eines slowakischen Passes beantragen sie für Tourismus, Geschäftsreisen und Transit. Ohne gültige Registrierung verweigert die Fluggesellschaft in der Regel das Boarding, daher empfehlen wir, sie mehrere Tage im Voraus zu erledigen.",
      },
    ],
  },
  {
    heading: {
      sk: "Platnosť, dĺžka pobytu a cena",
      en: "Validity, length of stay and price",
      uk: "Термін дії, тривалість перебування та ціна",
      de: "Gültigkeit, Aufenthaltsdauer und Preis",
    },
    body: [
      {
        sk: "Povolenie platí {validity} a umožňuje pobyt {stay}. Cena {price} je konečná a uvádzame ju vrátane DPH. Zahŕňa kompletné vybavenie: kontrolu údajov, podanie žiadosti na oficiálnom portáli aj komunikáciu s úradom. Nič sa nedopláca a sumu poznáte vopred.",
        en: "The authorization is valid {validity} and allows a stay of {stay}. The price of {price} is final and stated including VAT. It covers the complete service: checking your details, filing on the official portal and dealing with the authority. Nothing is added later and you know the amount upfront.",
        uk: "Дозвіл діє {validity} і дозволяє перебування {stay}. Ціна {price} остаточна, з ПДВ. Вона покриває повне оформлення: перевірку даних, подання на офіційному порталі та спілкування з органом. Жодних доплат, суму знаєте наперед.",
        de: "Die Genehmigung ist {validity} gültig und erlaubt einen Aufenthalt von {stay}. Der Preis von {price} ist endgültig und inklusive MwSt. Er deckt die komplette Abwicklung ab: Prüfung Ihrer Angaben, Einreichung über das offizielle Portal und Kommunikation mit der Behörde. Es kommt nichts hinzu, und Sie kennen den Betrag im Voraus.",
      },
      {
        sk: "Bežné spracovanie u nás trvá {processing}. Rozhodnutie však vydáva výhradne príslušný úrad a jeho lehotu nevieme ovplyvniť ani urýchliť.",
        en: "Our standard processing takes {processing}. The decision, however, is issued solely by the relevant authority and we can neither influence nor speed up its timeline.",
        uk: "Наше стандартне опрацювання триває {processing}. Проте рішення ухвалює виключно відповідний орган, і ми не можемо вплинути на його строки.",
        de: "Unsere Standardbearbeitung dauert {processing}. Die Entscheidung trifft jedoch ausschließlich die zuständige Behörde, deren Fristen wir weder beeinflussen noch beschleunigen können.",
      },
    ],
  },
  {
    heading: {
      sk: "Čo pre vás urobíme",
      en: "What we do for you",
      uk: "Що ми робимо для вас",
      de: "Was wir für Sie tun",
    },
    body: [
      {
        sk: "Vyplníte krátky formulár v slovenčine. My skontrolujeme, či údaje presne zodpovedajú cestovnému dokladu, či pas spĺňa požadovanú platnosť a či vo formulári nie sú preklepy, ktoré patria k najčastejším dôvodom zamietnutia. Žiadosť následne podáme na oficiálnom portáli úradu a výsledok vám pošleme e-mailom.",
        en: "You fill in a short form in your language. We check that the details match your travel document exactly, that your passport meets the required validity, and that there are no typos, which are among the most common reasons for refusal. We then file the application on the authority's official portal and send you the outcome by e-mail.",
        uk: "Ви заповнюєте коротку форму. Ми перевіряємо, чи дані точно збігаються з проїзним документом, чи паспорт відповідає вимогам щодо строку дії та чи немає помилок, які є найчастішою причиною відмови. Потім подаємо заяву на офіційному порталі органу й надсилаємо результат на пошту.",
        de: "Sie füllen ein kurzes Formular aus. Wir prüfen, ob die Angaben exakt mit Ihrem Reisedokument übereinstimmen, ob Ihr Pass die geforderte Gültigkeit erfüllt und ob keine Tippfehler vorliegen, die zu den häufigsten Ablehnungsgründen zählen. Anschließend reichen wir den Antrag über das offizielle Portal der Behörde ein und senden Ihnen das Ergebnis per E-Mail.",
      },
      {
        sk: "V poplatku za sprostredkovanie je zahrnutá ručná kontrola každého údaja oproti cestovnému dokladu, overenie požadovanej platnosti pasu, podanie žiadosti na oficiálnom portáli, sledovanie stavu, komunikácia s úradom pri prípadnom doplnení a podpora v slovenčine počas celej platnosti povolenia. Ak si niečo nie ste istí, odpovieme vám v deň, keď sa opýtate.",
        en: "The service fee covers a manual check of every detail against your travel document, verification of the required passport validity, filing on the official portal, status monitoring, communication with the authority if anything needs to be added, and support in your language for the entire validity of the permit. If you are unsure about anything, we answer the same day.",
        uk: "Сервісний збір охоплює ручну перевірку кожного поля за проїзним документом, перевірку строку дії паспорта, подання на офіційному порталі, відстеження статусу, спілкування з органом у разі потреби та підтримку протягом усього терміну дії дозволу. Якщо чогось не певні, відповімо того ж дня.",
        de: "Die Servicegebühr umfasst die manuelle Prüfung jeder Angabe anhand Ihres Reisedokuments, die Kontrolle der erforderlichen Passgültigkeit, die Einreichung über das offizielle Portal, die Statusverfolgung, die Kommunikation mit der Behörde bei Rückfragen sowie Support während der gesamten Gültigkeit. Bei Unklarheiten antworten wir noch am selben Tag.",
      },
    ],
  },
];

const ETA: CopyBlock[] = [
  {
    heading: {
      sk: "Čo je {permit} do krajiny {country}",
      en: "What {permit} for {country} is",
      uk: "Що таке {permit} до країни {country}",
      de: "Was {permit} für {country} ist",
    },
    body: [
      {
        sk: "{permit} je elektronické cestovné povolenie, ktoré krajina {country} vyžaduje od cestujúcich s pasom z krajín oslobodených od vízovej povinnosti. Povolenie sa viaže na konkrétny cestovný doklad a kontroluje sa elektronicky, takže si ho netreba tlačiť ani vlepovať do pasu.",
        en: "{permit} is an electronic travel authorization required by {country} from travellers holding a passport of a visa-exempt country. The authorization is tied to a specific travel document and is checked electronically, so there is nothing to print or stick into the passport.",
        uk: "{permit} це електронний дозвіл на подорож, який країна {country} вимагає від мандрівників із паспортом безвізової країни. Дозвіл прив'язаний до конкретного документа й перевіряється електронно, тож нічого друкувати чи вклеювати в паспорт не треба.",
        de: "{permit} ist eine elektronische Reisegenehmigung, die {country} von Reisenden mit dem Pass eines visumbefreiten Landes verlangt. Die Genehmigung ist an ein bestimmtes Reisedokument gebunden und wird elektronisch geprüft, es muss also nichts gedruckt oder in den Pass geklebt werden.",
      },
      {
        sk: "Povolenie sa vyžaduje pri turistike, návšteve rodiny, krátkej obchodnej ceste aj pri tranzite. Nenahrádza vízum, ak plánujete prácu, štúdium alebo dlhodobý pobyt.",
        en: "It is required for tourism, family visits, short business trips and transit. It does not replace a visa if you plan to work, study or stay long term.",
        uk: "Дозвіл потрібен для туризму, відвідин родини, коротких ділових поїздок і транзиту. Він не замінює візу, якщо ви плануєте роботу, навчання чи тривале перебування.",
        de: "Sie ist für Tourismus, Familienbesuche, kurze Geschäftsreisen und Transit erforderlich. Sie ersetzt kein Visum, wenn Sie arbeiten, studieren oder langfristig bleiben möchten.",
      },
    ],
  },
  {
    heading: {
      sk: "Platnosť, dĺžka pobytu a cena",
      en: "Validity, length of stay and price",
      uk: "Термін дії, тривалість перебування та ціна",
      de: "Gültigkeit, Aufenthaltsdauer und Preis",
    },
    body: [
      {
        sk: "Povolenie platí {validity} a umožňuje pobyt {stay}. Cena {price} je konečná, vrátane DPH, a pokrýva celé vybavenie žiadosti. Nič sa k nej nedopláca a poznáte ju vopred.",
        en: "The authorization is valid {validity} and allows a stay of {stay}. The price of {price} is final, including VAT, and covers the entire handling of your application. Nothing is added later and you know it upfront.",
        uk: "Дозвіл діє {validity} і дозволяє перебування {stay}. Ціна {price} остаточна, з ПДВ, і покриває повне оформлення заяви. Жодних доплат, знаєте її наперед.",
        de: "Die Genehmigung ist {validity} gültig und erlaubt einen Aufenthalt von {stay}. Der Preis von {price} ist endgültig, inklusive MwSt., und deckt die gesamte Bearbeitung Ihres Antrags ab. Es kommt nichts hinzu, und Sie kennen ihn im Voraus.",
      },
      {
        sk: "U nás sa žiadosť spracuje spravidla {processing}. Konečné rozhodnutie vydáva úrad krajiny {country} a jeho lehotu nevieme garantovať.",
        en: "We usually process the application {processing}. The final decision is issued by the authority of {country} and we cannot guarantee its timeline.",
        uk: "Ми зазвичай опрацьовуємо заяву {processing}. Остаточне рішення ухвалює орган країни {country}, і ми не можемо гарантувати його строки.",
        de: "Wir bearbeiten den Antrag üblicherweise {processing}. Die endgültige Entscheidung trifft die Behörde von {country}, deren Fristen wir nicht garantieren können.",
      },
    ],
  },
  {
    heading: {
      sk: "Ako prebieha vybavenie",
      en: "How the process works",
      uk: "Як відбувається оформлення",
      de: "So läuft die Bearbeitung ab",
    },
    body: [
      {
        sk: "Vyplníte formulár, my skontrolujeme zhodu údajov s pasom, platnosť dokladu aj prípadnú fotografiu podľa oficiálnych noriem. Žiadosť podáme na oficiálnom portáli a o výsledku vás informujeme e-mailom. Ak úrad požiada o doplnenie, ozveme sa vám.",
        en: "You fill in the form, we verify that the details match your passport, that the document is valid and that any photograph meets official standards. We file the application on the official portal and inform you of the outcome by e-mail. If the authority asks for additional information, we will contact you.",
        uk: "Ви заповнюєте форму, ми перевіряємо відповідність даних паспорту, чинність документа та фотографію за офіційними нормами. Подаємо заяву на офіційному порталі й повідомляємо результат поштою. Якщо орган попросить доповнення, ми зв'яжемося з вами.",
        de: "Sie füllen das Formular aus, wir prüfen die Übereinstimmung mit Ihrem Pass, die Gültigkeit des Dokuments und gegebenenfalls das Foto nach den amtlichen Vorgaben. Wir reichen den Antrag über das offizielle Portal ein und informieren Sie per E-Mail über das Ergebnis. Fordert die Behörde Ergänzungen an, melden wir uns bei Ihnen.",
      },
      {
        sk: "Žiadosť za vás vypĺňa a kontroluje človek, nie automat. Overíme zhodu s pasom, jeho platnosť aj to, či zvolený účel cesty zodpovedá typu povolenia. Sledujeme stav žiadosti a ak úrad požiada o doplnenie, riešime to my. Podpora v slovenčine je k dispozícii každý deň vrátane víkendov.",
        en: "Your application is completed and checked by a person, not an automated tool. We verify the match with your passport, its validity and whether your travel purpose fits the type of authorization. We monitor the status and if the authority requests anything further, we handle it. Support is available every day, weekends included.",
        uk: "Вашу заяву заповнює й перевіряє людина, а не автомат. Ми звіряємо дані з паспортом, перевіряємо строк дії та відповідність мети поїздки типу дозволу. Стежимо за статусом, а якщо орган щось запитає, вирішуємо це ми. Підтримка доступна щодня, включно з вихідними.",
        de: "Ihr Antrag wird von einem Menschen ausgefüllt und geprüft, nicht von einem Automaten. Wir prüfen die Übereinstimmung mit Ihrem Pass, dessen Gültigkeit und ob der Reisezweck zur Art der Genehmigung passt. Wir verfolgen den Status, und falls die Behörde etwas nachfordert, übernehmen wir das. Support ist täglich verfügbar, auch am Wochenende.",
      },
    ],
  },
];

const EVISA: CopyBlock[] = [
  {
    heading: {
      sk: "Elektronické vízum do krajiny {country}",
      en: "Electronic visa for {country}",
      uk: "Електронна віза до країни {country}",
      de: "Elektronisches Visum für {country}",
    },
    body: [
      {
        sk: "{permit} je vízum, o ktoré sa žiada online a doručuje sa elektronicky. Na rozdiel od klasického víza nemusíte navštíviť ambasádu ani odovzdávať pas. Po schválení dostanete dokument, ktorý predložíte pri odbavení a na hranici krajiny {country}.",
        en: "{permit} is a visa applied for online and delivered electronically. Unlike a traditional visa, you do not need to visit an embassy or hand over your passport. Once approved, you receive a document you present at check-in and at the border of {country}.",
        uk: "{permit} це віза, яку оформлюють онлайн і надсилають електронно. На відміну від звичайної візи, не треба відвідувати посольство чи здавати паспорт. Після схвалення ви отримуєте документ, який показуєте на реєстрації та на кордоні країни {country}.",
        de: "{permit} ist ein Visum, das online beantragt und elektronisch zugestellt wird. Anders als beim klassischen Visum müssen Sie weder eine Botschaft aufsuchen noch Ihren Pass abgeben. Nach der Genehmigung erhalten Sie ein Dokument, das Sie beim Check-in und an der Grenze von {country} vorlegen.",
      },
      {
        sk: "Vízum sa spravidla vydáva na turistické účely a viaže sa na konkrétny pas. Ak počas platnosti pas vymeníte, treba požiadať o nové.",
        en: "The visa is usually issued for tourism purposes and is tied to a specific passport. If you replace your passport during its validity, a new application is required.",
        uk: "Віза зазвичай видається для туризму та прив'язана до конкретного паспорта. Якщо ви заміните паспорт протягом строку дії, потрібна нова заява.",
        de: "Das Visum wird in der Regel für touristische Zwecke ausgestellt und ist an einen bestimmten Pass gebunden. Wenn Sie den Pass während der Gültigkeit wechseln, ist ein neuer Antrag nötig.",
      },
    ],
  },
  {
    heading: {
      sk: "Platnosť, dĺžka pobytu a cena",
      en: "Validity, length of stay and price",
      uk: "Термін дії, тривалість перебування та ціна",
      de: "Gültigkeit, Aufenthaltsdauer und Preis",
    },
    body: [
      {
        sk: "Vízum platí {validity} a umožňuje pobyt {stay}. Cena {price} je konečná, vrátane DPH, a pokrýva celé vybavenie. Uvedená suma je finálna a poznáte ju vopred.",
        en: "The visa is valid {validity} and allows a stay of {stay}. The price of {price} is final, including VAT, and covers the entire handling. The stated amount is final and known upfront.",
        uk: "Віза діє {validity} і дозволяє перебування {stay}. Ціна {price} остаточна, з ПДВ, і покриває повне оформлення. Вказана сума фінальна і відома наперед.",
        de: "Das Visum ist {validity} gültig und erlaubt einen Aufenthalt von {stay}. Der Preis von {price} ist endgültig, inklusive MwSt., und deckt die gesamte Abwicklung ab. Der angegebene Betrag ist final und im Voraus bekannt.",
      },
      {
        sk: "Bežné spracovanie trvá {processing}. Konzulárny úrad si však môže vyžiadať doplňujúce podklady, čo lehotu predĺži. O každom takom kroku vás informujeme.",
        en: "Standard processing takes {processing}. The consular authority may, however, request additional documents, which extends the timeline. We inform you of every such step.",
        uk: "Стандартне опрацювання триває {processing}. Проте консульський орган може запросити додаткові документи, що подовжить строк. Ми повідомляємо про кожен такий крок.",
        de: "Die Standardbearbeitung dauert {processing}. Die Konsularbehörde kann jedoch zusätzliche Unterlagen anfordern, was die Frist verlängert. Über jeden solchen Schritt informieren wir Sie.",
      },
    ],
  },
  {
    heading: {
      sk: "Na čo si dať pozor",
      en: "What to watch out for",
      uk: "На що звернути увагу",
      de: "Worauf Sie achten sollten",
    },
    body: [
      {
        sk: "Najčastejším dôvodom zamietnutia sú preklepy v mene alebo v čísle pasu, nevyhovujúca fotografia a nedostatočná platnosť cestovného dokladu. Práve tieto veci kontrolujeme skôr, než žiadosť odošleme.",
        en: "The most common reasons for refusal are typos in the name or passport number, a non-compliant photograph and insufficient passport validity. These are exactly the things we check before submitting the application.",
        uk: "Найчастіші причини відмови це помилки в імені чи номері паспорта, невідповідне фото та недостатній строк дії документа. Саме це ми перевіряємо перед поданням заяви.",
        de: "Die häufigsten Ablehnungsgründe sind Tippfehler im Namen oder in der Passnummer, ein nicht regelkonformes Foto und eine unzureichende Passgültigkeit. Genau das prüfen wir, bevor wir den Antrag einreichen.",
      },
      {
        sk: "Fotografiu posudzujeme podľa oficiálnych noriem ešte pred podaním a ak nevyhovuje, povieme presne, čo upraviť. Sledujeme stav žiadosti, komunikujeme s konzulárnym úradom a schválené vízum vám doručíme e-mailom v podobe, ktorú predložíte pri odbavení. Poradíme aj s tým, aké doklady mať pri sebe na hranici.",
        en: "We assess your photograph against the official standards before submission and, if it does not comply, we tell you exactly what to change. We monitor the application, communicate with the consular authority and deliver the approved visa by e-mail in the form you present at check-in. We also advise which documents to carry at the border.",
        uk: "Ми оцінюємо фото за офіційними нормами ще до подання і, якщо воно не відповідає, кажемо, що саме змінити. Стежимо за заявою, спілкуємось із консульським органом і надсилаємо схвалену візу на пошту у вигляді, який ви показуєте на реєстрації. Також радимо, які документи мати на кордоні.",
        de: "Wir prüfen Ihr Foto vor der Einreichung anhand der amtlichen Vorgaben und sagen Ihnen bei Abweichungen genau, was zu ändern ist. Wir verfolgen den Antrag, kommunizieren mit der Konsularbehörde und senden Ihnen das genehmigte Visum per E-Mail in der Form, die Sie beim Check-in vorlegen. Wir beraten auch, welche Unterlagen Sie an der Grenze mitführen sollten.",
      },
    ],
  },
];

export const DESTINATION_COPY: Record<string, CopyBlock[]> = {
  esta: ESTA,
  eta: ETA,
  evisa: EVISA,
};
