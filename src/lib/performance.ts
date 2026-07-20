import { supabase } from './supabase';
import type { PerformanceRecord } from '../data/mockData';

// ---- Row shape as it comes back from Postgres (snake_case) ----
interface PerformanceRow {
  company: string;
  ticker: string;
  rating: PerformanceRecord['rating'];
  entry_price: number;
  target_price: number;
  current_price: number;
  return_pct: number;
  date: string;
  status: 'Open' | 'Closed';
}

function mapRowToPerformanceRecord(row: PerformanceRow): PerformanceRecord {
  return {
    company: row.company,
    ticker: row.ticker,
    rating: row.rating,
    entryPrice: row.entry_price,
    targetPrice: row.target_price,
    currentPrice: row.current_price,
    returnPct: row.return_pct,
    date: row.date,
    status: row.status,
  };
}

export async function getPerformanceRecords(): Promise<PerformanceRecord[]> {
  const { data, error } = await supabase
    .from('performance_records')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return (data as PerformanceRow[]).map(mapRowToPerformanceRecord);
}