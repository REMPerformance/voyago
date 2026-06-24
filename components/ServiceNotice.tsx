"use client";

import { Info } from "lucide-react";
import { useLang } from "@/lib/i18n";

// Krátke upozornenie: súkromný sprostredkovateľ + transparentnosť ceny.
export function ServiceNotice({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border border-teal/30 bg-teal/[0.05] px-4 py-3 ${className}`}>
      <Info size={16} className="mt-0.5 shrink-0 text-teal" />
      <p className="text-xs leading-relaxed text-ink-soft">
        {t({
          sk: "Voyago je súkromná platená služba — nie sme štátny orgán. Cena zahŕňa štátny poplatok aj poplatok za spracovanie a kontrolu vašej žiadosti. Podať žiadosť si môžete aj sami na oficiálnom portáli, kde platíte len štátny poplatok.",
          en: "Voyago is a private paid service — we are not a government body. The price includes the government fee plus our handling and review fee. You can also apply yourself on the official portal, paying only the government fee.",
        })}
      </p>
    </div>
  );
}
