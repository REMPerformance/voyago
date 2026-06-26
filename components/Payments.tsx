"use client";

import { useLang } from "@/lib/i18n";

function Chip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      aria-label={label}
      className="grid h-12 w-[4.75rem] place-items-center rounded-lg border border-line bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
    >
      {children}
    </div>
  );
}

const Visa = () => (
  <span className="font-display text-lg font-extrabold italic tracking-tight" style={{ color: "#1A1F71" }}>
    VISA
  </span>
);

const Mastercard = () => (
  <svg viewBox="0 0 40 25" width="42" height="26" role="img" aria-label="Mastercard">
    <circle cx="16" cy="12.5" r="8.5" fill="#EB001B" />
    <circle cx="24" cy="12.5" r="8.5" fill="#F79E1B" />
    <path d="M20,5.6 a8.5,8.5 0 0 1 0,13.8 a8.5,8.5 0 0 1 0,-13.8 Z" fill="#FF5F00" />
  </svg>
);

const Maestro = () => (
  <svg viewBox="0 0 40 25" width="42" height="26" role="img" aria-label="Maestro">
    <circle cx="16" cy="12.5" r="8.5" fill="#0099DF" />
    <circle cx="24" cy="12.5" r="8.5" fill="#ED0006" />
    <path d="M20,5.6 a8.5,8.5 0 0 1 0,13.8 a8.5,8.5 0 0 1 0,-13.8 Z" fill="#6C2C7C" />
  </svg>
);

const ApplePay = () => (
  <span className="flex items-center gap-1" style={{ color: "#111" }}>
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M16.37 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.98 1.57-2.98 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.13.57-2.27 1.2-2.98.8-.94 2.15-1.64 3.25-1.68.03.13.05.28.05.43Zm4.56 15.71c-.03.07-.46 1.58-1.51 3.12-.95 1.34-1.94 2.71-3.43 2.74-1.52.03-1.9-.88-3.63-.88-1.7 0-2.3.85-3.67.91-1.38.05-2.66-1.6-3.66-2.84C2.94 17.34 1.42 12.85 3.46 9.82c1.01-1.5 2.81-2.45 4.78-2.48 1.45-.03 2.81.97 3.69.97.91 0 2.6-1.2 4.38-1.02.74.03 2.84.3 4.18 2.27-.11.07-2.5 1.46-2.47 4.36.03 3.47 3.05 4.62 3.08 4.63Z" />
    </svg>
    <span className="text-sm font-semibold">Pay</span>
  </span>
);

const GooglePay = () => (
  <span className="flex items-center gap-1 text-sm font-bold">
    <span style={{ color: "#4285F4" }}>G</span>
    <span style={{ color: "#5F6368" }}>Pay</span>
  </span>
);

export function Payments() {
  const { t } = useLang();
  return (
    <div className="text-center">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-ink-soft/70">
        {t({ sk: "Bezpečné platby realizujete cez", en: "Secure payments via" })}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Chip label="Visa"><Visa /></Chip>
        <Chip label="Mastercard"><Mastercard /></Chip>
        <Chip label="Maestro"><Maestro /></Chip>
        <Chip label="Apple Pay"><ApplePay /></Chip>
        <Chip label="Google Pay"><GooglePay /></Chip>
      </div>
    </div>
  );
}
