"use client";
import { useState, useTransition } from "react";
import { Recipe } from "@/types/recipe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Trash2, Users, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { deleteRecipeById } from "@/lib/actions/recipe.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AlertDialog from "./alert-dialog";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () =>
    startTransition(async () => {
      const res = await deleteRecipeById(recipe.id);
      if (!res?.success) {
        toast(res?.message);
        return;
      }
      toast(res?.message);
      setDialogOpen(false);
      router.refresh();
    });
  return (
    <Card className="hover:shadow-lg transition-shadow max-w-md">
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
          <AlertDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            action={() => handleDelete()}
            variant="destructive"
            isPending={isPending}
          >
            <Button variant="ghost" size="icon">
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </AlertDialog>
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
        <Link href={`/recipe/edit/${recipe.id}`}>
          <Button size="sm" className="w-full mt-4">
            Edit Recipe
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
