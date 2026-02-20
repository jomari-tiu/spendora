import { Text, TextProps } from 'react-native';
import { TransactionType } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { useTheme } from '../../hooks/useTheme';

interface AmountTextProps extends TextProps {
  amount: number;
  type: TransactionType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AmountText({ amount, type, size = 'md', className = '', ...props }: AmountTextProps) {
  const { currency } = useTheme();
  const isIncome = type === 'income';
  const sign = isIncome ? '+' : '-';
  const colorClass = isIncome ? 'text-green-500' : 'text-red-500';

  const sizeClass =
    size === 'sm' ? 'text-sm' :
    size === 'lg' ? 'text-xl' :
    size === 'xl' ? 'text-2xl' :
    'text-base';

  return (
    <Text className={`font-bold ${colorClass} ${sizeClass} ${className}`} {...props}>
      {sign}{formatCurrency(amount, currency)}
    </Text>
  );
}
