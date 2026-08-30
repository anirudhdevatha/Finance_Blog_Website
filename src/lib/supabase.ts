import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";

if (supabaseAnonKey) {
  try {
    const parts = supabaseAnonKey.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload?.role === "service_role") {
        throw new Error(
          "[SECURITY CRITICAL] Supabase service_role key detected in client-side environment! " +
            "Service role keys must NEVER be exposed in frontend client code or VITE_ variables."
        );
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("[SECURITY CRITICAL]")) {
      console.error(error.message);
      throw error;
    }
  }
}

const normalizedSupabaseUrl = supabaseUrl
  ? supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")
  : "";

export const isSupabaseConfigured = Boolean(normalizedSupabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(normalizedSupabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : createClient("https://placeholder.supabase.co", "placeholder-anon-key", {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
