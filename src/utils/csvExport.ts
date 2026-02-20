import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Transaction, Category } from '../types';
import { formatDate } from './date';

function escapeCSV(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function exportTransactionsToCSV(
  transactions: Transaction[],
  categories: Category[]
): Promise<void> {
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const headers = ['Date', 'Type', 'Category', 'Amount', 'Notes'];
  const rows = transactions
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((tx) => {
      const cat = catMap.get(tx.categoryId);
      return [
        escapeCSV(formatDate(tx.date)),
        escapeCSV(tx.type),
        escapeCSV(cat ? `${cat.icon} ${cat.name}` : tx.categoryId),
        tx.amount.toFixed(2),
        escapeCSV(tx.notes),
      ].join(',');
    });

  const csv = [headers.join(','), ...rows].join('\n');
  const fileUri = FileSystem.documentDirectory + 'spendora_export.csv';

  await FileSystem.writeAsStringAsync(fileUri, csv, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Transactions',
      UTI: 'public.comma-separated-values-text',
    });
  }
}
