"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HERO_ATLAS, type HeroCity } from "@/config/heroAtlas";
import { HeroIcon } from "@/components/heroIcons";

// Pozície 3 obrovských siluet (vľavo/stred), v štýle jemnej vlajky.
const ICON_POS: CSSProperties[] = [
  { height: "96%", left: "-5%", top: "50%", transform: "translateY(-50%)", opacity: 0.08 },
  { height: "56%", left: "31%", top: "-7%", opacity: 0.05 },
  { height: "62%", left: "15%", bottom: "-13%", opacity: 0.055 },
];

type Props = {
  cc: string;          // kód krajiny pre mapu/atlas (napr. "US", "GB")
  flagCc?: string;     // kód pre vlajku (default = cc.toLowerCase())
  titleMain: string;
  titleAccent: string;
  subtitle: string;
  iconNames?: string[]; // typické ikony krajiny (biele líniové)
};

export function CountryHero({ cc, flagCc, titleMain, titleAccent, subtitle, iconNames }: Props) {
  const atlas = HERO_ATLAS[cc];
  const [hover, setHover] = useState<HeroCity | null>(null);
  const [, tick] = useState(0);
  const flag = (flagCc ?? cc.toLowerCase());
  const mounted = useRef(false);

  // živý čas v tooltipe – preblikne každú sekundu len keď je niečo zvýraznené
  useEffect(() => {
    if (!hover) return;
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [hover]);
  useEffect(() => { mounted.current = true; }, []);

  const timeFor = (tz: string) => {
    try {
      return new Intl.DateTimeFormat("sk-SK", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());
    } catch { return ""; }
  };

  if (!atlas) return null;

  return (
    <div
      className="relative mt-5 w-full overflow-hidden rounded-3xl"
      style={{
        minHeight: "clamp(300px, 38vw, 480px)",
        background: "radial-gradient(125% 150% at 80% -15%, #1d3052 0%, #14253f 46%, #0d1a2e 100%)",
        boxShadow: "0 30px 70px -30px rgba(11,20,38,.55), 0 2px 0 rgba(255,255,255,.04) inset",
      }}
    >
      <style>{`
        @keyframes chPulse{0%{transform:scale(1);opacity:.55}70%{transform:scale(2.6);opacity:0}100%{transform:scale(2.6);opacity:0}}
        .ch-glow{transform-box:fill-box;transform-origin:center;animation:chPulse 3.2s ease-out infinite}
      `}</style>

      {/* Vlajka vpravo – jemná, s ľavým prelínaním */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[42%] overflow-hidden"
        style={{
          opacity: 0.34,
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://flagcdn.com/${flag}.svg`} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Obrovské biele siluety krajiny – jemné, v štýle vlajky (vľavo/stred) */}
      {iconNames && iconNames.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden text-cream">
          {iconNames.slice(0, 3).map((n, i) => (
            <span key={n} className="absolute block" style={ICON_POS[i]}>
              <HeroIcon name={n} className="h-full w-auto" />
            </span>
          ))}
        </div>
      )}

      {/* Mapa s mestami */}
      <svg className="absolute inset-0 z-[2] block h-full w-full" viewBox="0 0 1280 560" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <path d={atlas.fill} fill="rgba(255,255,255,0.06)" stroke={atlas.exterior ? "none" : "rgba(214,230,255,0.9)"} strokeWidth={1.5} strokeLinejoin="round" />
        {atlas.interior && <path d={atlas.interior} fill="none" stroke="rgba(178,202,238,0.5)" strokeWidth={1} strokeLinejoin="round" />}
        {atlas.exterior && <path d={atlas.exterior} fill="none" stroke="rgba(214,230,255,0.9)" strokeWidth={1.7} strokeLinejoin="round" />}
        {atlas.cities.map((c, i) => (
          <g key={c.name} transform={`translate(${c.x},${c.y})`} style={{ cursor: "pointer" }}
             onMouseEnter={() => setHover(c)} onMouseLeave={() => setHover(null)}>
            <circle className="ch-glow" r={4} fill="#d8a85b" style={{ animationDelay: `${(i % 5) * 0.5}s` }} />
            <circle r={hover?.name === c.name ? 4.8 : 3} fill="#f0c279" stroke="rgba(255,236,205,.9)" strokeWidth={1.1} style={{ transition: "r .14s ease" }} />
            <circle r={16} fill="transparent" />
          </g>
        ))}
        {/* tooltip – názov + živý lokálny čas */}
        {hover && (
          <foreignObject x={hover.x - 90} y={hover.y - 70} width={180} height={56} style={{ overflow: "visible", pointerEvents: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ padding: "7px 13px", borderRadius: 9, background: "rgba(15,27,47,.96)", border: "1px solid rgba(216,168,91,.5)", textAlign: "center", whiteSpace: "nowrap", boxShadow: "0 10px 26px -10px rgba(0,0,0,.75)" }}>
                <div style={{ fontWeight: 600, color: "#f3f6fa", fontSize: 13 }}>{hover.name}</div>
                <div style={{ marginTop: 2, color: "#e6b264", fontWeight: 600, fontVariantNumeric: "tabular-nums", letterSpacing: ".04em", fontSize: 13 }}>{timeFor(hover.tz)}</div>
              </div>
            </div>
          </foreignObject>
        )}
      </svg>

      {/* Závoje pre čitateľnosť textu – nesmú brať kurzor, inak nefunguje hover na mestá */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]" style={{ background: "linear-gradient(100deg, rgba(9,17,31,.92) 0%, rgba(11,21,38,.72) 20%, rgba(13,24,43,.22) 40%, rgba(13,24,43,.02) 62%, rgba(13,24,43,0) 78%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]" style={{ background: "radial-gradient(150% 130% at 48% 125%, rgba(9,16,30,.4) 0%, rgba(9,16,30,0) 50%)" }} />

      {/* Titul vľavo hore */}
      <div className="pointer-events-none relative z-[4] max-w-[560px] px-8 pt-12 sm:px-14 sm:pt-16" style={{ textShadow: "0 2px 26px rgba(7,13,24,.75), 0 1px 4px rgba(7,13,24,.55)" }}>
        <h1 className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-cream" style={{ fontSize: "clamp(3rem,8vw,5.6rem)" }}>
          <span className="block">{titleMain}</span>
          <span className="block text-brass">{titleAccent}</span>
        </h1>
      </div>

      {/* Popis úplne dole */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[4] max-w-[460px] px-8 pb-7 sm:px-14 sm:pb-9" style={{ textShadow: "0 2px 22px rgba(7,13,24,.8), 0 1px 4px rgba(7,13,24,.6)" }}>
        <p className="text-[clamp(0.95rem,1.3vw,1.15rem)] leading-relaxed text-[#b6c3d4]" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{subtitle}</p>
      </div>
    </div>
  );
}
