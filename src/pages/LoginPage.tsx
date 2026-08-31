import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

type AuthMode = "login" | "signup";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    !isSupabaseConfigured
      ? "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
      : ""
  );

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setMessage("Supabase is not configured.");
      return;
    }

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setMessage("Please provide a valid email address.");
      return;
    }

    if (mode === "signup" && password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        setMessage("Signed in successfully.");
        navigate("/", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });
        if (error) throw error;
        setMessage("Account created. You’re being redirected to the homepage.");
        navigate("/", { replace: true });
      }
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Authentication failed.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : "Google sign-in failed.";
      setMessage(msg);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        background: "#F7F7F5",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: "45%",
          background: "#0D1117",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
        }}
      >
        {/* Logo */}
        <div>
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 13,
              background: "#fff",
              color: "#0D1117",
              padding: "3px 8px",
              borderRadius: 4,
              letterSpacing: "0.05em",
              marginRight: 10,
            }}
          >
            TVM
          </span>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>
            Texas Valuation & Modeling
          </span>
        </div>

        {/* Quote */}
        <div>
          <p
            style={{
              color: "#E8E8E8",
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.5,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            "An investment in knowledge pays the best interest."
          </p>
          <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
            — Benjamin Franklin
          </p>
        </div>

        {/* Bottom tag */}
        <p style={{ color: "#444", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
          Institutional-quality research.
          <br />
          Built in Texas.
        </p>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          {/* Heading */}
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: "0 0 28px" }}>
            {mode === "login"
              ? "Sign in to access the research portal."
              : "Request access to publish and manage reports."}
          </p>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "11px 0",
              border: "1px solid #E0E0E0",
              borderRadius: 8,
              background: "#fff",
              fontSize: 14,
              fontWeight: 500,
              color: "#333",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#E8E8E8" }} />
            <span style={{ fontSize: 12, color: "#aaa" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#E8E8E8" }} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#444",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#111",
                  background: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#444",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#111",
                  background: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {mode === "login" && (
              <div style={{ textAlign: "right", marginTop: -6 }}>
                <a
                  href="/forgot-password"
                  style={{
                    fontSize: 13,
                    color: "#185FA5",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>
            )}

            {message ? (
              <p
                style={{
                  fontSize: 13,
                  color:
                    message.includes("success") || message.includes("link")
                      ? "#1f7a1f"
                      : "#b42318",
                  margin: 0,
                }}
              >
                {message}
              </p>
            ) : null}

            <p
              style={{
                fontSize: 12,
                color: "#666",
                lineHeight: 1.5,
                margin: "4px 0 10px",
                textAlign: "center",
              }}
            >
              By continuing, you agree to TVM's{" "}
              <Link to="/terms" style={{ color: "#185FA5", textDecoration: "underline" }}>
                Terms of Service
              </Link>{" "}
              and acknowledge our{" "}
              <Link to="/privacy" style={{ color: "#185FA5", textDecoration: "underline" }}>
                Privacy Policy
              </Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px 0",
                background: loading ? "#555" : "#0D1117",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4,
              }}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          {/* Toggle mode */}
          <p
            style={{
              fontSize: 13,
              color: "#888",
              textAlign: "center",
              marginTop: 24,
            }}
          >
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              style={{
                background: "none",
                border: "none",
                color: "#185FA5",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>

          <p
            style={{
              fontSize: 11,
              color: "#bbb",
              textAlign: "center",
              marginTop: 32,
              lineHeight: 1.6,
            }}
          >
            Access is restricted to authorized analysts.
            <br />
            Contact your administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}
