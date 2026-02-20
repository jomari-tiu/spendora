import { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/date";

interface DatePickerFieldProps {
  value: string; // "2026-02-20"
  onChange: (dateStr: string) => void;
}

function toDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");
  const date = toDate(value);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selected) onChange(toDateStr(selected));
  };

  return (
    <View>
      {Platform.OS === "android" && (
        <TouchableOpacity
          className="flex-row items-center bg-brand-surface rounded-xl px-4 py-3"
          onPress={() => setShowPicker(true)}
          activeOpacity={0.8}
        >
          <Text className="text-xl mr-3">📅</Text>
          <Text className="text-base text-gray-900">{formatDate(value)}</Text>
        </TouchableOpacity>
      )}

      {(showPicker || Platform.OS === "ios") && (
        <View className="bg-brand-surface rounded-xl overflow-hidden items-center justify-center">
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleChange}
            maximumDate={new Date()}
          />
        </View>
      )}
    </View>
  );
}
