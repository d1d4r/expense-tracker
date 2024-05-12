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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { deleteCategory } from "../_action/action";
import CreateDialog from "./CreateDialog";
import CategoryForm from "./CategoryForm";
export default function ActionCategories({ id }) {
  const { toast } = useToast();

  const deleteHandler = async () => {
    toast({
      title: `deleteding... category ID ${id}`,
    });
    const result = await deleteCategory(id);

    if (result.success) {
      toast({
        variant: "success",
        title: "deleted",
      });
    } else {
      toast({
        variant: "destructive",
        title: "deleted",
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
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <CreateDialog title="Edit Category">
            <CategoryForm />
          </CreateDialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="goust"
            onClick={deleteHandler}
            className={cn(
              "flex py-4 justify-between w-full text-red-500 hover:text-red-500 hover:bg-red-400/10"
            )}
          >
            <span>Delete</span>
            <Trash className="size-4" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
