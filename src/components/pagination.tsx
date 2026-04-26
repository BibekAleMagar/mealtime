import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PaginationProps } from "../types/paginationProps";

export const Pagination = ({
  total,
  skip,
  limit,
  onPageChange,
  loading,
}: PaginationProps) => {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  if (total <= limit) return null;

  return (
    <View className="flex-row items-center justify-between bg-white border border-gray-100 rounded-3xl p-2 my-8 shadow-sm">
      <TouchableOpacity
        onPress={() => onPageChange(Math.max(0, skip - limit))}
        disabled={skip === 0 || loading}
        className={`w-12 h-12 items-center justify-center rounded-2xl ${
          skip === 0 ? "bg-gray-50" : "bg-emerald-50"
        }`}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color={skip === 0 ? "#9CA3AF" : "#129575"}
        />
      </TouchableOpacity>

      <View className="flex-row items-center">
        {loading ? (
          <ActivityIndicator size="small" color="#129575" />
        ) : (
          <Text className="text-gray-800 font-bold text-base">
            Page {currentPage}{" "}
            <Text className="text-gray-400 font-medium">of {totalPages}</Text>
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => onPageChange(skip + limit)}
        disabled={skip + limit >= total || loading}
        className={`w-12 h-12 items-center justify-center rounded-2xl ${
          skip + limit >= total ? "bg-gray-50" : "bg-emerald-50"
        }`}
      >
        <Ionicons
          name="arrow-forward"
          size={20}
          color={skip + limit >= total ? "#9CA3AF" : "#129575"}
        />
      </TouchableOpacity>
    </View>
  );
};
