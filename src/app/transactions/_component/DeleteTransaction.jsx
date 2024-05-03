import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "../_action/transactionAction";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DeleteTransaction({ id }) {
  const { toast } = useToast();

  const deleteHandler = async () => {
    toast({
      title: ` deleteing... transaction ID ${id}`,
    });
    const result = await deleteTransaction(id);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: result.message,
      });
    } else {
      toast({
        variant: "success",
        title: result.message,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          asChild
          className={cn(
            "flex justify-between w-full text-blue-500 hover:blue-red-500 hover:bg-blue-400/10"
          )}
        >
          <Link href={`transactions/edit/${id}`}>
            <span>Edit</span>
            <Edit className="size-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={deleteHandler}
          className="flex justify-between text-red-500 hover:text-red-500 hover:bg-red-400/10 "
        >
          <span>Delete</span>
          <Trash className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
