import apiClient from "../api/apiClient";

export const getRecipes = async () => {
  try {
    const response = await apiClient.get("/recipes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
