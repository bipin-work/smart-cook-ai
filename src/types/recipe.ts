import { z } from "zod";
import { insertIngredientSchema, insertRecipeSchema } from "@/lib/validators";

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;
export type Recipe = InsertRecipe & {
  id: string;
};

export type Ingredient = InsertIngredient & {
  id: string;
};
