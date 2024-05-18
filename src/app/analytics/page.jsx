import { Suspense } from "react";
import AverageTransactionAmountByCategory from "./_component/charts/AverageTransactionAmountByCategory";
import IncomeExpenseOverTime from "./_component/charts/IncomeExpenseOverTime";
import IncomeExpenseByMonth from "./_component/charts/IncomeExpenseByMonth";
import { SekeletonChart } from "./_component/charts/SekeletonChart";
import CategoryIncomeExpense from "./_component/charts/CategoryIncomeExpense";
import TotalIncomeCard from "@/components/common/cardSummery/TotalIncomeCard";
import TotalExpenseCard from "@/components/common/cardSummery/TotalExpenseCard";
import NetIncomeCard from "@/components/common/cardSummery/NetIncomeCard";
import CardSekeleton from "@/components/common/cardSummery/CardSekeleton";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function AnalyticsPage({ searchParams }) {
  console.log("🚀 ~ AnalyticsPage ~ searchParams:", searchParams);

  const session = await auth();

  if (!session) {
    redirect("/");
  }
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
          <IncomeExpenseOverTime
            params={searchParams["income-expense-overtime"]}
          />
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <AverageTransactionAmountByCategory />
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <IncomeExpenseByMonth />
        </Suspense>

        <Suspense fallback={<SekeletonChart />}>
          <CategoryIncomeExpense />
        </Suspense>
      </div>
    </div>
  );
}

//   const isServerSide = useIsServerSide();
//   if (isServerSide) return null;
// export const useIsServerSide = () => {
//   const [isServerSide, setIsServerSide] = useState(true);

//   useEffect(() => {
//     setIsServerSide(false);
//   }, [setIsServerSide]);

//   return isServerSide;
// };
