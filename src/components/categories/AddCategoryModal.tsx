import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategories } from "../../hooks/useCategories";
import { Button } from "../ui/Button";

const EMOJI_OPTIONS = [
  "🍕",
  "🍎",
  "🏠",
  "✈️",
  "🎮",
  "📚",
  "💻",
  "🎵",
  "🐾",
  "🌿",
  "💅",
  "🏋️",
  "🎁",
  "🚀",
  "⚽",
  "🎨",
  "🛒",
  "💡",
  "🧘",
  "🏖️",
];

const COLOR_OPTIONS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
  "#14B8A6",
  "#84CC16",
];

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddCategoryModal({ visible, onClose }: AddCategoryModalProps) {
  const { addCategory } = useCategories();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📦");
  const [color, setColor] = useState("#6B7280");

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Name required", "Please enter a category name.");
      return;
    }
    addCategory({ name: trimmed, icon, color });
    setName("");
    setIcon("📦");
    setColor("#6B7280");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <SafeAreaView className="bg-brand-surface rounded-t-2xl">
          <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-900">
              New Category
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 text-lg">✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
            <Text className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Category name"
              placeholderTextColor="#6B7280"
              className="bg-gray-100 rounded-xl px-4 py-3 text-base text-gray-900 mb-4"
            />

            <Text className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Icon
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {EMOJI_OPTIONS.map((e) => (
                <TouchableOpacity
                  key={e}
                  className={`w-11 h-11 rounded-lg items-center justify-center ${
                    icon === e
                      ? "bg-brand-red/20 border-2 border-brand-red"
                      : "bg-gray-100"
                  }`}
                  onPress={() => setIcon(e)}
                >
                  <Text className="text-xl">{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Color
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {COLOR_OPTIONS.map((c) => (
                <TouchableOpacity
                  key={c}
                  className={`w-9 h-9 rounded-full ${
                    color === c ? "border-4 border-gray-300" : ""
                  }`}
                  style={{ backgroundColor: c, opacity: color === c ? 1 : 0.7 }}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            <Button label="Save Category" onPress={handleSave} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
