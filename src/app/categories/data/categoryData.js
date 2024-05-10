import { cache } from "react";

export const getCategories = cache(async () => {
  try {
    const data = await prisma.category.findMany({
      orderBy: [{ name: "desc" }],
    });

    return { categories: data };
  } catch (error) {
    return { error: error.message };
  }
});
