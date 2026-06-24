"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  const reviews: { name: string; tag: string; sk: string; en: string }[] = [
    { name: "Pavel H.", tag: "ESTA · USA", sk: "Výborné služby. ESTA nám bola udelená na druhý deň, všetko v poriadku.", en: "Excellent service. Our ESTA was granted the next day." },
    { name: "Mária K.", tag: "ETA · UK", sk: "Profesionálny prístup od začiatku do konca. Rýchlo a bez stresu.", en: "Professional from start to finish. Fast and stress-free." },
    { name: "Tomáš B.", tag: "eTA · Kanada", sk: "Skvelá komunikácia a všetko za nás vyriešili. Odporúčam.", en: "Great communication, they solved everything. Recommended." },
    { name: "Lucia M.", tag: "e-Visa · India", sk: "Bála som sa formulárov, no celé to za mňa vybavili. Super.", en: "I dreaded the forms but they handled it all. Great." },
    { name: "Martin D.", tag: "ETA · Austrália", sk: "Doplnili sme len pár údajov a o zvyšok sa postarali oni.", en: "We filled in a few details and they did the rest." },
    { name: "Zuzana P.", tag: "e-Visa · Egypt", sk: "Rýchle, prehľadné a v slovenčine. Konečne bez stresu z úradov.", en: "Fast, clear and in our language. Finally no red-tape stress." },
    { name: "Peter Š.", tag: "ESTA · USA", sk: "Cenu som vedel vopred, žiadne prekvapenia. Spokojnosť.", en: "I knew the price upfront, no surprises. Very happy." },
    { name: "Jana V.", tag: "NZeTA · N. Zéland", sk: "Pomohli mi aj s tranzitom, o ktorom som nevedela. Ďakujem.", en: "They even helped with transit I didn't know about. Thanks." },
    { name: "Michal R.", tag: "K-ETA · Kórea", sk: "Vybavené do troch dní. Komunikácia na úrovni.", en: "Done within three days. Top-notch communication." },
    { name: "Katarína L.", tag: "e-Visa · Vietnam", sk: "Postrážili dátum vstupu aj zdravotné vyhlásenie. Profíci.", en: "They watched the entry date and health declaration. Pros." },
    { name: "Juraj T.", tag: "eTA · Kanada", sk: "Jednoduché ako nikdy. Cestujem cez nich opakovane.", en: "Easier than ever. I use them again and again." },
    { name: "Eva N.", tag: "e-Visa · Srí Lanka", sk: "Arrival card aj vízum vyriešili naraz. Bezstarostná dovolenka.", en: "Sorted the arrival card and visa together. Worry-free trip." },
    { name: "Róbert G.", tag: "ETA · UK", sk: "Odpovedali rýchlo aj cez víkend. Veľmi ústretoví.", en: "Quick replies even on the weekend. Very helpful." },
    { name: "Simona F.", tag: "e-Visa · Indonézia", sk: "Žiadne čakanie v rade na letisku. Presne ako sľúbili.", en: "No airport queue, exactly as promised." },
    { name: "Andrej Č.", tag: "ESTA · USA", sk: "Celá rodina na jednu objednávku. Pohodlné a rýchle.", en: "Whole family in one order. Convenient and fast." },
  ];

  return (
    <section className="bg-paper-dim/50">
      <div className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t({ sk: "Referencie", en: "References" })}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t({ sk: "Spokojní klienti", en: "Happy clients" })}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="prev"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="next"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex w-[19rem] shrink-0 snap-start flex-col rounded-xl2 border border-line bg-surface p-7 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-brass">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={22} className="text-line" fill="currentColor" />
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">{t({ sk: r.sk, en: r.en })}</blockquote>
              <figcaption className="mt-5 border-t border-line-soft pt-4">
                <p className="font-display font-bold text-ink">{r.name}</p>
                <p className="font-mono text-[0.62rem] uppercase tracking-wider text-brass">{r.tag}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
