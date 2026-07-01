"use client";

import { EUROPE, EUROPE_VIEWBOX } from "@/config/europeMap";

// Statická 2D mapa Európy. Nedá sa posúvať; pokryté krajiny sú klikateľné.
export function EuropeMap({
  selected, onSelect, className = "",
}: { selected?: string | null; onSelect?: (iso: string) => void; className?: string }) {
  return (
    <svg viewBox={EUROPE_VIEWBOX} className={className} role="img" aria-label="Map of Europe — 30 ETIAS countries">
      {/* nepokryté krajiny (kontext) */}
      {EUROPE.filter((c) => !c.covered).map((c, i) => (
        <path key={`bg-${c.iso || i}`} d={c.d} fill="#243646" stroke="#0e1b27" strokeWidth={0.7} />
      ))}
      {/* pokryté krajiny */}
      {EUROPE.filter((c) => c.covered).map((c) => {
        const isSel = selected === c.iso;
        return (
          <path
            key={c.iso}
            d={c.d}
            onClick={() => onSelect?.(c.iso)}
            className="cursor-pointer transition-[fill,stroke] duration-150 hover:fill-[#E7C48A]"
            fill={isSel ? "#E7C48A" : "#C99A4E"}
            stroke={isSel ? "#FFFFFF" : "#0A1622"}
            strokeWidth={isSel ? 2 : 0.8}
            style={isSel ? { filter: "drop-shadow(0 0 7px rgba(231,196,138,0.85))" } : undefined}
          >
            <title>{c.name}</title>
          </path>
        );
      })}
    </svg>
  );
}
