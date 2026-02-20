import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategories } from "../../src/hooks/useCategories";
import { Category } from "../../src/types";
import { CategoryItem } from "../../src/components/categories/CategoryItem";
import { AddCategoryModal } from "../../src/components/categories/AddCategoryModal";
import { Button } from "../../src/components/ui/Button";

export default function CategoriesScreen() {
  const { categories } = useCategories();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 " edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
        <Text className="text-2xl font-bold text-gray-900 ">Categories</Text>
        <TouchableOpacity
          className="bg-brand-red px-4 py-2 rounded-xl"
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-sm">+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Category }) => (
          <CategoryItem category={item} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
