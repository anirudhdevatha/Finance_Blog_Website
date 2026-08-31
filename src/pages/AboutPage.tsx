import { Link } from "react-router-dom";

const sections = [
  {
    title: "What we do",
    text: "We publish equity research pitches using DCF, SOTP, and NAV, plus market watches on current events and catalysts.",
  },
  {
    title: "How a pitch gets built",
    text: "Research, modeling, then peer review before anything goes out. We’ve also gotten informal feedback from industry professionals along the way.",
  },
  {
    title: "Where we’re headed",
    text: "As TVM grows, we want to help train the next wave of students trying to break into finance.",
  },
  {
    title: "Status",
    text: "An independent, student-founded organization.",
  },
];

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "52px 24px 48px",
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
          Texas Valuation &amp; Modeling
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "#555",
            maxWidth: 760,
            margin: 0,
          }}
        >
          Student-led research for investors and future finance professionals.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {sections.map((section) => (
          <article
            key={section.title}
            style={{
              background: "#fff",
              border: "1px solid #E8E8E8",
              borderRadius: 14,
              padding: "24px 26px",
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 10px",
              }}
            >
              {section.title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#555", margin: 0 }}>
              {section.text}
            </p>
          </article>
        ))}
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            margin: "0 0 14px",
          }}
        >
          Team
        </h2>
        <div
          style={{
            background: "#fff",
            border: "1px solid #E8E8E8",
            borderRadius: 14,
            padding: "22px 24px",
            fontSize: 16,
            fontWeight: 600,
            color: "#333",
          }}
        >
          First Name, Last Name —
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
            Explore our latest ideas and track the thinking behind each recommendation.
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
    </main>
  );
}
