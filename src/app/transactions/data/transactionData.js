import prisma from "@/lib/db/prisma";
import { jsonSerialize } from "@/utils/helper";
import { cache } from "react";

export const getTransactions = cache(async (page = 1, query = "") => {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        description: {
          contains: query,
        },
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
      skip: (page - 1) * 10,
      take: 10,
    });

    return { transactions: jsonSerialize(data) };
  } catch (error) {
    return { error: error.message };
  }
});
