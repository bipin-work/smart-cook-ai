"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { InsertRecipe } from "@/types/recipe";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRecipeSchema } from "@/lib/validators";
import { RECIPE_FORM_DEFAULTS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { saveRecipe } from "@/lib/actions/recipe.actions";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const RecipeForm = ({
  isEdit,
  values,
}: {
  isEdit: boolean;
  values?: InsertRecipe;
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<InsertRecipe>({
    resolver: zodResolver(insertRecipeSchema),
    defaultValues: isEdit ? values : RECIPE_FORM_DEFAULTS,
  });
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray<InsertRecipe>({
    control: form.control,
    name: "ingredients",
  });

  // since instructions has primitive array like string[], we cant use useFieldArrays, so as an alternative:
  const instructions = form.watch("instructions");

  const appendInstructions = () => {
    form.setValue("instructions", [...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    form.setValue(
      "instructions",
      instructions.filter((_, i) => i != index),
    );
  };

  const handleSubmit = async (values: InsertRecipe) => {
    startTransition(async () => {
      const res = await saveRecipe(values, "MANUAL");
      if (!res.success) {
        toast.error("Could not save the recipe");
        return;
      }
      toast.success(res.message);
    });
  };

  return (
    <>
      <Card className="ring-0  shadow-none  md:ring-1 md:shadow-sm">
        <CardHeader className="px-6">
          <CardTitle>{isEdit ? "Edit" : "Add New"} Recipe</CardTitle>
          <CardDescription>Manually input your recipe details</CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 max-w-3xl"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipe Title.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Recipe description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cookTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 45 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Ingredients</FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      appendIngredient({
                        ingredient: "",
                        quantity: "",
                        unit: "",
                      });
                    }}
                  >
                    <Plus className="size-4 mr-1" />
                    Add
                  </Button>
                </div>
                {ingredientFields.map((fieldItem, index) => (
                  <div key={fieldItem.id} className="flex gap-2">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.ingredient`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Ingredient" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-24">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Qty" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-24">
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Unit" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Instructions</FormLabel>
                  <Button type="button" size="sm" onClick={appendInstructions}>
                    <Plus className="size-4 mr-1" /> Add
                  </Button>
                </div>

                {instructions.map((fieldItem, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex items-center justify-center w-8 text-sm text-gray-500">
                      {index + 1}.
                    </div>
                    <FormField
                      control={form.control}
                      name={`instructions.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea
                              placeholder={`Step ${index + 1}`}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                  ? "Saving..."
                  : isEdit
                    ? "Edit Recipe"
                    : "Save Recipe"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeForm;
