import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import SkeletonLine from "@/components/shared/skeleton-line";

export default function RecipeListLoader() {
  const placeholderRecipe = [...Array(10)];
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-4">
          <SkeletonLine width="40%" />
          <SkeletonLine width="50%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderRecipe.map((recipe, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="hover:text-orange-500 transition-colors">
                      <SkeletonLine width="150px" />
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  <SkeletonLine width="150px" />
                  <SkeletonLine width="170px" />
                  <SkeletonLine width="160px" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <SkeletonLine width="50px" />
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <SkeletonLine width="150px" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
