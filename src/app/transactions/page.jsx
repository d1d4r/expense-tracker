import { columns } from "@/components/Tabel/columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db/prisma";
import { PlusCircle, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const getTransactions = async () => {
  try {
    const data = await prisma.transaction.findMany({
      orderBy: [{ createdAt: "desc" }],
    });

    return { transactions: data };
  } catch (error) {
    return { error: error };
  }
};

export default async function TransactionsPage() {
  const { transactions, error } = await getTransactions();

  if (!transactions) {
    throw new Error(JSON.parse(error));
  }

  return (
    <div className="container py-10 mx-auto space-y-4">
      <p className="text-4xl text-primary">Transactions</p>
      <div className="flex justify-between">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="Search products..."
            type="search"
          />
        </div>

        <Button asChild href="transaction/create" className="space-x-2">
          <Link href="transactions/create">
            <PlusCircle className="size-5" />
            <span>Add Transaction</span>
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
    </div>
  );
}
1;
