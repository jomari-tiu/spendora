import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Category } from "../../types";
import { useCategories } from "../../hooks/useCategories";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  const { deleteCategory } = useCategories();

  const handleDelete = () => {
    if (category.isDefault) {
      Alert.alert("Cannot Delete", "Default categories cannot be deleted.");
      return;
    }
    Alert.alert(
      "Delete Category",
      `Delete "${category.name}"? Transactions with this category will keep their category ID.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteCategory(category.id),
        },
      ],
    );
  };

  return (
    <View className="flex-row items-center px-4 py-3 bg-white  border-b border-gray-100 ">
      <View
        className="w-11 h-11 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: category.color + "33" }}
      >
        <Text className="text-xl">{category.icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900 ">
          {category.name}
        </Text>
        {category.isDefault && (
          <Text className="text-xs text-gray-400 ">Default</Text>
        )}
      </View>

      {!category.isDefault && (
        <TouchableOpacity
          onPress={handleDelete}
          className="p-2"
          activeOpacity={0.7}
        >
          <Text className="text-red-500 text-base">🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
