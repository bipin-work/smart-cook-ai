import SkeletonLine from "@/components/shared/skeleton-line";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
export default function Loading() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <SkeletonLine width="200px" />
            </CardTitle>
            <CardDescription>
              <SkeletonLine width="200px" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <SkeletonLine width="200px" />
              </div>
              <div>
                <SkeletonLine width="200px" />
              </div>
            </div>
            <div>
              <SkeletonLine width="200px" />
              <SkeletonLine width="200px" />
              <SkeletonLine width="200px" />
            </div>
            <div>
              <SkeletonLine width="70%" />
              <SkeletonLine width="70%" />
              <SkeletonLine width="40%" />
              <SkeletonLine width="50%" />
              <SkeletonLine width="80%" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
