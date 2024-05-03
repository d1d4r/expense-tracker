"use client";
import { transactionSchema } from "@/schema/TransactionSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TransactionTypeRadio from "@/app/transactions/_component/TransactionTypeRadio";
import TransactionDescription from "@/app/transactions/_component/TransactionDescription";
import TransactionAmount from "./TransactionAmount";
import {
  createTransaction,
  editTransaction,
} from "@/app/transactions/_action/transactionAction";
import { useToast } from "../../../components/ui/use-toast";

import { CategoryCombobox } from "@/app/transactions/_component/CategoryCombobox";
import { useFormStatus } from "react-dom";
import Categories from "./Categories";
import { useRouter } from "next/router";

export default function TransactionForm({
  transaction,
  categories,
  transactionId,
}) {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: transaction?.amount ? transaction.amount : 0,
      type: transaction?.type ? transaction.type : "INCOME",
      description: transaction?.description ? transaction.description : "",
      categoryId: transaction?.categoryId ? transaction.categoryId : null,
    },
  });

  const { toast } = useToast();

  async function processForm(data) {
    if (transaction) {
      const result = await editTransaction(transactionId, data);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${JSON.stringify(result.error)}`,
        });
      } else {
        toast({
          title: "updated ",
          description: `${result.data}`,
        });
      }
    } else {
      const result = await createTransaction(data);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${JSON.stringify(result.error)}`,
        });
      } else {
        toast({
          title: "added ",
          description: `${result.data}`,
        });
      }
    }
  }
  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-1/2 p-3 m-auto space-y-8 border"
        >
          <TransactionTypeRadio form={form} />
          <CategoryCombobox form={form} categories={categories} />
          <TransactionAmount form={form} />
          <TransactionDescription form={form} />
          <Button type="submit">{transaction ? "Save" : "Submit"}</Button>
        </form>
      </div>
    </Form>
  );
}
