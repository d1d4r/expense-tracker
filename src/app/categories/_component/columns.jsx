"use client";

import { cn } from "@/lib/utils";
import ActionCategories from "./ActionCategories";

export const columns = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center ">Type</div>,
    cell: ({ row }) => {
      const type = row.getValue("type");

      return (
        <div
          className={cn(" p-2 font-medium text-center border rounded-md", {
            "bg-success/10 text-success-foreground border-emerald-500":
              type === "INCOME",
            "bg-red-400/10 text-red-500  border-red-500": type === "EXPENSE",
          })}
        >
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCategories id={row.original.id} />;
    },
  },
];
