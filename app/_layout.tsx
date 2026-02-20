import "../global.css";
import { Stack } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../src/context/ThemeContext";
import { CategoryProvider } from "../src/context/CategoryContext";
import { TransactionProvider } from "../src/context/TransactionContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <CategoryProvider>
          <TransactionProvider>
            <View className="flex-1">
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="transaction/add"
                  options={{ title: "Add Transaction", headerShown: false }}
                />
                <Stack.Screen
                  name="transaction/[id]"
                  options={{ title: "Edit Transaction", headerShown: false }}
                />
              </Stack>
            </View>
          </TransactionProvider>
        </CategoryProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
