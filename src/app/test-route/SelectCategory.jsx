import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return { categories };
  } catch (error) {
    return { error: error };
  }
};

export default async function SelectCategory() {
  const { categories, error } = await getCategories();

  if (!categories) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="categoryId">Categories</Label>
      <Select id="categoryId" name="categoryId">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            return (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
