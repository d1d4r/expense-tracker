import React from "react";
import { CategoryCombobox } from "./CategoryCombobox";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    const formatCategories = categories.map((category) => {
      return { 
        label: category.name, 
        value: category.id, 
      }; 
    }); 
    return { categories: formatCategories }; 
  } catch (error) { 
    return { error: error }; 
  } 
}; 
export default async function Categories() { 
  const { categories, error } = await getCategories(); 
 
  if (!categories) { 
    return <div>{JSON.stringify(error)}</div>; 
  } 
  return <CategoryCombobox categories={categories} />; 
}
