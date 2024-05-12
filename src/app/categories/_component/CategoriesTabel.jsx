import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/Tabel/dataTabel";
import { getCategories } from "../data/categoryData";

export default async function CategoriesTabel() {

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
