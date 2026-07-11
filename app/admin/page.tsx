"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, Megaphone, Save, X, Inbox, Download, ChevronDown, Mail, Send, Percent, Search, Ticket, Activity, Globe, MessageCircle, Users, Copy, Check, Power, Newspaper } from "lucide-react";
import { ChatAdmin } from "@/components/admin/ChatAdmin";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import { fileSignedUrl } from "@/lib/applications";
import { ALL_STATUSES, statusLabel } from "@/config/orderStages";
import { renderEmail, TEMPLATES, type EmailTemplate } from "@/lib/email";
import { PRODUCTS, getProduct } from "@/config/products";
import { COUNTRY_OPTIONS } from "@/lib/updates";
import { fetchStats, setProcessed, bumpProcessed } from "@/lib/stats";
import type { Announcement, Placement, Tone } from "@/lib/announcements";

type Draft = Partial<Announcement>;
const EMPTY: Draft = {
  enabled: true, placement: "bar", tone: "promo", title: "", message: "",
  link_url: "", link_label: "", starts_at: null, ends_at: null, dismissible: true, priority: 0,
  bg_color: null, text_color: null, font_weight: "normal", italic: false, animation: "none", anim_speed: 18, sticky: false, hover_glow: false, show_date: false, date_position: "right",
};
const TONES: Tone[] = ["info", "warning", "success", "promo"];
const PLACEMENTS: Placement[] = ["bar", "popup"];
const projectHost = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "nenastavené";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
      <p className="font-mono text-[0.58rem] uppercase tracking-wider text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
