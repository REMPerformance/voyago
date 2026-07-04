"use client";

import { useEffect, useState } from "react";

const CITIES: { label: string; tz: string }[] = [
  { label: "New York", tz: "America/New_York" },
  { label: "Londýn", tz: "Europe/London" },
  { label: "Dubaj", tz: "Asia/Dubai" },
  { label: "Tokio", tz: "Asia/Tokyo" },
];

function timeIn(tz: string) {
  try { return new Intl.DateTimeFormat("sk-SK", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date()); }
  catch { return ""; }
}

export function TimeBar() {
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[0.66rem] tracking-wide text-cream/70">
      {CITIES.map((c, i) => (
        <span key={c.tz} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-cream/25">·</span>}
          <span className="text-cream/50">{c.label}</span>
          <span className="font-semibold text-brass-light">{timeIn(c.tz)}</span>
        </span>
      ))}
    </span>
  );
}
