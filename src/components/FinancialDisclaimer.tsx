type FinancialDisclaimerProps = {
  variant?: "compact" | "full";
  style?: React.CSSProperties;
};

export function FinancialDisclaimer({
  variant = "full",
  style,
}: FinancialDisclaimerProps) {
  if (variant === "compact") {
    return (
      <p
        style={{
          fontSize: 11,
          lineHeight: 1.5,
          color: "#777",
          margin: 0,
          ...style,
        }}
      >
        This report is for informational purposes only and does not constitute
        investment advice. Past performance is not indicative of future results.
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: 56,
        padding: "16px 20px",
        background: "#F5F5F5",
        borderRadius: 8,
        fontSize: 12,
        color: "#666",
        lineHeight: 1.6,
        border: "1px solid #EBEBEB",
        ...style,
      }}
    >
      This report is published by Texas Valuation &amp; Modeling for
      informational purposes only and does not constitute investment advice.
      Past performance is not indicative of future results. Please see our full
      disclosures, privacy policy, and terms of service before acting on any
      information contained herein.
    </div>
  );
}
