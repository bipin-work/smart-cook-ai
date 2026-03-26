import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { RecipeSchema } from "@/types/recipe";

export async function runExtraction(userInput: string) {
  console.log("its here");
  const { output } = await generateText({
    model: google("gemini-3.1-flash-lite-preview"),
    output: Output.object({
      schema: RecipeSchema,
    }),
    prompt: `Extract the recipe from this: "${userInput}"`,
  });
  return output;
}
