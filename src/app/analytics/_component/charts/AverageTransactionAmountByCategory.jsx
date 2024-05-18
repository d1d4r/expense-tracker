import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/lib/db/prisma";
import FilterChart from "../filter/FilterChart";

const AverageTransactionAmountByCategoryChartD = dynamic(
  () => import("./AverageTransactionAmountByCategoryChart"),
  { ssr: false }
);

const GetAverageTransactionAmountByCategory = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT
      c.name AS category,
        AVG(t.amount) AS average_amount
        FROM transaction t
        INNER JOIN category c ON t.categoryId = c.id
        GROUP BY c.name
        ORDER BY average_amount DESC;`;

    return { data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error: error.message };
  }
};

export default async function AverageTransactionAmountByCategory() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  const { data, error } = await GetAverageTransactionAmountByCategory();
  if (!data) {
    return <p>{error}</p>;
  }
  return (
    <Card className="rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Average Transaction Amount</CardTitle>
        <FilterChart query="average-transaction-amount" />
      </CardHeader>
      <CardContent>
        <AverageTransactionAmountByCategoryChartD data={data} />
      </CardContent>
    </Card>
  );
}
