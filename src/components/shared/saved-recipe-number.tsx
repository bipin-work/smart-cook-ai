import { getRecipesCount } from "@/lib/actions/recipe.actions";

const SavedRecipeNumber = async () => {
  const recipeNumber = await getRecipesCount();

  return (
    <div className="text-4xl font-semibold text-orange-500">{recipeNumber}</div>
  );
};

export default SavedRecipeNumber;
