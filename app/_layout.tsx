import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasSeenOnboarding =
          await AsyncStorage.getItem("@hasSeenOnboarding");
        setIsFirstLaunch(hasSeenOnboarding === null);
      } catch (e) {
        setIsFirstLaunch(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#129575" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
          </>
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
          </>
        )}
      </Stack>
    </SafeAreaProvider>
  );
}
