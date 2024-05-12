import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsonSerialize } from "@/utils/helper";
import dynamic from "next/dynamic";
import React from "react";

const CategoryIncomeExpenseChartD = dynamic(
  () => import("./CategoryIncomeExpenseChart"),
  { ssr: false }
);

const getCategoryIncomeExpense = async () => {
  try {
    const results = await prisma.$queryRaw`WITH ranked_transactions AS (
        SELECT
          t.type,
          c.name AS category,
          SUM(t.amount) AS total_amount,
          RANK() OVER (PARTITION BY t.type ORDER BY total_amount DESC) AS rank
        FROM transaction t
        INNER JOIN category c ON t.categoryId = c.id
        GROUP BY t.type, c.name
      )
      SELECT *
      FROM ranked_transactions
      WHERE rank <= 5;`;

    const formatedResults = results.map((result) => {
      return {
        ...result,
        total_amount: +result.total_amount,
      };
    });

    const expenseTransactionType = [];
    const incomeTransactionType = [];

    formatedResults.map((result) =>
      result.type === "INCOME"
        ? incomeTransactionType.push(result)
        : expenseTransactionType.push(result)
    );

    return {
      data: {
        expenseData: jsonSerialize(expenseTransactionType),
        incomeData: jsonSerialize(incomeTransactionType),
      },
    };
  } catch (error) {
    return { error: error.message };
  }
};

export default async function CategoryIncomeExpense() {
  const { data, error } = await getCategoryIncomeExpense();

  if (!data) {
    return <p>{error}</p>;
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Category Income/Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryIncomeExpenseChartD data={data} />
      </CardContent>
    </Card>
  );
}
