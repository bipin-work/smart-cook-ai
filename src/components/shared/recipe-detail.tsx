import { InsertRecipe } from "@/types/recipe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "lucide-react";
import { InsertIngredient } from "@/types/recipe";

type RecipeCardProps = {
  recipe: InsertRecipe;
};

const RecipeDetail = ({ recipe }: RecipeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {recipe.title}{" "}
          {/* {isSaved && (
            <Badge className="size-sm bg-green-600 ml-2">Saved</Badge>
          )} */}
        </CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Cook time:</span> {recipe.cookTime}
          </div>
          <div>
            <span className="text-gray-500">Servings:</span> {recipe.servings}
          </div>
        </div>
        <div>
          <h3 className="mb-3">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing: InsertIngredient) => (
              <li key={ing.ingredient} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-orange-500" />
                {ing.quantity} {ing.unit} {ing.ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3">Instructions</h3>
          <ol className="space-y-3">
            {recipe.instructions.map((instruction, index) => (
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
  );
};

export default RecipeDetail;
