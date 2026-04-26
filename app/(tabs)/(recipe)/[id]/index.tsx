import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getRecipeById } from "@/src/services/recipe";
import { Recipe } from "@/src/types/recipe";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // Ensure id is passed as a string
        const data = await getRecipeById(Array.isArray(id) ? id[0] : id);
        setRecipe(data);
      } catch (e) {
        console.error("Failed to fetch recipe:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#129575" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-6">
        <Text className="text-gray-500 text-center">Recipe not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-2 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View className="relative">
          <Image
            source={{ uri: recipe.image }}
            className="w-full h-96 bg-gray-100"
          />

          <View
            className="absolute flex-row justify-between w-full px-6"
            style={{ top: insets.top + 10 }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/90 p-2 rounded-full shadow-sm"
            >
              <Ionicons name="chevron-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/90 p-2 rounded-full shadow-sm">
              <Ionicons name="heart-outline" size={24} color="#129575" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white -mt-10 rounded-t-[40px] px-6 pt-8 pb-24">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-secondary font-bold uppercase tracking-widest text-xs">
                {recipe.cuisine} • {recipe.difficulty}
              </Text>
              <Text className="text-3xl font-bold text-gray-800 mt-1">
                {recipe.name}
              </Text>
            </View>
            <View className="flex-row items-center bg-emerald-50 px-3 py-2 rounded-2xl">
              <Ionicons name="star" size={16} color="#fead30" />
              <Text className="ml-1 font-bold text-gray-800">
                {recipe.rating}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-8 bg-gray-50 p-5 rounded-3xl">
            <View className="items-center">
              <Ionicons name="time-outline" size={20} color="#129575" />
              <Text className="text-gray-800 font-bold mt-1">
                {recipe.cookTimeMinutes}m
              </Text>
            </View>
            <View className="items-center">
              <Ionicons name="flame-outline" size={20} color="#129575" />
              <Text className="text-gray-800 font-bold mt-1">
                {recipe.caloriesPerServing}
              </Text>
            </View>
            <View className="items-center">
              <Ionicons name="people-outline" size={20} color="#129575" />
              <Text className="text-gray-800 font-bold mt-1">
                {recipe.servings}
              </Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-800 mt-8 mb-4">
            Ingredients
          </Text>
          {recipe.ingredients.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-3"
            >
              <View className="w-2 h-2 rounded-full bg-primary mr-3" />
              <Text className="text-gray-600 text-base flex-1">{item}</Text>
            </View>
          ))}

          {/* Instructions List */}
          <Text className="text-xl font-bold text-gray-800 mt-8 mb-4">
            Instructions
          </Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} className="flex-row mb-6">
              <Text className="text-primary font-bold text-lg mr-4">
                {index + 1}.
              </Text>
              <Text className="text-gray-600 text-base flex-1 leading-6">
                {step}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
