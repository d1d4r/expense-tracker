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
import {
  GetAverageTransactionAmountByCategory,
  getCategoryIncomeExpense,
  GetIncomeExpenseByMonth,
  GetTotalIncomeExpenseOverTime,
} from "./data/analyticsData";

export default async function AnalyticsPage({ searchParams }) {
  const [data1, data2, data3, data4] = await Promise.all([
    GetTotalIncomeExpenseOverTime(+searchParams["income-expense-overtime"]),
    GetIncomeExpenseByMonth(),
    getCategoryIncomeExpense(),
    GetAverageTransactionAmountByCategory(),
  ]);


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
          <ChartCard title="Income/Expense Overtime">
            <IncomeExpenseOverTimeChart
              data={data1.data}
              params={searchParams["income-expense-overtime"]}
            />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard title="Average Transaction Amount">
            <AverageTransactionAmountByCategoryChart data={data4.data} />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard title="Income/Expense By Month">
            <IncomeExpenseByMonthChart data={data2.data} />
          </ChartCard>
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <ChartCard title="Category Income/Expense">
            <CategoryIncomeExpenseChart data={data3.data} />
          </ChartCard>
        </Suspense>
      </div>
    </div>
  );
}
