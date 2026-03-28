"use server";

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { insertRecipeSchema } from "@/lib/validators";

export async function runExtraction(userInput: string) {
  try {
    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.object({
        schema: insertRecipeSchema,
      }),
      prompt: `Extract the recipe from this: "${userInput}"`,
    });
    return output;
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error extraction", err.message);
    } else {
      console.log("Error extraction", err);
    }
  }
}
