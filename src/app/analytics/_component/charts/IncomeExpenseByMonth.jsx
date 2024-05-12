import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import dynamic from "next/dynamic";

const IncomeExpenseByMonthChartD = dynamic(
  () => import("./IncomeExpenseByMonthChart"),
  { ssr: false }
);
const GetIncomeExpenseByMonth = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT
      YEAR(createdAt) AS year,
      MONTHNAME(createdAt) AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transaction
      GROUP BY YEAR(createdAt), MONTH(createdAt)
      ORDER BY year, month;`;

    return { data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return { error: error.message };
  }
};

export default async function IncomeExpenseByMonth() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  const { data, error } = await GetIncomeExpenseByMonth();
  
  if (!data) {
    return <p>{error}</p>;
  }
  // console.log("🚀 ~ IncomeExpenseByMonth ~ data:", data);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Top Spending/Earning Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <IncomeExpenseByMonthChartD data={data} />
      </CardContent>
    </Card>
  );
}
