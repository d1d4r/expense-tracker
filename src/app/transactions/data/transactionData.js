import prisma from "@/lib/db/prisma";
import { jsonSerialize } from "@/utils/helper";
import { cache } from "react";

export const getTransactions = cache(async () => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
      skip: 0,
      take: 20,
    });

    return { transactions: jsonSerialize(data) };
  } catch (error) {
    return { error: error.message };
  }
});


