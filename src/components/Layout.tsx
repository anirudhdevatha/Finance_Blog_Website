import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Research", to: "/research" },
  { label: "About", to: "/about" },
  { label: "Performance", to: "/performance" },
  { label: "Create Your Own Post", to: "/admin/new" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F7F5",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
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
        <div style={{ marginLeft: "auto" }}>
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
        </div>
      </nav>

      <Outlet />

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
            marginBottom: 10,
          }}
        >
          <Link
            to="/research"
            style={{ color: "#777", fontSize: 12, textDecoration: "none" }}
          >
            Research
          </Link>
          <Link
            to="/about"
            style={{ color: "#777", fontSize: 12, textDecoration: "none" }}
          >
            About
          </Link>
          <Link
            to="/performance"
            style={{ color: "#777", fontSize: 12, textDecoration: "none" }}
          >
            Performance
          </Link>
          <Link
            to="/admin/new"
            style={{ color: "#777", fontSize: 12, textDecoration: "none" }}
          >
            Create Post
          </Link>
        </div>
        <p style={{ fontSize: 11, color: "#333", margin: 0, lineHeight: 1.6 }}>
          Research published for informational purposes only. Not investment
          advice. Past performance is not indicative of future results.
        </p>
      </footer>
    </div>
  );
}
