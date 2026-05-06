import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 chars"),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 chars"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 chars"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be atleast 6 chars"),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });

export const insertIngredientSchema = z.object({
  ingredient: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
});

export const insertRecipeSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  servings: z.int().min(1, "Required"),
  source: z.string(),
  sourceUrl: z.string(),
  cookTime: z
    .string()
    .min(1, "Required")
    .describe("Total time including prep and cook"),
  ingredients: z.array(insertIngredientSchema),
  instructions: z.array(z.string().min(1, "Required")).min(1, "Required"),
});
