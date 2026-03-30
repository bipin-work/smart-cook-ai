import { z } from "zod";

export const insertIngredientSchema = z.object({
  ingredient: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
});

export const insertRecipeSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  servings: z.int().min(1, "Required"),
  source: z.string(),
  sourceUrl: z.string(),
  cookTime: z
    .string()
    .min(1, "Required")
    .describe("Total time including prep and cook"),
  ingredients: z.array(insertIngredientSchema),
  instructions: z.array(z.string().min(1, "Required")).min(1, "Required"),
});
