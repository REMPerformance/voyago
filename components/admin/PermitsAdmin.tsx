"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus, Search, ChevronDown, Save, Trash2, X, Upload, Download, Loader2,
  ShieldCheck, Clock, AlertTriangle, CalendarClock, Mail, FileText, Link2,
} from "lucide-react";
import {
  fetchPermits, savePermit, deletePermit, uploadPermitDoc, removePermitDoc,
  validity, validityChip, permitStatusLabel, PERMIT_STATUSES, daysLeft,
  type Permit, type PermitDoc, type PermitStatus,
} from "@/lib/permits";
import { fileSignedUrl } from "@/lib/applications";
import { PRODUCTS } from "@/config/products";

const EMPTY: Partial<Permit> = {
  holder_name: "", email: "", phone: "", product_slug: "", permit_number: "",
  status: "pending", issued_at: "", valid_from: "", valid_to: "",
  entries: "", max_stay: "", notes: "", documents: [], ref: "",
};

function Stat({ label, value, icon: Icon, tone }: { label: string; value: string; icon: any; tone: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span className={`grid h-7 w-7 place-items-center rounded-lg ${tone}`}><Icon size={14} /></span>
        <p className="font-mono text-[0.58rem] uppercase tracking-wider text-ink-soft">{label}</p>
      </div>
      <p className="mt-1.5 font-display text-2xl font-extrabold text-ink">{value}</p>
    </div>
  );
}

