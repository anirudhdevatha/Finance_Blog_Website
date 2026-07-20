import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAdminReports,
  deleteReport,
  type AdminReport,
} from "../lib/reports";

const RATING_COLORS: Record<string, string> = {
  "Strong Buy": "#27500A",
  Buy: "#085041",
  Hold: "#633806",
  Sell: "#712B13",
  "Strong Sell": "#791F1F",
};

export default function AdminDashboardPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    load();
  }, []);

  const visibleReports = useMemo(
    () =>
      filter === "all" ? reports : reports.filter((r) => r.status === filter),
    [reports, filter],
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminReports();
      setReports(data);
    } catch (err: any) {
      setError(err.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string, companyName: string) {
    const confirmed = window.confirm(
      `Delete "${companyName}"? This can't be undone.`,
    );
    if (!confirmed) return;

    setDeletingSlug(slug);
    try {
      await deleteReport(slug);
      setReports((prev) => prev.filter((r) => r.slug !== slug));
    } catch (err: any) {
      setError(err.message || "Couldn't delete this report.");
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F7F5",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "#0D1117",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <span style={{ color: "#666", fontSize: 13 }}>/ Admin</span>
          <span style={{ color: "#444", fontSize: 13 }}>/</span>
          <span style={{ color: "#aaa", fontSize: 13 }}>Dashboard</span>
        </div>
      </div>

      <div
        style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px 100px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#111",
                margin: "0 0 4px",
                letterSpacing: "-0.02em",
              }}
            >
              Reports
            </h1>
            <p style={{ fontSize: 14, color: "#888", margin: 0 }}>
              {visibleReports.length} of {reports.length} — manage published
              reports and drafts here.
            </p>
          </div>
          <Link
            to="/admin/new"
            style={{
              padding: "10px 20px",
              background: "#0D1117",
              color: "#fff",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            + New report
          </Link>
        </div>

        {error && (
          <div
            style={{
              background: "#FDECEC",
              border: "1px solid #F3C4C4",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 20,
              color: "#791F1F",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                border:
                  filter === f ? "1px solid #185FA5" : "1px solid #E0E0E0",
                background: filter === f ? "#EFF5FF" : "#fff",
                color: filter === f ? "#185FA5" : "#555",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#999",
              fontSize: 14,
            }}
          >
            Loading reports…
          </div>
        ) : visibleReports.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E8E8E8",
              borderRadius: 14,
              padding: "40px 24px",
              textAlign: "center",
              color: "#888",
            }}
          >
            {reports.length === 0 ? (
              <>
                No reports yet.{" "}
                <Link to="/create-post" style={{ color: "#185FA5" }}>
                  Create your first one →
                </Link>
              </>
            ) : (
              `No ${filter} reports.`
            )}
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E8E8E8",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1.2fr 110px 90px 90px 140px",
                padding: "12px 18px",
                background: "#F6F6F2",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#999",
              }}
            >
              <span>Ticker</span>
              <span>Company</span>
              <span>Rating</span>
              <span>Status</span>
              <span>Published</span>
              <span style={{ textAlign: "right" }}>Actions</span>
            </div>
            {visibleReports.map((report) => (
              <div
                key={report.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1.2fr 110px 90px 90px 140px",
                  padding: "14px 18px",
                  borderTop: "1px solid #F0F0F0",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 700,
                    fontSize: 13,
                    background: "#111",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: 4,
                    width: "fit-content",
                  }}
                >
                  {report.ticker}
                </span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                    {report.companyName}
                  </div>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {report.sector} · {report.analyst}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: RATING_COLORS[report.rating] ?? "#555",
                  }}
                >
                  {report.rating}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "2px 8px",
                    borderRadius: 5,
                    width: "fit-content",
                    background:
                      report.status === "published" ? "#E1F5EE" : "#FAEEDA",
                    color:
                      report.status === "published" ? "#085041" : "#633806",
                  }}
                >
                  {report.status}
                </span>
                <span style={{ fontSize: 13, color: "#888" }}>
                  {report.publishedAt}
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <Link
                    to={`/edit-post/${report.slug}`}
                    style={{
                      padding: "5px 12px",
                      border: "1px solid #E0E0E0",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#333",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(report.slug, report.companyName)
                    }
                    disabled={deletingSlug === report.slug}
                    style={{
                      padding: "5px 12px",
                      border: "1px solid #F3C4C4",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#791F1F",
                      background: "#fff",
                      cursor:
                        deletingSlug === report.slug
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {deletingSlug === report.slug ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
