export type Rating = "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";

export interface ThesisUpdate {
  date: string;
  note: string;
  priceTarget: number;
}

export interface Report {
  slug: string;
  ticker: string;
  companyName: string;
  sector: string;
  analyst: string;
  publishedAt: string;
  rating: Rating;
  currentPrice: number;
  targetPrice: number;
  executiveSummary: string;
  featured?: boolean;
  timeHorizon: string;
  investmentHighlights: string[];
  riskFactors: string[];
  body: string;
  catalysts: string[];
  pptxUrl?: string;
  pdfUrl?: string;
  slideThumbnails?: string[];
  thesisHistory: ThesisUpdate[];
  relatedTickers?: string[];
}

export interface Position {
  ticker: string;
  companyName: string;
  sector: string;
  rating: Rating;
  currentPrice: number;
  targetPrice: number;
  entryPrice: number;
  timeHorizon: string;
  publishedAt: string;
  thesisSummary: string;
  catalysts: string[];
  risks: string[];
  thesisHistory: ThesisUpdate[];
  relatedTickers: string[];
}

export interface TeamMember {
  name: string;
  title: string;
  sectorFocus: string;
  bio: string;
  photo: string;
}

export interface PerformanceRecord {
  company: string;
  ticker: string;
  rating: Rating;
  entryPrice: number;
  targetPrice: number;
  currentPrice: number;
  returnPct: number;
  date: string;
  status: "Open" | "Closed";
}

export interface SectorOverview {
  name: string;
  blurb: string;
  focus: string;
}

