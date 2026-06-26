"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Msg = { id: string; sender: "user" | "admin"; body: string; created_at: string };

function visitorId(): string {
  try {
    let v = localStorage.getItem("voyago.chatId");
    if (!v) { v = (crypto?.randomUUID?.() || String(Date.now()) + Math.random().toString(36).slice(2)); localStorage.setItem("voyago.chatId", v); }
    return v;
  } catch { return "anon"; }
}

export function ChatWidget() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [unread, setUnread] = useState(0);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [askEmail, setAskEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const vid = useRef<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { vid.current = visitorId(); }, []);

  const poll = useCallback(async (markSeen: boolean) => {
    if (!vid.current) return;
    try {
      const r = await fetch(`/api/chat?visitor_id=${encodeURIComponent(vid.current)}${markSeen ? "&seen=1" : ""}`);
      const d = await r.json();
      setMsgs(d.messages || []);
      setUnread(markSeen ? 0 : (d.unread || 0));
    } catch { /* ticho */ }
  }, []);

  // Pomalý poll na odznak (zatvorené) + rýchly poll (otvorené)
  useEffect(() => {
    poll(false);
    const ms = open ? 4000 : 20000;
    const id = setInterval(() => poll(open), ms);
    return () => clearInterval(id);
  }, [open, poll]);

  useEffect(() => { if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, open]);

  const send = async () => {
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    // optimistic
    setMsgs((m) => [...m, { id: "tmp" + Date.now(), sender: "user", body, created_at: new Date().toISOString() }]);
    setText("");
    try {
      await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitor_id: vid.current, body, email: email || undefined }) });
      await poll(true);
    } catch { /* ticho */ }
    setSending(false);
    if (!email) setAskEmail(true);
  };

  return (
    <>
      {/* Bublina */}
      <button
        onClick={() => { setOpen((o) => !o); if (!open) poll(true); }}
        aria-label={t({ sk: "Otvoriť chat", en: "Open chat" })}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-ink text-paper shadow-lift transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-terra px-1 text-[0.65rem] font-bold text-white">{unread}</span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lift lg:right-6">
          {/* hlavička */}
          <div className="flex items-center gap-3 bg-ink px-4 py-3 text-paper">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brass/20 text-brass"><MessageCircle size={18} /></span>
            <div>
              <p className="text-sm font-bold">{t({ sk: "Podpora Voyago", en: "Voyago support" })}</p>
              <p className="text-[0.68rem] text-paper/60">{t({ sk: "Zvyčajne odpovieme do pár hodín", en: "We usually reply within hours" })}</p>
            </div>
          </div>

          {/* správy */}
          <div ref={bodyRef} className="flex-1 space-y-2.5 overflow-y-auto bg-paper/40 p-4">
            <div className="rounded-xl rounded-tl-sm bg-surface px-3 py-2 text-sm text-ink-soft shadow-card">
              {t({ sk: "Dobrý deň 👋 Napíšte nám, s čím vám môžeme pomôcť.", en: "Hi 👋 Tell us how we can help." })}
            </div>
            {msgs.map((m) => (
              <div key={m.id} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm shadow-card ${m.sender === "user" ? "ml-auto rounded-tr-sm bg-ink text-paper" : "rounded-tl-sm bg-surface text-ink"}`}>
                {m.body}
              </div>
            ))}
            {askEmail && !email && (
              <div className="rounded-xl bg-brass/10 p-3">
                <p className="text-xs text-ink-soft">{t({ sk: "Nechajte e-mail, nech vás zastihneme aj keď odídete:", en: "Leave an email so we can reach you:" })}</p>
                <div className="mt-2 flex gap-2">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="e-mail" className="input !mt-0 !py-1.5 text-sm" />
                  <button onClick={() => { fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitor_id: vid.current, body: "(e-mail: " + email + ")", email }) }); setAskEmail(false); }} className="btn-ghost !px-3 !py-1.5 text-sm">OK</button>
                </div>
              </div>
            )}
          </div>

          {/* vstup */}
          <div className="flex items-center gap-2 border-t border-line bg-surface p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t({ sk: "Napíšte správu…", en: "Type a message…" })}
              className="input !mt-0 flex-1 !py-2"
              dir={lang === "sk" ? "ltr" : "ltr"}
            />
            <button onClick={send} disabled={sending || !text.trim()} aria-label="send" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass text-ink disabled:opacity-50"><Send size={17} /></button>
          </div>
        </div>
      )}
    </>
  );
}
