import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const normalizedSupabaseUrl = supabaseUrl
  ? supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")
  : undefined;

export const supabase =
  normalizedSupabaseUrl && supabaseAnonKey
    ? createClient(normalizedSupabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;
