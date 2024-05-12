import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React from "react";
import Form from "@/app/transactions/_component/Form/Form";

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
    <Form
      transaction={JSON.parse(JSON.stringify(transaction))}
      transactionId={transactionId}
    />
  );
}
