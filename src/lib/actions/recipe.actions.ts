"use server";
import { InsertRecipe, Recipe } from "@/types/recipe";
import { insertRecipeSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { revalidateTag } from "next/cache";
import { RecipeSource } from "@/generated/prisma/enums";
import { unstable_cache } from "next/cache";

export async function getRecipeById(recipeId: string): Promise<Recipe> {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: {
        id: recipeId,
      },
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
    if (!recipe) {
      return {} as Recipe;
    }
    return {
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
    };
  } catch (err) {
    console.log("Error", err);
    return {} as Recipe;
  }
}

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
        instructions: validatedData.instructions,
        source: source,

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
          })),
        },
      },
    });
    // @ts-expect-error — single-arg form required for unstable_cache tag invalidation
    revalidateTag("recipes");
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

export async function deleteRecipeById(recipeId: string) {
  try {
    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
    // @ts-expect-error — single-arg form required for unstable_cache tag invalidation
    revalidateTag("recipes");
    return {
      success: true,
      message: "Recipe deleted !",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function recordRecipeView(recipeId: string) {
  try {
    await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        lastViewedAt: new Date(),
      },
    });
    // @ts-expect-error — single-arg form required for unstable_cache tag invalidation
    revalidateTag("recent-recipe");
    return {
      success: true,
      message: "Last view updated",
    };
  } catch (error) {
    console.log("[recordRecipeView] error", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getRecentRecipe() {
  try {
    const recipe = await prisma.recipe.findFirst({
      orderBy: { lastViewedAt: "desc" },
      where: { lastViewedAt: { not: undefined } },
      include: {
        ingredients: { include: { ingredient: true } },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    if (!recipe) {
      return null;
    }
    return {
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
    };
  } catch (error) {
    return {} as Recipe;
  }
}

export async function getRecipesCount() {
  try {
    const recipeCount = await prisma.recipe.count();
    return recipeCount || 0;
  } catch (error) {
    return 0;
  }
}

export const getAllCachedRecipes = unstable_cache(
  getAllRecipes,
  ["all-recipes"],
  {
    tags: ["recipes"],
  },
);

export const getCachedRecentRecipe = unstable_cache(
  getRecentRecipe,
  ["recent-recipe"],
  {
    tags: ["recent-recipe"],
  },
);

export const getCachedRecipesCount = unstable_cache(
  getRecipesCount,
  ["recipe-count"],
  {
    tags: ["recipes"],
  },
);
