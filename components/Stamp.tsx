"use client";

// Podpisový prvok: "pečiatka" ako v pase. Mosadzná = schválené.

type Tone = "approved" | "free" | "referred" | "handled";

const TONES: Record<Tone, string> = {
  approved: "text-brass border-brass",
  free: "text-ink-soft border-ink-soft",
  referred: "text-terra border-terra",
  handled: "text-green border-green",
};

export function Stamp({ label, tone = "approved" }: { label: string; tone?: Tone }) {
  return (
    <div
      className={`inline-grid animate-stamp-in place-items-center rounded-xl border-[3px] border-double px-6 py-3 ${TONES[tone]}`}
      style={{ transform: "rotate(-8deg)" }}
    >
      <span className="font-mono text-lg font-bold uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}
