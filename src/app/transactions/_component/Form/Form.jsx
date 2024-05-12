import TransactionForm from "@/app/transactions/_component/Form/TransactionForm";
import React from "react";

export default async function Form({ transaction, transactionId }) {
  return (
    <TransactionForm transaction={transaction} transactionId={transactionId} />
  );
}
