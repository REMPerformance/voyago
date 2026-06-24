"use client";

// Oficiálny "pečaťový" emblém pre Green Card sekciu — pôsobí dôveryhodne
// a prémiovo, bez napodobňovania reálneho preukazu (čo vyzerá podozrivo).

export function Seal({ size = 200, className = "text-brass-light" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      role="img"
      aria-label="Diversity Visa emblem"
    >
      <defs>
        <path id="seal-ring" d="M100,32 a68,68 0 1,1 -0.1,0" />
      </defs>

      <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      <text fill="currentColor" fontSize="10.5" fontFamily="monospace" letterSpacing="3.5">
        <textPath href="#seal-ring" startOffset="0%">
          ★ DIVERSITY VISA LOTTERY ★ UNITED STATES OF AMERICA
        </textPath>
      </text>

      {/* hviezda v strede */}
      <path
        d="M100,74 L106.5,91 L126.6,91.3 L110.5,103.4 L116.5,122.7 L100,111 L83.5,122.7 L89.5,103.4 L73.4,91.3 L93.5,91.1 Z"
        fill="currentColor"
      />
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill="currentColor"
        fontSize="11"
        fontFamily="monospace"
        letterSpacing="2"
        opacity="0.85"
      >
        DV-1
      </text>
    </svg>
  );
}
