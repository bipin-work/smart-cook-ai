import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LinkIcon, Sparkles, Loader2 } from "lucide-react";
import { InsertRecipe } from "@/types/recipe";
import { extractRawContent } from "@/lib/extractContent";
import { runExtraction } from "@/lib/extractor";
import { toast } from "sonner";

const GenerateRecipe = ({
  onRecipeGenerated,
}: {
  onRecipeGenerated: (recipe: InsertRecipe) => void;
}) => {
  const [prompt, setPrompt] = useState<string>();
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateFromPrompt = () => {
    prompt && handleGenerate(prompt);
  };

  const handleGenerateFromUrl = async () => {
    const rawContent = await extractRawContent(url);
    handleGenerate(rawContent);
  };

  const handleGenerate = async (rawInput: string) => {
    setIsGenerating(true);
    try {
      const generatedRecipe = await runExtraction(rawInput);
      console.log("gee", generatedRecipe);
      if (!generatedRecipe) {
        toast.error("Could not generate now. Try again later!");
        return;
      }
      onRecipeGenerated(generatedRecipe as InsertRecipe);
      toast.success("Recipe generated!");
    } catch (error) {
      console.log("Error extraction");
      toast.error("Error generating recipe");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-purple-500" />
          <CardTitle>Generate Recipe</CardTitle>
        </CardTitle>
        <CardDescription>
          Use AI to create recipes from prompts or extract them from blog posts
          and Youtube videos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prompt" className="w-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="prompt"
              className="data-[state=active]:bg-white"
            >
              <Sparkles className="size-4 mr-2" /> From Prompt
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-white">
              <LinkIcon className="size-4 mr-2" /> From URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-4 mt-6">
            <div>
              <Label htmlFor="prompt">Recipe Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'A healthy vegetarian pasta dish with seasonal vegetables' or 'Quick 20-minute dinner with chicken'"
                rows={4}
                minLength={1}
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleGenerateFromPrompt}
              disabled={!prompt || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4 mr-2" />
                  Generate Recipe
                </>
              )}
            </Button>
          </TabsContent>
          <TabsContent value="url" className="space-y-4 mt-6">
            <div>
              <Label htmlFor="url">Blog Post or YouTube URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/recipe or https://youtube.com/watch?v=..."
                className="mt-2"
              />
            </div>
            <Button
              onClick={handleGenerateFromUrl}
              disabled={!url || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <LinkIcon className="size-4 mr-2" />
                  Extract Recipe
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GenerateRecipe;
