"use client";

import React from "react";

const SKIN = "#EAC6A0";
const SKIN_SH = "#D7AC82";
const HAIR = "#2a3a48";
const SHIRT = "#37506688";
const SHIRT_SOLID = "#375066";
const BROW = "#2a3a48";
const LIP = "#BE7E68";

/** Čistý vektorový portrét. cx,cy = stred hlavy, r = polovica výšky hlavy. */
export function Face({
  cx, cy, r, smile = false, glasses = false, hat = false, shadow = false, shirt = SHIRT_SOLID,
}: {
  cx: number; cy: number; r: number;
  smile?: boolean; glasses?: boolean; hat?: boolean; shadow?: boolean; shirt?: string;
}) {
  const eyeY = cy - r * 0.04;
  const eyeDx = r * 0.34;
  return (
    <g>
      {/* ramená / oblečenie */}
      <path d={`M${cx - r * 1.75},${cy + r * 3.4} C${cx - r * 1.75},${cy + r * 1.64} ${cx - r * 0.74},${cy + r * 1.42} ${cx},${cy + r * 1.42} C${cx + r * 0.74},${cy + r * 1.42} ${cx + r * 1.75},${cy + r * 1.64} ${cx + r * 1.75},${cy + r * 3.4} Z`} fill={shirt} />
      {/* krk */}
      <path d={`M${cx - r * 0.3},${cy + r * 0.74} L${cx - r * 0.3},${cy + r * 1.18} Q${cx},${cy + r * 1.4} ${cx + r * 0.3},${cy + r * 1.18} L${cx + r * 0.3},${cy + r * 0.74} Z`} fill={SKIN_SH} />
      {/* vlasy (zadná časť) */}
      <ellipse cx={cx} cy={cy - r * 0.1} rx={r * 0.93} ry={r * 1.05} fill={HAIR} />
      {/* uši */}
      <ellipse cx={cx - r * 0.81} cy={cy + r * 0.06} rx={r * 0.14} ry={r * 0.2} fill={SKIN} />
      <ellipse cx={cx + r * 0.81} cy={cy + r * 0.06} rx={r * 0.14} ry={r * 0.2} fill={SKIN} />
      {/* tvár */}
      <path
        d={`M${cx},${cy - r * 0.86}
          C${cx + r * 0.7},${cy - r * 0.86} ${cx + r * 0.74},${cy - r * 0.05} ${cx + r * 0.6},${cy + r * 0.4}
          C${cx + r * 0.5},${cy + r * 0.78} ${cx + r * 0.27},${cy + r * 1.0} ${cx},${cy + r * 1.0}
          C${cx - r * 0.27},${cy + r * 1.0} ${cx - r * 0.5},${cy + r * 0.78} ${cx - r * 0.6},${cy + r * 0.4}
          C${cx - r * 0.74},${cy - r * 0.05} ${cx - r * 0.7},${cy - r * 0.86} ${cx},${cy - r * 0.86} Z`}
        fill={SKIN}
      />
      {/* ofina / vlasová línia (bočná) */}
      <path
        d={`M${cx - r * 0.67},${cy - r * 0.18}
          C${cx - r * 0.8},${cy - r * 0.74} ${cx - r * 0.3},${cy - r * 1.0} ${cx + r * 0.2},${cy - r * 0.94}
          C${cx + r * 0.56},${cy - r * 0.9} ${cx + r * 0.74},${cy - r * 0.66} ${cx + r * 0.71},${cy - r * 0.4}
          C${cx + r * 0.5},${cy - r * 0.68} ${cx + r * 0.08},${cy - r * 0.66} ${cx - r * 0.22},${cy - r * 0.5}
          C${cx - r * 0.44},${cy - r * 0.4} ${cx - r * 0.6},${cy - r * 0.3} ${cx - r * 0.67},${cy - r * 0.18} Z`}
        fill={HAIR}
      />
      {/* obočie */}
      <path d={`M${cx - eyeDx - r * 0.13},${eyeY - r * 0.19} Q${cx - eyeDx},${eyeY - r * 0.28} ${cx - eyeDx + r * 0.13},${eyeY - r * 0.19}`} stroke={BROW} strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
      <path d={`M${cx + eyeDx - r * 0.13},${eyeY - r * 0.19} Q${cx + eyeDx},${eyeY - r * 0.28} ${cx + eyeDx + r * 0.13},${eyeY - r * 0.19}`} stroke={BROW} strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
      {/* oči */}
      <ellipse cx={cx - eyeDx} cy={eyeY} rx={r * 0.13} ry={r * 0.09} fill="#fff" />
      <ellipse cx={cx + eyeDx} cy={eyeY} rx={r * 0.13} ry={r * 0.09} fill="#fff" />
      <circle cx={cx - eyeDx} cy={eyeY} r={r * 0.055} fill="#33271f" />
      <circle cx={cx + eyeDx} cy={eyeY} r={r * 0.055} fill="#33271f" />
      {/* nos */}
      <path d={`M${cx + r * 0.01},${cy + r * 0.02} Q${cx - r * 0.08},${cy + r * 0.24} ${cx + r * 0.04},${cy + r * 0.28}`} stroke={SKIN_SH} strokeWidth={r * 0.05} fill="none" strokeLinecap="round" />
      {/* ústa */}
      {smile ? (
        <path d={`M${cx - r * 0.26},${cy + r * 0.4} Q${cx},${cy + r * 0.66} ${cx + r * 0.26},${cy + r * 0.4} Q${cx},${cy + r * 0.5} ${cx - r * 0.26},${cy + r * 0.4} Z`} fill="#fff" stroke={LIP} strokeWidth={r * 0.045} />
      ) : (
        <path d={`M${cx - r * 0.22},${cy + r * 0.44} Q${cx},${cy + r * 0.5} ${cx + r * 0.22},${cy + r * 0.44}`} stroke={LIP} strokeWidth={r * 0.075} fill="none" strokeLinecap="round" />
      )}

      {/* tieň na časti tváre */}
      {shadow && <ellipse cx={cx + r * 0.36} cy={cy} rx={r * 0.7} ry={r * 1.0} fill="#1c2b38" opacity="0.26" />}

      {/* okuliare */}
      {glasses && (
        <g stroke="#1b2733" strokeWidth={r * 0.06} fill="rgba(150,185,210,0.45)">
          <rect x={cx - eyeDx - r * 0.22} y={eyeY - r * 0.17} width={r * 0.44} height={r * 0.34} rx={r * 0.08} />
          <rect x={cx + eyeDx - r * 0.22} y={eyeY - r * 0.17} width={r * 0.44} height={r * 0.34} rx={r * 0.08} />
          <line x1={cx - r * 0.12} y1={eyeY} x2={cx + r * 0.12} y2={eyeY} />
          <line x1={cx - eyeDx - r * 0.22} y1={eyeY - r * 0.04} x2={cx - r * 0.78} y2={eyeY - r * 0.04} />
          <line x1={cx + eyeDx + r * 0.22} y1={eyeY - r * 0.04} x2={cx + r * 0.78} y2={eyeY - r * 0.04} />
        </g>
      )}
      {/* čiapka */}
      {hat && (
        <g fill="#3f6076">
          <path d={`M${cx - r * 0.98},${cy - r * 0.48} Q${cx},${cy - r * 1.55} ${cx + r * 0.98},${cy - r * 0.48} Z`} />
          <path d={`M${cx + r * 0.45},${cy - r * 0.5} Q${cx + r * 1.4},${cy - r * 0.64} ${cx + r * 1.5},${cy - r * 0.4} Q${cx + r * 0.9},${cy - r * 0.36} ${cx + r * 0.45},${cy - r * 0.44} Z`} />
        </g>
      )}
    </g>
  );
}

