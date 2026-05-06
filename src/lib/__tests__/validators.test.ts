import { insertIngredientSchema, insertRecipeSchema } from "../validators";

describe("insertIngredientSchema", () => {
  it("accepts a fully populated ingredient", () => {
    const result = insertIngredientSchema.safeParse({
      ingredient: "Salt",
      quantity: "1",
      unit: "tsp",
    });
    expect(result.success).toBe(true);
  });

  // `it.each` lets you run the same test body against multiple inputs.
  // This is much cleaner than copy-pasting four near-identical tests, and
  // the failure output tells you exactly which row failed.
  it.each([
    { field: "ingredient", payload: { ingredient: "", quantity: "1", unit: "tsp" } },
    { field: "quantity", payload: { ingredient: "Salt", quantity: "", unit: "tsp" } },
    { field: "unit", payload: { ingredient: "Salt", quantity: "1", unit: "" } },
  ])("rejects when $field is empty", ({ payload }) => {
    const result = insertIngredientSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe("insertRecipeSchema", () => {
  // Helper to build a valid recipe so each test only varies the field it cares
  // about. This is the "test factory" pattern — keeps tests readable and
  // resilient to schema additions (add a new required field? update one helper).
  const validRecipe = () => ({
    title: "Pasta",
    description: "Quick weeknight pasta",
    servings: 2,
    source: "manual",
    sourceUrl: "",
    cookTime: "20 minutes",
    ingredients: [{ ingredient: "Pasta", quantity: "200", unit: "g" }],
    instructions: ["Boil water", "Add pasta"],
  });

  it("accepts a valid recipe", () => {
    expect(insertRecipeSchema.safeParse(validRecipe()).success).toBe(true);
  });

  it("rejects servings less than 1", () => {
    const result = insertRecipeSchema.safeParse({ ...validRecipe(), servings: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects when instructions array is empty", () => {
    const result = insertRecipeSchema.safeParse({ ...validRecipe(), instructions: [] });
    expect(result.success).toBe(false);
  });

  it("rejects servings that aren't integers", () => {
    const result = insertRecipeSchema.safeParse({ ...validRecipe(), servings: 2.5 });
    expect(result.success).toBe(false);
  });

  it("surfaces the field path in the error", () => {
    // Why this matters: your form layer relies on Zod errors being keyed by
    // field path so it can show inline errors. If a refactor flattens the
    // schema, this test catches it before the form silently breaks.
    const result = insertRecipeSchema.safeParse({ ...validRecipe(), title: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const titleError = result.error.issues.find((i) => i.path[0] === "title");
      expect(titleError).toBeDefined();
    }
  });
});
