import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "../../types";

interface CategoryPickerProps {
  value: string;
  onChange: (categoryId: string) => void;
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const { categories } = useCategories();
  const [open, setOpen] = useState(false);

  const selected = categories.find((c) => c.id === value);

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center bg-brand-surface rounded-xl px-4 py-3"
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text className="text-xl mr-3">{selected?.icon ?? "📦"}</Text>
        <Text className="flex-1 text-base text-gray-900">
          {selected?.name ?? "Select category"}
        </Text>
        <Text className="text-gray-400">▼</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/50">
          <SafeAreaView className="bg-brand-surface rounded-t-2xl">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">
                Select Category
              </Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text className="text-brand-red font-semibold">Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }: { item: Category }) => (
                <TouchableOpacity
                  className={`flex-row items-center px-4 py-3 border-b border-gray-200 ${
                    item.id === value ? "bg-red-50" : ""
                  }`}
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: item.color + "33" }}
                  >
                    <Text className="text-xl">{item.icon}</Text>
                  </View>
                  <Text className="text-base text-gray-900 flex-1">
                    {item.name}
                  </Text>
                  {item.id === value && (
                    <Text className="text-brand-red text-lg">✓</Text>
                  )}
                </TouchableOpacity>
              )}
              style={{ maxHeight: 400 }}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}
