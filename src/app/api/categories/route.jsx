import prisma from "@/lib/db/prisma";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    const formatCategories = categories.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });
    return Response.json(formatCategories, { status: 200 });
  } catch (error) {
    Response.json({ status: 500 });
  }
};
