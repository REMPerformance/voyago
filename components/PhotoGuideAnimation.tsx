"use client";

import { useEffect, useState, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getPhotoSpec, type DestSpec } from "@/config/photoSpec";
import { Face } from "@/components/photoFace";

type Loc = { sk: string; en: string };

const STEP_MS = 4000;
const BRASS = "#C99A4E";

const STEP_IDS = ["bg", "frame", "front", "neutral", "hat", "glasses", "light", "done"] as const;
const TITLES: Record<string, Loc> = {
  bg: { sk: "Svetlé pozadie", en: "Light background" },
  frame: { sk: "Rámovanie a rozmery", en: "Framing & dimensions" },
  front: { sk: "Pohľad rovno", en: "Face the camera" },
  neutral: { sk: "Neutrálny výraz", en: "Neutral expression" },
  hat: { sk: "Žiadna pokrývka hlavy", en: "No head covering" },
  glasses: { sk: "Bez okuliarov", en: "No glasses" },
  light: { sk: "Rovnomerné osvetlenie", en: "Even lighting" },
  done: { sk: "Hotovo — správna fotka", en: "Done — a valid photo" },
};

export function PhotoGuideAnimation({ spec, defaultDv = false }: { spec?: DestSpec; defaultDv?: boolean }) {
  const { t } = useLang();
  const sp = spec || getPhotoSpec();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dv, setDv] = useState(defaultDv);
  const s = STEP_IDS[step];

  const next = useCallback(() => setStep((p) => (p + 1) % STEP_IDS.length), []);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(next, STEP_MS);
    return () => clearTimeout(id);
  }, [step, playing, dv, next]);

  const show = (id: string) => (s === id ? 1 : 0);

  const desc = (): Loc => {
    switch (s) {
      case "bg": return sp.bg;
      case "frame": return { sk: `${sp.headLabel.sk} · rozmer ${sp.sizeLabel.sk}.`, en: `${sp.headLabel.en} · size ${sp.sizeLabel.en}.` };
      case "front": return { sk: "Pozeraj priamo do objektívu, hlava rovno, oči v jednej vodorovnej línii.", en: "Look straight at the lens, head level, eyes on one horizontal line." };
      case "neutral": return sp.expression;
      case "hat": return { sk: "Bez čiapky, klobúka či šatky (okrem náboženských dôvodov — tvár musí byť voľná).", en: "No cap, hat or scarf (except for religious reasons — the face must stay uncovered)." };
      case "glasses": return dv && sp.glassesDv ? sp.glassesDv : sp.glasses;
      case "light": return { sk: "Nasvieť tvár rovnomerne. Žiadne tiene na tvári ani za hlavou, bez odleskov.", en: "Light the face evenly. No shadows on the face or behind the head, no glare." };
      default: return { sk: `Takto vyzerá fotka pre ${sp.label.sk}, ktorá prejde. Pri objednávke ju ešte raz skontrolujeme.`, en: `This is a valid photo for ${sp.label.en}. We check it again with your order.` };
    }
  };

  // geometria rámu
  const LP = 40, TP = 34, FH = 200;
  const FW = Math.round((FH * sp.frameW) / sp.frameH);
  const FX = LP, FY = TP;
  const headFrac = (sp.headPct[0] + sp.headPct[1]) / 2;
  const r = (FH * headFrac) / 2;
  const cx = FX + FW / 2;
  const crown = FY + FH * 0.06;
  const cy = crown + r;
  const chin = cy + r;
  const eyeY = cy - r * 0.04;

  const vTicks = Math.floor(sp.frameH / sp.tick);
  const hTicks = Math.floor(sp.frameW / sp.tick);
  const pctLabel = `${Math.round(sp.headPct[0] * 100)}–${Math.round(sp.headPct[1] * 100)}%`;

  return (
    <div className="grid gap-8 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7 lg:grid-cols-[380px_1fr] lg:gap-10">
      {/* Scéna */}
      <div className="mx-auto w-full max-w-[380px]">
        <svg viewBox="0 0 300 250" className="h-auto w-full" role="img" aria-label={t(TITLES[s])}>
          <defs>
            <radialGradient id="pg-shadow" cx="32%" cy="38%" r="75%">
              <stop offset="45%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
            </radialGradient>
            <clipPath id="pg-clip"><rect x={FX} y={FY} width={FW} height={FH} rx="6" /></clipPath>
          </defs>

          {/* PRAVÍTKA */}
          <g stroke={BRASS} strokeWidth="1" opacity="0.85">
            <line x1={FX - 7} y1={FY} x2={FX - 7} y2={FY + FH} />
            {Array.from({ length: vTicks + 1 }).map((_, i) => {
              const y = FY + (FH * (i * sp.tick)) / sp.frameH;
              return <line key={`v${i}`} x1={FX - 7} y1={y} x2={FX - 3} y2={y} />;
            })}
            <text x={FX - 18} y={FY + FH / 2} fontSize="8.5" fill={BRASS} stroke="none" textAnchor="middle" transform={`rotate(-90 ${FX - 18} ${FY + FH / 2})`}>{sp.frameH} {sp.unit}</text>
            <line x1={FX} y1={FY - 7} x2={FX + FW} y2={FY - 7} />
            {Array.from({ length: hTicks + 1 }).map((_, i) => {
              const x = FX + (FW * (i * sp.tick)) / sp.frameW;
              return <line key={`h${i}`} x1={x} y1={FY - 7} x2={x} y2={FY - 3} />;
            })}
            <text x={FX + FW / 2} y={FY - 13} fontSize="8.5" fill={BRASS} stroke="none" textAnchor="middle">{sp.frameW} {sp.unit}</text>
          </g>

          {/* RÁM + portrét */}
          <g clipPath="url(#pg-clip)">
            <rect x={FX} y={FY} width={FW} height={FH} fill="#ffffff" />
            <ellipse cx={cx + r * 0.42} cy={cy + 4} rx={r * 1.15} ry={r * 1.5} fill="#9aa6a1" className="transition-opacity duration-700" style={{ opacity: s === "light" ? 0.42 : 0 }} />
            <Face cx={cx} cy={cy} r={r} glasses={s === "glasses"} hat={s === "hat"} shadow={s === "light"} />
          </g>

          {/* rám */}
          <rect x={FX} y={FY} width={FW} height={FH} rx="6" fill="none" stroke="#d7dedb" strokeWidth="2" />

          {/* ANOTÁCIE */}
          {/* bg swatch */}
          <g className="transition-opacity duration-500" style={{ opacity: show("bg") }}>
            <rect x={FX + FW + 12} y={FY + 8} width="20" height="20" rx="4" fill="#ffffff" stroke="#4a7a55" strokeWidth="2" />
            <path d={`M${FX + FW + 11},${FY + 18} L${FX + FW + 2},${FY + 18}`} stroke="#4a7a55" strokeWidth="2" />
          </g>
          {/* frame: bracket + os */}
          <g className="transition-opacity duration-500" style={{ opacity: show("frame") }} stroke={BRASS} strokeWidth="1.4" fill={BRASS}>
            <line x1={cx} y1={FY} x2={cx} y2={FY + FH} strokeDasharray="3 4" opacity="0.55" />
            <line x1={FX + FW + 8} y1={crown} x2={FX + FW + 8} y2={chin} />
            <line x1={FX + FW + 5} y1={crown} x2={FX + FW + 11} y2={crown} />
            <line x1={FX + FW + 5} y1={chin} x2={FX + FW + 11} y2={chin} />
            <text x={FX + FW + 14} y={(crown + chin) / 2} fontSize="8.5" stroke="none" transform={`rotate(-90 ${FX + FW + 14} ${(crown + chin) / 2})`} textAnchor="middle">{pctLabel}</text>
          </g>
          {/* front: očná línia */}
          <g className="transition-opacity duration-500" style={{ opacity: show("front") }} stroke={BRASS} strokeWidth="1.4">
            <line x1={FX} y1={eyeY} x2={FX + FW} y2={eyeY} strokeDasharray="3 4" />
            <line x1={cx} y1={FY} x2={cx} y2={FY + FH} strokeDasharray="3 4" opacity="0.5" />
          </g>
          {/* neutral: prečiarknutý úsmev */}
          <g className="transition-opacity duration-500" style={{ opacity: show("neutral") }}>
            <path d={`M${cx - r * 0.3},${cy + r * 0.4} q${r * 0.3},${r * 0.34} ${r * 0.6},0`} fill="none" stroke="#c2603f" strokeWidth="2" />
            <line x1={cx - r * 0.45} y1={cy + r * 0.18} x2={cx + r * 0.45} y2={cy + r * 0.66} stroke="#c2603f" strokeWidth="2" />
          </g>
          {/* zákazový krúžok */}
          <g className="transition-opacity duration-500" style={{ opacity: s === "hat" || s === "glasses" ? 1 : 0 }}>
            <circle cx={FX + FW + 20} cy={s === "hat" ? crown : eyeY} r="12" fill="none" stroke="#c2603f" strokeWidth="2.4" />
            <line x1={FX + FW + 12} y1={(s === "hat" ? crown : eyeY) - 8} x2={FX + FW + 28} y2={(s === "hat" ? crown : eyeY) + 8} stroke="#c2603f" strokeWidth="2.4" />
          </g>
          {/* done: fajka */}
          <g className="transition-opacity duration-500" style={{ opacity: show("done") }}>
            <circle cx={FX + FW - 16} cy={FY + FH - 16} r="15" fill="#4a7a55" />
            <path d={`M${FX + FW - 23},${FY + FH - 16} l5,5 l9,-10`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>

      {/* Text + ovládanie */}
      <div className="flex flex-col">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-brass/12 px-2 py-1 text-xs font-semibold text-brass">{t(sp.label)}</span>
          {sp.allowDv && (
            <div className="inline-flex rounded-lg border border-line bg-paper/50 p-0.5 text-xs">
              <button onClick={() => setDv(false)} className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${!dv ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}>{t({ sk: "Bežná", en: "Standard" })}</button>
              <button onClick={() => setDv(true)} className={`rounded-md px-2.5 py-1 font-semibold transition-colors ${dv ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}>{t({ sk: "DV lotéria", en: "DV lottery" })}</button>
            </div>
          )}
        </div>

        <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-wider text-brass">{t({ sk: "Krok", en: "Step" })} {step + 1}/{STEP_IDS.length}</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-ink">{t(TITLES[s])}</h3>
        <p className="mt-2 min-h-[3.5rem] leading-relaxed text-ink-soft">{t(desc())}</p>

        {/* bodky krokov */}
        <div className="mt-5 flex items-center gap-2">
          {STEP_IDS.map((id, i) => (
            <button key={id} onClick={() => setStep(i)} aria-label={t(TITLES[id])} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-brass" : "w-2 bg-line hover:bg-ink/30"}`} />
          ))}
        </div>

        {/* ovládanie */}
        <div className="mt-5 flex items-center gap-2">
          <button onClick={() => setPlaying((p) => !p)} className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-paper transition-colors hover:bg-navy-soft" aria-label={playing ? "Pauza" : "Prehrať"}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
          <button onClick={() => setStep((p) => (p - 1 + STEP_IDS.length) % STEP_IDS.length)} className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:text-ink" aria-label="Späť"><ChevronLeft size={18} /></button>
          <button onClick={next} className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-soft transition-colors hover:text-ink" aria-label="Ďalej"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
