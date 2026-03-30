"use server";
import { InsertRecipe, Recipe } from "@/types/recipe";
import { insertRecipeSchema } from "../validators";
import { title } from "process";
import { prisma } from "@/db/prisma";
import { success } from "zod";

export async function getAllRecipes() {
  try {
    const allRecipes = await prisma.recipe.findMany();
    console.log("All recipes", allRecipes);
    if (!allRecipes) {
      return [];
    }
    return allRecipes;
  } catch (err) {
    console.log("Error", err);
  }
}

export async function saveRecipe(recipe: InsertRecipe) {
  try {
    const validatedData = insertRecipeSchema.parse({
      title: recipe.title,
      description: recipe.description,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      cookTime: recipe.cookTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });

    await prisma.recipe.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        servings: validatedData.servings,
        sourceUrl: validatedData.sourceUrl,
        cookTime: validatedData.cookTime,
        instructions: validatedData.instructions, // Prisma handles the string[] -> Json conversion

        // This is the part that fixes the TS(2322) error
        ingredients: {
          create: validatedData.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            // No need to pass recipeId; Prisma handles the relation automatically!
          })),
        },
      },
    });
    return {
      success: true,
      message: "Recipe saved successfully",
    };
  } catch (error) {
    console.log("err", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
