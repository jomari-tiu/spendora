import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../src/hooks/useTransactions";
import { TransactionType } from "../../src/types";
import { TypeToggle } from "../../src/components/forms/TypeToggle";
import { AmountInput } from "../../src/components/forms/AmountInput";
import { CategoryPicker } from "../../src/components/forms/CategoryPicker";
import { DatePickerField } from "../../src/components/forms/DatePickerField";
import { NotesInput } from "../../src/components/forms/NotesInput";
import { Button } from "../../src/components/ui/Button";

export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transactions, updateTransaction, deleteTransaction } =
    useTransactions();

  const transaction = transactions.find((tx) => tx.id === id);

  const [type, setType] = useState<TransactionType>(
    transaction?.type ?? "expense",
  );
  const [amount, setAmount] = useState(
    transaction ? String(transaction.amount) : "",
  );
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? "");
  const [date, setDate] = useState(transaction?.date ?? "");
  const [notes, setNotes] = useState(transaction?.notes ?? "");

  useEffect(() => {
    if (!transaction) {
      router.back();
    }
  }, [transaction]);

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }
    updateTransaction(id, { type, amount: parsed, categoryId, date, notes });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction(id);
            router.back();
          },
        },
      ],
    );
  };

  if (!transaction) return null;

  return (
    <SafeAreaView className="flex-1 bg-white " edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100 ">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Text className="text-brand-red font-semibold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-bold text-gray-900 ">
            Edit Transaction
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-brand-red font-semibold text-base">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 gap-4">
            <View>
              <Text className="text-xs font-semibold text-gray-500  uppercase mb-2">
                Type
              </Text>
              <TypeToggle value={type} onChange={setType} />
            </View>

            <View>
              <Text className="text-xs font-semibold text-gray-500  uppercase mb-2">
                Amount
              </Text>
              <AmountInput value={amount} onChange={setAmount} />
            </View>

            <View>
              <Text className="text-xs font-semibold text-gray-500  uppercase mb-2">
                Category
              </Text>
              <CategoryPicker value={categoryId} onChange={setCategoryId} />
            </View>

            <View>
              <Text className="text-xs font-semibold text-gray-500  uppercase mb-2">
                Date
              </Text>
              <DatePickerField value={date} onChange={setDate} />
            </View>

            <View>
              <Text className="text-xs font-semibold text-gray-500  uppercase mb-2">
                Notes
              </Text>
              <NotesInput value={notes} onChange={setNotes} />
            </View>

            <View className="mt-2">
              <Button label="Save Changes" onPress={handleSave} />
            </View>

            <View className="mb-8">
              <Button
                label="Delete Transaction"
                onPress={handleDelete}
                variant="danger"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
