import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getRecipes } from "@/src/services/recipe";
import { Recipe } from "@/src/types/recipe";

const RecipeSkeleton = () => (
  <View className="mb-6 px-4">
    <View className="w-full h-52 bg-gray-200 rounded-3xl animate-pulse" />
    <View className="mt-4 h-6 w-3/4 bg-gray-200 rounded-lg" />
    <View className="mt-2 h-4 w-1/2 bg-gray-100 rounded-lg" />
  </View>
);

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await getRecipes();
        // Since your data structure has a .recipes property
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* 1. Header & Search Area */}
      <View className="px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-gray-400 font-semibold text-lg">
              Hello Chef!
            </Text>
            <Text className="text-3xl font-bold text-primary">
              What are you cooking today?
            </Text>
          </View>
        </View>

        {/* Professional Search Bar */}
        <View className="flex-row items-center bg-gray-50 mt-6 px-4 py-3 rounded-2xl border border-gray-100">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search any recipe..."
            className="flex-1 ml-3 text-base text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 2. Horizontal Categories (Static for UI) */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {["All", "Italian", "Asian", "Mexican", "Desserts"].map((cat, i) => (
            <TouchableOpacity
              key={cat}
              className={`mr-3 px-6 py-2 rounded-xl ${i === 0 ? "bg-primary" : "bg-gray-50"}`}
            >
              <Text
                className={`font-bold ${i === 0 ? "text-white" : "text-gray-400"}`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Recipe List */}
      {isLoading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3].map((i) => (
            <RecipeSkeleton key={i} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-white rounded-3xl mb-6 shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Image & Badges */}
              <View className="relative">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-56 bg-gray-100"
                />

                {/* Custom Rating Badge using your 'rating' color */}
                <View className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex-row items-center">
                  <Ionicons name="star" size={14} color="#fead30" />
                  <Text className="ml-1 font-bold text-xs text-gray-800">
                    {item.rating}
                  </Text>
                </View>

                {/* Difficulty Badge */}
                <View className="absolute top-4 left-4 bg-primary/80 px-3 py-1 rounded-full">
                  <Text className="text-white text-[10px] font-bold uppercase">
                    {item.difficulty}
                  </Text>
                </View>
              </View>

              {/* Content mapped to your JSON fields */}
              <View className="p-5">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-secondary font-bold text-xs uppercase tracking-widest">
                      {item.cuisine} • {item.mealType[0]}
                    </Text>
                    <Text
                      className="text-xl font-bold text-gray-800 mt-1 leading-7"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <TouchableOpacity className="bg-emerald-50 p-2 rounded-xl">
                    <Ionicons
                      name="bookmark-outline"
                      size={22}
                      color="#129575"
                    />
                  </TouchableOpacity>
                </View>

                {/* Meta Stats Section */}
                <View className="flex-row mt-4 pt-4 border-t border-gray-50 items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={18} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">
                      {item.cookTimeMinutes + item.prepTimeMinutes} min
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="flame-outline" size={18} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">
                      {item.caloriesPerServing} kcal
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="people-outline" size={18} color="#9CA3AF" />
                    <Text className="text-gray-500 text-sm ml-1">
                      {item.servings} serving
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
