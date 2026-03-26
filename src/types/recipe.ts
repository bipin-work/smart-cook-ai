import { z } from "zod";

export const RecipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    prepTime: z.string().describe("Total time including prep and cook"),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
        unit: z.string(),
      })
    ),
    steps: z.array(z.string()),
    isOvenRequired: z.boolean(),
  }),
});

export type Recipe = z.infer<typeof RecipeSchema>;
