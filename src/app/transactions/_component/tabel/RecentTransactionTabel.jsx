import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getTransactions,
  getTransactionsInclude,
} from "../../data/transactionData";
import { formatDate } from "@/utils/helper";

export default async function RecentTransactionTabel() {
  const { transactions, error } = await getTransactions();

  if (!transactions) {
    return <p>{error}</p>;
  }
  return (
    <div className="p-5 border rounded-md">
      <div className="flex justify-between">
        <div>
          <p className="text-4xl">transactions</p>
          <p className="text-sm text-muted-foreground">Recent transactions </p>
        </div>
        <Button asChild>
          <Link href="/transactions" className="space-x-2">
            <span>View All</span>
            <ArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.Category.name}</TableCell>
              <TableCell className="text-right">
                {formatDate(transaction.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
