"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useLang } from "@/lib/i18n";

const KEY = "voyago.cookies";

export function CookieBar() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (choice: "all" | "essential") => {
    try {
      window.localStorage.setItem(KEY, choice);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5">
      <div className="container-page">
        <div className="flex flex-col gap-4 rounded-xl2 border border-line bg-surface/95 p-5 shadow-lift backdrop-blur-md sm:flex-row sm:items-center sm:p-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-brass">
            <Cookie size={22} />
          </span>
          <div className="flex-1">
            <p className="font-display text-base font-bold text-ink">
              {t({ sk: "Súbory cookie", en: "Cookies" })}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {t({
                sk: "Používame cookies na fungovanie webu a zlepšovanie služieb. Kliknutím na „Prijať všetko“ súhlasíte so všetkými. Súhlas môžete kedykoľvek odmietnuť.",
                en: "We use cookies to run the site and improve our services. By clicking “Accept all” you agree to all of them. You can decline at any time.",
              })}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button onClick={() => decide("essential")} className="btn-ghost">
              {t({ sk: "Odmietnuť", en: "Decline" })}
            </button>
            <button onClick={() => decide("all")} className="btn-primary">
              {t({ sk: "Prijať všetko", en: "Accept all" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
