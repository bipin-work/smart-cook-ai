import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const GeneratedRecipe = ({ generatedRecipe }: any) => {
  console.log("dd", generatedRecipe);
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{generatedRecipe.title}</CardTitle>
          <CardDescription>{generatedRecipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cook time:</span>{" "}
              {generatedRecipe.cookTime}
            </div>
            <div>
              <span className="text-gray-500">Servings:</span>{" "}
              {generatedRecipe.servings}
            </div>
          </div>
          <div>
            <h3 className="mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {generatedRecipe.ingredients.map((ing: any) => (
                <li key={ing.id} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-orange-500" />
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3">Instructions</h3>
            <ol className="space-y-3">
              {generatedRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex items-center justify-center size-6 rounded-full bg-orange-100 text-orange-600 text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratedRecipe;
