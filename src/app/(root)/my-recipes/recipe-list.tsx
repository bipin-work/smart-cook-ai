"use client";
import { useMemo } from "react";
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

const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedInput = useDebounce(searchQuery, 200);

  const handleDelete = (recipeId: string) => {};
  const filteredRecipes = useMemo(() => {
    const query = debouncedInput.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query)
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
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <Link href={`/recipe/${recipe.id}`}>
                      <CardTitle className="hover:text-orange-500 transition-colors">
                        {recipe.title}
                      </CardTitle>
                    </Link>
                    {recipe.sourceUrl && (
                      <Badge variant="secondary" className="mt-2">
                        {recipe.sourceUrl === "manual" ? "Manual" : "Generated"}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {recipe.cookTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {recipe.cookTime}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="size-4" />
                    {recipe.servings} servings
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  {recipe.ingredients.length} ingredients
                </div>
                <Link href={`/recipe/${recipe.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Recipe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeList;
