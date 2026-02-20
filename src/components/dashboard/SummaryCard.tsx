import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { MonthlySummary } from "../../types";
import { formatCurrency } from "../../utils/currency";
import { useTheme } from "../../hooks/useTheme";
import { COLORS } from "../../constants/colors";

interface SummaryCardProps {
  summary: MonthlySummary;
}

function StatBox({
  label,
  amount,
  color,
  currency,
}: {
  label: string;
  amount: number;
  color: string;
  currency: string;
}) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-xs text-gray-500  mb-1 uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-base font-bold" style={{ color }}>
        {formatCurrency(amount, currency)}
      </Text>
    </View>
  );
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const { currency } = useTheme();

  return (
    <Card className="mx-4 mt-2">
      <View className="flex-row">
        <StatBox
          label="Income"
          amount={summary.income}
          color={COLORS.income}
          currency={currency}
        />
        <View className="w-px bg-gray-200 mx-2" />
        <StatBox
          label="Expense"
          amount={summary.expense}
          color={COLORS.expense}
          currency={currency}
        />
        <View className="w-px bg-gray-200 mx-2" />
        <StatBox
          label="Balance"
          amount={summary.balance}
          color={summary.balance >= 0 ? COLORS.income : COLORS.expense}
          currency={currency}
        />
      </View>
    </Card>
  );
}