/** Obrys hlavy + ramien ako zarovnávacie vodítko (len ťahy). */
export function FaceGuide({ cx, cy, r, stroke = "#C99A4E" }: { cx: number; cy: number; r: number; stroke?: string }) {
  return (
    <g fill="none" stroke={stroke} strokeLinejoin="round" strokeLinecap="round">
      <path
        d={`M${cx},${cy - r * 0.92} C${cx + r * 0.72},${cy - r * 0.92} ${cx + r * 0.78},${cy - r * 0.05} ${cx + r * 0.6},${cy + r * 0.42} C${cx + r * 0.5},${cy + r * 0.82} ${cx + r * 0.27},${cy + r * 1.04} ${cx},${cy + r * 1.04} C${cx - r * 0.27},${cy + r * 1.04} ${cx - r * 0.5},${cy + r * 0.82} ${cx - r * 0.6},${cy + r * 0.42} C${cx - r * 0.78},${cy - r * 0.05} ${cx - r * 0.72},${cy - r * 0.92} ${cx},${cy - r * 0.92} Z`}
        strokeWidth="1.4" strokeDasharray="4 3" vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M${cx - r * 1.7},${cy + r * 2.7} C${cx - r * 1.45},${cy + r * 1.55} ${cx - r * 0.72},${cy + r * 1.42} ${cx},${cy + r * 1.42} C${cx + r * 0.72},${cy + r * 1.42} ${cx + r * 1.45},${cy + r * 1.55} ${cx + r * 1.7},${cy + r * 2.7}`}
        strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7" vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}
