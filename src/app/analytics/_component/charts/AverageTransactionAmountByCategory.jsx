import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import dynamic from "next/dynamic";

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
    console.log(
      "🚀 ~ GetAverageTransactionAmountByCategory ~ error:",
      error.message
    );
    return { error: error.message };
  }
};

export default async function AverageTransactionAmountByCategory() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  const { data, error } = await GetAverageTransactionAmountByCategory();
  // console.log("🚀 ~ AverageTransactionAmountByCategory ~ error:", error.ReferenceError.message)
  if (!data) {
    return <p>{error}</p>;
  }
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Average Transaction Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <AverageTransactionAmountByCategoryChartD data={data} />
      </CardContent>
    </Card>
  );
}
