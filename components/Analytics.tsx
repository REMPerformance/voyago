import Script from "next/script";

// Plausible analytika – aktivuje sa len ak je nastavená premenná NEXT_PUBLIC_PLAUSIBLE_DOMAIN.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
