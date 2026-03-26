import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

const RecipeSchema = z.object({
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

export async function runExtraction(userInput: string) {
  console.log("its here");
  const { output } = await generateText({
    model: google("gemini-3.1-flash-lite-preview"),
    output: Output.object({
      schema: RecipeSchema,
    }),
    prompt: `Extract the recipe from this text: "${userInput}"`,
  });
  return output;
}
