import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Textarea } from "../../../../components/ui/textarea";

export default function TransactionDescription({ form }) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="write a decription about transaction"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>description is (optional)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
