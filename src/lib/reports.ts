import { supabase } from './supabase';
import type { Report, ThesisUpdate } from '../data/mockData';

// ---- Row shape as it comes back from Postgres (snake_case) ----
interface ReportRow {
  slug: string;
  ticker: string;
  company_name: string;
  sector: string;
  analyst: string;
  published_at: string;
  rating: Report['rating'];
  current_price: number;
  target_price: number;
  executive_summary: string;
  featured: boolean;
  time_horizon: string;
  investment_highlights: string[];
  risk_factors: string[];
  body: string;
  catalysts: string[];
  pptx_url: string | null;
  pdf_url: string | null;
  slide_thumbnails: string[];
  thesis_history: ThesisUpdate[];
  related_tickers: string[];
  status: 'draft' | 'published';
}

// ---- Convert DB row -> the Report shape your components already use ----
function mapRowToReport(row: ReportRow): Report {
  return {
    slug: row.slug,
    ticker: row.ticker,
    companyName: row.company_name,
    sector: row.sector,
    analyst: row.analyst,
    publishedAt: row.published_at,
    rating: row.rating,
<<<<<<< Updated upstream
    currentPrice: row.current_price,
    targetPrice: row.target_price,
    executiveSummary: row.executive_summary,
    featured: row.featured,
    timeHorizon: row.time_horizon,
    investmentHighlights: row.investment_highlights,
    riskFactors: row.risk_factors,
    body: row.body,
    catalysts: row.catalysts,
    pptxUrl: row.pptx_url ?? undefined,
    pdfUrl: row.pdf_url ?? undefined,
    slideThumbnails: row.slide_thumbnails,
    thesisHistory: row.thesis_history,
    relatedTickers: row.related_tickers,
=======
    currentPrice: Number(row.current_price) || 0,
    targetPrice: Number(row.target_price) || 0,
    executiveSummary: row.executive_summary,
    featured: row.featured,
    timeHorizon: row.time_horizon,
    investmentHighlights: Array.isArray(row.investment_highlights) ? row.investment_highlights : [],
    riskFactors: Array.isArray(row.risk_factors) ? row.risk_factors : [],
    body: row.body,
    catalysts: Array.isArray(row.catalysts) ? row.catalysts : [],
    pptxUrl: row.pptx_url ?? undefined,
    pdfUrl: row.pdf_url ?? undefined,
    slideThumbnails: Array.isArray(row.slide_thumbnails) ? row.slide_thumbnails : [],
    thesisHistory: Array.isArray(row.thesis_history) ? row.thesis_history : [],
    relatedTickers: Array.isArray(row.related_tickers) ? row.related_tickers : [],
>>>>>>> Stashed changes
  };
}

// ─── Public reads ──────────────────────────────────────────────────────────

export async function getPublishedReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data as ReportRow[]).map(mapRowToReport);
}

export async function getFeaturedReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data as ReportRow[]).map(mapRowToReport);
}

export async function getReportBySlug(slug: string): Promise<Report> {
<<<<<<< Updated upstream
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('slug', slug)
=======
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('slug', sanitizedSlug)
>>>>>>> Stashed changes
    .single();

  if (error) throw error;
  return mapRowToReport(data as ReportRow);
}

export async function getReportsBySector(sector: string): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .ilike('sector', sector)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data as ReportRow[]).map(mapRowToReport);
}

// ─── Admin-only reads ──────────────────────────────────────────────────────
<<<<<<< Updated upstream
// These rely on the "Admins read all reports" RLS policy (Step 4 of the setup
// guide) to also see drafts. A non-admin calling these just gets published
// rows back, same as the public functions above — RLS quietly filters it.

// The public Report type deliberately has no `status` field — public pages
// never need it. The admin dashboard does, so it gets its own type.
=======

>>>>>>> Stashed changes
export interface AdminReport extends Report {
  status: 'draft' | 'published';
}

export async function getAdminReports(): Promise<AdminReport[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as ReportRow[]).map((row) => ({
    ...mapRowToReport(row),
    status: row.status,
  }));
}

<<<<<<< Updated upstream
// Same query as getReportBySlug, kept as a separate name so it's clear in
// CreatePostPage that loading a report for *editing* is an admin-only path,
// even though today it happens to hit the same table/row.
=======
>>>>>>> Stashed changes
export async function getReportForEdit(slug: string): Promise<Report> {
  return getReportBySlug(slug);
}

<<<<<<< Updated upstream
// ─── Uploads ────────────────────────────────────────────────────────────────

export async function uploadReportAsset(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from('report-assets').upload(fileName, file);
=======
// ─── Uploads with strict file validation ───────────────────────────────────

const ALLOWED_UPLOAD_EXTENSIONS = new Set(['pdf', 'pptx', 'ppt', 'png', 'jpg', 'jpeg', 'webp']);
const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024; // 50MB limit

export async function uploadReportAsset(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error('File size exceeds the 50MB maximum allowed limit.');
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
    throw new Error(
      `Invalid file type ".${ext}". Allowed types: ${Array.from(ALLOWED_UPLOAD_EXTENSIONS).join(', ')}`
    );
  }

  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from('report-assets').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });
>>>>>>> Stashed changes
  if (error) throw error;

  const { data } = supabase.storage.from('report-assets').getPublicUrl(fileName);
  return data.publicUrl;
}

// ─── Create / update / delete (admin-only, enforced by RLS) ────────────────

