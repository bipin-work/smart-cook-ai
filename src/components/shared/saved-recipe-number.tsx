import { getAllRecipes } from "@/lib/actions/recipe.actions";

const SavedRecipeNumber = async () => {
  const recipeNumber = await getAllRecipes();

  return (
    <div className="text-4xl font-semibold text-orange-500">
      {recipeNumber.length}
    </div>
  );
};

export default SavedRecipeNumber;
