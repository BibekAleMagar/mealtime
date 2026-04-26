import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const pages = [
    {
      title: "Master the Kitchen",
      desc: "Discover over 10,000 hand-picked recipes from world-class chefs.",
      icon: "👨‍🍳",
      color: "bg-emerald-50",
    },
    {
      title: "Perfect Ingredients",
      desc: "Get smart grocery lists and nutritional tracking for every meal.",
      icon: "🥗",
      color: "bg-orange-50",
    },
    {
      title: "Cook Like a Pro",
      desc: "Step-by-step video guides to help you create restaurant-quality dishes.",
      icon: "🍳",
      color: "bg-yellow-50",
    },
  ];

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem("@hasSeenOnboarding", "true");
      // Route to your tab group
      router.replace("/(tabs)");
    } catch (e) {
      console.log("Error saving onboarding status", e);
      router.replace("/(tabs)");
    }
  };

  const handleNext = () => {
    if (activeIndex < pages.length - 1) {
      pagerRef.current?.setPage(activeIndex + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-1"
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
      >
        <View className="h-14 flex-row justify-end items-center px-6">
          <TouchableOpacity onPress={handleComplete}>
            <Text className="text-gray-400 font-bold text-base">Skip</Text>
          </TouchableOpacity>
        </View>

        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
        >
          {pages.map((page, index) => (
            <View
              key={index}
              className="flex-1 items-center justify-center px-10"
            >
              <View
                className={`w-72 h-72 ${page.color} rounded-full items-center justify-center mb-12 shadow-sm`}
              >
                <Text className="text-8xl">{page.icon}</Text>
              </View>

              <View>
                <Text className="text-3xl font-bold text-primary text-center tracking-tight">
                  {page.title}
                </Text>
                <Text className="text-gray-500 text-center mt-4 text-lg leading-6 px-4">
                  {page.desc}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>

        <View className="px-10 py-8">
          <View className="flex-row justify-center mb-10 gap-x-2">
            {pages.map((_, i) => (
              <View
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-10 bg-secondary" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleNext}
            className="bg-primary h-16 items-center justify-center rounded-2xl shadow-xl shadow-emerald-200"
          >
            <Text className="text-white font-bold text-lg tracking-wide">
              {activeIndex === pages.length - 1 ? "Start Cooking" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
