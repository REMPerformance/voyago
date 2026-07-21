"use client";

import { Star, BadgeCheck, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";

const REVIEWS: { name: string; tag: string; flag: string; date: string; stars: number; sk: string; en: string; reply?: { sk: string; en: string } }[] = [
  { name: "Pavel H.", tag: "ESTA · USA", flag: "🇺🇸", date: "2026-06-18", stars: 5, sk: "Výborné služby. ESTA nám bola udelená na druhý deň, všetko v poriadku.", en: "Excellent service. Our ESTA was granted the next day." },
  { name: "Mária K.", tag: "ETA · UK", flag: "🇬🇧", date: "2026-06-11", stars: 5, sk: "Profesionálny prístup od začiatku do konca. Rýchlo a bez stresu.", en: "Professional from start to finish. Fast and stress-free." },
  { name: "Tomáš B.", tag: "eTA · Kanada", flag: "🇨🇦", date: "2026-06-02", stars: 5, sk: "Skvelá komunikácia a všetko za nás vyriešili. Odporúčam.", en: "Great communication, they solved everything. Recommended.", reply: { sk: "Ďakujeme, Tomáš! Šťastnú cestu do Kanady. — tím Voyago", en: "Thank you, Tomáš! Safe travels to Canada. — the Voyago team" } },
  { name: "Lucia M.", tag: "e-Visa · India", flag: "🇮🇳", date: "2026-05-27", stars: 5, sk: "Bála som sa formulárov, no celé to za mňa vybavili. Super.", en: "I dreaded the forms but they handled it all. Great." },
  { name: "Martin D.", tag: "ETA · Austrália", flag: "🇦🇺", date: "2026-05-19", stars: 4, sk: "Doplnili sme len pár údajov a o zvyšok sa postarali oni.", en: "We filled in a few details and they did the rest." },
  { name: "Zuzana P.", tag: "e-Visa · Egypt", flag: "🇪🇬", date: "2026-05-08", stars: 5, sk: "Rýchle, prehľadné a v slovenčine. Konečne bez stresu z úradov.", en: "Fast, clear and in our language. Finally no red-tape stress." },
  { name: "Peter Š.", tag: "ESTA · USA", flag: "🇺🇸", date: "2026-04-30", stars: 5, sk: "Cenu som vedel vopred, žiadne prekvapenia. Spokojnosť.", en: "I knew the price upfront, no surprises. Very happy." },
  { name: "Jana V.", tag: "NZeTA · N. Zéland", flag: "🇳🇿", date: "2026-04-21", stars: 5, sk: "Pomohli mi aj s tranzitom, o ktorom som nevedela. Ďakujem.", en: "They even helped with transit I didn't know about. Thanks." },
  { name: "Michal R.", tag: "K-ETA · Kórea", flag: "🇰🇷", date: "2026-04-12", stars: 5, sk: "Vybavené do troch dní. Komunikácia na úrovni.", en: "Done within three days. Top-notch communication." },
];

const AVATAR_COLORS = ["#0A1622", "#1d3a5f", "#3d6b8a", "#7a5c2e", "#5a6b3a", "#6b3a4a", "#3a5a6b"];
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
const colorFor = (n: string) => { let s = 0; for (let i = 0; i < n.length; i++) s += n.charCodeAt(i); return AVATAR_COLORS[s % AVATAR_COLORS.length]; };

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="bg-paper-dim/40">
      <div className="container-page py-16 sm:py-24">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
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

            <div className="mt-5 space-y-1.5">
              {[
                [5, 88], [4, 9], [3, 2], [2, 1], [1, 0],
              ].map(([st, pct]) => (
                <div key={st} className="flex items-center gap-2.5 text-xs text-ink-soft">
                  <span className="w-6 shrink-0 font-semibold">{st} ★</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                    <span className="block h-full rounded-full bg-brass" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-8 shrink-0 text-right">{pct} %</span>
                </div>
              ))}
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
          <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-4 sm:[&>*]:mb-5">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="break-inside-avoid rounded-2xl border border-line bg-surface p-6 shadow-card">
                <Quote size={26} className="text-brass/30" />
                <blockquote className="mt-2 text-[0.92rem] leading-relaxed text-ink">“{t({ sk: r.sk, en: r.en })}”</blockquote>
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex gap-0.5 text-brass">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={i < r.stars ? "currentColor" : "none"} className={i < r.stars ? "" : "text-line"} />)}
                  </span>
                  <span className="text-[0.65rem] text-ink-soft/70">{new Date(r.date).toLocaleDateString("sk-SK", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                {r.reply && (
                  <div className="mt-3 rounded-lg border-l-2 border-brass bg-paper/60 px-3 py-2 text-[0.78rem] text-ink-soft">
                    {t(r.reply)}
                  </div>
                )}
                <figcaption className="mt-4 flex items-center gap-3 border-t border-line-soft pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: colorFor(r.name) }}>{initials(r.name)}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="truncate font-semibold text-ink">{r.name}</p>
                      <BadgeCheck size={14} className="shrink-0 text-teal" />
                    </div>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-brass">{r.flag} {r.tag} · {t({ sk: "overený zákazník", en: "verified customer" })}</p>
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
