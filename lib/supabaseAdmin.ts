import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role klient — IBA na serveri (API routes). Nikdy sa neposiela do prehliadača.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminEnabled = Boolean(url && serviceKey);

export const supabaseAdmin: SupabaseClient | null = supabaseAdminEnabled
  ? createClient(url as string, serviceKey as string, { auth: { persistSession: false } })
  : null;
