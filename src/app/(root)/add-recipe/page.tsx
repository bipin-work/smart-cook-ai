import RecipeForm from "./recipe-form";

export const metadata = {
  title: "Add Recipe",
};

const AddRecipe = () => {
  return (
    <div className="md:p-8 ">
      <div className="max-w-6xl mx-auto spacing-y-6">
        <RecipeForm isEdit={false} />
      </div>
    </div>
  );
};

export default AddRecipe;
