import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DollarSignIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardSummery({
  title = "income",
  content = "200",
  className,
}) {
  return (
    <Card className={cn("rounded-md border ", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${Math.trunc(content)}</div>
      </CardContent>
    </Card>
  );
}
