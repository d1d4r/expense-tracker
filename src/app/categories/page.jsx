import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoriesTabel from "./_component/CategoriesTabel";

import CreateDialog from "./_component/CreateDialog";
import CategoryForm from "./_component/CategoryForm";

export default function CategoriesPage() {
  return (
    <div className="container py-10 mx-auto space-y-4">
      <p className="text-4xl text-primary">Categories</p>
      <div className="flex justify-between">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="Search products..."
            type="search"
          />
        </div>

        <CreateDialog title="Create Category">
          <CategoryForm />
        </CreateDialog>
      </div>
      <CategoriesTabel />
    </div>
  );
}
