import React from "react";
import CardSummery from "./CardSummery";
import prisma from "@/lib/db/prisma";

const getNetIncome = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS net_income
        FROM transaction;`;
    return { netIncom: result[0].net_income };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export default async function NetIncomeCard() {
  const { netIncom, error } = await getNetIncome();

  if (!netIncom) {
    return <p>{error}</p>;
  }
  return (
    <CardSummery
      title="Net Incom"
      content={netIncom}
      className="border-none rounded-none "
    />
  );
}
