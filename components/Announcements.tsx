"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Megaphone, ArrowRight } from "lucide-react";
import { fetchAnnouncements, isActive, type Announcement, type Tone } from "@/lib/announcements";

const KEY = "voyago.ann.dismissed";
const getDismissed = (): string[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const addDismissed = (id: string) => {
  try {
    const d = getDismissed();
    if (!d.includes(id)) { d.push(id); localStorage.setItem(KEY, JSON.stringify(d)); }
  } catch { /* ignore */ }
};

const BAR_TONE: Record<Tone, string> = {
  info: "bg-navy text-cream",
  warning: "bg-brass text-navy",
  success: "bg-green text-cream",
  promo: "secure-bg text-cream",
};
const linkTone: Record<Tone, string> = {
  info: "text-brass-light", warning: "text-navy underline", success: "text-cream underline", promo: "text-brass-light",
};

export function Announcements() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [closedModal, setClosedModal] = useState(false);

  useEffect(() => {
    setDismissed(getDismissed());
    fetchAnnouncements()
      .then((all) => setItems(all.filter((a) => isActive(a))))
      .catch(() => {});
  }, []);

  const visible = (a: Announcement) => !a.dismissible || !dismissed.includes(a.id);
  const bar = items.find((a) => a.placement === "bar" && visible(a));
  const popup = items.find((a) => a.placement === "popup" && visible(a));

  const dismiss = (id: string) => { addDismissed(id); setDismissed((d) => [...d, id]); };

  return (
    <>
      {bar && (() => {
        const custom = bar.bg_color || bar.text_color;
        const weight = bar.font_weight === "bold" ? "font-bold" : bar.font_weight === "thin" ? "font-light" : "font-normal";
        const anim =
          bar.animation === "pulse" ? "animate-pulse" :
          bar.animation === "slide" ? "animate-fade-up" : "";
        const marquee = bar.animation === "marquee";
        const dateStr = bar.show_date ? new Date(bar.created_at || Date.now()).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" }) : "";

        const dateEl = bar.show_date ? <time className="shrink-0 whitespace-nowrap text-xs opacity-70">{dateStr}</time> : null;

        const content = (
          <span className={`inline-flex items-center gap-2 ${marquee ? "whitespace-nowrap" : ""}`}>
            <span className={weight}>{bar.title}</span>
            {bar.message ? <span className="opacity-90">{marquee ? " · " : " — "}{bar.message}</span> : null}
            {bar.link_url && (
              <Link href={bar.link_url} className={`ml-2 inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline ${custom ? "" : linkTone[bar.tone]}`}>
                {bar.link_label || "Viac"} <ArrowRight size={13} />
              </Link>
            )}
          </span>
        );

        return (
          <div
            className={`relative ${custom ? "" : BAR_TONE[bar.tone]} ${bar.sticky ? "sticky top-0 z-[110]" : ""} ${bar.hover_glow ? "transition-shadow hover:shadow-[inset_0_0_40px_rgba(201,154,78,0.25)]" : ""} ${anim}`}
            style={custom ? { backgroundColor: bar.bg_color || undefined, color: bar.text_color || undefined } : undefined}
          >
            <div className={`container-page flex items-center gap-3 py-2.5 text-sm ${bar.italic ? "italic" : ""}`}>
              {!marquee && <Megaphone size={15} className="hidden shrink-0 opacity-80 sm:block" />}
              {bar.date_position === "left" && dateEl}

              {marquee ? (
                <div className="flex-1 overflow-hidden">
                  <div className="ann-marquee inline-block" style={{ animationDuration: `${bar.anim_speed || 18}s` }}>
                    {content}
                    <span className="mx-8 opacity-40">•</span>
                    {content}
                  </div>
                </div>
              ) : (
                <p className={`flex-1 leading-snug ${weight}`}>{content}</p>
              )}

              {bar.date_position !== "left" && dateEl}
              {bar.dismissible && (
                <button onClick={() => dismiss(bar.id)} aria-label="Zavrieť" className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {popup && !closedModal && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm"
          onClick={() => { if (popup.dismissible) dismiss(popup.id); setClosedModal(true); }}
        >
          <div
            className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-pass"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-1.5 w-full ${popup.tone === "warning" ? "bg-brass" : popup.tone === "success" ? "bg-green" : popup.tone === "info" ? "bg-teal" : "bg-brass"}`} />
            <button
              onClick={() => { if (popup.dismissible) dismiss(popup.id); setClosedModal(true); }}
              aria-label="Zavrieť"
              className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:bg-paper"
            >
              <X size={15} />
            </button>
            <div className="p-7">
              <h3 className="pr-8 font-display text-xl font-bold text-ink">{popup.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{popup.message}</p>
              {popup.link_url && (
                <Link
                  href={popup.link_url}
                  onClick={() => { if (popup.dismissible) dismiss(popup.id); setClosedModal(true); }}
                  className="btn-primary mt-6 inline-flex"
                >
                  {popup.link_label || "Zistiť viac"} <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
