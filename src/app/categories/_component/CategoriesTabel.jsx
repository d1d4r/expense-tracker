import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import { getCategories } from "../data/categoryData";
// const getCategories = async () => {
//   try {
//     const data = await prisma.category.findMany({
//       orderBy: [{ name: "desc" }],
//     });

//     return { categories: data };
//   } catch (error) {
//     return { error: error.message };
//   }
// };
export default async function CategoriesTabel() {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 3000);
  // });
  const { categories, error } = await getCategories();

  if (!categories) {
    return <div>{error}</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={JSON.parse(JSON.stringify(categories))}
    />
  );
}
