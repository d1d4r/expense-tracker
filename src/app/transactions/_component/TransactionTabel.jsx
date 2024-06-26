import { columns } from "@/app/transactions/_component/columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import React from "react";
import { getTransactions } from "../data/transactionData";
import { RootTabel } from "./tabel/RootTabel";


export default async function TransactionTabel({page,query}) {

  const { transactions, error } = await getTransactions(page,query);

  if (!transactions) {
    return <p>{error}</p>;
  }


  return (
    <RootTabel
      columns={columns}
      data={transactions}
      page={page}
    />
  );
}
