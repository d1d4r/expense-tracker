import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import dynamic from "next/dynamic";

const IncomeExpenseOverTimeChartD = dynamic(
  () => import("./IncomeExpenseOverTimeChart"),
  { ssr: false }
);

const GetTotalIncomeExpenseOverTime = async () => {
  try {
    const results = await prisma.$queryRaw`SELECT
      YEAR(createdAt) AS year,
      MONTHNAME(createdAt) AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transaction
      GROUP BY YEAR(createdAt), MONTH(createdAt)
      ORDER BY year, month;`;
    const formatedDatas = results.map((data) => {
      return {
        ...data,
        total_income: +data.total_income,
        total_expense: +data.total_expense,
      };
    });
    return { data: JSON.parse(JSON.stringify(formatedDatas)) };
  } catch (error) {
    return { error: error.message };
  }
};

export default async function IncomeExpenseOverTime() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  const { data, error } = await GetTotalIncomeExpenseOverTime();

  if (!data) {
    return <p>{error}</p>;
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Income/Expense OverTime</CardTitle>
      </CardHeader>
      <CardContent>
        <IncomeExpenseOverTimeChartD data={data} />
      </CardContent>
    </Card>
  );
}
