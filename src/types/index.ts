export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string; // "2026-02-20"
  notes: string;
  createdAt: string; // ISO timestamp
}

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji
  color: string; // hex
  isDefault: boolean;
}

export interface AppSettings {
  currency: string;
}

export interface MonthlySummary {
  income: number;
  expense: number;
  balance: number;
}

export interface CategoryExpense {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
}

export interface MonthlyAggregate {
  month: string;
  income: number;
  expense: number;
}
