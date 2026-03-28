"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import GeneratedRecipe from "./generated-recipe";
import GenerateRecipe from "./generate-recipe";
import { InsertRecipe } from "@/types/recipe";

const GenerateRecipePage = () => {
  const router = useRouter();
  const [generatedRecipe, setGeneratedRecipe] = useState<InsertRecipe | null>(
    null
  );

  const onRecipeGenerated = (recipe: InsertRecipe) => {
    setGeneratedRecipe(recipe);
  };

  const clearRecipe = () => {
    setGeneratedRecipe(null);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="size-sm text-black-600" />
          Back
        </Button>
        {!generatedRecipe ? (
          <GenerateRecipe onRecipeGenerated={onRecipeGenerated} />
        ) : (
          <GeneratedRecipe
            generatedRecipe={generatedRecipe}
            clearRecipe={clearRecipe}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateRecipePage;
