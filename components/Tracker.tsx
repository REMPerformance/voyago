"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSid(): string {
  try {
    let s = sessionStorage.getItem("voyago.sid");
    if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("voyago.sid", s); }
    return s;
  } catch { return "anon"; }
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    }
  } catch { /* ignore */ }
}

export function Tracker() {
  const pathname = usePathname();
  const last = useRef<string>("");

  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    (() => { try { const r = new URLSearchParams(window.location.search).get("ref"); if (r && /^[a-zA-Z0-9_-]{2,40}$/.test(r)) localStorage.setItem("voyago.ref", JSON.stringify({ c: r, t: Date.now() })); } catch {} })();
    send({ sid: getSid(), type: "pageview", path: pathname, referrer: document.referrer || "", query: (typeof window !== "undefined" ? window.location.search : "").slice(0, 300) });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("a,button");
      if (!el) return;
      const label = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
      const href = el.getAttribute("href") || "";
      send({ sid: getSid(), type: "click", path: location.pathname, label, href });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
