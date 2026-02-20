import { format, parseISO } from 'date-fns';

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
}

export function formatMonth(monthStr: string): string {
  // monthStr: "2026-02"
  try {
    return format(parseISO(monthStr + '-01'), 'MMMM yyyy');
  } catch {
    return monthStr;
  }
}

export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function toMonthString(date: Date): string {
  return format(date, 'yyyy-MM');
}

export function addMonths(monthStr: string, delta: number): string {
  const [year, month] = monthStr.split('-').map(Number);
  const d = new Date(year, month - 1 + delta, 1);
  return toMonthString(d);
}
