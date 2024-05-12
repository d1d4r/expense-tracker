import { columns } from "@/app/transactions/_component/columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import React from "react";
import { getTransactions } from "../data/transactionData";


export default async function TransactionTabel() {

  const { transactions, error } = await getTransactions();

  if (!transactions) {
    return <p>{error}</p>;
  }

  return (
    <DataTable
      columns={columns}
      data={transactions}
    />
  );
}
