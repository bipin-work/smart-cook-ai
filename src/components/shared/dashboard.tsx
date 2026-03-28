import Test from "@/app/Test";
import { ChefHat, Package, Plus, Sparkles } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const Dashboard = () => {
  const recipeCount = 0;
  const pantryCount = 0;
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="flex items-center gap-3 mb-2">
            <ChefHat className="size-8 text-orange-500" />
            Welcome to SmartCookAi
          </h1>
          <p className="text-gray-600">
            Your personal recipe manager with smart pantry tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Recipes</CardTitle>
              <CardDescription>
                Total recupes in your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-orange-500">
                {recipeCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pantry Items</CardTitle>
              <CardDescription>Ingredients currently in stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold text-green-500">
                {pantryCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/add-page">
                <CardHeader>
                  <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Plus className="size-6 text-blue-600" />
                  </div>
                  <CardTitle>Add Recipe</CardTitle>
                  <CardDescription>
                    Manually input a new recipe with ingredients and
                    instructions
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/generate-recipe">
                <CardHeader>
                  <div className="size-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Sparkles className="size-6 text-purple-600" />
                  </div>
                  <CardTitle>Generate Recipe</CardTitle>
                  <CardDescription>
                    Use AI to generate recipes from prompts or blog/YouTube
                    links
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/pantry">
                <CardHeader>
                  <div className="size-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Package className="size-6 text-green-600" />
                  </div>
                  <CardTitle>Manage Pantry</CardTitle>
                  <CardDescription>
                    Track ingredients you have and compare with recipes
                  </CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2>Recent Recipes</h2>
            {recipeCount > 0 && (
              <Link href="/my-recipes">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            )}
          </div>
          {recipeCount === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <p>
                  No recipes yet. Start by adding or generating your first
                  recipe!
                </p>
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-600">
              You have {recipeCount} recipe{recipeCount !== 1 ? "s" : ""} saved.{" "}
              <Link
                href="/my-recipes"
                className="text-orange-500 hover:underline"
              >
                Visit them here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