export function PermitsAdmin({ apps }: { apps: any[] }) {
  const [list, setList] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState("all");
  const [validF, setValidF] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Permit> | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [importFrom, setImportFrom] = useState("");

  const load = async () => { setLoading(true); setList(await fetchPermits()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    let valid = 0, soon = 0, expired = 0;
    list.forEach((p) => {
      const v = validity(p);
      if (v.kind === "valid" || v.kind === "future") valid++;
      else if (v.kind === "soon") soon++;
      else if (v.kind === "expired") expired++;
    });
    return { total: list.length, valid, soon, expired };
  }, [list]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return list.filter((p) => {
      if (statusF !== "all" && p.status !== statusF) return false;
      if (validF !== "all" && validity(p).kind !== validF) return false;
      if (!s) return true;
      return [p.holder_name, p.email, p.ref, p.permit_number, p.product_slug, p.phone]
        .some((x) => (x || "").toLowerCase().includes(s));
    });
  }, [list, q, statusF, validF]);

  const startNew = () => { setDraft({ ...EMPTY }); setImportFrom(""); };

  /** Predvyplní formulár z existujúcej žiadosti. */
  const importApp = (id: string) => {
    setImportFrom(id);
    const a = apps.find((x) => x.id === id);
    if (!a) return;
    const trav = a.travelers?.[0]?.data || {};
    const name = [trav.givenNames || trav.firstName || trav.given_names, trav.surname || trav.lastName]
      .filter(Boolean).join(" ").trim();
    setDraft((d) => ({
      ...(d || EMPTY),
      application_id: a.id,
      ref: a.ref || "",
      email: a.email || "",
      phone: trav.phone || "",
      product_slug: a.product_slug || "",
      holder_name: name || a.email || "",
    }));
  };

  const save = async () => {
    if (!draft) return;
    if (!(draft.holder_name || "").trim()) { alert("Zadajte meno držiteľa."); return; }
    if (!(draft.product_slug || "").trim()) { alert("Vyberte typ povolenia."); return; }
    setBusy(true);
    const saved = await savePermit(draft);
    setBusy(false);
    if (!saved) { alert("Uloženie zlyhalo. Skontrolujte, či je v Supabase vytvorená tabuľka permits."); return; }
    setDraft(null); load();
  };

  const remove = async (p: Permit) => {
    if (!confirm(`Zmazať evidenciu pre ${p.holder_name}?`)) return;
    await deletePermit(p.id); load();
  };

  const addDocs = async (files: FileList | null) => {
    if (!files?.length || !draft) return;
    setUploading(true);
    const docs: PermitDoc[] = [];
    for (const f of Array.from(files)) {
      const d = await uploadPermitDoc(f);
      if (d) docs.push(d);
    }
    setUploading(false);
    setDraft({ ...draft, documents: [...(draft.documents || []), ...docs] });
  };

  const dropDoc = async (doc: PermitDoc) => {
    if (!draft) return;
    if (!confirm(`Zmazať dokument ${doc.name}?`)) return;
    await removePermitDoc(doc.path);
    setDraft({ ...draft, documents: (draft.documents || []).filter((d) => d.path !== doc.path) });
  };

  const openDoc = async (path: string) => { const u = await fileSignedUrl(path); if (u) window.open(u, "_blank"); };

  const mailTo = (p: Permit) => {
    const left = daysLeft(p.valid_to);
    const subject = `Voyago — vaše povolenie ${p.permit_number || p.ref || ""}`.trim();
    const body = left !== null && left >= 0
      ? `Dobrý deň,\n\npripomíname, že Vaše povolenie (${p.product_slug}) je platné do ${p.valid_to}. Zostáva ${left} dní.\n\nS pozdravom\nVoyago`
      : `Dobrý deň,\n\nkontaktujeme Vás ohľadom Vášho povolenia (${p.product_slug}).\n\nS pozdravom\nVoyago`;
    window.location.href = `mailto:${p.email || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const F = ({ label, k, type = "text" }: { label: string; k: keyof Permit; type?: string }) => (
    <label className="block">
      <span className="label"><span>{label}</span></span>
      <input type={type} className="input" value={(draft?.[k] as string) || ""}
        onChange={(e) => setDraft({ ...draft!, [k]: e.target.value })} />
    </label>
  );

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Evidovaných" value={String(stats.total)} icon={FileText} tone="bg-ink/8 text-ink-soft" />
        <Stat label="Platné" value={String(stats.valid)} icon={ShieldCheck} tone="bg-green/12 text-green" />
        <Stat label="Končia do 30 dní" value={String(stats.soon)} icon={Clock} tone="bg-brass/18 text-brass" />
        <Stat label="Expirované" value={String(stats.expired)} icon={AlertTriangle} tone="bg-terra/12 text-terra" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[180px] flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hľadať meno / e-mail / ref / číslo povolenia" className="input !mt-0 !pl-9" />
        </div>
        <select value={statusF} onChange={(e) => setStatusF(e.target.value)} className="input !mt-0 !w-auto">
          <option value="all">Všetky stavy</option>
          {PERMIT_STATUSES.map((s) => <option key={s} value={s}>{permitStatusLabel(s)}</option>)}
        </select>
        <select value={validF} onChange={(e) => setValidF(e.target.value)} className="input !mt-0 !w-auto">
          <option value="all">Každá platnosť</option>
          <option value="valid">Platné</option>
          <option value="soon">Končia do 30 dní</option>
          <option value="expired">Expirované</option>
          <option value="future">Ešte nezačali</option>
        </select>
        <button onClick={startNew} className="btn-primary !py-2"><Plus size={15} /> Nový záznam</button>
      </div>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-ink-soft">Načítavam…</p>}
        {!loading && filtered.length === 0 && <p className="text-ink-soft">Žiadne záznamy.</p>}

        {filtered.map((p) => {
          const v = validity(p);
          return (
            <div key={p.id} className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider ${validityChip(v.kind)}`}>{v.label}</span>
                {p.ref && <span className="font-mono text-[0.6rem] font-bold tracking-wider text-brass">{p.ref}</span>}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{p.holder_name}</p>
                  <p className="truncate text-xs text-ink-soft">
                    {p.product_slug}
                    {p.permit_number && <> · č. {p.permit_number}</>}
                    {p.valid_from && p.valid_to && <> · {new Date(p.valid_from).toLocaleDateString("sk-SK")} – {new Date(p.valid_to).toLocaleDateString("sk-SK")}</>}
                    {(p.documents?.length || 0) > 0 && <> · {p.documents!.length} dok.</>}
                  </p>
                </div>
                {p.email && <button onClick={() => mailTo(p)} className="btn-ghost !px-3 !py-2" title="Napísať klientovi"><Mail size={15} /></button>}
                <button onClick={() => { setDraft(p); setImportFrom(""); }} className="btn-ghost !px-3 !py-2" title="Upraviť"><Save size={15} /></button>
                <button onClick={() => setOpen(open === p.id ? null : p.id)} className="btn-ghost !px-3 !py-2"><ChevronDown size={15} className={open === p.id ? "rotate-180" : ""} /></button>
              </div>

              {open === p.id && (
                <div className="mt-4 space-y-3 border-t border-line pt-4">
                  <div className="grid gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
                    <p><span className="text-ink-soft">E-mail:</span> <span className="text-ink">{p.email || "—"}</span></p>
                    <p><span className="text-ink-soft">Telefón:</span> <span className="text-ink">{p.phone || "—"}</span></p>
                    <p><span className="text-ink-soft">Stav:</span> <span className="text-ink">{permitStatusLabel(p.status)}</span></p>
                    <p><span className="text-ink-soft">Vydané:</span> <span className="text-ink">{p.issued_at ? new Date(p.issued_at).toLocaleDateString("sk-SK") : "—"}</span></p>
                    <p><span className="text-ink-soft">Platnosť od:</span> <span className="text-ink">{p.valid_from ? new Date(p.valid_from).toLocaleDateString("sk-SK") : "—"}</span></p>
                    <p><span className="text-ink-soft">Platnosť do:</span> <span className="text-ink">{p.valid_to ? new Date(p.valid_to).toLocaleDateString("sk-SK") : "—"}</span></p>
                    <p><span className="text-ink-soft">Vstupy:</span> <span className="text-ink">{p.entries || "—"}</span></p>
                    <p><span className="text-ink-soft">Max. pobyt:</span> <span className="text-ink">{p.max_stay || "—"}</span></p>
                  </div>

                  {p.notes && (
                    <div className="rounded-lg border border-line-soft bg-paper/40 p-3">
                      <p className="mb-1 font-mono text-[0.58rem] uppercase tracking-wider text-brass">Poznámky</p>
                      <p className="whitespace-pre-wrap text-xs text-ink-soft">{p.notes}</p>
                    </div>
                  )}

                  {(p.documents?.length || 0) > 0 && (
                    <div>
                      <p className="mb-2 font-mono text-[0.58rem] uppercase tracking-wider text-brass">Dokumenty ({p.documents!.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {p.documents!.map((d) => (
                          <button key={d.path} onClick={() => openDoc(d.path)} className="btn-ghost !px-3 !py-1.5 text-xs"><Download size={13} /> {d.name}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button onClick={() => { setDraft(p); setImportFrom(""); }} className="btn-ghost !px-3 !py-1.5 text-xs"><Save size={13} /> Upraviť</button>
                    <button onClick={() => remove(p)} className="btn-ghost !px-3 !py-1.5 text-xs text-terra"><Trash2 size={13} /> Zmazať</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal — nový / úprava záznamu */}
      {draft && (
        <div className="fixed inset-0 z-[130] grid place-items-center bg-navy/55 p-4 backdrop-blur-sm" onClick={() => setDraft(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-pass" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{draft.id ? "Upraviť evidenciu" : "Nový záznam evidencie"}</h2>
              <button onClick={() => setDraft(null)} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-soft hover:bg-paper"><X size={15} /></button>
            </div>

            {!draft.id && (
              <label className="mt-5 block">
                <span className="label"><span><Link2 size={11} className="mr-1 inline" /> Predvyplniť zo žiadosti (voliteľné)</span></span>
                <select className="input" value={importFrom} onChange={(e) => importApp(e.target.value)}>
                  <option value="">— vybrať žiadosť —</option>
                  {apps.map((a) => (
                    <option key={a.id} value={a.id}>{a.ref || a.id.slice(0, 8)} · {a.email} · {a.product_slug}</option>
                  ))}
                </select>
              </label>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <F label="Meno držiteľa *" k="holder_name" />
              <label className="block">
                <span className="label"><span>Typ povolenia *</span></span>
                <select className="input" value={draft.product_slug || ""} onChange={(e) => setDraft({ ...draft, product_slug: e.target.value })}>
                  <option value="">— vybrať —</option>
                  {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.slug}</option>)}
                  <option value="us-greencard">us-greencard</option>
                </select>
              </label>
              <F label="E-mail" k="email" type="email" />
              <F label="Telefón" k="phone" />
              <F label="Referencia (VYG-…)" k="ref" />
              <F label="Číslo povolenia" k="permit_number" />
              <label className="block">
                <span className="label"><span>Stav</span></span>
                <select className="input" value={draft.status || "pending"} onChange={(e) => setDraft({ ...draft, status: e.target.value as PermitStatus })}>
                  {PERMIT_STATUSES.map((s) => <option key={s} value={s}>{permitStatusLabel(s)}</option>)}
                </select>
              </label>
              <F label="Dátum vydania" k="issued_at" type="date" />
              <F label="Platnosť od" k="valid_from" type="date" />
              <F label="Platnosť do" k="valid_to" type="date" />
              <F label="Počet vstupov" k="entries" />
              <F label="Max. dĺžka pobytu" k="max_stay" />
            </div>

            <label className="mt-4 block">
              <span className="label"><span>Poznámky / info</span></span>
              <textarea className="input min-h-[90px]" value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Čo klient má, ako to má, na čo si dať pozor…" />
            </label>

            <div className="mt-4">
              <p className="label"><span>Dokumenty ({(draft.documents || []).length})</span></p>
              <label className="flex items-center gap-3 rounded-xl border-2 border-dashed border-line bg-paper/40 px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper text-teal">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                </span>
                <span className="min-w-0 flex-1 text-sm text-ink-soft">{uploading ? "Nahrávam…" : "Nahrať dokumenty (koľko treba)"}</span>
                <input type="file" multiple onChange={(e) => addDocs(e.target.files)} className="text-xs text-ink-soft file:mr-0 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-paper" />
              </label>
              {(draft.documents || []).length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {(draft.documents || []).map((d) => (
                    <div key={d.path} className="flex items-center gap-2 rounded-lg border border-line-soft bg-paper/40 px-3 py-2">
                      <FileText size={13} className="shrink-0 text-ink-soft" />
                      <button onClick={() => openDoc(d.path)} className="min-w-0 flex-1 truncate text-left text-xs text-ink hover:underline">{d.name}</button>
                      <span className="shrink-0 font-mono text-[0.55rem] text-ink-soft/70">{new Date(d.uploaded_at).toLocaleDateString("sk-SK")}</span>
                      <button onClick={() => dropDoc(d)} className="shrink-0 text-terra"><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button onClick={save} disabled={busy} className="btn-primary flex-1">{busy ? "Ukladám…" : <><Save size={15} /> Uložiť</>}</button>
              <button onClick={() => setDraft(null)} className="btn-ghost">Zrušiť</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