export interface ReportInput {
  ticker: string;
  companyName: string;
  sector: string;
  analyst: string;
  rating: Report['rating'];
  currentPrice: number;
  targetPrice: number;
  executiveSummary: string;
  featured: boolean;
  timeHorizon: string;
  investmentHighlights: string[];
  riskFactors: string[];
  body: string;
  catalysts: string[];
  pptxUrl?: string;
  pdfUrl?: string;
  slideThumbnails?: string[];
  relatedTickers?: string[];
  status: 'draft' | 'published';
}

<<<<<<< Updated upstream
export async function createReport(input: ReportInput): Promise<Report> {
  const slug = `${input.ticker.toLowerCase()}-${Date.now()}`;
=======
function validateReportInput(input: ReportInput) {
  if (!input.ticker?.trim() || !input.companyName?.trim()) {
    throw new Error('Ticker and Company Name are required.');
  }
  if (isNaN(input.currentPrice) || input.currentPrice < 0) {
    throw new Error('Current price must be a valid non-negative number.');
  }
  if (isNaN(input.targetPrice) || input.targetPrice < 0) {
    throw new Error('Target price must be a valid non-negative number.');
  }
}

export async function createReport(input: ReportInput): Promise<Report> {
  validateReportInput(input);
  const cleanTicker = input.ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const slug = `${cleanTicker.toLowerCase()}-${Date.now()}`;
>>>>>>> Stashed changes

  const { data, error } = await supabase
    .from('reports')
    .insert({
      slug,
<<<<<<< Updated upstream
      ticker: input.ticker,
      company_name: input.companyName,
      sector: input.sector,
      analyst: input.analyst,
      rating: input.rating,
      current_price: input.currentPrice,
      target_price: input.targetPrice,
      executive_summary: input.executiveSummary,
      featured: input.featured,
      time_horizon: input.timeHorizon,
=======
      ticker: cleanTicker,
      company_name: input.companyName.trim(),
      sector: input.sector.trim(),
      analyst: input.analyst.trim(),
      rating: input.rating,
      current_price: input.currentPrice,
      target_price: input.targetPrice,
      executive_summary: input.executiveSummary.trim(),
      featured: Boolean(input.featured),
      time_horizon: input.timeHorizon.trim(),
>>>>>>> Stashed changes
      investment_highlights: input.investmentHighlights,
      risk_factors: input.riskFactors,
      body: input.body,
      catalysts: input.catalysts,
      pptx_url: input.pptxUrl ?? null,
      pdf_url: input.pdfUrl ?? null,
      slide_thumbnails: input.slideThumbnails ?? [],
      related_tickers: input.relatedTickers ?? [],
      thesis_history: [
        { date: new Date().toLocaleDateString(), note: 'Initial publication.', priceTarget: input.targetPrice },
      ],
      status: input.status,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRowToReport(data as ReportRow);
}

<<<<<<< Updated upstream
// Updates a report in place. Pass the *existing* slug — the slug itself never
// changes on edit, since it's what the URL and any external links depend on.
//
// If the price target changed since the last save, this appends a new
// thesis_history entry automatically so the report's "Thesis history" section
// keeps a running log of target changes, the same way the original mock data
// modeled it.
export async function updateReport(slug: string, input: ReportInput): Promise<Report> {
  const existing = await getReportBySlug(slug);
=======
export async function updateReport(slug: string, input: ReportInput): Promise<Report> {
  validateReportInput(input);
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const existing = await getReportBySlug(sanitizedSlug);
>>>>>>> Stashed changes
  const targetChanged = existing.targetPrice !== input.targetPrice;

  const nextThesisHistory = targetChanged
    ? [
        { date: new Date().toLocaleDateString(), note: 'Price target updated.', priceTarget: input.targetPrice },
        ...existing.thesisHistory,
      ]
    : existing.thesisHistory;

  const { data, error } = await supabase
    .from('reports')
    .update({
<<<<<<< Updated upstream
      ticker: input.ticker,
      company_name: input.companyName,
      sector: input.sector,
      analyst: input.analyst,
      rating: input.rating,
      current_price: input.currentPrice,
      target_price: input.targetPrice,
      executive_summary: input.executiveSummary,
      featured: input.featured,
      time_horizon: input.timeHorizon,
=======
      ticker: input.ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, ''),
      company_name: input.companyName.trim(),
      sector: input.sector.trim(),
      analyst: input.analyst.trim(),
      rating: input.rating,
      current_price: input.currentPrice,
      target_price: input.targetPrice,
      executive_summary: input.executiveSummary.trim(),
      featured: Boolean(input.featured),
      time_horizon: input.timeHorizon.trim(),
>>>>>>> Stashed changes
      investment_highlights: input.investmentHighlights,
      risk_factors: input.riskFactors,
      body: input.body,
      catalysts: input.catalysts,
      pptx_url: input.pptxUrl ?? null,
      pdf_url: input.pdfUrl ?? null,
      slide_thumbnails: input.slideThumbnails ?? [],
      related_tickers: input.relatedTickers ?? [],
      thesis_history: nextThesisHistory,
      status: input.status,
    })
<<<<<<< Updated upstream
    .eq('slug', slug)
=======
    .eq('slug', sanitizedSlug)
>>>>>>> Stashed changes
    .select()
    .single();

  if (error) throw error;
  return mapRowToReport(data as ReportRow);
}

export async function deleteReport(slug: string): Promise<void> {
<<<<<<< Updated upstream
  const { error } = await supabase.from('reports').delete().eq('slug', slug);
=======
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const { error } = await supabase.from('reports').delete().eq('slug', sanitizedSlug);
>>>>>>> Stashed changes
  if (error) throw error;
}

// ─── Admin check ────────────────────────────────────────────────────────────

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (error) return false;
<<<<<<< Updated upstream
  return !!data;
=======
  return Boolean(data);
>>>>>>> Stashed changes
}