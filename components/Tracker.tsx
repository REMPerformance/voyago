"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Minimálna, súkromie rešpektujúca analytika: len zobrazenia stránok.
// Žiadne sledovanie klikov ani pohybu — stačí vedieť odkiaľ a na ktorú stránku ľudia prišli.

function getSid(): string {
  try {
    let s = sessionStorage.getItem("voyago.sid");
    if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("voyago.sid", s); }
    return s;
  } catch { return "anon"; }
}

function catchAffiliateRef() {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref && /^[a-zA-Z0-9_-]{2,40}$/.test(ref)) {
      localStorage.setItem("voyago.ref", JSON.stringify({ c: ref, t: Date.now() }));
    }
  } catch { /* ignore */ }
}

export function Tracker() {
  const pathname = usePathname();
  const last = useRef<string>("");

  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    catchAffiliateRef();
    const body = JSON.stringify({ sid: getSid(), type: "pageview", path: pathname, referrer: document.referrer || "", query: window.location.search.slice(0, 300) });
    try {
      if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      else fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    } catch { /* ignore */ }
  }, [pathname]);

  return null;
}
