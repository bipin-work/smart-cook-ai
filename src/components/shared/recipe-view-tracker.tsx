"use client";
import { recordRecipeView } from "@/lib/actions/recipe.actions";
import { useEffect } from "react";

const RecipeViewTracker = ({ recipeId }: { recipeId: string }) => {
  useEffect(() => {
    console.log("[tracker] firing for", recipeId);
    recordRecipeView(recipeId).then((res) => {
      console.log("[tracker] result", res);
    });
  }, [recipeId]);

  return null;
};

export default RecipeViewTracker;
