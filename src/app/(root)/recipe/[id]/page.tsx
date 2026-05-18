import BackButton from "@/components/shared/back-button";
import RecipeDetail from "@/components/shared/recipe-detail";
import RecipeViewTracker from "@/components/shared/recipe-view-tracker";
import { getRecipeById } from "@/lib/actions/recipe.actions";
const RecipeView = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const recipe = await getRecipeById(id);
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <RecipeViewTracker recipeId={recipe.id} />
        <BackButton />
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeView;
