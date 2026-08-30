import { Link } from "react-router-dom";
import { MOCK_TEAM } from "../data/mockData";
import { FinancialDisclaimer } from "../components/FinancialDisclaimer";

const values = [
  {
    title: "Conviction-based",
    text: "We publish high-conviction ideas with clear positioning and valuation discipline.",
  },
  {
    title: "Long-term focus",
    text: "Our work emphasizes durable business quality over short-term noise.",
  },
  {
    title: "Transparent process",
    text: "We explain the assumptions behind each view and what could change the thesis.",
  },
];

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "52px 24px 96px",
        color: "#111",
      }}
    >
      <section style={{ marginBottom: 36 }}>
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
          About us
        </p>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}
        >
          Long-term research built for disciplined investors.
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#555",
            maxWidth: 760,
          }}
        >
          Texas Valuation & Modeling is a research-focused firm dedicated to
          publishing thoughtful, conviction-driven ideas across public markets.
          Our work blends fundamental analysis, scenario planning, and valuation
          discipline to help investors understand both the upside and the risks
          behind each thesis.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E8E8",
            borderRadius: 14,
            padding: "28px 30px",
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            Who we are
          </h2>
          <p
            style={{ fontSize: 15, lineHeight: 1.75, color: "#444", margin: 0 }}
          >
            We believe strong investing starts with understanding the business,
            the market structure, and the management team. Our research
            philosophy is grounded in long-term thinking, rigorous valuation,
            and transparent communication rather than short-term market noise.
          </p>
        </div>
        <div
          style={{
            background: "#0D1117",
            color: "#fff",
            borderRadius: 14,
            padding: "28px 30px",
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            What we focus on
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: "#ccc",
              lineHeight: 1.8,
            }}
          >
            <li>High-conviction public market ideas</li>
            <li>Long-duration business quality analysis</li>
            <li>Valuation and catalyst-driven frameworks</li>
            <li>Clear risk-reward communication</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 20,
          }}
        >
          Our team
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {MOCK_TEAM.map((member) => (
            <div
              key={member.name}
              style={{
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 14,
                padding: 20,
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 12,
                  marginBottom: 14,
                }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#185FA5",
                  fontWeight: 600,
                  margin: "0 0 8px",
                }}
              >
                {member.title}
              </p>
              <p style={{ fontSize: 13, color: "#777", margin: "0 0 8px" }}>
                {member.sectorFocus}
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#555",
                  margin: 0,
                }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FinancialDisclaimer variant="full" />

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 20,
          }}
        >
          Why investors read us
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {values.map((value) => (
            <div
              key={value.title}
              style={{
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 14,
                padding: 22,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>
                {value.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "#555",
                  lineHeight: 1.7,
                }}
              >
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          background: "#EAF3DE",
          border: "1px solid #C0DD97",
          borderRadius: 14,
          padding: "24px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>
            See the work behind the thesis.
          </h3>
          <p style={{ margin: 0, color: "#3B6D11" }}>
            Explore our latest ideas and track the thinking behind each
            recommendation.
          </p>
        </div>
        <Link
          to="/research"
          style={{
            textDecoration: "none",
            background: "#0D1117",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          View our research
        </Link>
      </div>
      <FinancialDisclaimer variant="full" />
    </main>
  );
}
