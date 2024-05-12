import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCategories } from "../../data/categoryData";

export default async function RecentCategoryTabel() {
  const { categories, error } = await getCategories();

  if (!categories) {
    return <div>{error}</div>;
  }
  return (
    <div className="p-5 border rounded-md">
      <div className="flex justify-between">
        <div>
          <p className="text-4xl">category</p>
          <p className="text-sm text-muted-foreground">Recent categories</p>
        </div>
        <Button asChild>
          <Link href="/categories" className="space-x-2">
            <span>View All</span>
            <ArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </div>
  );
}
