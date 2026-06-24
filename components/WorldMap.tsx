"use client";

// Štylizovaná mapa sveta s animovanými šípkami zo Slovenska. Väčšia a ostrejšia.

const ORIGIN = { x: 512, y: 150 };

const DEST = [
  { x: 205, y: 168, label: "USA" },
  { x: 198, y: 110, label: "KANADA" },
  { x: 470, y: 126, label: "UK" },
  { x: 318, y: 322, label: "BRAZÍLIA" },
  { x: 548, y: 214, label: "EGYPT" },
  { x: 690, y: 198, label: "INDIA" },
  { x: 836, y: 350, label: "AUSTRÁLIA" },
];

const CONTINENTS = [
  "M120,95 C160,80 230,82 250,110 C275,145 250,185 215,205 C185,222 150,215 135,190 C120,165 95,120 120,95 Z",
  "M300,250 C330,245 352,272 346,302 C340,342 320,382 300,378 C285,375 280,340 285,310 C288,285 280,255 300,250 Z",
  "M468,110 C500,102 538,112 542,132 C546,154 520,172 494,168 C474,165 456,150 460,132 C462,122 458,114 468,110 Z",
  "M500,184 C546,179 592,200 586,246 C580,296 545,332 515,320 C492,311 488,274 492,244 C495,219 480,191 500,184 Z",
  "M545,92 C642,78 762,90 822,120 C852,135 842,176 800,196 C740,222 650,216 600,200 C565,190 538,160 544,128 C546,112 538,98 545,92 Z",
  "M800,322 C836,315 876,328 879,350 C882,372 856,386 828,382 C808,379 792,360 796,342 C798,332 792,326 800,322 Z",
];

function arc(d: { x: number; y: number }) {
  const cx = (ORIGIN.x + d.x) / 2;
  const cy = Math.min(ORIGIN.y, d.y) - 78;
  return `M${ORIGIN.x},${ORIGIN.y} Q${cx},${cy} ${d.x},${d.y}`;
}

export function WorldMap() {
  return (
    <svg viewBox="0 0 980 420" className="w-full" role="img" aria-label="Svetová mapa s trasami zo Slovenska">
      <defs>
        <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* kontinenty */}
      <g className="text-cream" fill="currentColor" opacity="0.1">
        {CONTINENTS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* žiara šípok */}
      <g className="text-brass-light" stroke="currentColor" fill="none" strokeWidth="3.5" filter="url(#arc-glow)" opacity="0.45">
        {DEST.map((d, i) => (
          <path key={i} d={arc(d)} className="world-arc" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </g>
      {/* šípky */}
      <g className="text-brass-light" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
        {DEST.map((d, i) => (
          <path key={i} d={arc(d)} className="world-arc" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </g>

      {/* cieľové body + štítky */}
      <g>
        {DEST.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="4.5" className="fill-brass-light" />
            <text
              x={d.x}
              y={d.y - 12}
              textAnchor="middle"
              className="fill-cream"
              fontSize="14"
              fontWeight="600"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              letterSpacing="0.5"
            >
              {d.label}
            </text>
          </g>
        ))}
      </g>

      {/* Slovensko */}
      <g>
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="8" className="fill-brass-light world-ping" />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="6" className="fill-brass" />
        <text
          x={ORIGIN.x}
          y={ORIGIN.y + 24}
          textAnchor="middle"
          className="fill-brass-light"
          fontSize="15"
          fontWeight="700"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          letterSpacing="1"
        >
          SLOVENSKO
        </text>
      </g>
    </svg>
  );
}
