import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { useTransactions } from '../../src/hooks/useTransactions';
import { useCategories } from '../../src/hooks/useCategories';
import { exportTransactionsToCSV } from '../../src/utils/csvExport';
import { Card } from '../../src/components/ui/Card';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];

export default function SettingsScreen() {
  const { currency, setCurrency } = useTheme();
  const { transactions, clearAll } = useTransactions();
  const { categories } = useCategories();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert('No data', 'You have no transactions to export.');
      return;
    }
    try {
      setExporting(true);
      await exportTransactionsToCSV(transactions, categories);
    } catch (e) {
      Alert.alert('Export failed', 'Could not export transactions.');
    } finally {
      setExporting(false);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your transactions. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: clearAll,
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <View className="px-4 pt-2 pb-3">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Currency */}
        <Text className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Currency
        </Text>
        <Card className="mx-4 p-0 overflow-hidden">
          <View className="flex-row flex-wrap p-3 gap-2">
            {CURRENCIES.map((c) => (
              <TouchableOpacity
                key={c}
                className={`px-3 py-1.5 rounded-lg ${
                  currency === c
                    ? 'bg-brand-red'
                    : 'bg-gray-100'
                }`}
                onPress={() => setCurrency(c)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm font-semibold ${
                    currency === c ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Data */}
        <Text className="px-4 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Data
        </Text>
        <Card className="mx-4 p-0 overflow-hidden">
          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200"
            onPress={handleExport}
            disabled={exporting}
            activeOpacity={0.7}
          >
            <View>
              <Text className="text-base text-gray-900">Export CSV</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
              </Text>
            </View>
            {exporting ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <Text className="text-brand-red font-semibold">Export →</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-3"
            onPress={handleClearData}
            activeOpacity={0.7}
          >
            <View>
              <Text className="text-base text-red-600">Clear All Data</Text>
              <Text className="text-xs text-gray-500 mt-0.5">
                Permanently delete all transactions
              </Text>
            </View>
            <Text className="text-red-500">⚠️</Text>
          </TouchableOpacity>
        </Card>

        {/* About */}
        <Text className="px-4 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          About
        </Text>
        <Card className="mx-4 p-0 overflow-hidden mb-8">
          <View className="px-4 py-3 border-b border-gray-200">
            <Text className="text-base text-gray-900">Spendora</Text>
            <Text className="text-xs text-gray-500 mt-0.5">Version 1.0.0</Text>
          </View>
          <View className="px-4 py-3">
            <Text className="text-base text-gray-900">Track every penny 💸</Text>
            <Text className="text-xs text-gray-500 mt-0.5">
              Built with React Native &amp; Expo
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
