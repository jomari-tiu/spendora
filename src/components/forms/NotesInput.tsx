import { TextInput, View } from 'react-native';

interface NotesInputProps {
  value: string;
  onChange: (text: string) => void;
}

export function NotesInput({ value, onChange }: NotesInputProps) {
  return (
    <View className="bg-brand-surface rounded-xl px-4 py-3">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Add a note (optional)"
        placeholderTextColor="#6B7280"
        multiline
        numberOfLines={3}
        className="text-base text-gray-900"
        style={{ minHeight: 70, textAlignVertical: 'top' }}
      />
    </View>
  );
}
