import { Suspense } from "react";
import CardSekeleton from "@/components/common/cardSummery/CardSekeleton";
import TotalIncomeCard from "@/components/common/cardSummery/TotalIncomeCard";
import TotalExpenseCard from "@/components/common/cardSummery/TotalExpenseCard";
import NetIncomeCard from "@/components/common/cardSummery/NetIncomeCard";
import RecentTransactionTabel from "./transactions/_component/tabel/RecentTransactionTabel";
import RecentCategoryTabel from "./categories/_component/tabel/RecentCategoryTabel";
// import { unstable_noStore as noStore } from 'next/cache';
export const dynamic = 'force-dynamic'
export default function Home() {
  // noStore();
  return (
    <main className="container space-y-5 ">
      <div className="grid gap-4 mt-3 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
      <div className="grid grid-cols-2 grid-rows-1 gap-4 ">
        <RecentTransactionTabel />
        <RecentCategoryTabel />
      </div>
    </main>
  );
}
