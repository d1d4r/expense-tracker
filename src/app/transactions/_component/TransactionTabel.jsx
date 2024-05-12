import { columns } from "@/app/transactions/_component/columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import React from "react";
import { getTransactions } from "../data/transactionData";

// const getTransactions = async () => {
//   try {
//     const data = await prisma.transaction.findMany({
//       orderBy: [{ createdAt: "desc" }],
//     });

//     return { transactions: data };
//   } catch (error) {
//     return { error: error.message };
//   }
// };
export default async function TransactionTabel() {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 3000);
  // });
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
