"use client";
import { transactionSchema } from "@/schema/TransactionSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import TransactionTypeRadio from "@/app/transactions/_component/Form/TransactionTypeRadio";
import TransactionDescription from "@/app/transactions/_component/Form/TransactionDescription";
import TransactionAmount from "./TransactionAmount";
import {
  createTransaction,
  editTransaction,
} from "@/app/transactions/_action/transactionAction";
import { useToast } from "../../../../components/ui/use-toast";

import { CategoryCombobox } from "@/app/transactions/_component/Form/CategoryCombobox";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/common/SubmitButton";
import RadioProvider from "@/context/RadioProvider";

export default function TransactionForm({ transaction, transactionId }) {
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

  const [message, formAction] = useFormState(
    form.handleSubmit(processForm),
    null
  );

  async function processForm(data) {
    console.log("🚀 ~ processForm ~ data:", data);
    try {
      const result = transaction
        ? await editTransaction(transactionId, data)
        : await createTransaction(data);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try again later.",
        });
        //throw new Error(result.error); // Throw a more descriptive error
      }

      const action = transaction ? "updated" : "added";
      toast({
        variant: result.success ? "success" : "destructive",
        title: `${action} transaction`,
        description: result.data,
      });
    } catch (error) {
      console.error("Error processing form:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again later.",
      });
    }
  }

  return (
    <RadioProvider>
      <Form {...form}>
        <div className="flex items-center justify-center min-h-screen">
          <form
            action={formAction}
            // onSubmit={form.handleSubmit(processForm)}
            className="w-1/2 p-3 m-auto space-y-8 border"
          >
            <TransactionTypeRadio form={form} />
            <CategoryCombobox form={form} />
            <TransactionAmount form={form} />
            <TransactionDescription form={form} />
            <SubmitButton />
          </form>
        </div>
      </Form>
    </RadioProvider>
  );
}

// async function processForm(data) {
//   if (transaction) {
//     const result = await editTransaction(transactionId, data);

//     if (!result.success) {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: `${JSON.stringify(result.error)}`,
//       });
//     } else {
//       toast({
//         title: "updated ",
//         description: `${result.data}`,
//       });
//     }
//   } else {
//     const result = await createTransaction(data);

//     if (!result.success) {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description: `${JSON.stringify(result.error)}`,
//       });
//     } else {
//       toast({
//         variant: "success",
//         title: "added ",
//         description: `${result.data}`,
//       });
//     }
//   }
// }
