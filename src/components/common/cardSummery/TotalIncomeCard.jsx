import React from "react";
import CardSummery from "./CardSummery";
import prisma from "@/lib/db/prisma";


const getTolatIncome = async () => {
  try {
    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME" },
    });
    return { totalIncome: result._sum.amount };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export default async function TotalIncomeCard() {

  const { totalIncome, error } = await getTolatIncome();

  if (!totalIncome) {
    return <p>{error}</p>;
  }
  return (
    <CardSummery
      title="Total Income"
      content={totalIncome}
      className="border-none rounded-none "
    />
  );
}
