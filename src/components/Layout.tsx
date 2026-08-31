import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { isCurrentUserAdmin } from "../lib/reports";
import { FinancialDisclaimer } from "./FinancialDisclaimer";

const navItems = [
  { label: "Research", to: "/research" },
  { label: "About", to: "/about" },
  { label: "Performance", to: "/performance" },
];

const adminNavItems = [
  { label: "Admin Dashboard", to: "/admin" },
  { label: "Create Your Own Post", to: "/admin/new" },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const adminStatus = await isCurrentUserAdmin();
        setIsAdmin(adminStatus);
      } catch {
        setIsAdmin(false);
      }
    };

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loggedIn = Boolean(session);
      setIsAuthenticated(loggedIn);

      if (loggedIn) {
        await checkAdminStatus();
      } else {
        setIsAdmin(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const loggedIn = Boolean(session);
      setIsAuthenticated(loggedIn);

      if (loggedIn) {
        await checkAdminStatus();
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F7F5",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          background: "#0D1117",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          minHeight: 56,
          gap: 24,
          borderBottom: "1px solid #1E2530",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginRight: 16,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 12,
              background: "#fff",
              color: "#0D1117",
              padding: "2px 7px",
              borderRadius: 4,
            }}
          >
            TVM
          </span>
          <span
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            Texas Valuation & Modeling
          </span>
        </Link>

        {/* Render standard navigation items */}
        {navItems.map((item) => {
          const active =
            location.pathname === item.to ||
            (item.to !== "/" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: active ? "#fff" : "#ccc",
                fontSize: 13,
                textDecoration: "none",
                fontWeight: 500,
                padding: "8px 10px",
                borderRadius: 6,
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Conditionally render admin navigation items if admin */}
        {isAdmin &&
          adminNavItems.map((item) => {
            const active =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname === item.to ||
                  (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  color: active ? "#fff" : "#ccc",
                  fontSize: 13,
                  textDecoration: "none",
                  fontWeight: 500,
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                fontSize: 13,
                color: "#fff",
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: 6,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                fontSize: 13,
                color: "#ccc",
                textDecoration: "none",
                border: "1px solid #333",
                borderRadius: 6,
                padding: "6px 14px",
              }}
            >
              Analyst login
            </Link>
          )}
        </div>
      </nav>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      <div
        style={{
          maxWidth: 1148,
          width: "100%",
          margin: "0 auto",
          padding: "0 24px 32px",
        }}
      >
        <FinancialDisclaimer variant="full" />
      </div>

      <footer
        style={{
          background: "#0D1117",
          borderTop: "1px solid #1E2530",
          padding: "32px 40px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#444", margin: "0 0 6px" }}>
          © 2025 Texas Valuation & Modeling. All rights reserved.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <Link to="/research" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
            Research
          </Link>
          <Link to="/about" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
            About
          </Link>
          <Link to="/performance" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
            Performance
          </Link>
          <Link to="/privacy" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
            Terms of Service
          </Link>

          {isAdmin && (
            <Link to="/admin/new" style={{ color: "#777", fontSize: 12, textDecoration: "none" }}>
              Create Post
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
