import { useState, useRef } from "react";

type Rating = "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell";

interface PostForm {
  ticker: string;
  companyName: string;
  sector: string;
  analyst: string;
  rating: Rating;
  currentPrice: string;
  targetPrice: string;
  timeHorizon: string;
  executiveSummary: string;
  investmentHighlights: string[];
  riskFactors: string[];
  body: string;
  pptxFile: File | null;
  pdfFile: File | null;
}

const SECTORS = [
  "Semiconductors", "Technology", "Energy", "Industrials",
  "Infrastructure", "Financials", "Healthcare", "Consumer", "Real Estate", "Materials",
];

const RATINGS: Rating[] = ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"];

const RATING_COLORS: Record<Rating, string> = {
  "Strong Buy": "#27500A",
  "Buy": "#085041",
  "Hold": "#633806",
  "Sell": "#712B13",
  "Strong Sell": "#791F1F",
};

// ─── Small reusable bits ──────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>
      {children}
    </label>
  );
}

function Input({
  value, onChange, placeholder, type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #E0E0E0",
        borderRadius: 8,
        fontSize: 14,
        color: "#111",
        background: "#fff",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    />
  );
}

function Textarea({
  value, onChange, placeholder, rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #E0E0E0",
        borderRadius: 8,
        fontSize: 14,
        color: "#111",
        background: "#fff",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        resize: "vertical",
        lineHeight: 1.6,
      }}
    />
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "24px 28px",
        marginBottom: 20,
      }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function FileDropZone({
  label, accept, file, onFile,
}: {
  label: string;
  accept: string;
  file: File | null;
  onFile: (f: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? "#185FA5" : file ? "#27500A" : "#D0D0D0"}`,
        borderRadius: 10,
        padding: "24px 20px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "#EFF5FF" : file ? "#EAF3DE" : "#FAFAFA",
        transition: "all 0.15s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
      <div style={{ fontSize: 24, marginBottom: 8 }}>{file ? "✅" : "📎"}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: file ? "#27500A" : "#555", marginBottom: 4 }}>
        {file ? file.name : label}
      </div>
      <div style={{ fontSize: 12, color: "#999" }}>
        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Click or drag & drop"}
      </div>
    </div>
  );
}

function BulletListEditor({
  items, onChange, placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const update = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#aaa", fontSize: 16, flexShrink: 0 }}>•</span>
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            style={{
              flex: 1, padding: "8px 12px", border: "1px solid #E0E0E0",
              borderRadius: 8, fontSize: 14, color: "#111", background: "#fff",
              outline: "none", fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => remove(i)}
            style={{
              background: "none", border: "none", color: "#ccc",
              cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "0 4px",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={add}
        style={{
          alignSelf: "flex-start", background: "none", border: "1px dashed #D0D0D0",
          borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#888",
          cursor: "pointer", marginTop: 4,
        }}
      >
        + Add item
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreatePostPage() {
  const [form, setForm] = useState<PostForm>({
    ticker: "",
    companyName: "",
    sector: "",
    analyst: "",
    rating: "Strong Buy",
    currentPrice: "",
    targetPrice: "",
    timeHorizon: "",
    executiveSummary: "",
    investmentHighlights: [""],
    riskFactors: [""],
    body: "",
    pptxFile: null,
    pdfFile: null,
  });

  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const set = <K extends keyof PostForm>(key: K, value: PostForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    // TODO: build FormData, POST to your backend
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v instanceof File) data.append(k, v);
      else if (Array.isArray(v)) data.append(k, JSON.stringify(v));
      else if (v !== null) data.append(k, String(v));
    });
    await new Promise((r) => setTimeout(r, 1200)); // remove this fake delay
    setPublishing(false);
    setPublished(true);
  };

  const upside =
    form.currentPrice && form.targetPrice
      ? (((parseFloat(form.targetPrice) - parseFloat(form.currentPrice)) / parseFloat(form.currentPrice)) * 100).toFixed(1)
      : null;

  if (published) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#F7F7F5",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111", margin: "0 0 8px" }}>Report published</h1>
          <p style={{ color: "#888", fontSize: 15, margin: "0 0 28px" }}>
            {form.ticker} — {form.companyName} is now live.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={`/reports/${form.ticker.toLowerCase()}`}
              style={{ padding: "10px 20px", background: "#0D1117", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              View report →
            </a>
            <button onClick={() => { setPublished(false); setForm({ ticker: "", companyName: "", sector: "", analyst: "", rating: "Strong Buy", currentPrice: "", targetPrice: "", timeHorizon: "", executiveSummary: "", investmentHighlights: [""], riskFactors: [""], body: "", pptxFile: null, pdfFile: null }); }}
              style={{ padding: "10px 20px", background: "#fff", border: "1px solid #E0E0E0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#333" }}>
              Post another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7F5", fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        background: "#0D1117", padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: 12,
            background: "#fff", color: "#0D1117", padding: "2px 7px", borderRadius: 4,
          }}>TVM</span>
          <span style={{ color: "#666", fontSize: 13 }}>/ Admin</span>
          <span style={{ color: "#444", fontSize: 13 }}>/</span>
          <span style={{ color: "#aaa", fontSize: 13 }}>New Report</span>
        </div>
        <a href="/admin" style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>← Back to dashboard</a>
      </div>

      <form onSubmit={handlePublish} style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 100px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            New research report
          </h1>
          <p style={{ fontSize: 14, color: "#888", margin: 0 }}>Fill in the details below and upload your files to publish.</p>
        </div>

        {/* Company info */}
        <SectionCard title="Company">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginBottom: 14 }}>
            <div>
              <Label>Ticker *</Label>
              <Input value={form.ticker} onChange={(v) => set("ticker", v.toUpperCase())} placeholder="AAPL" />
            </div>
            <div>
              <Label>Company name *</Label>
              <Input value={form.companyName} onChange={(v) => set("companyName", v)} placeholder="Apple Inc." />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <Label>Sector *</Label>
              <select
                value={form.sector}
                onChange={(e) => set("sector", e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0",
                  borderRadius: 8, fontSize: 14, color: form.sector ? "#111" : "#999",
                  background: "#fff", outline: "none", fontFamily: "inherit",
                }}
              >
                <option value="" disabled>Select sector</option>
                {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label>Analyst name *</Label>
              <Input value={form.analyst} onChange={(v) => set("analyst", v)} placeholder="Your name" />
            </div>
          </div>
        </SectionCard>

        {/* Investment metrics */}
        <SectionCard title="Investment metrics">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
            <div>
              <Label>Current price ($)</Label>
              <Input type="number" value={form.currentPrice} onChange={(v) => set("currentPrice", v)} placeholder="18.42" />
            </div>
            <div>
              <Label>Price target ($)</Label>
              <Input type="number" value={form.targetPrice} onChange={(v) => set("targetPrice", v)} placeholder="31.00" />
            </div>
            <div>
              <Label>Expected upside</Label>
              <div style={{
                padding: "10px 12px", border: "1px solid #E0E0E0", borderRadius: 8,
                fontSize: 14, background: "#F8F8F8", color: upside ? (parseFloat(upside) >= 0 ? "#27500A" : "#791F1F") : "#bbb",
                fontWeight: upside ? 700 : 400,
              }}>
                {upside ? `${parseFloat(upside) >= 0 ? "+" : ""}${upside}%` : "Auto"}
              </div>
            </div>
            <div>
              <Label>Time horizon</Label>
              <Input value={form.timeHorizon} onChange={(v) => set("timeHorizon", v)} placeholder="12–18 months" />
            </div>
          </div>
          <div>
            <Label>Rating *</Label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {RATINGS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set("rating", r)}
                  style={{
                    padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.1s",
                    border: form.rating === r ? `2px solid ${RATING_COLORS[r]}` : "2px solid #E0E0E0",
                    background: form.rating === r ? RATING_COLORS[r] : "#fff",
                    color: form.rating === r ? "#fff" : "#666",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Content */}
        <SectionCard title="Report content">
          <div style={{ marginBottom: 18 }}>
            <Label>Executive summary *</Label>
            <Textarea
              value={form.executiveSummary}
              onChange={(v) => set("executiveSummary", v)}
              placeholder="2–3 sentence thesis overview. This appears at the top of the report."
              rows={3}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 18 }}>
            <div>
              <Label>Investment highlights</Label>
              <BulletListEditor
                items={form.investmentHighlights}
                onChange={(v) => set("investmentHighlights", v)}
                placeholder="Key bull point..."
              />
            </div>
            <div>
              <Label>Risk factors</Label>
              <BulletListEditor
                items={form.riskFactors}
                onChange={(v) => set("riskFactors", v)}
                placeholder="Key risk..."
              />
            </div>
          </div>
          <div>
            <Label>Full article body (HTML supported)</Label>
            <Textarea
              value={form.body}
              onChange={(v) => set("body", v)}
              placeholder={`<h2>Industry backdrop</h2>\n<p>Your analysis here...</p>`}
              rows={10}
            />
            <p style={{ fontSize: 12, color: "#aaa", margin: "6px 0 0" }}>
              Supports HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;em&gt;, etc.
            </p>
          </div>
        </SectionCard>

        {/* File uploads */}
        <SectionCard title="Files">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <Label>Presentation (.pptx)</Label>
              <FileDropZone
                label="Upload PPTX file"
                accept=".pptx"
                file={form.pptxFile}
                onFile={(f) => set("pptxFile", f)}
              />
            </div>
            <div>
              <Label>PDF report</Label>
              <FileDropZone
                label="Upload PDF file"
                accept=".pdf"
                file={form.pdfFile}
                onFile={(f) => set("pdfFile", f)}
              />
            </div>
          </div>
        </SectionCard>

        {/* Publish bar */}
        <div style={{
          position: "sticky", bottom: 0, background: "#fff",
          border: "1px solid #E8E8E8", borderRadius: 12, padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: 13, color: "#888" }}>
            {form.ticker && form.companyName
              ? <><strong style={{ color: "#111" }}>{form.ticker}</strong> — {form.companyName}</>
              : "Fill in ticker and company name to preview"}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              style={{
                padding: "10px 20px", background: "#fff", border: "1px solid #E0E0E0",
                borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#555",
              }}
            >
              Save draft
            </button>
            <button
              type="submit"
              disabled={publishing}
              style={{
                padding: "10px 24px",
                background: publishing ? "#555" : "#0D1117",
                color: "#fff", border: "none", borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                cursor: publishing ? "not-allowed" : "pointer",
              }}
            >
              {publishing ? "Publishing..." : "Publish report →"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}