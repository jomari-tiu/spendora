import { format, parseISO } from 'date-fns';
import { Transaction, Category, MonthlySummary, CategoryExpense, MonthlyAggregate } from '../types';

export function getMonthTransactions(transactions: Transaction[], month: string): Transaction[] {
  return transactions.filter((tx) => tx.date.startsWith(month));
}

export function calcSummary(transactions: Transaction[]): MonthlySummary {
  let income = 0;
  let expense = 0;
  for (const tx of transactions) {
    if (tx.type === 'income') income += tx.amount;
    else expense += tx.amount;
  }
  return { income, expense, balance: income - expense };
}

export interface TransactionSection {
  title: string;
  data: Transaction[];
}

export function groupByDate(transactions: Transaction[]): TransactionSection[] {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  const map = new Map<string, Transaction[]>();
  for (const tx of sorted) {
    const existing = map.get(tx.date) ?? [];
    existing.push(tx);
    map.set(tx.date, existing);
  }
  return Array.from(map.entries()).map(([date, data]) => ({ title: date, data }));
}

export function calcCategoryExpenses(
  transactions: Transaction[],
  categories: Category[]
): CategoryExpense[] {
  const expenses = transactions.filter((tx) => tx.type === 'expense');
  const total = expenses.reduce((sum, tx) => sum + tx.amount, 0);
  if (total === 0) return [];

  const map = new Map<string, number>();
  for (const tx of expenses) {
    map.set(tx.categoryId, (map.get(tx.categoryId) ?? 0) + tx.amount);
  }

  const result: CategoryExpense[] = [];
  for (const [categoryId, amount] of map.entries()) {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) continue;
    result.push({
      categoryId,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      amount,
      percentage: (amount / total) * 100,
    });
  }
  return result.sort((a, b) => b.amount - a.amount);
}

export function calcMonthlyAggregates(transactions: Transaction[]): MonthlyAggregate[] {
  const map = new Map<string, { income: number; expense: number }>();

  for (const tx of transactions) {
    const monthKey = tx.date.substring(0, 7); // "2026-02"
    const existing = map.get(monthKey) ?? { income: 0, expense: 0 };
    if (tx.type === 'income') existing.income += tx.amount;
    else existing.expense += tx.amount;
    map.set(monthKey, existing);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([monthKey, { income, expense }]) => ({
      month: format(parseISO(monthKey + '-01'), 'MMM'),
      income,
      expense,
    }));
}
