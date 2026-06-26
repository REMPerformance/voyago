export type Loc = { sk: string; en: string };
export type CountryInfo = {
  portal: string;          // oficiálny portál
  currency: string;
  plug: string;            // typ zásuvky / napätie
  emergency: string;       // tiesňové číslo
  tips: Loc[];             // 2–3 užitočné rady
};

export const COUNTRY_INFO: Record<string, CountryInfo> = {
  US: { portal: "https://esta.cbp.dhs.gov", currency: "USD ($)", plug: "Typ A/B · 120 V", emergency: "911", tips: [
    { sk: "ESTA majte schválené ešte pred odletom — bez neho vás nepustia na palubu.", en: "Have ESTA approved before departure — you won't board without it." },
    { sk: "Na hraniciach majte pripravenú adresu prvého ubytovania v USA.", en: "Have your first US accommodation address ready at the border." } ] },
  GB: { portal: "https://www.gov.uk/eta", currency: "GBP (£)", plug: "Typ G · 230 V", emergency: "999 / 112", tips: [
    { sk: "ETA je viazané na pas — cestujte s tým istým pasom, na ktorý bolo vydané.", en: "The ETA is linked to your passport — travel with the same passport." },
    { sk: "V Londýne sa oplatí bezkontaktná karta na MHD (Oyster/contactless).", en: "A contactless card works great on London transport." } ] },
  CA: { portal: "https://www.canada.ca/eta", currency: "CAD ($)", plug: "Typ A/B · 120 V", emergency: "911", tips: [
    { sk: "eTA platí 5 rokov alebo do platnosti pasu a umožňuje viac vstupov.", en: "The eTA is valid 5 years or until passport expiry, multiple entries." },
    { sk: "Pri lete cez USA potrebujete aj americké ESTA.", en: "Transiting via the USA also requires a US ESTA." } ] },
  AU: { portal: "https://immi.homeaffairs.gov.au", currency: "AUD ($)", plug: "Typ I · 230 V", emergency: "000", tips: [
    { sk: "Pri vstupe deklarujte potraviny a prírodniny — biokontrola je prísna.", en: "Declare food and natural items on arrival — biosecurity is strict." },
    { sk: "Vzdialenosti sú obrovské — plánujte vnútroštátne lety vopred.", en: "Distances are huge — plan domestic flights ahead." } ] },
  NZ: { portal: "https://www.immigration.govt.nz/nzeta", currency: "NZD ($)", plug: "Typ I · 230 V", emergency: "111", tips: [
    { sk: "K NZeTA sa platí aj turistický poplatok IVL — býva zahrnutý v žiadosti.", en: "NZeTA includes the IVL tourism levy in most applications." },
    { sk: "Prísna biokontrola — nečistú turistickú obuv vyčistite.", en: "Strict biosecurity — clean hiking boots before arrival." } ] },
  KR: { portal: "https://www.k-eta.go.kr", currency: "KRW (₩)", plug: "Typ C/F · 220 V", emergency: "112 / 119", tips: [
    { sk: "K-ETA vybavte aspoň 72 h pred odletom.", en: "Apply for K-ETA at least 72 h before departure." },
    { sk: "Oplatí sa dobíjacia karta T-money na MHD.", en: "A T-money card is handy for public transport." } ] },
  IN: { portal: "https://indianvisaonline.gov.in", currency: "INR (₹)", plug: "Typ C/D/M · 230 V", emergency: "112", tips: [
    { sk: "e-Visa vytlačte a majte so sebou aj fotku v predpísanom formáte.", en: "Print the e-Visa and bring a photo in the required format." },
    { sk: "Pite len balenú vodu.", en: "Drink bottled water only." } ] },
  EG: { portal: "https://visa2egypt.gov.eg", currency: "EGP (£)", plug: "Typ C/F · 220 V", emergency: "122 / 123", tips: [
    { sk: "Majte vytlačené vízum aj potvrdenie o ubytovaní.", en: "Carry a printed visa and accommodation confirmation." },
    { sk: "Rešpektujte miestne zvyklosti v obliekaní pri pamiatkach.", en: "Respect local dress customs at sites." } ] },
  VN: { portal: "https://evisa.xuatnhapcanh.gov.vn", currency: "VND (₫)", plug: "Typ A/C/F · 220 V", emergency: "113 / 115", tips: [
    { sk: "e-Visa vytlačte — na hranici ho kontrolujú v papierovej forme.", en: "Print the e-Visa — it's checked on paper at the border." },
    { sk: "Skontrolujte si platný vstupný bod uvedený vo víze.", en: "Check the valid entry point stated on your visa." } ] },
  LK: { portal: "http://www.eta.gov.lk", currency: "LKR (Rs)", plug: "Typ D/G/M · 230 V", emergency: "119 / 1990", tips: [
    { sk: "Pri pamiatkach a chrámoch majte zahalené ramená a kolená.", en: "Cover shoulders and knees at temples." },
    { sk: "Pite balenú vodu a chráňte sa pred slnkom.", en: "Drink bottled water and use sun protection." } ] },
  TR: { portal: "https://www.evisa.gov.tr", currency: "TRY (₺)", plug: "Typ C/F · 230 V", emergency: "112", tips: [
    { sk: "e-Visa vytlačte alebo majte v telefóne pri sebe.", en: "Print or keep the e-Visa on your phone." },
    { sk: "Pas musí platiť aspoň 6 mesiacov po vstupe.", en: "Passport must be valid 6 months beyond entry." } ] },
  ID: { portal: "https://evisa.imigrasi.go.id", currency: "IDR (Rp)", plug: "Typ C/F · 230 V", emergency: "112", tips: [
    { sk: "Na Bali sa platí turistický poplatok — majte potvrdenie.", en: "Bali charges a tourist levy — keep the receipt." },
    { sk: "Pas musí platiť min. 6 mesiacov.", en: "Passport must be valid at least 6 months." } ] },
  TZ: { portal: "https://eservices.immigration.go.tz", currency: "TZS (Sh)", plug: "Typ D/G · 230 V", emergency: "112 / 114", tips: [
    { sk: "Odporúča sa očkovanie a antimalariká — poraďte sa s lekárom.", en: "Vaccinations and antimalarials are advised — consult a doctor." },
    { sk: "Pri vstupe môžu vyžadovať potvrdenie o žltej zimnici.", en: "A yellow fever certificate may be required on entry." } ] },
  CN: { portal: "https://www.visaforchina.cn", currency: "CNY (¥)", plug: "Typ A/C/I · 220 V", emergency: "110 / 120", tips: [
    { sk: "Vízum do Číny sa zvyčajne vybavuje cez vízové centrum — over si aktuálne pravidlá.", en: "China visas usually go via a visa centre — check current rules." },
    { sk: "Mnohé západné aplikácie sú obmedzené — zvážte VPN vopred.", en: "Many Western apps are restricted — consider a VPN in advance." } ] },
  EU: { portal: "https://travel-europe.europa.eu/etias", currency: "EUR (€)", plug: "Typ C/F · 230 V", emergency: "112", tips: [
    { sk: "ETIAS je viazané na pas a platí pre krátkodobé pobyty v Schengene.", en: "ETIAS is linked to your passport for short Schengen stays." },
    { sk: "Jednotné tiesňové číslo v celej EÚ je 112.", en: "112 is the single EU emergency number." } ] },
};

// Spoločný kontrolný zoznam pred cestou.
export const PREDEPARTURE: Loc[] = [
  { sk: "Pas platný počas celej cesty (často min. 6 mesiacov po návrate).", en: "Passport valid for the whole trip (often 6 months beyond return)." },
  { sk: "Schválené cestovné povolenie / vízum — vytlačené alebo v telefóne.", en: "Approved authorization / visa — printed or on your phone." },
  { sk: "Potvrdenie o ubytovaní a spiatočná letenka.", en: "Accommodation confirmation and return ticket." },
  { sk: "Cestovné poistenie a kópie dokladov.", en: "Travel insurance and copies of your documents." },
];
