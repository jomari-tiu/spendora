import { View, Text, TouchableOpacity, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { router } from "expo-router";
import { Transaction } from "../../types";
import { useCategories } from "../../hooks/useCategories";
import { useTransactions } from "../../hooks/useTransactions";
import { AmountText } from "../ui/AmountText";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { categories } = useCategories();
  const { deleteTransaction } = useTransactions();
  const category = categories.find((c) => c.id === transaction.categoryId);

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          className="bg-red-600 w-20 items-center justify-center rounded-r-xl"
          style={{ marginLeft: -8 }}
          onPress={() => deleteTransaction(transaction.id)}
        >
          <Text className="text-white text-xs font-bold mt-1">🗑️</Text>
          <Text className="text-white text-xs font-bold">Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <TouchableOpacity
        className="flex-row items-center px-4 py-3 bg-white  border-b border-gray-100 "
        onPress={() => router.push(`/transaction/${transaction.id}`)}
        activeOpacity={0.7}
      >
        <View
          className="w-11 h-11 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: (category?.color ?? "#6B7280") + "33" }}
        >
          <Text className="text-xl">{category?.icon ?? "📦"}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-900 ">
            {category?.name ?? "Unknown"}
          </Text>
          {transaction.notes ? (
            <Text className="text-xs text-gray-500  mt-0.5" numberOfLines={1}>
              {transaction.notes}
            </Text>
          ) : null}
        </View>

        <AmountText
          amount={transaction.amount}
          type={transaction.type}
          size="sm"
        />
      </TouchableOpacity>
    </Swipeable>
  );
}
