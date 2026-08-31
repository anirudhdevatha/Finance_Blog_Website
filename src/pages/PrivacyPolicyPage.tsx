export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 24px",
        color: "#111",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 18 }}>Privacy Policy</h1>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
        Texas Valuation &amp; Modeling respects the privacy of our readers, clients,
        and analysts. We collect only the information necessary to operate our site,
        maintain account access for approved users, and improve our research and
        investor communications.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>Information we collect</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          This website may collect contact information, authentication metadata, and
          usage data associated with account access and editorial workflows. We also
          process report metadata submitted by our team for publication.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>How we use it</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          We use information to authenticate users, provide access to secure research
          tools, maintain publication workflows, and improve the quality and relevance
          of our analysis.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>Data retention</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          We retain information only as long as needed to provide services, comply with
          applicable legal obligations, or support the integrity of our editorial and
          research processes.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, margin: "0 0 10px" }}>Your rights</h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>
          You may request access to, correction of, or deletion of personal data related
          to your account when legally permitted. Contact us through our support or admin
          channels for assistance.
        </p>
      </section>
    </main>
  );
}
