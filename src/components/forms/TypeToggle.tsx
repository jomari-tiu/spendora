import { View, Text, TouchableOpacity } from "react-native";
import { TransactionType } from "../../types";

interface TypeToggleProps {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

export function TypeToggle({ value, onChange }: TypeToggleProps) {
  return (
    <View className="flex-row bg-gray-100  rounded-xl p-1">
      {(["income", "expense"] as TransactionType[]).map((type) => {
        const active = value === type;
        const activeClass = type === "income" ? "bg-green-500" : "bg-brand-red";
        return (
          <TouchableOpacity
            key={type}
            className={`flex-1 py-2.5 rounded-lg items-center ${active ? activeClass : ""}`}
            onPress={() => onChange(type)}
            activeOpacity={0.8}
          >
            <Text
              className={`font-semibold capitalize text-sm ${
                active ? "text-white" : "text-gray-500 "
              }`}
            >
              {type === "income" ? "↑ Income" : "↓ Expense"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
