import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$', INR: '₹',
};

export function AmountInput({ value, onChange }: AmountInputProps) {
  const { currency } = useTheme();
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

  return (
    <View className="flex-row items-center bg-brand-surface rounded-xl px-4 py-3">
      <Text className="text-2xl font-bold text-gray-400 mr-2">{symbol}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => {
          // allow digits and single decimal point
          const cleaned = text.replace(/[^0-9.]/g, '');
          const parts = cleaned.split('.');
          if (parts.length > 2) return;
          if (parts[1] && parts[1].length > 2) return;
          onChange(cleaned);
        }}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#6B7280"
        className="flex-1 text-2xl font-bold text-gray-900"
        style={{ fontSize: 28, fontWeight: 'bold' }}
      />
    </View>
  );
}
