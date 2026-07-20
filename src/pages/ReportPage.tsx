import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Rating, Report } from "../data/mockData";
import { getReportBySlug } from "../lib/reports";

// ─── Sub-components ───────────────────────────────────────────────────────────

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
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.04em",
        padding: "3px 10px",
        textTransform: "uppercase",
      }}
    >
      {rating}
    </span>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: "#F8F8F8",
        border: "0.5px solid #E0E0E0",
        borderRadius: 10,
        padding: "12px 18px",
        minWidth: 120,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#888",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: accent ?? "#111" }}>
        {value}
      </div>
    </div>
  );
}

function SlideViewer({
  thumbnails,
  pptxUrl,
  pdfUrl,
}: {
  thumbnails: string[];
  pptxUrl?: string;
  pdfUrl?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        border: "0.5px solid #E0E0E0",
        borderRadius: 12,
        overflow: "hidden",
        background: "#0d0d0d",
      }}
    >
      {/* Main slide */}
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}
      >
        <img
          src={thumbnails[active]}
          alt={`Slide ${active + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {active > 0 && (
          <button
            onClick={() => setActive((p) => p - 1)}
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              color: "#fff",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
        )}
        {active < thumbnails.length - 1 && (
          <button
            onClick={() => setActive((p) => p + 1)}
            aria-label="Next slide"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.55)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              color: "#fff",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 14,
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: 12,
            padding: "3px 9px",
            borderRadius: 20,
          }}
        >
          {active + 1} / {thumbnails.length}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "10px 12px",
          overflowX: "auto",
          background: "#171717",
        }}
      >
        {thumbnails.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              flexShrink: 0,
              padding: 0,
              border: `2px solid ${i === active ? "#4A9EFF" : "transparent"}`,
              borderRadius: 6,
              cursor: "pointer",
              background: "none",
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              alt={`Slide ${i + 1} thumbnail`}
              style={{
                width: 96,
                height: 54,
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "10px 14px",
          background: "#111",
          borderTop: "0.5px solid #222",
        }}
      >
        {pptxUrl && (
          <a
            href={pptxUrl}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#ccc",
              textDecoration: "none",
              border: "0.5px solid #333",
              borderRadius: 6,
              padding: "5px 12px",
              background: "#1a1a1a",
            }}
          >
            ↓ Download PPTX
          </a>
        )}
        {pdfUrl && (
          <a
            href={pdfUrl}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#ccc",
              textDecoration: "none",
              border: "0.5px solid #333",
              borderRadius: 6,
              padding: "5px 12px",
              background: "#1a1a1a",
            }}
          >
            ↓ Download PDF
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportPage() {
  const { slug = "" } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getReportBySlug(slug)
      .then(setReport)
      .catch(() => setError("We couldn't find that report."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
          color: "#999",
          fontSize: 14,
        }}
      >
        Loading report…
      </main>
    );
  }

  if (error || !report) {
    return (
      <main
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#111",
            margin: "0 0 8px",
          }}
        >
          Report not found
        </h1>
        <p style={{ color: "#888", fontSize: 14 }}>
          {error ?? "This report doesn't exist or may have been unpublished."}
        </p>
      </main>
    );
  }

  const upside = (
    ((report.targetPrice - report.currentPrice) / report.currentPrice) *
    100
  ).toFixed(1);
  const isPositive = report.targetPrice >= report.currentPrice;

  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "48px 24px 96px",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        color: "#111",
        lineHeight: 1.65,
      }}
    >
      <nav
        style={{
          fontSize: 13,
          color: "#888",
          marginBottom: 28,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <a href="/research" style={{ color: "#888", textDecoration: "none" }}>
          Research
        </a>
        <span>›</span>
        <a
          href={`/sectors/${report.sector}`}
          style={{ color: "#888", textDecoration: "none" }}
        >
          {report.sector}
        </a>
        <span>›</span>
        <span style={{ color: "#333" }}>{report.ticker}</span>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
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
              letterSpacing: "0.05em",
            }}
          >
            {report.ticker}
          </span>
          <RatingBadge rating={report.rating} />
          <span style={{ fontSize: 13, color: "#888", marginLeft: "auto" }}>
            {report.publishedAt}
          </span>
        </div>

        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          {report.companyName}
        </h1>
        <p style={{ fontSize: 15, color: "#555", margin: "0 0 24px" }}>
          Covered by {report.analyst} · {report.sector}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <StatPill
            label="Current price"
            value={`$${report.currentPrice.toFixed(2)}`}
          />
          <StatPill
            label="Price target"
            value={`$${report.targetPrice.toFixed(2)}`}
            accent="#185FA5"
          />
          <StatPill
            label="Expected upside"
            value={`${isPositive ? "+" : ""}${upside}%`}
            accent={isPositive ? "#27500A" : "#791F1F"}
          />
          <StatPill label="Time horizon" value={report.timeHorizon} />
        </div>
      </header>

      <hr
        style={{
          border: "none",
          borderTop: "0.5px solid #E5E5E5",
          margin: "0 0 36px",
        }}
      />

      <section style={{ marginBottom: 36 }}>
        <div
          style={{
            borderLeft: "3px solid #185FA5",
            paddingLeft: 18,
            borderRadius: 0,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: "#222",
              margin: 0,
              fontStyle: "italic",
              lineHeight: 1.7,
            }}
          >
            {report.executiveSummary}
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            background: "#EAF3DE",
            border: "0.5px solid #C0DD97",
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#27500A",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 12px",
            }}
          >
            Investment highlights
          </h3>
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 16px",
              fontSize: 14,
              color: "#3B6D11",
              lineHeight: 1.7,
            }}
          >
            {report.investmentHighlights.map((h, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            background: "#FCEBEB",
            border: "0.5px solid #F7C1C1",
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#791F1F",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 12px",
            }}
          >
            Risk factors
          </h3>
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 16px",
              fontSize: 14,
              color: "#A32D2D",
              lineHeight: 1.7,
            }}
          >
            {report.riskFactors.map((r, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {report.slideThumbnails && report.slideThumbnails.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              margin: "0 0 14px",
              color: "#111",
            }}
          >
            Presentation deck
          </h2>
          <SlideViewer
            thumbnails={report.slideThumbnails}
            pptxUrl={report.pptxUrl}
            pdfUrl={report.pdfUrl}
          />
        </section>
      )}

      <article
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: "#222",
          marginBottom: 56,
        }}
        dangerouslySetInnerHTML={{ __html: report.body }}
      />

      <section>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            margin: "0 0 20px",
            color: "#111",
          }}
        >
          Thesis history
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {report.thesisHistory.map((entry, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr auto",
                gap: 16,
                alignItems: "start",
                padding: "16px 0",
                borderBottom:
                  i < report.thesisHistory.length - 1
                    ? "0.5px solid #EBEBEB"
                    : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "#888", paddingTop: 1 }}>
                {entry.date}
              </span>
              <span style={{ fontSize: 14, color: "#333" }}>{entry.note}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#185FA5",
                  whiteSpace: "nowrap",
                }}
              >
                PT ${entry.priceTarget.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          marginTop: 56,
          padding: "16px 20px",
          background: "#F5F5F5",
          borderRadius: 8,
          fontSize: 12,
          color: "#999",
          lineHeight: 1.6,
        }}
      >
        This report is published by Texas Valuation &amp; Modeling for
        informational purposes only and does not constitute investment advice.
        Past performance is not indicative of future results. Please see our
        full disclosures page before acting on any information contained herein.
      </div>
    </main>
  );
}
