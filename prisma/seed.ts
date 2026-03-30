import { RecipeSource } from "@/generated/prisma/client";
import { prisma } from "@/db/prisma";
async function main() {
  console.log("🌱 Seeding database...");

  // -----------------------------
  // Users
  // -----------------------------
  const user = await prisma.user.upsert({
    where: { email: "demo@recipe.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@recipe.com",
    },
  });

  // -----------------------------
  // Ingredients
  // -----------------------------
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "chicken" },
      { name: "onion" },
      { name: "garlic" },
      { name: "rice" },
      { name: "salt" },
      { name: "oil" },
    ],
    skipDuplicates: true,
  });

  const allIngredients = await prisma.ingredient.findMany();

  const ingredientMap = Object.fromEntries(
    allIngredients.map((i) => [i.name, i.id])
  );

  // -----------------------------
  // Tags
  // -----------------------------
  const tags = await prisma.tag.createMany({
    data: [
      { name: "nepali" },
      { name: "spicy" },
      { name: "quick" },
      { name: "non-veg" },
    ],
    skipDuplicates: true,
  });

  const allTags = await prisma.tag.findMany();
  const tagMap = Object.fromEntries(allTags.map((t) => [t.name, t.id]));

  // -----------------------------
  // Recipe
  // -----------------------------
  const recipe = await prisma.recipe.create({
    data: {
      title: "Chicken Fried Rice",
      description: "Quick and tasty fried rice with chicken",
      cookTime: "20 mins",
      servings: 2,
      source: RecipeSource.MANUAL,
      sourceUrl: "",
      instructions: [
        "Boil rice",
        "Cook chicken",
        "Fry with onion and garlic",
        "Mix rice and season",
      ],
      ingredients: {
        create: [
          {
            ingredientId: ingredientMap["chicken"],
            quantity: 200,
            unit: "g",
          },
          {
            ingredientId: ingredientMap["rice"],
            quantity: 1,
            unit: "cup",
          },
          {
            ingredientId: ingredientMap["onion"],
            quantity: 1,
            unit: "pcs",
            preparation: "chopped",
          },
        ],
      },
      tags: {
        create: [{ tagId: tagMap["quick"] }, { tagId: tagMap["non-veg"] }],
      },
    },
  });

  // -----------------------------
  // Pantry items
  // -----------------------------
  await prisma.pantryItem.createMany({
    data: [
      {
        userId: user.id,
        ingredientId: ingredientMap["rice"],
        quantity: 2,
        unit: "kg",
      },
      {
        userId: user.id,
        ingredientId: ingredientMap["onion"],
        quantity: 5,
        unit: "pcs",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
