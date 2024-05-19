import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import TransactionTabel from "./_component/TransactionTabel";

export default function TransactionsPage({ searchParams }) {
  let { page } = searchParams;

  if (!page) {
    page = 1;
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
      <Suspense fallback={<p>Loading feed...</p>}>
        <TransactionTabel page={page} />
      </Suspense>
    </div>
  );
}
1;
