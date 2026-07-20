import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const normalizedSupabaseUrl = supabaseUrl
  ? supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")
  : "";

export const supabase = createClient(normalizedSupabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});