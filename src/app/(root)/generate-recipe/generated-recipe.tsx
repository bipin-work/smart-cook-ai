import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { saveRecipe } from "@/lib/actions/recipe.actions";
import { InsertIngredient, InsertRecipe } from "@/types/recipe";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface GeneratedRecipeProps {
  generatedRecipe: InsertRecipe;
  clearRecipe: () => void;
}

const GeneratedRecipe: React.FC<GeneratedRecipeProps> = ({
  generatedRecipe,
  clearRecipe,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const onGenerateAgain = () => {
    clearRecipe();
  };
  const handleSaveRecipe = async () => {
    startTransition(async () => {
      const res = await saveRecipe(generatedRecipe);
      if (!res?.success) {
        toast.error(res.message);
        return;
      }
      setIsSaved(true);
      toast.success(res.message);
    });
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {generatedRecipe.title}{" "}
            {isSaved && (
              <Badge className="size-sm bg-green-600 ml-2">Saved</Badge>
            )}
          </CardTitle>
          <CardDescription>{generatedRecipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cook time:</span>{" "}
              {generatedRecipe.cookTime}
            </div>
            <div>
              <span className="text-gray-500">Servings:</span>{" "}
              {generatedRecipe.servings}
            </div>
          </div>
          <div>
            <h3 className="mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {generatedRecipe.ingredients.map((ing: InsertIngredient) => (
                <li key={ing.name} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-orange-500" />
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3">Instructions</h3>
            <ol className="space-y-3">
              {generatedRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-orange-100 text-orange-600 text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-4">
        {!isSaved && (
          <Button className="flex-1" onClick={handleSaveRecipe}>
            {isPending ? "Saving..." : "Save Recipe"}
          </Button>
        )}
        <Button
          variant="outline"
          className="flex-1 max-w-4xl mx-auto"
          onClick={onGenerateAgain}
        >
          Generate Again
        </Button>
      </div>
    </div>
  );
};

export default GeneratedRecipe;
