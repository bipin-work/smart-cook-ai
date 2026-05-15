"use client";
import { useMemo, useTransition } from "react";
import { Recipe } from "@/types/recipe";
import { Clock, Trash2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/app/hooks/useDebounce";
import { deleteRecipeById } from "@/lib/actions/recipe.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RecipeCard from "@/components/shared/recipe-card";

const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedInput = useDebounce(searchQuery, 200);
  const router = useRouter();

  const handleDelete = (recipeId: string) => {
    startTransition(async () => {
      const res = await deleteRecipeById(recipeId);
      if (!res?.success) {
        toast(res?.message);
        return;
      }
      toast(res?.message);
      router.refresh();
    });
  };
  const filteredRecipes = useMemo(() => {
    const query = debouncedInput.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query),
    );
  }, [debouncedInput, recipes]);

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search recipes..."
          className="pl-10"
        />{" "}
      </div>
      {filteredRecipes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? "No recipes found matching your search"
                : "No recipes yet. Start by adding or generating one!"}
            </p>
            {!searchQuery && (
              <div className="flex gap-3 justify-center mt-4">
                <Link href="/add-recipe">
                  <Button>Add Recipe</Button>
                </Link>
                <Link href="/generate-recipe">
                  <Button variant="outline">Generate Recipe</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList;
