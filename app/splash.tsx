import { useEffect } from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";
import Splash from "@assets/splash.png";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image source={Splash} className=" w-full h-full object-cover" />
    </View>
  );
}
