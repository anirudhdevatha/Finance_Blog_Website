import { useEffect, useState } from "react";
import type { PerformanceRecord } from "../data/mockData";
import { getPerformanceRecords } from "../lib/performance";
import { FinancialDisclaimer } from "../components/FinancialDisclaimer";

export default function PerformancePage() {
  const [records, setRecords] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPerformanceRecords()
      .then(setRecords)
      .catch((err) => setError(err.message || "Failed to load performance data."))
      .finally(() => setLoading(false));
  }, []);

  const averageReturn = records.length
    ? (records.reduce((sum, item) => sum + item.returnPct, 0) / records.length).toFixed(1)
    : "0.0";
  const winRate = records.length
    ? ((records.filter((item) => item.returnPct > 0).length / records.length) * 100).toFixed(0)
    : "0";

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: "48px 24px 96px",
        color: "#111",
      }}
    >
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
          Track record
        </p>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Historical recommendation performance
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
          Live performance data pulled from our tracked positions and closed calls.
        </p>
      </section>

      {error && (
        <div style={{
          background: "#FDECEC", border: "1px solid #F3C4C4", borderRadius: 8,
          padding: "12px 16px", marginBottom: 24, color: "#791F1F", fontSize: 14,
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#999", fontSize: 14 }}>
          Loading performance data…
        </div>
      ) : records.length === 0 ? (
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
          No performance records yet.
        </div>
      ) : (
        <>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              { label: "Average return", value: `${averageReturn}%` },
              { label: "Win rate", value: `${winRate}%` },
              { label: "Calls tracked", value: `${records.length}` },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{item.value}</div>
              </div>
            ))}
          </section>

          <section
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
                gridTemplateColumns: "1.1fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr 0.7fr",
                padding: "12px 18px",
                background: "#F6F6F2",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#999",
              }}
            >
              <span>Company</span>
              <span>Rating</span>
              <span>Entry</span>
              <span>Target</span>
              <span>Current</span>
              <span>Return</span>
              <span>Status</span>
            </div>
            {records.map((item) => (
              <div
                key={item.ticker + item.date}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr 0.7fr",
                  padding: "14px 18px",
                  borderTop: "1px solid #F0F0F0",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                    {item.company}
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>{item.ticker}</div>
                </div>
                <span style={{ fontSize: 13, color: "#555" }}>{item.rating}</span>
                <span style={{ fontSize: 13, color: "#555" }}>
                  ${item.entryPrice.toFixed(1)}
                </span>
                <span style={{ fontSize: 13, color: "#185FA5" }}>
                  ${item.targetPrice.toFixed(1)}
                </span>
                <span style={{ fontSize: 13, color: "#555" }}>
                  ${item.currentPrice.toFixed(1)}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: item.returnPct >= 0 ? "#27500A" : "#791F1F",
                  }}
                >
                  {item.returnPct >= 0 ? "+" : ""}
                  {item.returnPct.toFixed(1)}%
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: item.status === "Open" ? "#185FA5" : "#777",
                  }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </section>
        </>
      )}
      <FinancialDisclaimer variant="full" />
    </main>
  );
}