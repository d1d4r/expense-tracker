import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SekeletonChart() {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-3 w-[250px] rounded-xl" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[350px]" />
      </CardContent>
    </Card>
  );
}
