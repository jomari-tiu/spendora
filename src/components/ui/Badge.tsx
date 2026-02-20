import { View, Text } from "react-native";
import { TransactionType } from "../../types";

interface BadgeProps {
  type: TransactionType;
}

export function Badge({ type }: BadgeProps) {
  const isIncome = type === "income";
  return (
    <View
      className={`px-2 py-0.5 rounded-full ${
        isIncome ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <Text
        className={`text-xs font-semibold capitalize ${
          isIncome ? "text-green-700 " : "text-red-700 "
        }`}
      >
        {type}
      </Text>
    </View>
  );
}
