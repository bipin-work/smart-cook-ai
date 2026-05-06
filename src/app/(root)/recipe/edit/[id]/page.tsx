import RecipeForm from "@/app/(root)/add-recipe/recipe-form";
import { getRecipeById } from "@/lib/actions/recipe.actions";

const EditPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const recipe = await getRecipeById(id);
  console.log("Recipe", recipe);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <RecipeForm isEdit={true} values={recipe} />
      </div>
    </div>
  );
};

export default EditPage;
