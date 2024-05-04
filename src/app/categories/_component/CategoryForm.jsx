"use client";
import TransactionTypeRadio from "@/app/transactions/_component/TransactionTypeRadio";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/schema/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useFormStatus, useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { createCategory } from "../_action/action";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      type: "INCOME",
      name: null,
    },
  });

  const [message, formAction] = useFormState(
    form.handleSubmit(processForm),
    null
  );

  const { toast } = useToast();
  const router = useRouter();

  async function processForm(data) {
    const result = await createCategory(data);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: result.message,
      });
    }

    toast({
      variant: "success",
      title: result.message,
    });
    router.push("/categories");
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen">
        <form
          action={formAction}
          className="w-fit p-5 rounded-md m-auto space-y-8 border"
        >
          <TransactionTypeRadio form={form} />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="w-[200px]" {...field} />
                </FormControl>
                <FormDescription>Category Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </div>
    </Form>
  );
}

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submit..." : "Submit"}
    </Button>
  );
};
