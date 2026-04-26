import apiClient from "../api/apiClient";
import { Recipe } from "../types/recipe";
import { RecipeResponse } from "../types/paginatedResponse";

export const getRecipes = async () => {
  try {
    const response = await apiClient.get<RecipeResponse>("/recipes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const searchRecipes = async (query: string) => {
  try {
    const response = await apiClient.get<RecipeResponse>("/recipes/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};
