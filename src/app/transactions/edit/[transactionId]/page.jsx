import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React from "react";
import TransactionForm from "../../_component/TransactionForm";
import Form from "@/components/common/Form";

const getTransaction = async (id) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id: +id },
    });

    return { transaction };
  } catch (error) {
    return { error: error };
  }
};

export default async function EditTransactionPage({ params }) {
  const { transactionId } = params;
  const { transaction } = await getTransaction(transactionId);

  if (!transaction) {
    return notFound();
  }

  return (
    <div>
      <Form
        transaction={JSON.parse(JSON.stringify(transaction))}
        transactionId={transactionId}
      />
      {/* <TransactionForm transaction={transaction} /> */}
    </div>
  );
}
