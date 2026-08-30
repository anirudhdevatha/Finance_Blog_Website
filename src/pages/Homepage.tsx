import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Report, Rating } from "../data/mockData";
import { getPublishedReports } from "../lib/reports";
import { FinancialDisclaimer } from "../components/FinancialDisclaimer";

const RATING_STYLES: Record<Rating, { bg: string; text: string; border: string }> = {
  "Strong Buy": { bg: "#EAF3DE", text: "#27500A", border: "#639922" },
  Buy: { bg: "#E1F5EE", text: "#085041", border: "#1D9E75" },
  Hold: { bg: "#FAEEDA", text: "#633806", border: "#BA7517" },
  Sell: { bg: "#FAECE7", text: "#712B13", border: "#D85A30" },
  "Strong Sell": { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
};

const ALL_RATINGS: ("All" | Rating)[] = [
  "All",
  "Strong Buy",
  "Buy",
  "Hold",
  "Sell",
  "Strong Sell",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function RatingBadge({ rating }: { rating: Rating }) {
  const s = RATING_STYLES[rating];
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        borderRadius: 5,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.05em",
        padding: "2px 8px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {rating}
    </span>
  );
}

function UpsideBadge({ current, target }: { current: number; target: number }) {
  const pct = (((target - current) / current) * 100).toFixed(1);
  const pos = target >= current;
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: pos ? "#27500A" : "#791F1F",
      }}
    >
      {pos ? "+" : ""}
      {pct}%
    </span>
  );
}

function FeaturedCard({ report }: { report: Report }) {
  const upside = (
    ((report.targetPrice - report.currentPrice) / report.currentPrice) *
    100
  ).toFixed(1);
  const pos = report.targetPrice >= report.currentPrice;

  return (
    <Link
      to={`/reports/${report.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          background: "#0D1117",
          borderRadius: 14,
          padding: "28px 28px 24px",
          height: "100%",
          boxSizing: "border-box",
          cursor: "pointer",
          transition: "transform 0.15s",
          border: "1px solid #1E2530",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-2px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
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
            {report.ticker}
          </span>
          <RatingBadge rating={report.rating} />
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#555" }}>
            {report.sector}
          </span>
        </div>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 10px",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          {report.companyName}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "#888",
            margin: "0 0 22px",
            lineHeight: 1.6,
          }}
        >
          {report.executiveSummary}
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
            borderTop: "1px solid #1E2530",
            paddingTop: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              Price
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#ccc" }}>
              ${report.currentPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              Target
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4A9EFF" }}>
              ${report.targetPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              Upside
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: pos ? "#6DBF40" : "#E24B4A",
              }}
            >
              {pos ? "+" : ""}
              {upside}%
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div
              style={{
                fontSize: 10,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 3,
              }}
            >
              Published
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {report.publishedAt}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ReportRow({ report }: { report: Report }) {
  return (
    <Link
      to={`/reports/${report.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr 120px 90px 90px 90px",
          gap: 16,
          alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid #F0F0F0",
          cursor: "pointer",
          transition: "background 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
            display: "inline-block",
          }}
        >
          {report.ticker}
        </span>
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#111",
              marginBottom: 2,
            }}
          >
            {report.companyName}
          </div>
          <div style={{ fontSize: 12, color: "#999" }}>
            {report.sector} · {report.analyst}
          </div>
        </div>
        <RatingBadge rating={report.rating} />
        <span style={{ fontSize: 14, color: "#555" }}>
          ${report.currentPrice.toFixed(2)}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#185FA5" }}>
          ${report.targetPrice.toFixed(2)}
        </span>
        <UpsideBadge
          current={report.currentPrice}
          target={report.targetPrice}
        />
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [ratingFilter, setRatingFilter] = useState<"All" | Rating>("All");

  useEffect(() => {
    getPublishedReports()
      .then(setReports)
      .catch((err) => setError(err.message || "Failed to load reports."))
      .finally(() => setLoading(false));
  }, []);

  const allSectors = useMemo(
    () => ["All", ...Array.from(new Set(reports.map((r) => r.sector)))],
    [reports],
  );

  const featured = reports.filter((r) => r.featured);
  const filtered = reports.filter((r) => {
    const matchSearch =
      r.ticker.toLowerCase().includes(search.toLowerCase()) ||
      r.companyName.toLowerCase().includes(search.toLowerCase());
    const matchSector = sector === "All" || r.sector === sector;
    const matchRating = ratingFilter === "All" || r.rating === ratingFilter;
    return matchSearch && matchSector && matchRating;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F7F5",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Hero */}
      <div style={{ background: "#0D1117", padding: "52px 40px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#4A9EFF",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Equity Research
            </span>
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Texas Valuation
            <br />& Modeling
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              margin: "0 0 36px",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Conviction-based equity research. Long-term theses, transparent
            process, institutional-quality analysis.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { label: "Active coverage", value: `${reports.length}` },
              {
                label: "Sectors covered",
                value: `${new Set(reports.map((r) => r.sector)).size}`,
              },
              {
                label: "Strong Buy ideas",
                value: `${reports.filter((r) => r.rating === "Strong Buy").length}`,
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#F7F7F5", width: "100%" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "48px 40px 96px",
          }}
        >
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#999",
                fontSize: 14,
              }}
            >
              Loading research…
            </div>
          )}

          {error && (
            <div
              style={{
                background: "#FDECEC",
                border: "1px solid #F3C4C4",
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 24,
                color: "#791F1F",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Featured reports */}
              {featured.length > 0 && (
                <section style={{ marginBottom: 56 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111",
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Highest conviction
                    </h2>
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {featured.length} ideas
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {featured.map((r) => (
                      <FeaturedCard key={r.slug} report={r} />
                    ))}
                  </div>
                </section>
              )}

              {/* All research */}
              <section>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#111",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    All research
                  </h2>

                  {/* Filters */}
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search ticker or company..."
                      style={{
                        padding: "7px 12px",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        fontSize: 13,
                        color: "#111",
                        background: "#fff",
                        outline: "none",
                        width: 200,
                        fontFamily: "inherit",
                      }}
                    />
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      style={{
                        padding: "7px 12px",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        fontSize: 13,
                        color: "#555",
                        background: "#fff",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      {allSectors.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <select
                      value={ratingFilter}
                      onChange={(e) =>
                        setRatingFilter(e.target.value as "All" | Rating)
                      }
                      style={{
                        padding: "7px 12px",
                        border: "1px solid #E0E0E0",
                        borderRadius: 8,
                        fontSize: 13,
                        color: "#555",
                        background: "#fff",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      {ALL_RATINGS.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 120px 90px 90px 90px",
                    gap: 16,
                    padding: "10px 20px",
                    background: "#F0F0EE",
                    borderRadius: "10px 10px 0 0",
                    border: "1px solid #E8E8E8",
                  }}
                >
                  {["Ticker", "Company", "Rating", "Price", "Target", "Upside"].map(
                    (h) => (
                      <span
                        key={h}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>

                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #E8E8E8",
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    overflow: "hidden",
                  }}
                >
                  {filtered.length > 0 ? (
                    filtered.map((r) => <ReportRow key={r.slug} report={r} />)
                  ) : (
                    <div
                      style={{
                        padding: "40px 20px",
                        textAlign: "center",
                        color: "#aaa",
                        fontSize: 14,
                      }}
                    >
                      No reports match your filters.
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
          <FinancialDisclaimer variant="full" />
        </div>
      </div>
    </div>
  );
}