export const MOCK_REPORTS: Report[] = [
  {
    slug: "acmr-jun2025",
    ticker: "ACMR",
    companyName: "ACM Research, Inc.",
    sector: "Technology",
    analyst: "James Whitfield",
    publishedAt: "June 10, 2025",
    rating: "Strong Buy",
    currentPrice: 18.42,
    targetPrice: 31.0,
    executiveSummary:
      "Sole qualified vendor for single-wafer wet-clean tools at CXMT. Import-substitution tailwinds drive >68% upside to our $31 price target.",
    featured: true,
    timeHorizon: "12–18 months",
    investmentHighlights: [
      "Sole qualified vendor for single-wafer wet-clean tools at CXMT.",
      "Revenue CAGR of 38% over the last three fiscal years.",
      "Net cash position of $210M provides runway for R&D without dilution risk.",
    ],
    riskFactors: [
      "U.S. export-control escalation could restrict component sourcing.",
      "Customer concentration remains elevated.",
    ],
    body: `
      <h2>Industry backdrop</h2>
      <p>China's semiconductor self-sufficiency push has accelerated meaningfully since 2022 export restrictions. ACM Research has been a direct beneficiary.</p>
      <h2>Competitive moat</h2>
      <p>ACMR's SAPS technology delivers particle removal efficiency exceeding ASML-adjacent benchmarks at 28nm and below.</p>
    `,
    catalysts: ["CXMT qualification ramp", "Ultra C Tahoe pilot expansion", "Gross margin expansion"],
    pptxUrl: "/reports/acmr-jun2025.pptx",
    pdfUrl: "/reports/acmr-jun2025.pdf",
    slideThumbnails: [
      "https://placehold.co/800x450/1a1a2e/ffffff?text=Slide+1",
      "https://placehold.co/800x450/16213e/ffffff?text=Slide+2",
      "https://placehold.co/800x450/0f3460/ffffff?text=Slide+3",
    ],
    thesisHistory: [
      { date: "June 10, 2025", note: "Initiated with Strong Buy. CXMT ramp ahead of schedule.", priceTarget: 31.0 },
      { date: "March 3, 2025", note: "Added to watchlist after Q4 beat.", priceTarget: 26.0 },
    ],
    relatedTickers: ["NVDA", "AMD", "INTC"],
  },
  {
    slug: "cvx-may2025",
    ticker: "CVX",
    companyName: "Chevron Corporation",
    sector: "Energy",
    analyst: "Marcus Reyes",
    publishedAt: "May 28, 2025",
    rating: "Buy",
    currentPrice: 152.3,
    targetPrice: 178.0,
    executiveSummary:
      "Permian Basin optionality and Hess acquisition synergies are underappreciated by the market.",
    featured: true,
    timeHorizon: "9–12 months",
    investmentHighlights: ["Permian inventory depth", "Strong free cash flow", "Buyback support"],
    riskFactors: ["Commodity price volatility", "Integration execution risk"],
    body: "<p>Chevron's capital allocation and low-cost asset base support durable free cash flow generation.</p>",
    catalysts: ["Permian volume growth", "Hess integration", "Buyback acceleration"],
    thesisHistory: [{ date: "May 28, 2025", note: "Reiterated Buy after improving upstream outlook.", priceTarget: 178.0 }],
    relatedTickers: ["XOM", "COP", "SLB"],
  },
  {
    slug: "uri-may2025",
    ticker: "URI",
    companyName: "United Rentals, Inc.",
    sector: "Industrials",
    analyst: "James Whitfield",
    publishedAt: "May 14, 2025",
    rating: "Buy",
    currentPrice: 618.4,
    targetPrice: 740.0,
    executiveSummary:
      "Infrastructure bill tailwinds and specialty rental mix shift drive durable earnings power.",
    timeHorizon: "12 months",
    investmentHighlights: ["Infrastructure demand tailwinds", "Rental fleet utilization improving", "Margin expansion"],
    riskFactors: ["Rate-sensitive project delays", "Fleet utilization volatility"],
    body: "<p>United Rentals continues to benefit from the infrastructure spending cycle and a stronger rental mix.</p>",
    catalysts: ["Infrastructure bill deployment", "Fleet utilization", "Pricing discipline"],
    thesisHistory: [{ date: "May 14, 2025", note: "Raised target on improving utilization and pricing.", priceTarget: 740.0 }],
    relatedTickers: ["CAT", "DE", "PCAR"],
  },
  {
    slug: "intc-apr2025",
    ticker: "INTC",
    companyName: "Intel Corporation",
    sector: "Technology",
    analyst: "Marcus Reyes",
    publishedAt: "April 22, 2025",
    rating: "Hold",
    currentPrice: 21.8,
    targetPrice: 24.0,
    executiveSummary:
      "18A process node remains a wildcard. Foundry losses narrowing but timeline to profitability still uncertain.",
    timeHorizon: "6–12 months",
    investmentHighlights: ["Foundry turnaround progressing", "Capital discipline improving"],
    riskFactors: ["Execution risk around 18A", "Competitive pressure in PC and server markets"],
    body: "<p>Intel remains a wait-and-see name until execution improves on the process roadmap.</p>",
    catalysts: ["Manufacturing milestones", "Client and data center demand", "Foundry margin visibility"],
    thesisHistory: [{ date: "April 22, 2025", note: "Maintained Hold while monitoring process node ramp.", priceTarget: 24.0 }],
    relatedTickers: ["AMD", "NVDA", "QCOM"],
  },
  {
    slug: "xom-apr2025",
    ticker: "XOM",
    companyName: "Exxon Mobil Corporation",
    sector: "Energy",
    analyst: "Marcus Reyes",
    publishedAt: "April 8, 2025",
    rating: "Hold",
    currentPrice: 108.5,
    targetPrice: 112.0,
    executiveSummary:
      "Pioneer integration on track but limited re-rating catalyst near-term. Dividend safety strong; prefer CVX for upside.",
    timeHorizon: "6 months",
    investmentHighlights: ["Strong balance sheet", "Integration synergies", "Dividend durability"],
    riskFactors: ["Capital discipline concerns", "Commodity cyclicality"],
    body: "<p>Exxon remains attractive on capital returns but offers less upside relative to peers near term.</p>",
    catalysts: ["Pioneer integration progress", "Permian productivity gains", "Shareholder returns"],
    thesisHistory: [{ date: "April 8, 2025", note: "Maintained Hold after integration update.", priceTarget: 112.0 }],
    relatedTickers: ["CVX", "COP", "SLB"],
  },
];

export const MOCK_POSITIONS: Position[] = [
  {
    ticker: "ACMR",
    companyName: "ACM Research, Inc.",
    sector: "Technology",
    rating: "Strong Buy",
    currentPrice: 18.42,
    targetPrice: 31.0,
    entryPrice: 16.8,
    timeHorizon: "12–18 months",
    publishedAt: "June 10, 2025",
    thesisSummary:
      "ACMR is a critical enabler in China's semiconductor tool supply chain and should benefit from domestic fab spending acceleration.",
    catalysts: ["CXMT qualification ramp", "Ultra C Tahoe pilot expansion", "Higher tool attach rates"],
    risks: ["Export-control escalation", "Customer concentration", "FX headwinds"],
    thesisHistory: [
      { date: "June 10, 2025", note: "Initiated with a $31 target on improved tool attach rates.", priceTarget: 31.0 },
      { date: "March 3, 2025", note: "Raised target after stronger than expected tool orders.", priceTarget: 26.0 },
    ],
    relatedTickers: ["NVDA", "AMD", "INTC"],
  },
  {
    ticker: "CVX",
    companyName: "Chevron Corporation",
    sector: "Energy",
    rating: "Buy",
    currentPrice: 152.3,
    targetPrice: 178.0,
    entryPrice: 144.2,
    timeHorizon: "9–12 months",
    publishedAt: "May 28, 2025",
    thesisSummary:
      "Chevron offers a compelling combination of free cash flow generation, balance sheet strength, and underappreciated integration upside.",
    catalysts: ["Hess integration", "Permian volume growth", "Buyback acceleration"],
    risks: ["Commodity volatility", "Execution risk from integration"],
    thesisHistory: [
      { date: "May 28, 2025", note: "Maintained Buy with rising target following stronger upstream outlook.", priceTarget: 178.0 },
    ],
    relatedTickers: ["XOM", "COP", "SLB"],
  },
  {
    ticker: "URI",
    companyName: "United Rentals, Inc.",
    sector: "Industrials",
    rating: "Buy",
    currentPrice: 618.4,
    targetPrice: 740.0,
    entryPrice: 590.1,
    timeHorizon: "12 months",
    publishedAt: "May 14, 2025",
    thesisSummary:
      "United Rentals should benefit from infrastructure spending and ongoing fleet mix improvement.",
    catalysts: ["Infrastructure deployment", "Utilization improvement", "Pricing discipline"],
    risks: ["Rate-sensitive delays", "Fleet utilization swings"],
    thesisHistory: [
      { date: "May 14, 2025", note: "Raised target following improved utilization and pricing.", priceTarget: 740.0 },
    ],
    relatedTickers: ["CAT", "DE", "PCAR"],
  },
];

