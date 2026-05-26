import { getCachedRecipesCount } from "@/lib/actions/recipe.actions";

const SavedRecipeNumber = async () => {
  const recipeNumber = await getCachedRecipesCount();

  return (
    <div className="text-4xl font-semibold text-orange-500">{recipeNumber}</div>
  );
};

export default SavedRecipeNumber;