const toLocal = (iso?: string | null) => (iso ? new Date(iso).toISOString().slice(0, 16) : "");
const fromLocal = (v: string) => (v ? new Date(v).toISOString() : null);

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [list, setList] = useState<Announcement[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [affs, setAffs] = useState<any[]>([]);
  const [affForm, setAffForm] = useState<any>({ name: "", code: "", commission_pct: 12, discount_pct: 0, discount_mode: "extra", note: "" });
  const [affMsg, setAffMsg] = useState("");
  const [copiedCode, setCopiedCode] = useState("");
  const [ups, setUps] = useState<any[]>([]);
  const emptyUp = { id: "", kind: "update", title: "", slug: "", summary: "", body: "", countries: [] as string[], category: "general", severity: "info", restrictions: "", source_url: "", published: true, published_at: "", image: "", tag: "", seo_title: "", meta_description: "", keywords: "", destination_slug: "", read_mins: 4 };
  const [upForm, setUpForm] = useState<any>(emptyUp);
  const [upMsg, setUpMsg] = useState("");
  const [tab, setTab] = useState<"ann" | "apps" | "disc" | "promo" | "traffic" | "stats" | "chat" | "aff" | "updates">("ann");
  const [apps, setApps] = useState<any[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [emailFor, setEmailFor] = useState<any>(null);
  const [emailTpl, setEmailTpl] = useState<EmailTemplate>("approved");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [emailFiles, setEmailFiles] = useState<{ filename: string; content: string; type: string }[]>([]);
  const [sending, setSending] = useState(false);
  const [discMap, setDiscMap] = useState<Record<string, { percent: number; active: boolean }>>({});
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState("all");
  const [promoList, setPromoList] = useState<any[]>([]);
  const [newPromo, setNewPromo] = useState({ code: "", percent: 10, active: true, expires_at: "", max_uses: "" });
  const [visits, setVisits] = useState<any[]>([]);
  const [statMap, setStatMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!supabaseEnabled || !supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase.from("announcements").select("*").order("priority", { ascending: false }).order("created_at", { ascending: false });
    setList((data as Announcement[]) || []);
  };
  useEffect(() => { if (session) load(); }, [session]);

  const login = async () => {
    if (!supabase) return;
    setAuthErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthErr(error.message);
  };
  const logout = async () => { await supabase?.auth.signOut(); };

  const save = async () => {
    if (!supabase || !draft) return;
    setBusy(true);
    const payload: any = {
      enabled: draft.enabled, placement: draft.placement, tone: draft.tone,
      title: draft.title, message: draft.message,
      link_url: draft.link_url || null, link_label: draft.link_label || null,
      starts_at: draft.starts_at || null, ends_at: draft.ends_at || null,
      dismissible: draft.dismissible, priority: Number(draft.priority) || 0,
      bg_color: draft.bg_color || null, text_color: draft.text_color || null,
      font_weight: draft.font_weight || "normal", italic: !!draft.italic,
      animation: draft.animation || "none", anim_speed: Number(draft.anim_speed) || 18,
      sticky: !!draft.sticky, hover_glow: !!draft.hover_glow,
      show_date: !!draft.show_date, date_position: draft.date_position || "right",
    };
    if (draft.id) await supabase.from("announcements").update(payload).eq("id", draft.id);
    else await supabase.from("announcements").insert(payload);
    setBusy(false); setDraft(null); load();
  };
  const toggle = async (a: Announcement) => { await supabase?.from("announcements").update({ enabled: !a.enabled }).eq("id", a.id); load(); };
  const remove = async (a: Announcement) => { if (confirm("Zmazať oznam?")) { await supabase?.from("announcements").delete().eq("id", a.id); load(); } };
  const loadApps = async () => {
    if (!supabase) return;
    const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    setApps(data || []);
  };
  useEffect(() => { if (session && tab === "apps") loadApps(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  const openFile = async (path: string) => { const u = await fileSignedUrl(path); if (u) window.open(u, "_blank"); };
  const setAppStatus = async (id: string, status: string) => {
    const prev = apps.find((a) => a.id === id);
    await supabase?.from("applications").update({ status }).eq("id", id);
    // Keď sa žiadosť označí ako hotová, automaticky pripočítaj do počtu vybavených pre danú krajinu.
    if (status === "done" && prev && prev.status !== "done" && prev.product_slug) {
      await bumpProcessed(prev.product_slug, 1);
      setStatMap((m) => ({ ...m, [prev.product_slug]: (m[prev.product_slug] || 0) + 1 }));
    }
    // Automatický e-mail zákazníkovi o zmene stavu (ak má e-mail a stav sa naozaj zmenil).
    if (prev?.email && prev.status !== status) {
      const destination = getProduct(prev.product_slug)?.destination?.sk || prev.product_slug || "—";
      fetch("/api/notify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "status", email: prev.email, name: prev.name, orderId: prev.ref, destination, status: statusLabel(status, "sk") }),
      }).catch(() => {});
    }
    loadApps();
  };
  const openEmail = (a: any) => { setEmailFor(a); setEmailTpl("approved"); setEmailSubject(TEMPLATES.approved.subject); setEmailMsg(""); setEmailFiles([]); };
  const pickTpl = (tpl: EmailTemplate) => { setEmailTpl(tpl); setEmailSubject(TEMPLATES[tpl].subject); };
  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const read = (f: File) => new Promise<{ filename: string; content: string; type: string }>((res) => {
      const r = new FileReader();
      r.onload = () => res({ filename: f.name, content: String(r.result).split(",")[1] || "", type: f.type });
      r.readAsDataURL(f);
    });
    const arr = await Promise.all(Array.from(files).map(read));
    setEmailFiles((prev) => [...prev, ...arr]);
  };
  const sendEmail = async () => {
    if (!emailFor?.email) { alert("Žiadosť nemá e-mail."); return; }
    setSending(true);
    const trav = emailFor.travelers?.[0]?.data || {};
    const name = [trav.givenNames, trav.surname].filter(Boolean).join(" ");
    const { subject, html } = renderEmail({ template: emailTpl, name, message: emailMsg, hasAttachments: emailFiles.length });
    const { data } = await supabase!.auth.getSession();
    const token = data.session?.access_token;
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ to: emailFor.email, subject: emailSubject || subject, html, attachments: emailFiles }),
    });
    setSending(false);
    if (res.ok) { alert("E-mail odoslaný ✓"); setEmailFor(null); }
    else { const e = await res.json().catch(() => ({})); alert("Nepodarilo sa odoslať (" + (e.error || "chyba") + "). Skontroluj RESEND_API_KEY."); }
  };
  const loadDiscounts = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from("discounts").select("slug, percent, active");
      if (error) { setDiscMap({}); return; }
      const m: Record<string, { percent: number; active: boolean }> = {};
      (data || []).forEach((d: any) => { m[d.slug] = { percent: d.percent || 0, active: !!d.active }; });
      setDiscMap(m);
    } catch { setDiscMap({}); }
  };
  useEffect(() => { if (session && tab === "disc") loadDiscounts(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  const setDisc = (slug: string, patch: Partial<{ percent: number; active: boolean }>) =>
    setDiscMap((m) => ({ ...m, [slug]: { percent: m[slug]?.percent || 0, active: m[slug]?.active || false, ...patch } }));
  const saveDisc = async (slug: string) => {
    const d = discMap[slug] || { percent: 0, active: false };
    await supabase?.from("discounts").upsert({ slug, percent: Number(d.percent) || 0, active: !!d.active }, { onConflict: "slug" });
    alert("Zľava uložená ✓");
  };
  const loadPromos = async () => {
    if (!supabase) return;
    const { data } = await supabase.from("promo_codes").select("*").order("code");
    setPromoList(data || []);
  };
  useEffect(() => { if (session && tab === "promo") loadPromos(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  const addPromo = async () => {
    const code = newPromo.code.trim().toUpperCase();
    if (!code) return;
    await supabase?.from("promo_codes").upsert({ code, percent: Number(newPromo.percent) || 0, active: !!newPromo.active, expires_at: newPromo.expires_at || null, max_uses: newPromo.max_uses ? Number(newPromo.max_uses) : null }, { onConflict: "code" });
    setNewPromo({ code: "", percent: 10, active: true, expires_at: "", max_uses: "" });
    loadPromos();
  };
  const togglePromo = async (code: string, active: boolean) => { await supabase?.from("promo_codes").update({ active }).eq("code", code); loadPromos(); };
  const delPromo = async (code: string) => { if (confirm("Zmazať kód " + code + "?")) { await supabase?.from("promo_codes").delete().eq("code", code); loadPromos(); } };
  const exportCsv = () => {
    const rows: string[][] = [["ref", "datum", "email", "produkt", "cestujucich", "suma_eur", "stav", "zaplatene"]];
    apps.forEach((a) => rows.push([a.ref || "", new Date(a.created_at).toLocaleString("sk-SK"), a.email || "", a.product_slug || "", String(a.travelers?.length || 0), ((a.amount_cents || 0) / 100).toFixed(2), a.status, a.paid ? "ano" : "nie"]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const aEl = document.createElement("a"); aEl.href = url; aEl.download = "ziadosti.csv"; aEl.click(); URL.revokeObjectURL(url);
  };
  const paidCount = apps.filter((a) => a.paid).length;
  const revenue = apps.filter((a) => a.paid).reduce((s2, a) => s2 + (a.amount_cents || 0), 0) / 100;
  const filteredApps = apps.filter((a) => {
    if (statusF !== "all" && a.status !== statusF) return false;
    if (q) { const hay = `${a.email || ""} ${a.ref || ""} ${a.product_slug || ""}`.toLowerCase(); if (!hay.includes(q.toLowerCase())) return false; }
    return true;
  });
  const loadVisits = async () => {
    if (!supabase) return;
    const { data } = await supabase.from("visits").select("*").order("created_at", { ascending: false }).limit(300);
    setVisits(data || []);
  };
  useEffect(() => { if (session && tab === "traffic") loadVisits(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  const loadStats = async () => { setStatMap(await fetchStats()); };
  useEffect(() => { if (session && tab === "stats") loadStats(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  const saveStat = async (slug: string) => { await setProcessed(slug, statMap[slug] || 0); alert("Počet uložený ✓"); };
  const humanViews = visits.filter((v) => v.type === "pageview" && !v.is_bot);
  const humanSids = new Set(humanViews.map((v) => v.sid));
  const botEvents = visits.filter((v) => v.is_bot).length;
  const clicks = visits.filter((v) => v.type === "click" && !v.is_bot).length;
  const agg = (arr: any[], key: string): [string, number][] => {
    const m: Record<string, number> = {};
    arr.forEach((v) => { const k = v[key] || "—"; m[k] = (m[k] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  };
  const topPages = agg(humanViews, "path");
  const topRefs = agg(humanViews.filter((v) => v.referrer), "referrer");



  const loadAffs = async () => {
    const r = await fetch("/api/admin/affiliates", { headers: { Authorization: `Bearer ${session.access_token}` } });
    const d = await r.json(); if (d.affiliates) setAffs(d.affiliates);
  };
  const createAff = async () => {
    if (!affForm.name.trim() || !affForm.code.trim()) { setAffMsg("Vyplňte meno aj kód."); return; }
    setAffMsg("Vytváram…");
    const r = await fetch("/api/admin/affiliates", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(affForm) });
    const d = await r.json();
    if (d.ok) { setAffMsg("Partner vytvorený."); setAffForm({ name: "", code: "", commission_pct: 12, discount_pct: 0, discount_mode: "extra", note: "" }); loadAffs(); }
    else setAffMsg(d.error === "invalid" ? "Neplatné meno alebo kód." : "Kód už existuje alebo nastala chyba.");
  };
  const toggleAff = async (a: any) => {
    await fetch("/api/admin/affiliates", { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ id: a.id, active: !a.active }) });
    loadAffs();
  };
  const deleteAff = async (id: string) => {
    if (!confirm("Zmazať tohto partnera? Štatistiky ostanú v objednávkach, len sa už nezobrazí.")) return;
    await fetch(`/api/admin/affiliates?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${session.access_token}` } });
    loadAffs();
  };
  const payoutAff = async (a: any) => {
    const val = prompt(`Koľko € ste vyplatili partnerovi ${a.name}?\n\nNa výplatu: ${a.owed} €`, String(a.owed || 0));
    if (!val) return;
    const amount = Number(String(val).replace(",", "."));
    if (!Number.isFinite(amount) || amount <= 0) { alert("Neplatná suma."); return; }
    const r = await fetch("/api/admin/affiliates/payout", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ affiliate_id: a.id, amount }) });
    const d = await r.json();
    if (d.ok) loadAffs(); else alert("Nepodarilo sa zaznamenať výplatu.");
  };
  const affLink = (code: string) => `https://voyago.sk/?ref=${code}`;

  const loadUps = async () => {
    const r = await fetch("/api/admin/updates", { headers: { Authorization: `Bearer ${session.access_token}` } });
    const d = await r.json(); if (d.updates) setUps(d.updates);
  };
  const saveUp = async () => {
    if (!upForm.title.trim()) { setUpMsg("Zadajte titulok."); return; }
    setUpMsg("Ukladám…");
    const payload = { ...upForm, countries: Array.isArray(upForm.countries) ? upForm.countries : String(upForm.countries).split(",").map((c: string) => c.trim()).filter(Boolean) };
    const r = await fetch("/api/admin/updates", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(payload) });
    const d = await r.json();
    if (d.ok) { setUpMsg("Uložené."); setUpForm(emptyUp); loadUps(); }
    else setUpMsg("Chyba pri ukladaní.");
  };
  const editUp = (u: any) => { setUpForm({ ...u, countries: u.countries || [], keywords: (u.keywords || []).join(", "), published_at: u.published_at ? u.published_at.slice(0, 16) : "" }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const deleteUp = async (id: string) => {
    if (!confirm("Zmazať túto novinku?")) return;
    await fetch(`/api/admin/updates?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${session.access_token}` } });
    loadUps();
  };

  useEffect(() => { if (session && tab === "aff") loadAffs(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);
  useEffect(() => { if (session && tab === "updates") loadUps(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [session, tab]);

  if (!ready) return <div className="container-page py-24 text-center text-ink-soft">Načítavam…</div>;

  if (!supabaseEnabled) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-xl2 border border-brass/35 bg-brass/[0.06] p-8 text-center">
          <Megaphone className="mx-auto text-brass" />
          <h1 className="mt-3 font-display text-2xl font-bold">Admin konzola</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Konzola sa zapne po nastavení Supabase. Pridaj do <code>.env.local</code> premenné
            <code className="mx-1">NEXT_PUBLIC_SUPABASE_URL</code> a <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            spusti SQL zo súboru <code>supabase/schema.sql</code> a vytvor používateľa v Supabase → Authentication.
            Postup je v <code>SETUP.md</code>.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold">Prihlásenie</h1>
          <p className="mt-1 text-sm text-ink-soft">Admin konzola Voyago</p>
          <p className="mt-3 rounded-lg border border-line bg-paper px-3 py-2 font-mono text-[0.68rem] text-ink-soft">
            Projekt: <span className="font-semibold text-ink">{projectHost}</span>
          </p>
          <div className="mt-6 space-y-4">
            <label className="block"><span className="label"><span>E-mail</span></span>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block"><span className="label"><span>Heslo</span></span>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
            </label>
            {authErr && <p className="err">{authErr}</p>}
            <button onClick={login} className="btn-primary w-full justify-center">Prihlásiť sa</button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Voyago konzola</h1>
          <p className="mt-1 font-mono text-[0.68rem] text-ink-soft">Projekt: <span className="font-semibold text-ink">{projectHost}</span></p>
        </div>
        <button onClick={logout} className="btn-ghost"><LogOut size={15} /> Odhlásiť</button>
      </div>

      <div className="mt-6 flex items-center gap-2 border-b border-line">
        <button onClick={() => setTab("ann")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "ann" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Megaphone size={15} /> Oznamy</button>
        <button onClick={() => setTab("apps")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "apps" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Inbox size={15} /> Žiadosti</button>
        <button onClick={() => setTab("disc")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "disc" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Percent size={15} /> Zľavy</button>
        <button onClick={() => setTab("promo")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "promo" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Ticket size={15} /> Promo kódy</button>
        <button onClick={() => setTab("traffic")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "traffic" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Activity size={15} /> Analytika</button>
        <button onClick={() => setTab("stats")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "stats" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Globe size={15} /> Krajiny</button>
        <button onClick={() => setTab("chat")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "chat" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><MessageCircle size={15} /> Chat</button>
        <button onClick={() => setTab("aff")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "aff" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Users size={15} /> Affiliate</button>
        <button onClick={() => setTab("updates")} className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${tab === "updates" ? "border-brass text-ink" : "border-transparent text-ink-soft hover:text-ink"}`}><Newspaper size={15} /> Blog & Novinky</button>
        {tab === "ann" && <button onClick={() => setDraft({ ...EMPTY })} className="btn-primary ml-auto !py-2"><Plus size={15} /> Nový oznam</button>}
        {tab === "apps" && <button onClick={loadApps} className="btn-ghost ml-auto !py-2">Obnoviť</button>}
      </div>

      {tab === "chat" && <ChatAdmin />}

      {tab === "aff" && (
        <div className="mt-8 space-y-6">
          {/* Vytvoriť partnera */}
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <p className="font-semibold text-ink">Nový partner (influencer / firma)</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-ink-soft">Meno / značka partnera</label>
                <input value={affForm.name} onChange={(e) => setAffForm({ ...affForm, name: e.target.value })} placeholder="napr. Janko Cestovateľ" className="input mt-1 w-full" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-soft">Partnerský kód (do odkazu)</label>
                <input value={affForm.code} onChange={(e) => setAffForm({ ...affForm, code: e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "") })} placeholder="napr. JANKO" className="input mt-1 w-full font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-soft">Provízia % (zo servisného poplatku)</label>
                <input type="number" value={affForm.commission_pct} onChange={(e) => setAffForm({ ...affForm, commission_pct: Number(e.target.value) })} className="input mt-1 w-full" />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-soft">Zľava pre zákazníka %</label>
                <input type="number" value={affForm.discount_pct} onChange={(e) => setAffForm({ ...affForm, discount_pct: Number(e.target.value) })} className="input mt-1 w-full" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-soft">Ako sa zľava zaúčtuje</label>
                <select value={affForm.discount_mode} onChange={(e) => setAffForm({ ...affForm, discount_mode: e.target.value })} className="input mt-1 w-full">
                  <option value="extra">Zľava navyše — provízia partnera ostáva plná, zľavu hradíme my</option>
                  <option value="from_commission">Zľava z provízie — zľava sa odpočíta z provízie partnera</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-soft">Poznámka (voliteľné)</label>
                <input value={affForm.note} onChange={(e) => setAffForm({ ...affForm, note: e.target.value })} placeholder="kontakt, dohoda…" className="input mt-1 w-full" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button onClick={createAff} className="btn-primary !py-2.5">Vytvoriť partnera</button>
              {affForm.discount_pct > 0 && <span className="text-xs text-ink-soft">Automaticky sa vytvorí aj zľavový kód <b className="font-mono">{affForm.code || "KÓD"}</b> ({affForm.discount_pct} %).</span>}
              {affMsg && <span className="text-sm text-ink-soft">{affMsg}</span>}
            </div>
          </div>

          {/* Zoznam partnerov + štatistiky */}
          <div className="rounded-xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-semibold text-ink">Partneri ({affs.length})</p>
              <button onClick={loadAffs} className="btn-ghost !py-1.5 text-xs">Obnoviť</button>
            </div>
            {affs.length === 0 && <p className="px-4 py-4 text-sm text-ink-soft">Zatiaľ žiadni partneri. Vytvorte prvého vyššie.</p>}
            {affs.map((a) => (
              <div key={a.id} className="border-b border-line-soft p-4 last:border-b-0">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{a.name} {!a.active && <span className="ml-1 rounded bg-line-soft px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-ink-soft">neaktívny</span>}</p>
                    <button onClick={() => { navigator.clipboard?.writeText(affLink(a.code)); setCopiedCode(a.code); setTimeout(() => setCopiedCode(""), 1500); }} className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-xs text-brass hover:underline">
                      {affLink(a.code)} {copiedCode === a.code ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  <button onClick={() => toggleAff(a)} className="btn-ghost !px-2.5 !py-1.5" title={a.active ? "Deaktivovať" : "Aktivovať"}><Power size={14} /></button>
                  <button onClick={() => deleteAff(a.id)} className="btn-ghost !px-2.5 !py-1.5 text-terra hover:bg-terra/10" title="Zmazať"><Trash2 size={14} /></button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Návštevy</p><p className="font-display text-lg font-bold text-ink">{a.visits}</p></div>
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Objednávky</p><p className="font-display text-lg font-bold text-ink">{a.orders}</p></div>
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Zaplatené</p><p className="font-display text-lg font-bold text-green">{a.paidOrders}</p></div>
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Obrat</p><p className="font-display text-lg font-bold text-ink">{a.revenue} €</p></div>
                </div>

                {/* Provízie a výplaty */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Zarobil celkom</p><p className="font-display text-lg font-bold text-ink">{a.commission} €</p></div>
                  <div className="rounded-lg bg-paper/50 px-3 py-2"><p className="text-[0.62rem] uppercase text-ink-soft">Už vyplatené</p><p className="font-display text-lg font-bold text-ink-soft">{a.paidOut} €</p></div>
                  <div className={`rounded-lg px-3 py-2 ${a.owed > 0 ? "bg-brass/12" : "bg-paper/50"}`}>
                    <p className={`text-[0.62rem] uppercase ${a.owed > 0 ? "text-brass" : "text-ink-soft"}`}>Na výplatu</p>
                    <p className={`font-display text-lg font-bold ${a.owed > 0 ? "text-brass" : "text-ink-soft"}`}>{a.owed} €</p>
                  </div>
                </div>

                {/* Rozpis výpočtu */}
                <div className="mt-2 rounded-lg border border-line-soft bg-paper/30 px-3 py-2 text-xs text-ink-soft">
                  <p className="font-semibold text-ink">Ako sa provízia počíta</p>
                  <p className="mt-1">
                    Servisný poplatok zo zaplatených objednávok: <b className="text-ink">{a.serviceBase} €</b> × sadzba <b className="text-ink">{a.commission_pct} %</b> = <b className="text-ink">{Math.round(a.serviceBase * a.commission_pct) / 100} €</b>
                    {a.discountDeducted > 0 && <> − zľava zákazníka <b className="text-ink">{a.discountDeducted} €</b> (hradí partner)</>}
                    {" "}→ provízia <b className="text-brass">{a.commission} €</b>
                  </p>
                  <p className="mt-1">
                    Zarobil {a.commission} € − vyplatené {a.paidOut} € = <b className={a.owed > 0 ? "text-brass" : "text-ink"}>na výplatu {a.owed} €</b>
                  </p>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button onClick={() => payoutAff(a)} disabled={a.owed <= 0} className="btn-ghost !py-1.5 text-xs disabled:opacity-45">Zaznamenať výplatu</button>
                  <p className="text-xs text-ink-soft">
                    Provízia {a.commission_pct} %{a.discount_pct > 0 ? ` · zľava pre zákazníka ${a.discount_pct} % (${a.discount_mode === "from_commission" ? "z provízie" : "navyše"})` : " · bez zľavy"}
                    {a.note ? ` · ${a.note}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "updates" && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Editor príspevku */}
          <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink">{upForm.id ? "Upraviť príspevok" : "Nový príspevok"}</p>
              {upForm.id && <button onClick={() => setUpForm(emptyUp)} className="text-xs text-ink-soft hover:text-ink">+ Nový</button>}
            </div>

            {/* Prepínač blog / novinka */}
            <div className="mt-3 inline-flex rounded-lg border border-line p-0.5">
              <button onClick={() => setUpForm({ ...upForm, kind: "update" })} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${upForm.kind === "update" ? "bg-brass text-navy" : "text-ink-soft hover:text-ink"}`}>Novinka</button>
              <button onClick={() => setUpForm({ ...upForm, kind: "blog" })} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${upForm.kind === "blog" ? "bg-brass text-navy" : "text-ink-soft hover:text-ink"}`}>Blog / sprievodca</button>
            </div>
            <p className="mt-2 text-xs text-ink-soft">Text: prázdny riadok = odsek · <code className="rounded bg-paper px-1">## Nadpis</code> · <code className="rounded bg-paper px-1">- odrážka</code>. Oboje sa zobrazuje na stránke <b>Blog</b>; novinky sa navyše ukazujú v sekcii Novinky.</p>

            <input value={upForm.title} onChange={(e) => setUpForm({ ...upForm, title: e.target.value })} placeholder={upForm.kind === "blog" ? "Titulok článku" : "Titulok novinky (napr. DV-2027 registrácia odložená)"} className="input mt-4 w-full" />
            <input value={upForm.summary} onChange={(e) => setUpForm({ ...upForm, summary: e.target.value })} placeholder="Krátky perex (1–2 vety, zobrazí sa v zozname)" className="input mt-2 w-full" />

            {/* Blog: obrázok, štítok, čas čítania */}
            {upForm.kind === "blog" && (
              <div className="mt-2 grid gap-2 sm:grid-cols-[2fr_1fr_auto]">
                <input value={upForm.image} onChange={(e) => setUpForm({ ...upForm, image: e.target.value })} placeholder="URL úvodného obrázka" className="input w-full" />
                <input value={upForm.tag} onChange={(e) => setUpForm({ ...upForm, tag: e.target.value })} placeholder="Štítok (USA · ESTA)" className="input w-full" />
                <input type="number" min={1} max={60} value={upForm.read_mins} onChange={(e) => setUpForm({ ...upForm, read_mins: Number(e.target.value) })} className="input w-20" title="Min. čítania" />
              </div>
            )}

            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-ink-soft">{upForm.kind === "blog" ? "Kategória" : "Typ novinky"}</label>
                <select value={upForm.category} onChange={(e) => setUpForm({ ...upForm, category: e.target.value })} className="input mt-1 w-full">
                  <option value="general">Všeobecné</option>
                  <option value="delay">Odklad / pozastavenie</option>
                  <option value="new_requirement">Nová požiadavka</option>
                  <option value="price">Zmena ceny</option>
                  <option value="closure">Uzávierka / obmedzenie</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-soft">Dôležitosť (farba štítku)</label>
                <select value={upForm.severity} onChange={(e) => setUpForm({ ...upForm, severity: e.target.value })} className="input mt-1 w-full">
                  <option value="info">Info (modrá)</option>
                  <option value="warning">Upozornenie (zlatá)</option>
                  <option value="critical">Kritické (červená)</option>
                </select>
              </div>
            </div>

            {/* Krajiny — dropdown s viacnásobným výberom (klik = pridať/odobrať) */}
            <div className="mt-3">
              <label className="text-xs font-semibold text-ink-soft">Ktorých krajín sa týka</label>
              <div className="mt-1 flex flex-wrap gap-1.5 rounded-lg border border-line bg-paper/40 p-2">
                {COUNTRY_OPTIONS.map((c) => {
                  const on = (upForm.countries || []).includes(c.name);
                  return (
                    <button
                      key={c.code}
                      onClick={() => setUpForm({ ...upForm, countries: on ? upForm.countries.filter((x: string) => x !== c.name) : [...(upForm.countries || []), c.name] })}
                      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${on ? "bg-brass text-navy" : "bg-surface text-ink-soft hover:text-ink"}`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Priradenie k destinácii */}
            <div className="mt-3">
              <label className="text-xs font-semibold text-ink-soft">Priradiť k destinácii (zobrazí sa na jej stránke)</label>
              <select value={upForm.destination_slug} onChange={(e) => setUpForm({ ...upForm, destination_slug: e.target.value })} className="input mt-1 w-full">
                <option value="">Bez priradenia</option>
                {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.destination.sk} — {p.name.sk}</option>)}
              </select>
            </div>

            <textarea value={upForm.body} onChange={(e) => setUpForm({ ...upForm, body: e.target.value })} rows={9} placeholder={"## O čo ide\n\nText…\n\n- dôležitý bod\n- ďalší bod"} className="input mt-3 w-full font-mono text-sm" />
            {upForm.kind === "update" && (
              <textarea value={upForm.restrictions} onChange={(e) => setUpForm({ ...upForm, restrictions: e.target.value })} rows={2} placeholder="Obmedzenia a dopad (koho a ako sa to týka)" className="input mt-2 w-full" />
            )}

            {/* SEO meta polia */}
            <div className="mt-3 rounded-lg border border-line-soft bg-paper/40 p-3">
              <p className="text-xs font-semibold text-ink">SEO (voliteľné — ak nevyplníte, použije sa titulok a perex)</p>
              <input value={upForm.seo_title} onChange={(e) => setUpForm({ ...upForm, seo_title: e.target.value })} placeholder="SEO titulok" className="input mt-2 w-full" />
              <input value={upForm.meta_description} onChange={(e) => setUpForm({ ...upForm, meta_description: e.target.value })} placeholder="Meta popis (max ~160 znakov)" className="input mt-2 w-full" />
              <input value={upForm.keywords} onChange={(e) => setUpForm({ ...upForm, keywords: e.target.value })} placeholder="Kľúčové slová oddelené čiarkou" className="input mt-2 w-full" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <input value={upForm.source_url} onChange={(e) => setUpForm({ ...upForm, source_url: e.target.value })} placeholder="Odkaz na zdroj (voliteľné)" className="input w-full" />
              <input type="datetime-local" value={upForm.published_at} onChange={(e) => setUpForm({ ...upForm, published_at: e.target.value })} className="input w-full" />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button onClick={saveUp} className="btn-primary inline-flex items-center gap-2 !py-2.5"><Save size={15} /> {upForm.id ? "Uložiť zmeny" : "Uverejniť"}</button>
              <label className="flex items-center gap-2 text-sm text-ink-soft"><input type="checkbox" checked={upForm.published} onChange={(e) => setUpForm({ ...upForm, published: e.target.checked })} /> Zverejnené</label>
              {upMsg && <span className="text-sm text-ink-soft">{upMsg}</span>}
            </div>
          </div>

          {/* Zoznam príspevkov */}
          <div className="rounded-xl border border-line bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-semibold text-ink">Príspevky ({ups.length})</p>
              <button onClick={loadUps} className="btn-ghost !py-1.5 text-xs">Obnoviť</button>
            </div>
            {ups.length === 0 && <p className="px-4 py-4 text-sm text-ink-soft">Zatiaľ žiadne. Vytvorte prvý vľavo.</p>}
            <div className="max-h-[36rem] divide-y divide-line-soft overflow-y-auto">
              {ups.map((u) => (
                <div key={u.id} className="flex items-start gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded px-1.5 py-0.5 text-[0.55rem] font-bold uppercase ${u.kind === "blog" ? "bg-teal/15 text-teal" : "bg-brass/15 text-brass"}`}>{u.kind === "blog" ? "Blog" : "Novinka"}</span>
                      {!u.published && <span className="rounded bg-line-soft px-1.5 py-0.5 text-[0.58rem] font-bold uppercase text-ink-soft">skryté</span>}
                      <a href={`/blog/${u.slug}`} target="_blank" className="truncate text-sm font-semibold text-ink hover:text-brass">{u.title}</a>
                    </div>

                    <p className="mt-0.5 text-xs text-ink-soft">{(u.countries || []).join(", ") || "bez krajín"} · {new Date(u.published_at).toLocaleDateString("sk-SK")}</p>
                  </div>
                  <button onClick={() => editUp(u)} className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-ink-soft hover:bg-paper hover:text-ink">Upraviť</button>
                  <button onClick={() => deleteUp(u.id)} className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-terra hover:bg-terra/10">Zmazať</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "ann" && (
      <div className="mt-8 space-y-3">
        {list.length === 0 && <p className="text-ink-soft">Zatiaľ žiadne oznamy. Vytvor prvý cez „Nový oznam".</p>}
        {list.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-card">
            <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider ${a.enabled ? "bg-green/12 text-green" : "bg-line text-ink-soft"}`}>
              {a.enabled ? "Aktívny" : "Vypnutý"}
            </span>
            <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">{a.placement}</span>
            <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-brass">{a.tone}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-ink">{a.title}</p>
              <p className="truncate text-xs text-ink-soft">{a.message}</p>
            </div>
            <button onClick={() => toggle(a)} className="btn-ghost !px-3 !py-2" title="Zapnúť/Vypnúť">{a.enabled ? <EyeOff size={15} /> : <Eye size={15} />}</button>
            <button onClick={() => setDraft({ ...a, starts_at: a.starts_at ?? null, ends_at: a.ends_at ?? null })} className="btn-ghost !px-3 !py-2"><Pencil size={15} /></button>
            <button onClick={() => remove(a)} className="btn-ghost !px-3 !py-2 !text-terra"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      )}

      {tab === "apps" && (
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Žiadostí" value={String(apps.length)} />
            <Stat label="Zaplatené" value={String(paidCount)} />
            <Stat label="Tržby" value={`${revenue.toFixed(0)} €`} />
            <Stat label="Nové" value={String(apps.filter((a) => a.status === "new").length)} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[180px] flex-1">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hľadať e-mail / ref / krajinu" className="input !mt-0 !pl-9" />
            </div>
            <select value={statusF} onChange={(e) => setStatusF(e.target.value)} className="input !mt-0 !w-auto">
              <option value="all">Všetky stavy</option>
              {ALL_STATUSES.map((st) => <option key={st} value={st}>{statusLabel(st, "sk")}</option>)}
            </select>
            <button onClick={exportCsv} className="btn-ghost"><Download size={15} /> CSV</button>
          </div>
          <div className="mt-4 space-y-3">
          {filteredApps.length === 0 && <p className="text-ink-soft">Žiadne žiadosti.</p>}
          {filteredApps.map((a) => (
            <div key={a.id} className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">{new Date(a.created_at).toLocaleString("sk-SK")}</span>
                {a.ref && <span className="font-mono text-[0.6rem] font-bold tracking-wider text-brass">{a.ref}</span>}
                <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider ${a.paid ? "bg-green/12 text-green" : "bg-brass/15 text-brass"}`}>{a.paid ? "zaplatené" : "nezaplatené"}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{a.email || "—"}</p>
                  <p className="truncate text-xs text-ink-soft">{(a.travelers?.length || 0)} cestujúci · {a.product_slug} · {((a.amount_cents || 0) / 100).toFixed(0)} €</p>
                </div>
                <select value={a.status} onChange={(e) => setAppStatus(a.id, e.target.value)} className="input !mt-0 !w-auto !py-1.5 text-xs">
                  {ALL_STATUSES.map((st) => <option key={st} value={st}>{statusLabel(st, "sk")}</option>)}
                </select>
                <button onClick={() => openEmail(a)} className="btn-ghost !px-3 !py-2" title="Poslať e-mail"><Mail size={15} /></button>
                <button onClick={() => setOpen(open === a.id ? null : a.id)} className="btn-ghost !px-3 !py-2"><ChevronDown size={15} className={open === a.id ? "rotate-180" : ""} /></button>
              </div>
              {open === a.id && (
                <div className="mt-4 space-y-4 border-t border-line pt-4">
                  {(a.travelers || []).map((trav: any, idx: number) => (
                    <div key={idx} className="rounded-lg bg-paper/50 p-3">
                      <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-wider text-brass">Cestujúci {idx + 1} · {trav.slug}</p>
                      <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                        {Object.entries(trav.data || {}).map(([k, v]) => (
                          <p key={k} className="text-xs"><span className="text-ink-soft">{k}:</span> <span className="text-ink">{String(v)}</span></p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg border border-line-soft bg-paper/40 p-3 text-xs text-ink-soft">
                    <p>Ref: <span className="font-mono font-semibold text-ink">{a.ref || "—"}</span>{a.promo_code && <> · Promo: <span className="font-mono text-ink">{a.promo_code}</span></>}</p>
                    <p className="mt-1">Súhlas: {a.consent_at ? new Date(a.consent_at).toLocaleString("sk-SK") : "—"} · IP {a.consent_ip || "—"} · VOP {a.consent_vop ? "✓" : "✗"} · GDPR {a.consent_gdpr ? "✓" : "✗"}</p>
                  </div>
                  {(a.files || []).length > 0 && (
                    <div>
                      <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-wider text-brass">Súbory</p>
                      <div className="flex flex-wrap gap-2">
                        {(a.files || []).map((f: string) => (
                          <button key={f} onClick={() => openFile(f)} className="btn-ghost !px-3 !py-1.5 text-xs"><Download size={13} /> {f.split("/").pop()}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 z-[130] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm" onClick={() => setDraft(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-pass" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{draft.id ? "Upraviť oznam" : "Nový oznam"}</h2>
              <button onClick={() => setDraft(null)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-soft hover:bg-paper"><X size={15} /></button>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block"><span className="label"><span>Titulok</span></span>
                <input className="input" value={draft.title || ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </label>
              <label className="block"><span className="label"><span>Text</span></span>
                <input className="input" value={draft.message || ""} onChange={(e) => setDraft({ ...draft, message: e.target.value })} />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block"><span className="label"><span>Umiestnenie</span></span>
                  <select className="input" value={draft.placement} onChange={(e) => setDraft({ ...draft, placement: e.target.value as Placement })}>
                    {PLACEMENTS.map((x) => <option key={x} value={x}>{x === "bar" ? "Horný banner" : "Popup okno"}</option>)}
                  </select>
                </label>
                <label className="block"><span className="label"><span>Štýl</span></span>
                  <select className="input" value={draft.tone} onChange={(e) => setDraft({ ...draft, tone: e.target.value as Tone })}>
                    {TONES.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block"><span className="label"><span>Odkaz (URL)</span></span>
                  <input className="input" placeholder="/green-card" value={draft.link_url || ""} onChange={(e) => setDraft({ ...draft, link_url: e.target.value })} />
                </label>
                <label className="block"><span className="label"><span>Text odkazu</span></span>
                  <input className="input" placeholder="Zistiť viac" value={draft.link_label || ""} onChange={(e) => setDraft({ ...draft, link_label: e.target.value })} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block"><span className="label"><span>Od (voliteľné)</span></span>
                  <input className="input" type="datetime-local" value={toLocal(draft.starts_at)} onChange={(e) => setDraft({ ...draft, starts_at: fromLocal(e.target.value) })} />
                </label>
                <label className="block"><span className="label"><span>Do (prázdne = do odvolania)</span></span>
                  <input className="input" type="datetime-local" value={toLocal(draft.ends_at)} onChange={(e) => setDraft({ ...draft, ends_at: fromLocal(e.target.value) })} />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="block"><span className="label"><span>Priorita</span></span>
                  <input className="input" type="number" value={draft.priority ?? 0} onChange={(e) => setDraft({ ...draft, priority: Number(e.target.value) })} />
                </label>
                <label className="flex items-center gap-2 pt-7 text-sm">
                  <input type="checkbox" checked={!!draft.enabled} onChange={(e) => setDraft({ ...draft, enabled: e.target.checked })} /> Aktívny
                </label>
                <label className="flex items-center gap-2 pt-7 text-sm">
                  <input type="checkbox" checked={!!draft.dismissible} onChange={(e) => setDraft({ ...draft, dismissible: e.target.checked })} /> Zatvárateľný
                </label>
              </div>
            </div>

            {/* ── Vzhľad a efekty (len pre horný banner) ── */}
            <div className="mt-5 rounded-xl border border-line-soft bg-paper/40 p-4">
              <p className="text-sm font-semibold text-ink">Vzhľad a efekty</p>
              <p className="mt-0.5 text-xs text-ink-soft">Platí pre horný banner. Ak nezadáte vlastné farby, použije sa farba podľa štýlu.</p>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Farba pozadia</span>
                  <span className="mt-1 flex items-center gap-2">
                    <input type="color" value={draft.bg_color || "#0A1622"} onChange={(e) => setDraft({ ...draft, bg_color: e.target.value })} className="h-9 w-12 rounded border border-line" />
                    <button onClick={() => setDraft({ ...draft, bg_color: null })} className="text-xs text-ink-soft hover:text-ink">reset</button>
                  </span>
                </label>
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Farba textu</span>
                  <span className="mt-1 flex items-center gap-2">
                    <input type="color" value={draft.text_color || "#EFF1F0"} onChange={(e) => setDraft({ ...draft, text_color: e.target.value })} className="h-9 w-12 rounded border border-line" />
                    <button onClick={() => setDraft({ ...draft, text_color: null })} className="text-xs text-ink-soft hover:text-ink">reset</button>
                  </span>
                </label>
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Hrúbka písma</span>
                  <select value={draft.font_weight || "normal"} onChange={(e) => setDraft({ ...draft, font_weight: e.target.value as any })} className="input mt-1 w-full">
                    <option value="thin">Tenké</option>
                    <option value="normal">Normálne</option>
                    <option value="bold">Hrubé</option>
                  </select>
                </label>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Pohyb textu</span>
                  <select value={draft.animation || "none"} onChange={(e) => setDraft({ ...draft, animation: e.target.value as any })} className="input mt-1 w-full">
                    <option value="none">Žiadny</option>
                    <option value="marquee">Bežiaci text (scroll doľava)</option>
                    <option value="pulse">Pulzovanie</option>
                    <option value="slide">Vsunutie zhora</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Rýchlosť behu (s)</span>
                  <input type="number" min={4} max={60} value={draft.anim_speed ?? 18} onChange={(e) => setDraft({ ...draft, anim_speed: Number(e.target.value) })} className="input mt-1 w-full" />
                </label>
                <label className="text-sm">
                  <span className="text-xs font-semibold text-ink-soft">Pozícia dátumu</span>
                  <select value={draft.date_position || "right"} onChange={(e) => setDraft({ ...draft, date_position: e.target.value as any })} className="input mt-1 w-full">
                    <option value="left">Vľavo</option>
                    <option value="right">Vpravo</option>
                  </select>
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!draft.italic} onChange={(e) => setDraft({ ...draft, italic: e.target.checked })} /> Naklonený text (kurzíva)</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!draft.sticky} onChange={(e) => setDraft({ ...draft, sticky: e.target.checked })} /> Prilepený navrchu (sticky)</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!draft.hover_glow} onChange={(e) => setDraft({ ...draft, hover_glow: e.target.checked })} /> Efekt pri prejdení myšou</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!draft.show_date} onChange={(e) => setDraft({ ...draft, show_date: e.target.checked })} /> Zobraziť dátum</label>
              </div>

              {/* Živý náhľad baru */}
              <div className="mt-4">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Náhľad</p>
                <div
                  className={`overflow-hidden rounded-lg ${draft.hover_glow ? "transition-shadow hover:shadow-[inset_0_0_40px_rgba(201,154,78,0.25)]" : ""}`}
                  style={{ backgroundColor: draft.bg_color || "#0A1622", color: draft.text_color || "#EFF1F0" }}
                >
                  <div className={`flex items-center gap-2 px-4 py-2.5 text-sm ${draft.italic ? "italic" : ""} ${draft.font_weight === "bold" ? "font-bold" : draft.font_weight === "thin" ? "font-light" : ""}`}>
                    {draft.animation === "marquee" ? (
                      <div className="flex-1 overflow-hidden"><span className="ann-marquee inline-block whitespace-nowrap" style={{ animationDuration: `${draft.anim_speed || 18}s` }}>{draft.title || "Titulok"} {draft.message ? "· " + draft.message : ""} <span className="mx-8 opacity-40">•</span> {draft.title || "Titulok"} {draft.message ? "· " + draft.message : ""}</span></div>
                    ) : (
                      <span className="flex-1">{draft.title || "Titulok oznamu"}{draft.message ? " — " + draft.message : ""}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setDraft(null)} className="btn-ghost">Zrušiť</button>
              <button onClick={save} disabled={busy} className="btn-primary"><Save size={15} /> Uložiť</button>
            </div>
          </div>
        </div>
      )}

      {tab === "disc" && (
        <div className="mt-8 space-y-2">
          <p className="mb-3 text-sm text-ink-soft">Percentuálna zľava pre jednotlivé krajiny. Prejaví sa na webe — v cenách aj pri platbe.</p>
          {PRODUCTS.map((pr) => {
            const d = discMap[pr.slug] || { percent: 0, active: false };
            return (
              <div key={pr.slug} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3.5 shadow-card">
                <span className="min-w-0 flex-1 truncate font-semibold text-ink">{pr.destination.sk} <span className="font-mono text-xs text-ink-soft">· {pr.slug}</span></span>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={d.active} onChange={(e) => setDisc(pr.slug, { active: e.target.checked })} /> Aktívna</label>
                <div className="flex items-center gap-1">
                  <input type="number" min={0} max={90} value={d.percent} onChange={(e) => setDisc(pr.slug, { percent: Number(e.target.value) })} className="input !mt-0 !w-20 !py-1.5 text-sm" />
                  <span className="text-ink-soft">%</span>
                </div>
                <button onClick={() => saveDisc(pr.slug)} className="btn-primary !px-4 !py-2 text-sm"><Save size={14} /> Uložiť</button>
              </div>
            );
          })}
        </div>
      )}

      {tab === "stats" && (
        <div className="mt-8 space-y-2">
          <p className="mb-3 text-sm text-ink-soft">
            Počet vybavených žiadostí pre každú krajinu — zobrazuje sa na webe v sekcii dôvery. Pri označení žiadosti ako <strong>done</strong> v záložke Žiadosti sa číslo automaticky zvýši o 1.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Krajín" value={String(PRODUCTS.length)} />
            <Stat label="Vybavených spolu" value={String(Object.values(statMap).reduce((a, b) => a + (b || 0), 0))} />
          </div>
          <div className="mt-3 space-y-2">
            {PRODUCTS.map((pr) => (
              <div key={pr.slug} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3.5 shadow-card">
                <span className="text-2xl">{pr.flag}</span>
                <span className="min-w-0 flex-1 truncate font-semibold text-ink">{pr.destination.sk} <span className="font-mono text-xs text-ink-soft">· {pr.name.sk}</span></span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-ink-soft">Vybavené</span>
                  <input
                    type="number"
                    min={0}
                    value={statMap[pr.slug] ?? 0}
                    onChange={(e) => setStatMap((m) => ({ ...m, [pr.slug]: Math.max(0, Number(e.target.value) || 0) }))}
                    className="input !mt-0 !w-28 !py-1.5 text-sm"
                  />
                </div>
                <button onClick={() => saveStat(pr.slug)} className="btn-primary !px-4 !py-2 text-sm"><Save size={14} /> Uložiť</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "promo" && (
        <div className="mt-8">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
            <p className="mb-3 font-semibold text-ink">Nový promo kód</p>
            <div className="flex flex-wrap items-end gap-3">
              <label className="block"><span className="label"><span>Kód</span></span>
                <input className="input !mt-0 !w-40 uppercase" value={newPromo.code} onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })} placeholder="LETO10" />
              </label>
              <label className="block"><span className="label"><span>Zľava %</span></span>
                <input type="number" min={1} max={90} className="input !mt-0 !w-24" value={newPromo.percent} onChange={(e) => setNewPromo({ ...newPromo, percent: Number(e.target.value) })} />
              </label>
              <label className="block"><span className="label"><span>Platí do</span></span>
                <input type="date" className="input !mt-0" value={newPromo.expires_at} onChange={(e) => setNewPromo({ ...newPromo, expires_at: e.target.value })} />
              </label>
              <label className="block"><span className="label"><span>Max. použití</span></span>
                <input type="number" min={1} className="input !mt-0 !w-28" value={newPromo.max_uses} onChange={(e) => setNewPromo({ ...newPromo, max_uses: e.target.value })} placeholder="∞" />
              </label>
              <label className="flex items-center gap-2 pb-2 text-sm"><input type="checkbox" checked={newPromo.active} onChange={(e) => setNewPromo({ ...newPromo, active: e.target.checked })} /> Aktívny</label>
              <button onClick={addPromo} className="btn-primary"><Plus size={15} /> Pridať</button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {promoList.length === 0 && <p className="text-ink-soft">Zatiaľ žiadne promo kódy.</p>}
            {promoList.map((pc) => (
              <div key={pc.code} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3.5 shadow-card">
                <span className="font-mono text-base font-bold text-ink">{pc.code}</span>
                <span className="rounded-full bg-terra/12 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-terra">−{pc.percent}%</span>
                <span className="text-xs text-ink-soft">{pc.used || 0}{pc.max_uses ? ` / ${pc.max_uses}` : ""} použití{pc.expires_at ? ` · do ${new Date(pc.expires_at).toLocaleDateString("sk-SK")}` : ""}</span>
                <div className="ml-auto flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={pc.active} onChange={(e) => togglePromo(pc.code, e.target.checked)} /> {pc.active ? "Aktívny" : "Neaktívny"}</label>
                  <button onClick={() => delPromo(pc.code)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-terra hover:bg-terra/[0.06]"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "traffic" && (
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Zobrazenia (ľudia)" value={String(humanViews.length)} />
            <Stat label="Návštevníci" value={String(humanSids.size)} />
            <Stat label="Kliknutia" value={String(clicks)} />
            <Stat label="Boti (udalosti)" value={String(botEvents)} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <p className="mb-1 font-semibold text-ink">Najnavštevovanejšie stránky</p>
              {topPages.length === 0 ? <p className="text-sm text-ink-soft">—</p> : topPages.map(([k, n]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-line-soft py-1.5 text-sm"><span className="truncate text-ink-soft">{k}</span><span className="font-mono text-ink">{n}</span></div>
              ))}
            </div>
            <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <p className="mb-1 font-semibold text-ink">Zdroje návštev</p>
              {topRefs.length === 0 ? <p className="text-sm text-ink-soft">Priame návštevy</p> : topRefs.map(([k, n]) => (
                <div key={k} className="flex justify-between gap-3 border-t border-line-soft py-1.5 text-sm"><span className="truncate text-ink-soft">{k}</span><span className="font-mono text-ink">{n}</span></div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-line bg-surface p-4 shadow-card">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-semibold text-ink">Posledná aktivita</p>
              <button onClick={loadVisits} className="btn-ghost !py-1.5 text-xs">Obnoviť</button>
            </div>
            <div>
              {visits.length === 0 && <p className="py-2 text-sm text-ink-soft">Zatiaľ žiadne dáta — naplní sa reálnymi návštevami (najlepšie po nasadení).</p>}
              {visits.slice(0, 60).map((v) => (
                <div key={v.id} className="flex flex-wrap items-center gap-2 border-t border-line-soft py-1.5 text-xs">
                  <span className="font-mono text-ink-soft">{new Date(v.created_at).toLocaleTimeString("sk-SK")}</span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[0.55rem] font-bold uppercase ${v.is_bot ? "bg-terra/12 text-terra" : "bg-green/12 text-green"}`}>{v.is_bot ? "bot" : "človek"}</span>
                  {v.country && <span className="font-mono text-ink-soft">{v.country}</span>}
                  <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[0.55rem] text-ink-soft">{v.type}</span>
                  <span className="min-w-0 flex-1 truncate text-ink">{v.type === "click" ? `„${v.label}" → ${v.href || v.path}` : v.path}</span>
                  <span className="font-mono text-[0.55rem] text-ink-soft/60">{(v.sid || "").slice(0, 6)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {emailFor && (
        <div className="fixed inset-0 z-[140] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm" onClick={() => setEmailFor(null)}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-pass" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Poslať e-mail</h2>
              <button onClick={() => setEmailFor(null)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-soft hover:bg-paper"><X size={15} /></button>
            </div>
            <p className="mt-1 text-sm text-ink-soft">Pre: <span className="font-semibold text-ink">{emailFor.email || "—"}</span></p>
            <div className="mt-5 space-y-4">
              <label className="block"><span className="label"><span>Šablóna</span></span>
                <select className="input" value={emailTpl} onChange={(e) => pickTpl(e.target.value as EmailTemplate)}>
                  {(Object.keys(TEMPLATES) as EmailTemplate[]).map((k) => <option key={k} value={k}>{TEMPLATES[k].label}</option>)}
                </select>
              </label>
              <label className="block"><span className="label"><span>Predmet</span></span>
                <input className="input" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Predmet e-mailu" />
              </label>
              <label className="block"><span className="label"><span>Správa (voliteľné — doplní sa do tela)</span></span>
                <textarea className="input min-h-[110px]" value={emailMsg} onChange={(e) => setEmailMsg(e.target.value)} />
              </label>
              <div>
                <span className="label"><span>Prílohy (PDF, JPG…)</span></span>
                <input type="file" multiple onChange={(e) => addFiles(e.target.files)} className="text-xs text-ink-soft file:mr-2 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper" />
                {emailFiles.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {emailFiles.map((f, idx) => (
                      <li key={idx} className="flex items-center justify-between rounded-lg bg-paper px-3 py-1.5 text-xs">
                        <span className="truncate">{f.filename}</span>
                        <button onClick={() => setEmailFiles((pr) => pr.filter((_, i) => i !== idx))} className="text-terra"><X size={13} /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEmailFor(null)} className="btn-ghost">Zrušiť</button>
              <button onClick={sendEmail} disabled={sending} className="btn-primary"><Send size={15} /> {sending ? "Odosielam…" : "Odoslať"}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
