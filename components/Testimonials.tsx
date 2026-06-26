"use client";

import { Star, BadgeCheck, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

const REVIEWS: { name: string; tag: string; sk: string; en: string }[] = [
  { name: "Pavel H.", tag: "ESTA · USA", sk: "Výborné služby. ESTA nám bola udelená na druhý deň, všetko v poriadku.", en: "Excellent service. Our ESTA was granted the next day." },
  { name: "Mária K.", tag: "ETA · UK", sk: "Profesionálny prístup od začiatku do konca. Rýchlo a bez stresu.", en: "Professional from start to finish. Fast and stress-free." },
  { name: "Tomáš B.", tag: "eTA · Kanada", sk: "Skvelá komunikácia a všetko za nás vyriešili. Odporúčam.", en: "Great communication, they solved everything. Recommended." },
  { name: "Lucia M.", tag: "e-Visa · India", sk: "Bála som sa formulárov, no celé to za mňa vybavili. Super.", en: "I dreaded the forms but they handled it all. Great." },
  { name: "Martin D.", tag: "ETA · Austrália", sk: "Doplnili sme len pár údajov a o zvyšok sa postarali oni.", en: "We filled in a few details and they did the rest." },
  { name: "Zuzana P.", tag: "e-Visa · Egypt", sk: "Rýchle, prehľadné a v slovenčine. Konečne bez stresu z úradov.", en: "Fast, clear and in our language. Finally no red-tape stress." },
  { name: "Peter Š.", tag: "ESTA · USA", sk: "Cenu som vedel vopred, žiadne prekvapenia. Spokojnosť.", en: "I knew the price upfront, no surprises. Very happy." },
  { name: "Jana V.", tag: "NZeTA · N. Zéland", sk: "Pomohli mi aj s tranzitom, o ktorom som nevedela. Ďakujem.", en: "They even helped with transit I didn't know about. Thanks." },
  { name: "Michal R.", tag: "K-ETA · Kórea", sk: "Vybavené do troch dní. Komunikácia na úrovni.", en: "Done within three days. Top-notch communication." },
];

const AVATAR_COLORS = ["#0A1622", "#1d3a5f", "#3d6b8a", "#7a5c2e", "#5a6b3a", "#6b3a4a", "#3a5a6b"];
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
const colorFor = (n: string) => { let s = 0; for (let i = 0; i < n.length; i++) s += n.charCodeAt(i); return AVATAR_COLORS[s % AVATAR_COLORS.length]; };

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="bg-paper-dim/40">
      <div className="container-page py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Ľavý súhrn */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">{t({ sk: "Referencie", en: "Reviews" })}</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-[2.6rem]">{t({ sk: "Tisíckam cestovateľov sme ušetrili starosti", en: "We've saved thousands of travellers the hassle" })}</h2>

            <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 shadow-card">
              <span className="font-display text-4xl font-extrabold text-ink">4,9</span>
              <div>
                <div className="flex gap-0.5 text-brass">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-1 text-xs text-ink-soft">{t({ sk: "z 5 · 1 200+ overených hodnotení", en: "out of 5 · 1,200+ verified reviews" })}</p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { v: "1 200+", l: { sk: "hodnotení", en: "reviews" } },
                { v: "98 %", l: { sk: "úspešnosť", en: "success rate" } },
                { v: "<24 h", l: { sk: "odozva", en: "response" } },
              ].map((s) => (
                <div key={s.v}>
                  <p className="font-display text-2xl font-extrabold text-ink">{s.v}</p>
                  <p className="text-xs text-ink-soft">{t(s.l)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pravý zoznam recenzií */}
          <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="break-inside-avoid rounded-2xl border border-line bg-surface p-6 shadow-card">
                <Quote size={26} className="text-brass/30" />
                <blockquote className="mt-2 text-[0.92rem] leading-relaxed text-ink">“{t({ sk: r.sk, en: r.en })}”</blockquote>
                <div className="mt-3 flex gap-0.5 text-brass">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-line-soft pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: colorFor(r.name) }}>{initials(r.name)}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="truncate font-semibold text-ink">{r.name}</p>
                      <BadgeCheck size={14} className="shrink-0 text-teal" />
                    </div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-brass">{r.tag} · {t({ sk: "overený", en: "verified" })}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
