import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TransactionType } from "../../types";

type FilterType = "all" | TransactionType;

interface TransactionFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "income", label: "↑ Income" },
  { key: "expense", label: "↓ Expense" },
];

export function TransactionFilters({
  activeFilter,
  onFilterChange,
}: TransactionFiltersProps) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-100 "
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          justifyContent: "flex-start",
          gap: 8,
        }}
      >
        {FILTERS.map((f) => {
          const active = activeFilter === f.key;

          const activeColor = {
            expense: "bg-brand-red",
            income: "bg-green-500",
            all: "bg-black",
          };

          return (
            <TouchableOpacity
              key={f.key}
              className={`px-4 py-2 rounded-full ${
                active ? activeColor[f.key] : "bg-gray-100 "
              }`}
              onPress={() => onFilterChange(f.key)}
              activeOpacity={0.8}
            >
              <Text
                className={`text-sm font-semibold ${
                  active ? "text-white" : "text-gray-600 "
                }`}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
