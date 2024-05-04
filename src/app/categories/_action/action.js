"use server";

import prisma from "@/lib/db/prisma";
import { categorySchema } from "@/schema/categorySchema";
import { revalidatePath } from "next/cache";

export const createCategory = async (data) => {
  const parse = categorySchema.safeParse(data);

  if (!parse.success) {
    return { success: false, message: "fail adding" };
  }

  await prisma.category.create({
    data,
  });

  revalidatePath("/categories");

  return { success: true, message: "category added" };

};

export const deleteCategory = async (id) => {
  const category = await prisma.category.findFirst({
    where: { id },
  });
  if (!category) {
    return { success: false, message: "not found" };
  } else {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/categories");
    return { success: true, message: "category deleted" };
  }
};
