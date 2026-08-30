export default function TermsPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 24px 120px",
        color: "#111",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 18 }}>Terms of Service</h1>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
        By accessing Texas Valuation &amp; Modeling, you agree to use the site for lawful
        informational purposes only. Our research and analysis are educational and do not
        constitute individualized investment advice, recommendations, or solicitations.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>No investment advice</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          All content is provided for informational and educational purposes only. Readers
          should conduct their own independent due diligence and consult qualified financial
          professionals before making investment or financial decisions.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>Accuracy and limitations</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          We aim to provide thoughtfully researched commentary, but market conditions, company
          information, and external factors may change. No guarantee is made regarding the
          accuracy, timeliness, or completeness of any published report.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>Access and conduct</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          Users must not misuse the platform, attempt unauthorized access, or interfere with
          editorial or security processes. We may suspend access to users who violate these
          terms or engage in abusive or harmful behavior.
        </p>
      </section>
    </main>
  );
}
