"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, ArrowRight, MousePointerClick } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getProduct, productPrice } from "@/config/products";
import { useFinalPrice } from "@/lib/discounts";
import { money } from "@/lib/format";

type C = { code: string; iso: number | null; ll: [number, number]; slug: string };

const RAW: C[] = [
  { code: "US", iso: 840, ll: [-98, 39], slug: "us-esta" },
  { code: "GB", iso: 826, ll: [-2, 54], slug: "uk-eta" },
  { code: "CA", iso: 124, ll: [-106, 57], slug: "ca-eta" },
  { code: "AU", iso: 36, ll: [134, -25], slug: "au-eta" },
  { code: "NZ", iso: 554, ll: [172, -42], slug: "nz-eta" },
  { code: "KR", iso: 410, ll: [128, 36], slug: "kr-keta" },
  { code: "IN", iso: 356, ll: [79, 22], slug: "in-evisa" },
  { code: "EG", iso: 818, ll: [30, 27], slug: "eg-evisa" },
  { code: "VN", iso: 704, ll: [107, 16], slug: "vn-evisa" },
  { code: "LK", iso: 144, ll: [81, 7.5], slug: "lk-eta" },
  { code: "TR", iso: 792, ll: [35, 39], slug: "tr-evisa" },
  { code: "ID", iso: 360, ll: [118, -2], slug: "id-evoa" },
  { code: "TZ", iso: 834, ll: [35, -6], slug: "tz-evisa" },
  { code: "CN", iso: 156, ll: [104, 35], slug: "cn-evisa" },
  { code: "EU", iso: null, ll: [10, 50], slug: "eu-etias" },
];

const COUNTRIES = RAW.map((c) => ({ ...c, available: getProduct(c.slug)?.available ?? true }));
const TYPE_LABEL: Record<string, string> = { esta: "ESTA", eta: "eTA", evisa: "e-Visa", etias: "ETIAS" };
const AC = { fill: "#C99A4E", soft: "rgba(168,119,46,0.80)", hov: "#B6863B", edge: "#E4C079", dot: "#E9CB8A", halo: "201,154,78" };

