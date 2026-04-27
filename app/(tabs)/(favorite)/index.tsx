import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { Recipe } from "@/src/types/recipe";
import { Ionicons } from "@expo/vector-icons";

export default function Favorites() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      onPress={() => router.push(`/${item.id}`)}
      className="flex-row items-center bg-white p-4 rounded-3xl mb-4 shadow-sm mx-6"
    >
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-2xl bg-gray-100"
      />
      <View className="ml-4 flex-1">
        <Text className="text-gray-400 text-xs font-bold uppercase">
          {item.cuisine}
        </Text>
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="star" size={14} color="#fead30" />
          <Text className="ml-1 text-gray-600 text-sm">{item.rating}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#129575" />
    </TouchableOpacity>
  );

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-gray-50"
    >
      <View className="px-6 py-4">
        <Text className="text-2xl font-bold text-gray-800">My Favorites</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="heart-dislike-outline" size={80} color="#CBD5E1" />
          <Text className="text-gray-500 text-center mt-4 text-lg">
            You haven't saved any recipes yet.
          </Text>
        </View>
      )}
    </View>
  );
}
