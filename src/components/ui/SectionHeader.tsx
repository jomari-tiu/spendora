import { View, Text } from "react-native";
import { formatDate } from "../../utils/date";

interface SectionHeaderProps {
  date: string;
}

export function SectionHeader({ date }: SectionHeaderProps) {
  return (
    <View className="px-4 py-2 bg-gray-50 ">
      <Text className="text-xs font-semibold text-gray-500  uppercase tracking-wider">
        {formatDate(date)}
      </Text>
    </View>
  );
}
