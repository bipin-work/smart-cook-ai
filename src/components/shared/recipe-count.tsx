import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getRecipesCount } from "@/lib/actions/recipe.actions";
import Link from "next/link";

const RecipeCount = async () => {
  const recipeCount = await getRecipesCount();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2>Recent Recipes</h2>
        {recipeCount > 0 && (
          <Link href="/my-recipes">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        )}
      </div>
      {recipeCount === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <p>
              No recipes yet. Start by adding or generating your first recipe!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div>
          <p className="text-gray-600">
            You have {recipeCount} recipe{recipeCount !== 1 ? "s" : ""}{" "}
            saved.{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeCount;
