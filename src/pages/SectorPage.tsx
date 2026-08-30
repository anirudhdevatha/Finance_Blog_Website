import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getSectorOverview,
  MOCK_POSITIONS,
  type Report,
} from "../data/mockData";
import { getReportsBySector } from "../lib/reports";

export default function SectorPage() {
  const { sector = "" } = useParams();
  const overview = getSectorOverview(sector);
  const positions = MOCK_POSITIONS.filter(
    (position) => position.sector.toLowerCase() === sector.toLowerCase(),
  );

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    getReportsBySector(sector)
      .then((data) => {
        if (ignore) return;
        setReports(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        const msg =
          err instanceof Error ? err.message : "Failed to load reports for this sector.";
        setError(msg);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [sector]);

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "48px 24px",
        color: "#111",
      }}
    >
      <nav
        style={{
          fontSize: 13,
          color: "#888",
          marginBottom: 22,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <Link to="/research" style={{ color: "#888", textDecoration: "none" }}>
          Research
        </Link>
        <span>›</span>
        <span style={{ color: "#333" }}>{sector}</span>
      </nav>

      <section style={{ marginBottom: 28 }}>
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
          Sector focus
        </p>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          {sector}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#555",
            maxWidth: 760,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {overview?.blurb ??
            "Sector coverage is being expanded with additional research themes and company notes."}
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E8E8",
            borderRadius: 14,
            padding: 22,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            Focus areas
          </h2>
          <p style={{ margin: 0, color: "#555", lineHeight: 1.8 }}>
            {overview?.focus ??
              "Theme-driven research across public companies."}
          </p>
        </div>
        <div
          style={{
            background: "#0D1117",
            color: "#fff",
            borderRadius: 14,
            padding: 22,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            Active positions
          </h2>
          <div style={{ fontSize: 28, fontWeight: 800 }}>
            {positions.length}
          </div>
          <p style={{ color: "#777", margin: "6px 0 0" }}>
            Current ideas in this sector
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          Active positions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {positions.map((position) => (
            <Link
              key={position.ticker}
              to={`/positions/${position.ticker}`}
              style={{
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 12,
                padding: 16,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  fontSize: 12,
                  background: "#111",
                  color: "#fff",
                  padding: "2px 7px",
                  borderRadius: 4,
                  width: "fit-content",
                  marginBottom: 8,
                }}
              >
                {position.ticker}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>
                {position.companyName}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {position.rating} · Target ${position.targetPrice.toFixed(0)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 14,
          }}
        >
          Reports in this sector
        </h2>

        {error && (
          <div
            style={{
              background: "#FDECEC",
              border: "1px solid #F3C4C4",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 16,
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
              padding: "40px 0",
              color: "#999",
              fontSize: 14,
            }}
          >
            Loading reports…
          </div>
        ) : reports.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E8E8E8",
              borderRadius: 12,
              padding: "24px 16px",
              textAlign: "center",
              color: "#999",
              fontSize: 14,
            }}
          >
            No published reports in this sector yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {reports.map((report) => (
              <Link
                key={report.slug}
                to={`/reports/${report.slug}`}
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: 12,
                  padding: 16,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
                  {report.publishedAt}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                  {report.companyName}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#666",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {report.executiveSummary}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
