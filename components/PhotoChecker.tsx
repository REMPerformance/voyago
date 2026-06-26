"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, ZoomIn, RotateCcw, Eye, EyeOff, Lock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { DestSpec } from "@/config/photoSpec";
import { FaceGuide } from "@/components/photoFace";

export function PhotoChecker({ spec }: { spec: DestSpec }) {
  const { t } = useLang();
  const [url, setUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [guides, setGuides] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const onFile = (f?: File) => {
    if (!f) return;
    if (url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(f));
    setScale(1); setPos({ x: 0, y: 0 });
  };

  const onDown = (e: React.PointerEvent) => {
    if (!url) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.x) / r.width) * 100;
    const dy = ((e.clientY - drag.current.y) / r.height) * 100;
    drag.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: Math.max(-60, Math.min(60, p.x + dx)), y: Math.max(-60, Math.min(60, p.y + dy)) }));
  };
  const onUp = () => { drag.current = null; };

  // geometria vodítok v pomere rámu (bez deformácie)
  const VH = (100 * spec.frameH) / spec.frameW;
  const headMid = (spec.headPct[0] + spec.headPct[1]) / 2;
  const crownY = VH * 0.07;
  const headH = VH * headMid;
  const gr = headH / 2;
  const gcy = crownY + gr;
  const chinY = crownY + headH;
  const eyeY = crownY + headH * 0.42;

  return (
    <div className="grid gap-6 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7 lg:grid-cols-[260px_1fr] lg:gap-9">
      {/* Náhľad */}
      <div className="mx-auto w-full max-w-[260px]">
        <div
          ref={frameRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          className="relative mx-auto select-none overflow-hidden rounded-lg border-2 border-line bg-[repeating-conic-gradient(#eef1f0_0_25%,#e3e8e6_0_50%)] bg-[length:18px_18px]"
          style={{ aspectRatio: `${spec.frameW} / ${spec.frameH}`, cursor: url ? "grab" : "default", touchAction: "none" }}
        >
          {url ? (
            <img
              src={url}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: `translate(${pos.x}%, ${pos.y}%) scale(${scale})`, transformOrigin: "center" }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-4 text-center">
              <span className="text-xs text-ink-soft">{t({ sk: "Nahrajte fotku a zarovnajte tvár podľa vodítok", en: "Upload a photo and align the face to the guides" })}</span>
            </div>
          )}

          {/* Overlay vodítka */}
          {guides && (
            <svg viewBox={`0 0 100 ${VH}`} className="pointer-events-none absolute inset-0 h-full w-full">
              <FaceGuide cx={50} cy={gcy} r={gr} />
              <line x1="50" y1="0" x2="50" y2={VH} stroke="#C99A4E" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="14" y1={crownY} x2="86" y2={crownY} stroke="#4a7a55" strokeWidth="0.7" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
              <line x1="14" y1={chinY} x2="86" y2={chinY} stroke="#4a7a55" strokeWidth="0.7" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
              <line x1="24" y1={eyeY} x2="76" y2={eyeY} stroke="#C99A4E" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.85" vectorEffect="non-scaling-stroke" />
            </svg>
          )}
        </div>
        {/* legenda */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.68rem] text-ink-soft">
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-green" /> {t({ sk: "temeno / brada", en: "crown / chin" })}</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-brass" /> {t({ sk: "očná línia", en: "eye line" })}</span>
        </div>
      </div>

      {/* Ovládanie */}
      <div className="flex flex-col">
        <h3 className="font-display text-2xl font-bold text-ink">{t({ sk: "Vyskúšajte si svoju fotku", en: "Try your own photo" })}</h3>
        <p className="mt-2 text-sm text-ink-soft">{t({ sk: "Posúvajte a približujte fotku tak, aby temeno hlavy bolo pri hornej línii a brada pri spodnej. Toto je rýchla kontrola — finálnu úpravu spravíme za vás.", en: "Move and zoom the photo so the crown sits at the top line and the chin at the bottom line. This is a quick check — we do the final adjustment for you." })}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <label className="btn-primary inline-flex cursor-pointer items-center gap-2 text-sm">
            <Upload size={15} /> {url ? t({ sk: "Zmeniť fotku", en: "Change photo" }) : t({ sk: "Nahrať fotku", en: "Upload photo" })}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <button onClick={() => setGuides((g) => !g)} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink">
            {guides ? <EyeOff size={15} /> : <Eye size={15} />} {guides ? t({ sk: "Skryť vodítka", en: "Hide guides" }) : t({ sk: "Zobraziť vodítka", en: "Show guides" })}
          </button>
          {url && (
            <button onClick={() => { setScale(1); setPos({ x: 0, y: 0 }); }} className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink">
              <RotateCcw size={15} /> {t({ sk: "Vynulovať", en: "Reset" })}
            </button>
          )}
        </div>

        {url && (
          <div className="mt-5 flex items-center gap-3">
            <ZoomIn size={16} className="shrink-0 text-ink-soft" />
            <input type="range" min={1} max={3} step={0.01} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="h-1.5 w-full max-w-xs accent-brass" />
          </div>
        )}

        <p className="mt-6 inline-flex items-start gap-2 rounded-lg bg-paper/60 px-3 py-2 text-xs text-ink-soft">
          <Lock size={13} className="mt-0.5 shrink-0 text-teal" /> {t({ sk: "Fotka zostáva len v vašom prehliadači — nikam sa nenahráva.", en: "The photo stays in your browser only — nothing is uploaded." })}
        </p>
      </div>
    </div>
  );
}
