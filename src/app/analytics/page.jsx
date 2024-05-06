import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import dynamic from "next/dynamic";
import AverageTransactionAmountByCategoryChart from "./_component/AverageTransactionAmountByCategoryChart";

const IncomeExpenseOverTimeChartD = dynamic(
  () => import("./_component/IncomeExpenseOverTimeChart"),
  { ssr: false }
);

const CategoryIncomeExpenseChartD = dynamic(
  () => import("./_component/CategoryIncomeExpenseChart"),
  { ssr: false }
);

export default function AnalyticsPage() {
  return (
    <div className="">
      <div className="grid grid-cols-1 grid-rows-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 grid-rows-1">
        <Card>
          <CardHeader>
            <CardTitle>Income/Expense OverTime</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseOverTimeChartD />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category Income/Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryIncomeExpenseChartD />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Transaction Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <AverageTransactionAmountByCategoryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Spending/Earning Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <AverageTransactionAmountByCategoryChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// import IncomeExpenseOverTimeChart from "./_component/IncomeExpenseOverTimeChart";

//  <IncomeExpenseOverTimeChart />

//   const isServerSide = useIsServerSide();
//   if (isServerSide) return null;
// export const useIsServerSide = () => {
//   const [isServerSide, setIsServerSide] = useState(true);

//   useEffect(() => {
//     setIsServerSide(false);
//   }, [setIsServerSide]);

//   return isServerSide;
// };
