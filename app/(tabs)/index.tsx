import { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../src/hooks/useTransactions";
import { useCategories } from "../../src/hooks/useCategories";
import {
  getMonthTransactions,
  calcSummary,
  calcCategoryExpenses,
  calcMonthlyAggregates,
} from "../../src/utils/calculations";
import { toMonthString } from "../../src/utils/date";
import { SummaryCard } from "../../src/components/dashboard/SummaryCard";
import { MonthSelector } from "../../src/components/dashboard/MonthSelector";
import { FABButton } from "../../src/components/dashboard/FABButton";
import { ExpensePieChart } from "../../src/components/charts/ExpensePieChart";
import { MonthlyBarChart } from "../../src/components/charts/MonthlyBarChart";
import { Card } from "../../src/components/ui/Card";
import { LoadingSpinner } from "../../src/components/ui/LoadingSpinner";

export default function DashboardScreen() {
  const { transactions, isLoading } = useTransactions();
  const { categories } = useCategories();
  const [selectedMonth, setSelectedMonth] = useState(toMonthString(new Date()));

  const monthTx = useMemo(
    () => getMonthTransactions(transactions, selectedMonth),
    [transactions, selectedMonth],
  );
  const summary = useMemo(() => calcSummary(monthTx), [monthTx]);
  const pieData = useMemo(
    () => calcCategoryExpenses(monthTx, categories),
    [monthTx, categories],
  );
  const barData = useMemo(
    () => calcMonthlyAggregates(transactions),
    [transactions],
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 " edges={["top"]}>
      <View className="px-4 pt-2 pb-1">
        <Text className="text-2xl font-bold text-gray-900 ">Spendora</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <MonthSelector value={selectedMonth} onChange={setSelectedMonth} />
        <SummaryCard summary={summary} />
        {pieData.length > 0 && (
          <Card className="mx-4 mt-4">
            <Text className="text-base font-bold text-gray-900 ">
              Expense Breakdown
            </Text>
            <ExpensePieChart data={pieData} />
          </Card>
        )}
        {barData.length > 0 && (
          <Card className="mx-4 mt-4">
            <Text className="text-base font-bold text-gray-900 ">
              Monthly Trend
            </Text>
            <View className="flex-row items-center gap-4 mb-2">
              <View className="flex-row items-center gap-1">
                <View className="w-3 h-3 rounded-full bg-green-500" />
                <Text className="text-xs text-gray-500 ">Income</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <View className="w-3 h-3 rounded-full bg-brand-red" />
                <Text className="text-xs text-gray-500 ">Expense</Text>
              </View>
            </View>
            <MonthlyBarChart data={barData} />
          </Card>
        )}

        {transactions.length === 0 && (
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">💸</Text>
            <Text className="text-lg font-semibold text-gray-700 ">
              No transactions yet
            </Text>
            <Text className="text-sm text-gray-500 ">
              Tap + to add your first one
            </Text>
          </View>
        )}
      </ScrollView>

      <FABButton />
    </SafeAreaView>
  );
}
