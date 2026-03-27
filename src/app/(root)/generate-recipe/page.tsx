"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, LinkIcon, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import GeneratedRecipe from "./generated-recipe";
import GenerateRecipe from "./generate-recipe";
const recipe = {
  id: crypto.randomUUID(),
  title: "AI-Generated Pasta Dish",
  description: "A delicious pasta recipe generated from your prompt: ",
  ingredients: [
    { id: crypto.randomUUID(), name: "Pasta", amount: "400", unit: "g" },
    { id: crypto.randomUUID(), name: "Olive oil", amount: "2", unit: "tbsp" },
    { id: crypto.randomUUID(), name: "Garlic", amount: "3", unit: "cloves" },
    { id: crypto.randomUUID(), name: "Tomatoes", amount: "400", unit: "g" },
    { id: crypto.randomUUID(), name: "Basil", amount: "1", unit: "handful" },
    { id: crypto.randomUUID(), name: "Parmesan", amount: "50", unit: "g" },
  ],
  instructions: [
    "Bring a large pot of salted water to boil and cook pasta according to package directions",
    "Heat olive oil in a large pan over medium heat",
    "Add minced garlic and sauté until fragrant, about 1 minute",
    "Add chopped tomatoes and simmer for 15 minutes",
    "Drain pasta and add to the sauce, tossing to combine",
    "Top with fresh basil and grated Parmesan cheese",
  ],
  cookTime: "25 minutes",
  servings: 4,
  createdAt: new Date().toISOString(),
  source: "generated",
};

const GenerateRecipePage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string | undefined>();
  const [url, setUrl] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="size-sm text-black-600" />
          Back
        </Button>
        {generatedRecipe ? (
          <GenerateRecipe />
        ) : (
          <GeneratedRecipe generatedRecipe={recipe} />
        )}
      </div>
    </div>
  );
};

export default GenerateRecipePage;
