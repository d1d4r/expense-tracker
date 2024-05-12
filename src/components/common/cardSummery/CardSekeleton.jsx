import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSignIcon } from "lucide-react";
import React from "react";

export default function CardSekeleton() {
  return (
    <Card className="rounded-none border-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Skeleton className="h-3 w-[150px] rounded-xl" />
        <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[52px] w-[150px] rounded-xl" />
      </CardContent>
    </Card>
  );
}
