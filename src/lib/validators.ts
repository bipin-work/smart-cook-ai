import { z } from "zod";

export const insertIngredientSchema = z.object({
  ingredient: z.string(),
  quantity: z.string(),
  unit: z.string(),
});

export const insertRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  servings: z.int(),
  source: z.string(),
  sourceUrl: z.string(),
  cookTime: z.string().describe("Total time including prep and cook"),
  ingredients: z.array(insertIngredientSchema),
  instructions: z.array(z.string()),
});
