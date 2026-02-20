import { View, ActivityIndicator } from 'react-native';

export function LoadingSpinner() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#DC2626" />
    </View>
  );
}