function loadScript(src: string): Promise<void> {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[data-gl="${src}"]`)) return res();
    const el = document.createElement("script");
    el.src = src;
    el.setAttribute("data-gl", src);
    el.onload = () => res();
    el.onerror = () => rej(new Error("load " + src));
    document.head.appendChild(el);
  });
}

export function Globe() {
  const { t, tr, lang } = useLang();
  const finalPrice = useFinalPrice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<any>(null);
  const selRef = useRef<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const select = (code: string | null) => {
    selRef.current = code;
    setSelected(code);
    if (ctrlRef.current) (code ? ctrlRef.current.flyTo(code) : ctrlRef.current.flyHome());
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
        const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((r) => r.json());
        if (!alive) return;
        build(world);
        setReady(true);
      } catch {
        /* offline / blocked — section still renders heading */
      }
    })();
    return () => {
      alive = false;
      if (ctrlRef.current) ctrlRef.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function build(worldData: any) {
    const d3: any = (window as any).d3;
    const topojson: any = (window as any).topojson;
    const canvas = canvasRef.current;
    if (!canvas || !d3 || !topojson) return;
    const ctx = canvas.getContext("2d")!;
    const land: any[] = topojson.feature(worldData, worldData.objects.countries).features;
    const graticule = d3.geoGraticule10();
    const sphere = { type: "Sphere" };
    const projection = d3.geoOrthographic().clipAngle(90).precision(1.1);
    const path = d3.geoPath(projection, ctx);

    const byIso: Record<number, any> = {};
    land.forEach((f: any) => { byIso[+f.id] = f; });
    const visa = COUNTRIES.map((p) => ({ ...p, feature: p.iso ? byIso[p.iso] : null }));

    let width = 560, height = 560, dpr = 1;
    let rotation: [number, number] = [-12, -22], zoom = 1;
    let dragging = false, transitioning = false, moved = 0, sx = 0, sy = 0, sr: [number, number] = [0, 0];
    let hoverCode: string | null = null, tphase = 0, arcT = 0;
    const SK: [number, number] = [19.5, 48.7];
    const CITIES: [number, number][] = [[-74, 40.7], [-118, 34], [-0.1, 51.5], [2.35, 48.9], [17.1, 48.1], [55.3, 25.2], [72.8, 19], [103.8, 1.35], [139.7, 35.7], [151.2, -33.9], [31.2, 30], [28.98, 41], [100.5, 13.7], [-46.6, -23.5], [36.8, -1.3], [114.2, 22.3]];
    let links: any[] = [], lastDraw = 0, nextSpawn = 0;
    const spawnLink = (now: number) => {
      const a = Math.floor(Math.random() * CITIES.length);
      let b: number; do { b = Math.floor(Math.random() * CITIES.length); } while (b === a);
      links.push({ a: CITIES[a], b: CITIES[b], born: now, dur: 2200 + Math.random() * 1600 });
    };

    const scaleBase = () => (Math.min(width, height) / 2 - 10) * zoom;
    const center = (): [number, number] => [-rotation[0], -rotation[1]];
    const visible = (ll: [number, number]) => d3.geoDistance(ll, center()) < Math.PI / 2 - 0.015;

    function resize() {
      const rect = (canvas!.parentNode as HTMLElement).getBoundingClientRect();
      width = Math.max(220, rect.width); height = width;
      dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      canvas!.width = width * dpr; canvas!.height = height * dpr;
      canvas!.style.width = width + "px"; canvas!.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      const sel0 = selRef.current;
      const hasSel = !!sel0;
      projection.rotate(rotation).scale(scaleBase()).translate([width / 2, height / 2]);
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2, R = scaleBase();

      const atmo = ctx.createRadialGradient(cx, cy, R * 0.93, cx, cy, R * 1.17);
      atmo.addColorStop(0, "rgba(" + AC.halo + ",0.30)");
      atmo.addColorStop(0.5, "rgba(" + AC.halo + ",0.10)");
      atmo.addColorStop(1, "rgba(" + AC.halo + ",0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.17, 0, 2 * Math.PI); ctx.fillStyle = atmo; ctx.fill();

      ctx.beginPath(); path(sphere);
      const g = ctx.createRadialGradient(width * 0.4, height * 0.34, R * 0.12, width * 0.5, height * 0.5, R * 1.06);
      g.addColorStop(0, "#1A3957"); g.addColorStop(0.55, "#0E2235"); g.addColorStop(1, "#08131F");
      ctx.fillStyle = g; ctx.fill();

      ctx.beginPath(); path(graticule); ctx.lineWidth = 0.6; ctx.strokeStyle = "rgba(" + AC.halo + ",0.10)"; ctx.stroke();

      ctx.beginPath(); land.forEach((f: any) => path(f));
      ctx.fillStyle = "rgba(214,224,222,0.13)"; ctx.fill();
      ctx.lineWidth = 0.5; ctx.strokeStyle = "rgba(8,19,31,0.55)"; ctx.stroke();

      visa.forEach((p: any) => {
        if (!p.feature) return;
        const isSel = p.code === sel0, hov = p.code === hoverCode;
        ctx.beginPath(); path(p.feature);
        if (isSel) { ctx.fillStyle = p.available ? AC.fill : "#5E7FA0"; ctx.strokeStyle = AC.edge; }
        else if (hasSel) { ctx.fillStyle = "rgba(150,166,180,0.20)"; ctx.strokeStyle = "rgba(150,166,180,0.32)"; }
        else if (p.available) { ctx.fillStyle = hov ? AC.hov : AC.soft; ctx.strokeStyle = AC.edge; }
        else { ctx.fillStyle = hov ? "#4E6E8E" : "rgba(70,98,126,0.62)"; ctx.strokeStyle = "#7E9AB6"; }
        ctx.fill(); ctx.lineWidth = isSel ? 1.6 : 0.7; ctx.stroke();
      });

      CITIES.forEach((c) => { if (!visible(c)) return; const xy = projection(c); if (!xy) return; ctx.beginPath(); ctx.arc(xy[0], xy[1], 1.2, 0, 2 * Math.PI); ctx.fillStyle = "rgba(190,210,228,0.45)"; ctx.fill(); });
      ctx.lineCap = "round";
      links.forEach((l: any) => {
        const pr = (now - l.born) / l.dur;
        const a = Math.min(1, pr * 1.45), b0 = Math.max(0, (pr - 0.3) * 1.6);
        if (a - b0 < 0.02) return;
        const interp = d3.geoInterpolate(l.a, l.b);
        const n = Math.max(2, Math.round((a - b0) * 46));
        const coords: any[] = []; for (let i = 0; i <= n; i++) coords.push(interp(b0 + (a - b0) * (i / n)));
        const fade = pr < 0.85 ? 1 : Math.max(0, 1 - (pr - 0.85) / 0.15);
        const ln = { type: "LineString", coordinates: coords };
        ctx.beginPath(); path(ln); ctx.lineWidth = 4.5; ctx.strokeStyle = "rgba(" + AC.halo + "," + 0.16 * fade + ")"; ctx.stroke();
        ctx.beginPath(); path(ln); ctx.lineWidth = 1.4; ctx.strokeStyle = "rgba(196,228,255," + 0.85 * fade + ")"; ctx.stroke();
        const hp = interp(a); if (visible(hp)) { const xy = projection(hp); if (xy) { ctx.beginPath(); ctx.arc(xy[0], xy[1], 2.4, 0, 2 * Math.PI); ctx.fillStyle = "rgba(224,242,255," + fade + ")"; ctx.fill(); } }
      });
      ctx.lineCap = "butt";

      const selP = visa.find((v: any) => v.code === sel0);
      if (selP && selP.code !== "EU") {
        const interp = d3.geoInterpolate(SK, selP.ll);
        const steps = 64, upto = Math.max(2, Math.floor(steps * arcT));
        const coords: any[] = []; for (let i = 0; i <= upto; i++) coords.push(interp(i / steps));
        const line = { type: "LineString", coordinates: coords };
        ctx.lineCap = "round";
        ctx.beginPath(); path(line); ctx.lineWidth = 6.5; ctx.strokeStyle = "rgba(" + AC.halo + ",0.18)"; ctx.stroke();
        ctx.beginPath(); path(line); ctx.lineWidth = 2.2; ctx.strokeStyle = AC.edge; ctx.stroke();
        ctx.beginPath(); path(line); ctx.lineWidth = 2.2; ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.setLineDash([2, 9]); ctx.lineDashOffset = -tphase * 8; ctx.stroke(); ctx.setLineDash([]);
        ctx.lineCap = "butt";
        const head = interp(upto / steps);
        if (visible(head)) { const hx = projection(head); if (hx) { ctx.beginPath(); ctx.arc(hx[0], hx[1], 3, 0, 2 * Math.PI); ctx.fillStyle = AC.dot; ctx.fill(); } }
        if (visible(SK)) { const ox = projection(SK); if (ox) { ctx.beginPath(); ctx.arc(ox[0], ox[1], 3.4, 0, 2 * Math.PI); ctx.fillStyle = "#FFFFFF"; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = "#0A1622"; ctx.stroke(); } }
      }

      visa.forEach((p: any) => {
        if (!visible(p.ll)) return;
        const xy = projection(p.ll); if (!xy) return;
        const isSel = p.code === sel0;
        if (hasSel && !isSel) return;
        const dotC = p.available ? AC.dot : "#9DB6CE";
        const haloC = p.available ? AC.halo : "110,140,170";
        const base = isSel ? 5.5 : 3.4;
        const pr = base + (Math.sin(tphase * 2.1 + (p.iso || 7) * 0.7) * 0.5 + 0.5) * (isSel ? 11 : 6);
        ctx.beginPath(); ctx.arc(xy[0], xy[1], pr, 0, 2 * Math.PI); ctx.fillStyle = "rgba(" + haloC + "," + (isSel ? 0.3 : 0.16) + ")"; ctx.fill();
        ctx.beginPath(); ctx.arc(xy[0], xy[1], base, 0, 2 * Math.PI); ctx.fillStyle = dotC; ctx.fill();
        ctx.lineWidth = 1.4; ctx.strokeStyle = "#0A1622"; ctx.stroke();
      });
    }

    let raf = 0;
    function tick(now?: number) {
      now = now || performance.now();
      raf = requestAnimationFrame(tick);
      if (now - lastDraw < 22) return;
      lastDraw = now; tphase += 0.045;
      if (selRef.current) { if (arcT < 1) arcT += 0.03; } else arcT = 0;
      if (!dragging && !transitioning && !selRef.current) rotation[0] += 0.22;
      if (now >= nextSpawn && links.length < 4) { spawnLink(now); nextSpawn = now + 450 + Math.random() * 650; }
      links = links.filter((l: any) => now! - l.born < l.dur);
      draw(now);
    }

    const pt = (e: PointerEvent): [number, number] => { const r = canvas!.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    function nearest(p: [number, number]) {
      let best: any = null, bd = 1e9;
      visa.forEach((q: any) => { if (!visible(q.ll)) return; const xy = projection(q.ll); const d = Math.hypot(xy[0] - p[0], xy[1] - p[1]); if (d < bd) { bd = d; best = q; } });
      return { best, bd };
    }
    function hitCode(p: [number, number]): string | null {
      const n = nearest(p);
      if (n.best && n.bd < 26) return n.best.code;
      const ll = projection.invert(p); if (!ll) return null;
      for (const q of visa as any[]) if (q.feature && d3.geoContains(q.feature, ll)) return q.code;
      return null;
    }
    const shortest = (a: number, b: number) => { let d = (b - a) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; };
    const interpRot = (a: [number, number], b: [number, number]) => { const d0 = shortest(a[0], b[0]), d1 = b[1] - a[1]; return (tt: number): [number, number] => [a[0] + d0 * tt, a[1] + d1 * tt]; };
    function animate(targetRot: [number, number], targetZoom: number, dur: number) {
      const r0 = rotation.slice() as [number, number], z0 = zoom, ri = interpRot(r0, targetRot), t0 = performance.now();
      transitioning = true;
      function step(now: number) {
        const u = Math.min(1, (now - t0) / dur), e = d3.easeCubicInOut(u);
        rotation = ri(e); zoom = z0 + (targetZoom - z0) * e;
        if (u < 1) requestAnimationFrame(step); else transitioning = false;
      }
      requestAnimationFrame(step);
    }

    function down(e: PointerEvent) { dragging = true; moved = 0; const p = pt(e); sx = p[0]; sy = p[1]; sr = rotation.slice() as [number, number]; transitioning = false; try { canvas!.setPointerCapture(e.pointerId); } catch { /* */ } }
    function move(e: PointerEvent) {
      const p = pt(e);
      if (dragging) {
        const dx = p[0] - sx, dy = p[1] - sy; moved += Math.abs(dx) + Math.abs(dy);
        const f = 90 / scaleBase();
        rotation[0] = sr[0] + dx * f;
        rotation[1] = Math.max(-89, Math.min(89, sr[1] - dy * f));
      } else { const c = hitCode(p); hoverCode = c; canvas!.style.cursor = c ? "pointer" : "grab"; }
    }
    function up(e: PointerEvent) {
      if (!dragging) return; dragging = false; const p = pt(e);
      if (moved < 6) { const c = hitCode(p); if (c) select(c); }
      try { canvas!.releasePointerCapture(e.pointerId); } catch { /* */ }
    }
    function wheel(e: WheelEvent) { e.preventDefault(); const k = Math.exp(-e.deltaY * 0.0014); zoom = Math.max(0.85, Math.min(6, zoom * k)); }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentNode as HTMLElement);
    resize();
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    canvas.addEventListener("wheel", wheel, { passive: false });
    tick();

    ctrlRef.current = {
      flyTo: (code: string) => { const p = visa.find((v: any) => v.code === code); if (!p) return; arcT = 0; animate([-p.ll[0], -p.ll[1]], 2.0, 950); },
      flyHome: () => animate([-12, -22], 1.0, 800),
      destroy: () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("pointerup", up); canvas.removeEventListener("wheel", wheel); },
    };
  }

  const sc = COUNTRIES.find((c) => c.code === selected);
  const prod = sc ? getProduct(sc.slug) : undefined;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      {/* Panel */}
      <div className="order-2 lg:order-1">
        {prod ? (
          <div className="animate-fade-up rounded-xl2 border border-cream/15 bg-cream/[0.04] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={`https://flagcdn.com/w160/${sc!.code.toLowerCase()}.png`} alt="" className="h-9 w-13 rounded-md object-cover ring-1 ring-cream/25" style={{ width: 52 }} />
                <div>
                  <p className="font-display text-xl font-bold">{t(prod.destination)}</p>
                  <span className="mt-1 inline-block rounded-md bg-brass/20 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-brass-light">
                    {TYPE_LABEL[prod.type]}
                  </span>
                </div>
              </div>
              <button onClick={() => select(null)} aria-label="Zavrieť" className="grid h-8 w-8 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:bg-cream/10">
                <X size={15} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">{t(prod.summary)}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-cream/50">{tr("dest.processing")}</p>
                <p className="text-cream/90">{t(prod.processingDays)}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-cream/50">{tr("dest.validity")}</p>
                <p className="text-cream/90">{t(prod.validity)}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-cream/12 pt-4">
              <div className="flex items-end gap-1.5">
                <span className="font-mono text-[0.58rem] uppercase tracking-wider text-cream/55">{tr("dest.from")}</span>
                <span className="font-display text-2xl font-extrabold">{money(finalPrice(prod), lang)}</span>
              </div>
              {prod.available ? (
                <Link href={`/apply/${prod.slug}`} className="btn inline-flex !px-5 !py-2.5 text-sm bg-cream text-navy hover:-translate-y-0.5 hover:bg-white">
                  {t({ sk: "Vyplniť žiadosť", en: "Start application" })} <ArrowRight size={14} />
                </Link>
              ) : (
                <span className="rounded-lg border border-cream/25 px-4 py-2 text-xs font-semibold text-cream/80">
                  {t({ sk: "Pripravujeme", en: "Coming soon" })}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p className="eyebrow !text-brass-light">{t({ sk: "Interaktívny glóbus", en: "Interactive globe" })}</p>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              {t({ sk: "Kliknite na krajinu", en: "Tap a country" })}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
              {t({
                sk: "Vyberte si destináciu priamo na glóbuse a hneď uvidíte typ povolenia, čas vybavenia aj cenu. Z Európy sa vykreslí trasa do vašej krajiny.",
                en: "Pick a destination right on the globe and instantly see the permit type, processing time and price. A route is drawn from Europe to your country.",
              })}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-cream/55">
              <MousePointerClick size={14} className="text-brass-light" />
            </p>
          </div>
        )}
      </div>

      {/* Globe */}
      <div className="order-1 lg:order-2">
        <div ref={wrapRef} className="relative mx-auto w-full max-w-[460px]" style={{ aspectRatio: "1 / 1" }}>
          <canvas ref={canvasRef} className="block h-full w-full touch-none" style={{ cursor: "grab" }} />
          {!ready && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="h-9 w-9 animate-spin rounded-full border-2 border-cream/20 border-t-brass-light" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
