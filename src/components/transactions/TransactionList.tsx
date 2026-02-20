import { SectionList, Text, View } from 'react-native';
import { Transaction } from '../../types';
import { TransactionItem } from './TransactionItem';
import { SectionHeader } from '../ui/SectionHeader';
import { EmptyState } from '../ui/EmptyState';
import { TransactionSection } from '../../utils/calculations';

interface TransactionListProps {
  sections: TransactionSection[];
  emptyMessage?: string;
}

export function TransactionList({ sections, emptyMessage }: TransactionListProps) {
  if (sections.length === 0) {
    return (
      <EmptyState
        emoji="💸"
        title="No transactions yet"
        subtitle={emptyMessage ?? 'Tap + to add your first transaction'}
      />
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: { item: Transaction }) => (
        <TransactionItem transaction={item} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader date={title} />
      )}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}
