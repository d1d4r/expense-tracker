"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/helper";
import DeleteTransaction from "@/app/transactions/_component/DeleteTransaction";

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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "Category.name",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      const formatted = formatDate(date);
      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DeleteTransaction id={row.original.id} />;
    },
  },
];
