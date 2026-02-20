import { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../src/hooks/useTransactions";
import { groupByDate } from "../../src/utils/calculations";
import { TransactionType } from "../../src/types";
import { TransactionList } from "../../src/components/transactions/TransactionList";
import { TransactionFilters } from "../../src/components/transactions/TransactionFilters";
import { FABButton } from "../../src/components/dashboard/FABButton";
import { LoadingSpinner } from "../../src/components/ui/LoadingSpinner";

type FilterType = "all" | TransactionType;

export default function TransactionsScreen() {
  const { transactions, isLoading } = useTransactions();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((tx) => tx.type === filter);
  }, [transactions, filter]);

  const sections = useMemo(() => groupByDate(filtered), [filtered]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 " edges={["top"]}>
      <View className="px-4 pt-2 pb-3">
        <Text className="text-2xl font-bold text-gray-900 ">Transactions</Text>
      </View>

      <TransactionFilters activeFilter={filter} onFilterChange={setFilter} />

      <View className="flex-1">
        <TransactionList sections={sections} />
      </View>

      <FABButton />
    </SafeAreaView>
  );
}
