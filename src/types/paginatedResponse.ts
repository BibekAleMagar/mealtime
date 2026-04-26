import { Recipe } from "./recipe";

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}