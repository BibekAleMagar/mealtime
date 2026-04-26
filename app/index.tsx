import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@hasSeenOnboarding").then((value) => {
      setIsFirstLaunch(value === null);
    });
  }, []);

  if (isFirstLaunch === null) return null;

  return isFirstLaunch ? (
    <Redirect href="/onboarding" />
  ) : (
    <Redirect href="/(tabs)/(recipe)" />
  );
}
