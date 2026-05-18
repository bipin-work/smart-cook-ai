import { getCachedRecentRecipe } from "@/lib/actions/recipe.actions";
import RecipeCard from "./recipe-card";

const RecentRecipe = async () => {
  const recipe = await getCachedRecentRecipe();
  return <>{recipe && <RecipeCard recipe={recipe} />}</>;
};

export default RecentRecipe;
