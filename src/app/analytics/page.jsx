import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import dynamic from "next/dynamic";
import AverageTransactionAmountByCategoryChart from "./_component/AverageTransactionAmountByCategoryChart";
import { Suspense } from "react";
import IncomeExpenseByMonthChart from "./_component/IncomeExpenseByMonthChart";

const IncomeExpenseOverTimeChartD = dynamic(
  () => import("./_component/IncomeExpenseOverTimeChart"),
  { ssr: false }
);

const CategoryIncomeExpenseChartD = dynamic(
  () => import("./_component/CategoryIncomeExpenseChart"),
  { ssr: false }
);

const GetAverageTransactionAmountByCategory = async () => {
  const result = await prisma.$queryRaw`SELECT
  c.name AS category,
    AVG(t.amount) AS average_amount
    FROM transaction t
    INNER JOIN category c ON t.categoryId = c.id
    GROUP BY c.name
    ORDER BY average_amount DESC;`;

  return JSON.parse(JSON.stringify(result));
};

const GetIncomeExpenseByMonth = async () => {
  const result = await prisma.$queryRaw`SELECT
  YEAR(createdAt) AS year,
  MONTHNAME(createdAt) AS month,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
  FROM transaction
  GROUP BY YEAR(createdAt), MONTH(createdAt)
  ORDER BY year, month;`;

  return JSON.parse(JSON.stringify(result));
};

const GetTotalIncomeExpenseOverTime = async () => {
  const datas = await prisma.$queryRaw`SELECT
  YEAR(createdAt) AS year,
  MONTH(createdAt) AS month,
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
  FROM transaction
  GROUP BY YEAR(createdAt), MONTH(createdAt)
  ORDER BY year, month;`;
  const result = datas.map((data) => {
    return {
      ...data,
      total_income: +data.total_income,
      total_expense: +data.total_expense,
    };
  });
  return JSON.parse(JSON.stringify(result));
};

const getTolatIncome = async () => {
  const result = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" },
  });
  console.log("🚀 ~ getTolatIncome ~ result:", result);
};

const getTolatExpense = async () => {
  const result = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" },
  });
};

const getNetIncome = async () => {
  const result = await prisma.$queryRaw`SELECT
  SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS net_income
  FROM transaction;`;
  console.log("🚀 ~ getTolatExpense ~ result:", result);
};

export default async function AnalyticsPage() {
  const data = await GetAverageTransactionAmountByCategory();
  const data1 = await GetIncomeExpenseByMonth();
  const data2 = await GetTotalIncomeExpenseOverTime();
  const totalIncome = await getTolatIncome();
  const totalExpense = await getTolatExpense();
  const netIncom = await getNetIncome();

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-6">
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
      <div className="grid grid-cols-1 col-span-5 grid-rows-1 md:grid-cols-2">
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Income/Expense OverTime</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseOverTimeChartD data={data2} />
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Category Income/Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryIncomeExpenseChartD />
          </CardContent>
        </Card>

        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Average Transaction Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <AverageTransactionAmountByCategoryChart data={data} />
          </CardContent>
        </Card>

        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Top Spending/Earning Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseByMonthChart data={data1} />
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
