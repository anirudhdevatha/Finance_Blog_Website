import { supabase } from './supabase';
import type { Report, ThesisUpdate } from '../data/mockData';

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

function mapRowToReport(row: ReportRow): Report {
  return {
    slug: row.slug,
    ticker: row.ticker,
    companyName: row.company_name,
    sector: row.sector,
    analyst: row.analyst,
    publishedAt: row.published_at,
    rating: row.rating,
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
  };
}

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
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('slug', sanitizedSlug)
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

export async function getReportForEdit(slug: string): Promise<Report> {
  return getReportBySlug(slug);
}

const ALLOWED_UPLOAD_EXTENSIONS = new Set(['pdf', 'pptx', 'ppt', 'png', 'jpg', 'jpeg', 'webp']);
const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;

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

  const { error } = await supabase.storage
    .from('report-assets')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from('report-assets').getPublicUrl(fileName);
  return data.publicUrl;
}

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

function validateReportInput(input: ReportInput) {
  if (!input.ticker?.trim() || !input.companyName?.trim()) {
    throw new Error('Ticker and Company Name are required.');
  }
  if (Number.isNaN(input.currentPrice) || input.currentPrice < 0) {
    throw new Error('Current price must be a valid non-negative number.');
  }
  if (Number.isNaN(input.targetPrice) || input.targetPrice < 0) {
    throw new Error('Target price must be a valid non-negative number.');
  }
}

export async function createReport(input: ReportInput): Promise<Report> {
  validateReportInput(input);
  const cleanTicker = input.ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const slug = `${cleanTicker.toLowerCase()}-${Date.now()}`;

  const { data, error } = await supabase
    .from('reports')
    .insert({
      slug,
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

export async function updateReport(slug: string, input: ReportInput): Promise<Report> {
  validateReportInput(input);
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const existing = await getReportBySlug(sanitizedSlug);
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
    .eq('slug', sanitizedSlug)
    .select()
    .single();

  if (error) throw error;
  return mapRowToReport(data as ReportRow);
}

export async function deleteReport(slug: string): Promise<void> {
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');
  const { error } = await supabase.from('reports').delete().eq('slug', sanitizedSlug);
  if (error) throw error;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (error) return false;
  return Boolean(data);
}