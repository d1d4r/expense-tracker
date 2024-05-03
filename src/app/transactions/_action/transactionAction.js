"use server";

import prisma from "@/lib/db/prisma";
import { transactionSchema } from "@/schema/TransactionSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTransaction = async (data) => {
  const result = transactionSchema.safeParse({ ...data, userId: 2 });

  if (!result.success) {
    return { success: false, error: result.error.format() };
  } else {
    const transaction = await prisma.transaction.create({
      data: { ...data, userId: 2 },
    });
    revalidatePath("/transactions");
    return { success: true, data: JSON.stringify(transaction, null, 2) };
  }
};

export const deleteTransaction = async (id) => {
  //const id = 200;
  const transaction = await prisma.transaction.findFirst({
    where: { id },
  });

  if (!transaction) {
    return { success: false, message: "id not found" };
  } else {
    await prisma.transaction.delete({
      where: { id },
    });
    revalidatePath("/transactions");
    return { success: true, message: "transaction deleted successfuly" };
  }
};

export const editTransaction = async (id, data) => {
  const result = transactionSchema.safeParse({ ...data, userId: 2 });
  const transaction = await prisma.transaction.findFirst({
    where: { id: +id },
  });

  if (!transaction) {
    return { success: false, message: "id not found" };
  } else {
    if (!result.success) {
      return { success: false, error: result.error.format() };
    } else {
      await prisma.transaction.update({
        where: { id: +id },
        data: { ...data, userId: 2 },
      });
      revalidatePath("/transactions");
      return { success: true, data: JSON.stringify(transaction, null, 2) };
    }
  }
};
