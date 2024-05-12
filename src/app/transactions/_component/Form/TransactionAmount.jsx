import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

export default function TransactionAmount({ form }) {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input
              placeholder="shadcn"
              type="number"
              className="w-[200px]"
              {...field}
            />
          </FormControl>
          <FormDescription>amount is $</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
