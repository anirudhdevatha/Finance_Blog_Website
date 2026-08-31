import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Report, Rating } from "../data/mockData";
import { getPublishedReports } from "../lib/reports";

const ALL_RATINGS: ("All" | Rating)[] = [
  "All",
  "Strong Buy",
  "Buy",
  "Hold",
  "Sell",
  "Strong Sell",
];

export default function ResearchArchivePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [analyst, setAnalyst] = useState("All");
  const [rating, setRating] = useState<"All" | Rating>("All");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"table" | "cards">("table");
  const [page, setPage] = useState(1);
  const perPage = 6;

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
  const allAnalysts = useMemo(
    () => ["All", ...Array.from(new Set(reports.map((r) => r.analyst)))],
    [reports],
  );

  const filtered = useMemo(() => {
    const next = reports.filter((report) => {
      const matchesSearch = `${report.ticker} ${report.companyName}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSector = sector === "All" || report.sector === sector;
      const matchesAnalyst = analyst === "All" || report.analyst === analyst;
      const matchesRating = rating === "All" || report.rating === rating;
      return matchesSearch && matchesSector && matchesAnalyst && matchesRating;
    });

    const sorted = [...next].sort((a, b) => {
      if (sort === "highest-upside") {
        const aUpside =
          ((a.targetPrice - a.currentPrice) / a.currentPrice) * 100;
        const bUpside =
          ((b.targetPrice - b.currentPrice) / b.currentPrice) * 100;
        return bUpside - aUpside;
      }
      if (sort === "rating") {
        const order = {
          "Strong Buy": 5,
          Buy: 4,
          Hold: 3,
          Sell: 2,
          "Strong Sell": 1,
        };
        return order[b.rating] - order[a.rating];
      }
      return b.publishedAt.localeCompare(a.publishedAt);
    });

    return sorted;
  }, [analyst, rating, reports, search, sector, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "48px 24px",
        color: "#111",
      }}
    >
      <section style={{ marginBottom: 30 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#4A9EFF",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          Research archive
        </p>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Browse all published research
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#555",
            margin: 0,
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Search by company, ticker, sector, analyst, or rating and sort by
          recency, upside, or recommendation strength.
        </p>
      </section>

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

      {loading ? (
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
      ) : (
        <>
          <section
            style={{
              background: "#fff",
              border: "1px solid #E8E8E8",
              borderRadius: 14,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
              }}
            >
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search ticker or company"
                style={{
                  padding: "9px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#111",
                }}
              />
              <select
                value={sector}
                onChange={(e) => {
                  setSector(e.target.value);
                  setPage(1);
                }}
                style={{
                  padding: "9px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#555",
                }}
              >
                {allSectors.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={analyst}
                onChange={(e) => {
                  setAnalyst(e.target.value);
                  setPage(1);
                }}
                style={{
                  padding: "9px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#555",
                }}
              >
                {allAnalysts.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value as "All" | Rating);
                  setPage(1);
                }}
                style={{
                  padding: "9px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#555",
                }}
              >
                {ALL_RATINGS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                style={{
                  padding: "9px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#555",
                }}
              >
                <option value="newest">Newest</option>
                <option value="highest-upside">Highest upside</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 13, color: "#888" }}>
                {filtered.length} results
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setView("table")}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    border:
                      view === "table"
                        ? "1px solid #185FA5"
                        : "1px solid #E0E0E0",
                    background: view === "table" ? "#EFF5FF" : "#fff",
                    color: view === "table" ? "#185FA5" : "#555",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Table
                </button>
                <button
                  onClick={() => setView("cards")}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    border:
                      view === "cards"
                        ? "1px solid #185FA5"
                        : "1px solid #E0E0E0",
                    background: view === "cards" ? "#EFF5FF" : "#fff",
                    color: view === "cards" ? "#185FA5" : "#555",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Cards
                </button>
              </div>
            </div>
          </section>

          {filtered.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 14,
                padding: "32px 24px",
                textAlign: "center",
                color: "#777",
              }}
            >
              No reports match your current filters.
            </div>
          ) : view === "table" ? (
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
                  gridTemplateColumns: "110px 1.4fr 110px 90px 90px 90px",
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
                <span>Price</span>
                <span>Target</span>
                <span>Upside</span>
              </div>
              {visible.map((report) => {
                const upside = (
                  ((report.targetPrice - report.currentPrice) /
                    report.currentPrice) *
                  100
                ).toFixed(1);
                return (
                  <Link
                    key={report.slug}
                    to={`/reports/${report.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "110px 1.4fr 110px 90px 90px 90px",
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
                          display: "inline-block",
                          width: "fit-content",
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
                          }}
                        >
                          {report.companyName}
                        </div>
                        <div style={{ fontSize: 12, color: "#888" }}>
                          {report.sector} · {report.analyst}
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: "#555" }}>
                        {report.rating}
                      </span>
                      <span style={{ fontSize: 14, color: "#555" }}>
                        ${report.currentPrice.toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#185FA5",
                        }}
                      >
                        ${report.targetPrice.toFixed(2)}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: Number(upside) >= 0 ? "#27500A" : "#791F1F",
                        }}
                      >
                        {Number(upside) >= 0 ? "+" : ""}
                        {upside}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {visible.map((report) => {
                const upside = (
                  ((report.targetPrice - report.currentPrice) /
                    report.currentPrice) *
                  100
                ).toFixed(1);
                return (
                  <Link
                    key={report.slug}
                    to={`/reports/${report.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #E8E8E8",
                        borderRadius: 14,
                        padding: 20,
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Courier New', monospace",
                            fontWeight: 700,
                            fontSize: 12,
                            background: "#111",
                            color: "#fff",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          {report.ticker}
                        </span>
                        <span style={{ fontSize: 11, color: "#888" }}>
                          {report.publishedAt}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          margin: "0 0 8px",
                        }}
                      >
                        {report.companyName}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#666",
                          lineHeight: 1.7,
                          margin: "0 0 14px",
                        }}
                      >
                        {report.executiveSummary}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 13,
                          color: "#555",
                        }}
                      >
                        <span>{report.rating}</span>
                        <span
                          style={{
                            color: Number(upside) >= 0 ? "#27500A" : "#791F1F",
                            fontWeight: 700,
                          }}
                        >
                          {Number(upside) >= 0 ? "+" : ""}
                          {upside}%
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, color: "#888" }}>
              Page {page} of {totalPages}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  background: "#fff",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  color: "#555",
                }}
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #E0E0E0",
                  borderRadius: 8,
                  background: "#fff",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  color: "#555",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
