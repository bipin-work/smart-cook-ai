import { BookOpen, Plus, Sparkles, Package, GitCompare } from "lucide-react";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SmartCookAi";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern Recipe platform built on Nextjs";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

export const SIDE_BAR_CONTENTS = [
  {
    title: "Dashboard",
    icon: <BookOpen className="size-4 mr-2" />,
    path: "/",
  },
  {
    title: "Add Recipe",
    icon: <Plus className="size-4 mr-2" />,
    path: "/add-recipe",
  },
  {
    title: "Generate Recipe",
    icon: <Sparkles className="size-4 mr-2" />,
    path: "/generate-recipe",
  },
  {
    title: "My Recipes",
    icon: <BookOpen className="size-4 mr-2" />,
    path: "/my-recipes",
  },
  {
    title: "Pantry",
    icon: <Package className="size-4 mr-2" />,
    path: "/pantry",
  },
  {
    title: "Compare Recipes",
    icon: <GitCompare className="size-4 mr-2" />,
    path: "/compare-recipes",
  },
];
