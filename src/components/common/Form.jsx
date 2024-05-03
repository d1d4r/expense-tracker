import TransactionForm from "@/app/transactions/_component/TransactionForm";
import React from "react";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    const formatCategories = categories.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });
    return { categories: formatCategories };
  } catch (error) {
    return { error: error };
  }
};

export default async function Form({ transaction,transactionId }) {
  const { categories, error } = await getCategories();

  if (!categories) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <TransactionForm
      categories={JSON.parse(JSON.stringify(categories))}
      transaction={transaction}
      transactionId={transactionId}
    />
  );
}
