import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import CategoryForm from "./CategoryForm";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateDialog({ title, children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {title === "Create Category" ? (
          <Button className="space-x-2">
            <PlusCircle className="size-5" />
            <span>{title}</span>
          </Button>
        ) : (
          <Button
            variant="goust"
            className={cn(
              "flex py-4 justify-between w-full text-blue-500 hover:blue-red-500 hover:bg-blue-400/10"
            )}
          >
            <span>Edit</span>
            <Edit className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
