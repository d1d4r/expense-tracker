import prisma from "@/lib/db/prisma";

export const GET = async (request) => {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ? url.searchParams.get("type") : 'INCOME'

 
  try {
    const categories = await prisma.category.findMany({
      where: {
        type,
      },
    });

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
