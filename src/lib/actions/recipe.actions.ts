"use server";
import { InsertRecipe, Recipe } from "@/types/recipe";
import { insertRecipeSchema } from "../validators";
import { title } from "process";
import { prisma } from "@/db/prisma";
import { success } from "zod";
import { RecipeSource } from "@/generated/prisma/enums";

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const allRecipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    if (!allRecipes) {
      return [];
    }
    return allRecipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      sourceUrl: recipe.sourceUrl,
      source: recipe.source,
      cookTime: recipe.cookTime,
      instructions: recipe.instructions as string[],
      ingredients: recipe.ingredients.map((ing) => ({
        ingredient: ing.ingredient.name,
        quantity: ing.quantity?.toString() ?? "0",
        unit: ing.unit ?? "",
      })),
      servings: recipe.servings,
    }));
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}

export async function saveRecipe(recipe: InsertRecipe, source: RecipeSource) {
  try {
    const validatedData = insertRecipeSchema.parse({
      title: recipe.title,
      description: recipe.description,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      cookTime: recipe.cookTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      source,
    });

    await prisma.recipe.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        servings: validatedData.servings,
        sourceUrl: validatedData.sourceUrl,
        cookTime: validatedData.cookTime,
        instructions: validatedData.instructions, // Prisma handles the string[] -> Json conversion
        source: source,
        // This is the part that fixes the TS(2322) error
        ingredients: {
          create: validatedData.ingredients.map((ing) => ({
            quantity: parseFloat(ing.quantity),
            unit: ing.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ing.ingredient },
                create: { name: ing.ingredient },
              },
            },
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
