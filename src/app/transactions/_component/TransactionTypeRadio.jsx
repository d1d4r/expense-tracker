import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
export default function TransactionTypeRadio({ form }) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Transaction Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="INCOME" />
                </FormControl>
                <FormLabel className="p-2 font-normal rounded-full bg-emerald-500/10 text-emerald-500">
                  INCOME
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="EXPENSE" />
                </FormControl>
                <FormLabel className="p-2 font-normal text-red-500 rounded-full bg-red-500/10">
                  EXPENSE
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
//rgb(16 185 129 / 0.1)