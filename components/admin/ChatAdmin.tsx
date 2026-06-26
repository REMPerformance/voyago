"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Send, MessageCircle, Mail, RefreshCw } from "lucide-react";
import { supabase, supabaseEnabled } from "@/lib/supabase";

type Thread = { id: string; visitor_id: string; email: string | null; name: string | null; last_at: string };
type Msg = { id: string; thread_id: string; sender: "user" | "admin"; body: string; created_at: string };

export function ChatAdmin() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [unread, setUnread] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  const loadThreads = useCallback(async () => {
    if (!supabaseEnabled || !supabase) return;
    const { data } = await supabase.from("chat_threads").select("*").order("last_at", { ascending: false });
    setThreads((data as Thread[]) || []);
    const { data: u } = await supabase.from("chat_messages").select("thread_id").eq("sender", "user").eq("read_by_admin", false);
    setUnread(new Set(((u as any[]) || []).map((r) => r.thread_id)));
  }, []);

  const openThread = useCallback(async (id: string) => {
    if (!supabase) return;
    setActive(id);
    const { data } = await supabase.from("chat_messages").select("*").eq("thread_id", id).order("created_at", { ascending: true });
    setMsgs((data as Msg[]) || []);
    await supabase.from("chat_messages").update({ read_by_admin: true }).eq("thread_id", id).eq("sender", "user").eq("read_by_admin", false);
    setUnread((s) => { const n = new Set(s); n.delete(id); return n; });
  }, []);

  useEffect(() => { loadThreads(); }, [loadThreads]);

  // Realtime: nové správy → obnov zoznam aj otvorené vlákno
  useEffect(() => {
    if (!supabaseEnabled || !supabase) return;
    const ch = supabase
      .channel("admin-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        const m = payload.new as Msg;
        loadThreads();
        if (m.thread_id === active) {
          setMsgs((prev) => prev.some((x) => x.id === m.id) ? prev : [...prev, m]);
          if (m.sender === "user") supabase!.from("chat_messages").update({ read_by_admin: true }).eq("id", m.id);
        }
      })
      .subscribe();
    return () => { supabase?.removeChannel(ch); };
  }, [active, loadThreads]);

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [msgs]);

  const send = async () => {
    const body = reply.trim();
    if (!body || !active || !supabase) return;
    setReply("");
    setMsgs((m) => [...m, { id: "tmp" + Date.now(), thread_id: active, sender: "admin", body, created_at: new Date().toISOString() }]);
    await supabase.from("chat_messages").insert({ thread_id: active, sender: "admin", body });
    await supabase.from("chat_threads").update({ last_at: new Date().toISOString() }).eq("id", active);
  };

  const activeThread = threads.find((t) => t.id === active);
  const fmt = (d: string) => new Date(d).toLocaleString("sk-SK", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  if (!supabaseEnabled) return <p className="text-sm text-ink-soft">Supabase nie je nastavený — chat je neaktívny.</p>;

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      {/* Zoznam vlákien */}
      <div className="rounded-xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="font-semibold text-ink">Konverzácie</p>
          <button onClick={loadThreads} className="text-ink-soft hover:text-ink"><RefreshCw size={15} /></button>
        </div>
        <div className="max-h-[28rem] overflow-y-auto">
          {threads.length === 0 && <p className="px-4 py-6 text-sm text-ink-soft">Zatiaľ žiadne správy.</p>}
          {threads.map((th) => (
            <button key={th.id} onClick={() => openThread(th.id)} className={`flex w-full items-center gap-3 border-b border-line-soft px-4 py-3 text-left transition-colors hover:bg-paper/60 ${active === th.id ? "bg-paper" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-soft"><MessageCircle size={16} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{th.email || th.name || th.visitor_id.slice(0, 8)}</p>
                <p className="text-[0.68rem] text-ink-soft">{fmt(th.last_at)}</p>
              </div>
              {unread.has(th.id) && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-terra" />}
            </button>
          ))}
        </div>
      </div>

      {/* Panel správ */}
      <div className="flex h-[32rem] flex-col rounded-xl border border-line bg-surface">
        {!active ? (
          <div className="grid flex-1 place-items-center text-sm text-ink-soft">Vyberte konverzáciu vľavo.</div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <p className="font-semibold text-ink">{activeThread?.email || activeThread?.visitor_id.slice(0, 8)}</p>
              {activeThread?.email && <a href={`mailto:${activeThread.email}`} className="text-ink-soft hover:text-ink"><Mail size={15} /></a>}
            </div>
            <div ref={bodyRef} className="flex-1 space-y-2.5 overflow-y-auto bg-paper/40 p-4">
              {msgs.map((m) => (
                <div key={m.id} className={`max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-card ${m.sender === "admin" ? "ml-auto rounded-tr-sm bg-ink text-paper" : "rounded-tl-sm bg-surface text-ink"}`}>
                  {m.body}
                  <span className={`mt-1 block text-[0.6rem] ${m.sender === "admin" ? "text-paper/50" : "text-ink-soft/50"}`}>{fmt(m.created_at)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-line p-3">
              <input value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Odpovedať…" className="input !mt-0 flex-1 !py-2" />
              <button onClick={send} disabled={!reply.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass text-ink disabled:opacity-50"><Send size={17} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
