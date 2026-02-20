import { View, Text, TouchableOpacity } from "react-native";
import { formatMonth, addMonths, toMonthString } from "../../utils/date";

interface MonthSelectorProps {
  value: string; // "2026-02"
  onChange: (month: string) => void;
}

export function MonthSelector({ value, onChange }: MonthSelectorProps) {
  const currentMonth = toMonthString(new Date());
  const isCurrentMonth = value === currentMonth;

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <TouchableOpacity
        className="w-9 h-9 rounded-full bg-gray-100  items-center justify-center"
        onPress={() => onChange(addMonths(value, -1))}
        activeOpacity={0.7}
      >
        <Text className="text-gray-700  text-lg">‹</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange(currentMonth)}
        activeOpacity={0.7}
      >
        <Text className="text-lg font-bold text-gray-900 ">
          {formatMonth(value)}
        </Text>
        {!isCurrentMonth && (
          <Text className="text-xs text-brand-red text-center mt-0.5">
            tap for today
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className={`w-9 h-9 rounded-full bg-gray-100  items-center justify-center ${
          isCurrentMonth ? "opacity-30" : ""
        }`}
        onPress={() => {
          if (!isCurrentMonth) onChange(addMonths(value, 1));
        }}
        activeOpacity={isCurrentMonth ? 1 : 0.7}
      >
        <Text className="text-gray-700  text-lg">›</Text>
      </TouchableOpacity>
    </View>
  );
}
