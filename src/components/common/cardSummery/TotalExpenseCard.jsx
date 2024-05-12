import React from "react";
import CardSummery from "./CardSummery";

const getTolatExpense = async () => {
  try {
    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "EXPENSE" },
    });
    return { totalExpense: result._sum.amount };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export default async function TotalExpenseCard() {

  const { totalExpense, error } = await getTolatExpense();

  if (!totalExpense) {
    return <p>{error}</p>;
  }
  return (
    <CardSummery
      title="Total Expense "
      content={totalExpense}
      className="border-none rounded-none "
    />
  );
}
