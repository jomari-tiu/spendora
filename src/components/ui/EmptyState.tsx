import { View, Text } from "react-native";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ emoji = "📭", title, subtitle }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <Text className="text-5xl mb-4">{emoji}</Text>
      <Text className="text-lg font-semibold text-gray-700  text-center">
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-sm text-gray-500  text-center mt-2">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
