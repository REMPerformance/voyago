import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendEmail } from "@/lib/email";
import { site } from "@/config/site";

// Zákaznícky chat ide cez server (service-role). Identifikácia náhodným visitor_id z prehliadača.

export async function GET(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ messages: [], unread: 0 });
  const vid = req.nextUrl.searchParams.get("visitor_id");
  const seen = req.nextUrl.searchParams.get("seen") === "1";
  if (!vid) return NextResponse.json({ messages: [], unread: 0 });

  const { data: thread } = await supabaseAdmin.from("chat_threads").select("id").eq("visitor_id", vid).maybeSingle();
  if (!thread) return NextResponse.json({ messages: [], unread: 0 });

  const { data: messages } = await supabaseAdmin
    .from("chat_messages")
    .select("id, sender, body, created_at, read_by_user")
    .eq("thread_id", (thread as any).id)
    .order("created_at", { ascending: true });

  const list = (messages as any[]) || [];
  const unread = list.filter((m) => m.sender === "admin" && !m.read_by_user).length;

  if (seen && unread > 0) {
    await supabaseAdmin.from("chat_messages")
      .update({ read_by_user: true })
      .eq("thread_id", (thread as any).id).eq("sender", "admin").eq("read_by_user", false);
  }
  return NextResponse.json({ messages: list, unread });
}

export async function POST(req: NextRequest) {
  if (!supabaseAdmin) return NextResponse.json({ ok: false, error: "no_admin" }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  const vid = String(b?.visitor_id || "").slice(0, 64);
  const body = String(b?.body || "").trim().slice(0, 2000);
  if (!vid || !body) return NextResponse.json({ ok: false }, { status: 400 });

  let { data: thread } = await supabaseAdmin.from("chat_threads").select("id, last_at").eq("visitor_id", vid).maybeSingle();
  let isNew = false;
  let prevLastAt: string | null = null;
  if (!thread) {
    isNew = true;
    const ins = await supabaseAdmin.from("chat_threads")
      .insert({ visitor_id: vid, email: b.email || null, name: b.name || null })
      .select("id, last_at").single();
    thread = ins.data as any;
  } else {
    prevLastAt = (thread as any).last_at;
    if (b.email) await supabaseAdmin.from("chat_threads").update({ email: b.email }).eq("id", (thread as any).id);
  }
  if (!thread) return NextResponse.json({ ok: false }, { status: 500 });

  // Rate-limit: max 8 správ za 60 sekúnd na vlákno (ochrana proti spamu).
  const since = new Date(Date.now() - 60 * 1000).toISOString();
  const { count: recent } = await supabaseAdmin
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("thread_id", (thread as any).id)
    .eq("sender", "user")
    .gte("created_at", since);
  if ((recent ?? 0) >= 8) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  await supabaseAdmin.from("chat_messages").insert({ thread_id: (thread as any).id, sender: "user", body });
  await supabaseAdmin.from("chat_threads").update({ last_at: new Date().toISOString() }).eq("id", (thread as any).id);

  // Upozorni admina e-mailom pri novej konverzácii alebo po dlhšej nečinnosti (>10 min).
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || site.email;
  const inactive = prevLastAt ? (Date.now() - new Date(prevLastAt).getTime() > 10 * 60 * 1000) : false;
  if ((isNew || inactive) && adminEmail && !adminEmail.includes(".example")) {
    const safe = body.replace(/[<>]/g, "");
    sendEmail({
      to: adminEmail,
      subject: `Nová správa v chate · ${b.email || vid.slice(0, 8)}`,
      html: `<p>Nová správa od zákazníka${b.email ? ` (${b.email})` : ""}:</p><blockquote style="border-left:3px solid #C99A4E;padding-left:12px;color:#333">${safe}</blockquote><p>Odpovedz v admin paneli → Chat.</p>`,
    }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
