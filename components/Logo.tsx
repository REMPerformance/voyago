"use client";

// Logo Voyago. "V" prechádza do vzlietajúcej šípky (voyage + go).
// Dlaždica používa currentColor (prispôsobí sa svetlému/tmavému pozadiu),
// šípka je vždy mosadzná.

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="Voyago">
      <rect x="5" y="5" width="90" height="90" rx="26" fill="currentColor" />
      <path d="M29 33 L50 71 L64 45 L83 21" fill="none" stroke="#C99A4E" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M83 21 L70 22.5 M83 21 L81.5 34" fill="none" stroke="#C99A4E" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "mark" | "wordmark";
  className?: string;
}) {
  if (variant === "mark") return <LogoMark className={className} />;

  const wordmark = (
    <span className="font-display text-2xl font-bold leading-none tracking-tight">
      Voyago<span className="text-brass">.</span>
    </span>
  );

  if (variant === "wordmark") return <span className={className}>{wordmark}</span>;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={36} />
      {wordmark}
    </span>
  );
}
