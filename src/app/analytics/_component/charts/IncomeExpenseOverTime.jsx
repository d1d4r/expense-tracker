import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/lib/db/prisma";
import ChartCard from "./ChartCard";

const IncomeExpenseOverTimeChartD = dynamic(
  () => import("./IncomeExpenseOverTimeChart"),
  { ssr: false }
);

const GetTotalIncomeExpenseOverTime = async (year) => {
  if (!year) {
    year = 2024;
  }
  try {
    const results = await prisma.$queryRaw`SELECT
      YEAR(createdAt) AS year,
      MONTHNAME(createdAt) AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transaction
      WHERE YEAR(createdAt) = ${year}
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

export default async function IncomeExpenseOverTime({ params }) {
  const { data, error } = await GetTotalIncomeExpenseOverTime(+params);

  if (!data) {
    return <p>{error}</p>;
  }

  return (
    <ChartCard title="Income/Expense OverTime">
      <IncomeExpenseOverTimeChartD data={data} />
    </ChartCard>
  );
}
