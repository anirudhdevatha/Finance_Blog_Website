import { Link, useParams } from "react-router-dom";
import {
  getPositionByTicker,
  MOCK_REPORTS,
  type Rating,
} from "../data/mockData";

const RATING_STYLES: Record<
  Rating,
  { bg: string; text: string; border: string }
> = {
  "Strong Buy": { bg: "#EAF3DE", text: "#27500A", border: "#639922" },
  Buy: { bg: "#E1F5EE", text: "#085041", border: "#1D9E75" },
  Hold: { bg: "#FAEEDA", text: "#633806", border: "#BA7517" },
  Sell: { bg: "#FAECE7", text: "#712B13", border: "#D85A30" },
  "Strong Sell": { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
};

function RatingBadge({ rating }: { rating: Rating }) {
  const s = RATING_STYLES[rating];
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {rating}
    </span>
  );
}

export default function PositionPage() {
  const { ticker = "" } = useParams();
  const position = getPositionByTicker(ticker);

  if (!position) {
    return (
      <main
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "60px 24px 96px",
          color: "#111",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>
          Position not found
        </h1>
        <p style={{ color: "#666" }}>
          The requested position is not available in the mock dataset.
        </p>
      </main>
    );
  }

  const upside = (
    ((position.targetPrice - position.currentPrice) / position.currentPrice) *
    100
  ).toFixed(1);
  const related = MOCK_REPORTS.filter((report) =>
    position.relatedTickers.includes(report.ticker),
  );

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "48px 24px 96px",
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
        <Link
          to={`/sectors/${position.sector}`}
          style={{ color: "#888", textDecoration: "none" }}
        >
          {position.sector}
        </Link>
        <span>›</span>
        <span style={{ color: "#333" }}>{position.ticker}</span>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: 13,
              background: "#111",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            {position.ticker}
          </span>
          <RatingBadge rating={position.rating} />
          <span style={{ fontSize: 13, color: "#888" }}>
            {position.publishedAt}
          </span>
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          {position.companyName}
        </h1>
        <p style={{ fontSize: 15, color: "#555", margin: 0 }}>
          {position.sector} · {position.timeHorizon}
        </p>
      </header>

      <section
        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}
      >
        {[
          {
            label: "Current price",
            value: `$${position.currentPrice.toFixed(2)}`,
          },
          {
            label: "Target price",
            value: `$${position.targetPrice.toFixed(2)}`,
            accent: "#185FA5",
          },
          {
            label: "Expected return",
            value: `${Number(upside) >= 0 ? "+" : ""}${upside}%`,
            accent: Number(upside) >= 0 ? "#27500A" : "#791F1F",
          },
          { label: "Rating", value: position.rating },
          { label: "Time horizon", value: position.timeHorizon },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "#F8F8F8",
              border: "1px solid #E0E0E0",
              borderRadius: 10,
              padding: "12px 16px",
              minWidth: 140,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 4,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: item.accent ?? "#111",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            background: "#EAF3DE",
            border: "1px solid #C0DD97",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#27500A",
              marginBottom: 10,
            }}
          >
            Catalysts
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              color: "#3B6D11",
              lineHeight: 1.7,
            }}
          >
            {position.catalysts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: "#FCEBEB",
            border: "1px solid #F7C1C1",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#791F1F",
              marginBottom: 10,
            }}
          >
            Risks
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              color: "#A32D2D",
              lineHeight: 1.7,
            }}
          >
            {position.risks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #E8E8E8",
          borderRadius: 14,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Thesis summary
        </h2>
        <p style={{ margin: 0, color: "#444", lineHeight: 1.8 }}>
          {position.thesisSummary}
        </p>
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #E8E8E8",
          borderRadius: 14,
          padding: 24,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 16,
          }}
        >
          Thesis history
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {position.thesisHistory.map((entry, index) => (
            <div
              key={entry.date}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr auto",
                gap: 16,
                padding: "14px 0",
                borderBottom:
                  index < position.thesisHistory.length - 1
                    ? "1px solid #EBEBEB"
                    : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "#888" }}>{entry.date}</span>
              <span style={{ fontSize: 14, color: "#333" }}>{entry.note}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#185FA5" }}>
                PT ${entry.priceTarget.toFixed(2)}
              </span>
            </div>
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
          Related reports
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {related.map((report) => (
            <Link
              key={report.slug}
              to={`/reports/${report.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
                {report.publishedAt}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                {report.companyName}
              </div>
              <div style={{ fontSize: 13, color: "#555" }}>
                {report.executiveSummary}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
