import { Suspense } from "react";
import { SekeletonChart } from "./_component/charts/SekeletonChart";
import TotalIncomeCard from "@/components/common/cardSummery/TotalIncomeCard";
import TotalExpenseCard from "@/components/common/cardSummery/TotalExpenseCard";
import NetIncomeCard from "@/components/common/cardSummery/NetIncomeCard";
import CardSekeleton from "@/components/common/cardSummery/CardSekeleton";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import CategoryIncomeExpenseChart from "./_component/charts/CategoryIncomeExpenseChart";
import IncomeExpenseByMonthChart from "./_component/charts/IncomeExpenseByMonthChart";
import AverageTransactionAmountByCategoryChart from "./_component/charts/AverageTransactionAmountByCategoryChart";
import IncomeExpenseOverTimeChart from "./_component/charts/IncomeExpenseOverTimeChart";
import ChartCard from "./_component/charts/ChartCard";

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

export default async function AnalyticsPage({ searchParams }) {

  const [data1, data2, data3, data4] = await Promise.all([
    GetTotalIncomeExpenseOverTime(+searchParams["income-expense-overtime"]),
    GetIncomeExpenseByMonth(),
    getCategoryIncomeExpense(),
    GetAverageTransactionAmountByCategory(),
  ]);
  console.log(
    `🚀 ~ AnalyticsPage ~ data1 ${data1.data}, data2 ${data2.data}, data3 ${data3.data}, data4 ${data4.data}:`
  );

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-6">
      <div className="grid grid-cols-1 grid-rows-3 h-fit">
        <Suspense fallback={<CardSekeleton />}>
          <TotalIncomeCard />
        </Suspense>

        <Suspense fallback={<CardSekeleton />}>
          <TotalExpenseCard />
        </Suspense>

        <Suspense fallback={<CardSekeleton />}>
          <NetIncomeCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 col-span-5 grid-rows-1 md:grid-cols-2">
        <Suspense fallback={<SekeletonChart />}>
          <ChartCard>
            <IncomeExpenseOverTimeChart
              data={data1.data}
              params={searchParams["income-expense-overtime"]}
            />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard>
            <AverageTransactionAmountByCategoryChart data={data2.data} />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard>
            <IncomeExpenseByMonthChart data={data3.data} />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard>
            <CategoryIncomeExpenseChart data={data4.data} />
          </ChartCard>
        </Suspense>
      </div>
    </div>
  );
}

