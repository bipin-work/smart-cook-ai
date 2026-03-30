import { getAllRecipes } from "@/lib/actions/recipe.actions";
import RecipeList from "./recipe-list";

const MyRecipes = async () => {
  const allRecipe = await getAllRecipes();

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="mb-2">My Recipes</h1>
          <p className="text-gray-600">Manage your saved recipe collection</p>
        </div>
        <RecipeList recipes={allRecipe} />
      </div>
    </div>
  );
};

export default MyRecipes;
