import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../../src/hooks/useTransactions";
import { useCategories } from "../../src/hooks/useCategories";
import { TransactionType } from "../../src/types";
import { TypeToggle } from "../../src/components/forms/TypeToggle";
import { AmountInput } from "../../src/components/forms/AmountInput";
import { CategoryPicker } from "../../src/components/forms/CategoryPicker";
import { DatePickerField } from "../../src/components/forms/DatePickerField";
import { NotesInput } from "../../src/components/forms/NotesInput";
import { Button } from "../../src/components/ui/Button";
import { toDateString } from "../../src/utils/date";

export default function AddTransactionScreen() {
  const { addTransaction } = useTransactions();
  const { categories } = useCategories();

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [date, setDate] = useState(toDateString(new Date()));
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid amount greater than 0.",
      );
      return;
    }
    if (!categoryId) {
      Alert.alert("Category required", "Please select a category.");
      return;
    }
    addTransaction({ type, amount: parsed, categoryId, date, notes });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white " edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100 ">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Text className="text-brand-red font-semibold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-bold text-gray-900 ">
            Add Transaction
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

            <View className="mt-2 mb-8">
              <Button label="Save Transaction" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