export const MOCK_TEAM: TeamMember[] = [
  {
    name: "James Whitfield",
    title: "Managing Director",
    sectorFocus: "Technology & Industrials",
    bio: "James leads the firm's long-duration fundamental research process with a focus on industrial technology and semis.",
    photo: "https://placehold.co/220x220/111111/ffffff?text=JW",
  },
  {
    name: "Marcus Reyes",
    title: "Senior Research Analyst",
    sectorFocus: "Energy & Materials",
    bio: "Marcus covers energy infrastructure and upstream equities, emphasizing capital allocation and asset quality.",
    photo: "https://placehold.co/220x220/1a1a2e/ffffff?text=MR",
  },
  {
    name: "Priya Shah",
    title: "Research Associate",
    sectorFocus: "Infrastructure",
    bio: "Priya supports the firm's public market research, valuation work, and presentation development.",
    photo: "https://placehold.co/220x220/16213e/ffffff?text=PS",
  },
];

export const MOCK_PERFORMANCE: PerformanceRecord[] = [
  { company: "ACM Research", ticker: "ACMR", rating: "Strong Buy", entryPrice: 14.2, targetPrice: 24.0, currentPrice: 18.42, returnPct: 29.7, date: "Jan 2025", status: "Open" },
  { company: "Chevron", ticker: "CVX", rating: "Buy", entryPrice: 144.2, targetPrice: 178.0, currentPrice: 152.3, returnPct: 5.6, date: "Feb 2025", status: "Open" },
  { company: "United Rentals", ticker: "URI", rating: "Buy", entryPrice: 590.1, targetPrice: 740.0, currentPrice: 618.4, returnPct: 4.8, date: "Mar 2025", status: "Open" },
  { company: "Intel", ticker: "INTC", rating: "Hold", entryPrice: 20.1, targetPrice: 24.0, currentPrice: 21.8, returnPct: 8.4, date: "Apr 2025", status: "Open" },
  { company: "Exxon Mobil", ticker: "XOM", rating: "Hold", entryPrice: 110.2, targetPrice: 112.0, currentPrice: 108.5, returnPct: -1.5, date: "Apr 2025", status: "Closed" },
];

export const MOCK_SECTORS: SectorOverview[] = [
  { name: "Energy", blurb: "We focus on quality upstream and integrated energy assets with durable free cash flow and disciplined capital allocation.", focus: "Capital returns, reserve quality, and downstream integration" },
  { name: "Technology", blurb: "Our technology coverage emphasizes semis, equipment, and software businesses with clear product leadership and long-duration demand tailwinds.", focus: "Semiconductor capex cycles, platform moats, and valuation discipline" },
  { name: "Industrials", blurb: "We target infrastructure-linked beneficiaries where pricing power and utilization improvements support multi-year earnings growth.", focus: "Cycle resilience, pricing power, and equipment demand" },
];

export function getReportBySlug(slug: string) {
  return MOCK_REPORTS.find((report) => report.slug === slug) ?? null;
}

export function getPositionByTicker(ticker: string) {
  return MOCK_POSITIONS.find((position) => position.ticker.toLowerCase() === ticker.toLowerCase()) ?? null;
}

export function getReportsBySector(sector: string) {
  return MOCK_REPORTS.filter((report) => report.sector.toLowerCase() === sector.toLowerCase());
}

export function getSectorOverview(sector: string) {
  return MOCK_SECTORS.find((item) => item.name.toLowerCase() === sector.toLowerCase()) ?? null;
}
