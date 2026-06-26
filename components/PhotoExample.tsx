"use client";

import { Check, X } from "lucide-react";
import type { BadVariant } from "@/config/photoSpec";
import { Face } from "@/components/photoFace";

type Variant = "good" | BadVariant;

export function PhotoExample({ variant, label }: { variant: Variant; label?: string }) {
  const good = variant === "good";
  const border = good ? "#4a7a55" : "#c2603f";

  const big = variant === "tooClose";
  const r = big ? 35 : 25;
  const cy = big ? 56 : 46;
  const cx = 50;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[150px]">
        <svg viewBox="0 0 100 125" className="block w-full rounded-lg" style={{ border: `3px solid ${border}` }} role="img" aria-label={label || variant}>
          <defs>
            <pattern id={`bp-${variant}`} width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="13" height="13" fill="#dfe6e9" />
              <rect width="6.5" height="13" fill="#c6d0cb" />
            </pattern>
            <clipPath id={`cl-${variant}`}><rect x="0" y="0" width="100" height="125" rx="6" /></clipPath>
          </defs>
          <g clipPath={`url(#cl-${variant})`}>
            <rect x="0" y="0" width="100" height="125" fill={variant === "busy" ? `url(#bp-${variant})` : "#ffffff"} />
            {variant === "shadow" && <ellipse cx="64" cy="52" rx="34" ry="44" fill="#9aa6a1" opacity="0.5" />}
            <Face cx={cx} cy={cy} r={r} smile={variant === "smile"} glasses={variant === "glasses"} hat={variant === "hat"} shadow={variant === "shadow"} />
          </g>
        </svg>
        <span className={`absolute bottom-1.5 right-1.5 grid h-[24px] w-[24px] place-items-center rounded-full text-white shadow ${good ? "bg-green" : "bg-terra"}`}>
          {good ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
        </span>
      </div>
      {label && <p className={`mt-2 text-center text-xs font-semibold ${good ? "text-green" : "text-terra"}`}>{label}</p>}
    </div>
  );
}
