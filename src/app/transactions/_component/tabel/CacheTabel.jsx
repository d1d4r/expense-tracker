import React from "react";
import { getTransactions } from "../../data/transactionData";

export default async function CacheTabel() {
  const { transactions, error } = await getTransactions();

  if (!transactions) {
    return <p>{error}</p>;
  }
  return <div>CacheTabel</div>;
}
