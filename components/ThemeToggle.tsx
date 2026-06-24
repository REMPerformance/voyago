"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("voyago.theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Prepnúť režim"
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-all hover:border-ink hover:-translate-y-0.5"
    >
      {ready && dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
