import BackButton from "@/components/shared/back-button";
import RecipeDetail from "@/components/shared/recipe-detail";
import { getRecipeById, recordRecipeView } from "@/lib/actions/recipe.actions";
const RecipeView = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const recipe = await getRecipeById(id);
  await recordRecipeView(id);
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <RecipeDetail recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeView;
