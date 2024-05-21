import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import FilterChart from "../filter/FilterChart";

export default function ChartCard({ children, title }) {
  return (
    <Card className="rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <FilterChart query="income-expense-overtime" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
