import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import { useRadioContext } from "@/context/RadioProvider";
export default function TransactionTypeRadio({ form }) {
  const { setRadioValue } = useRadioContext();
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Transaction Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange;
                setRadioValue(value);
                form.setValue("categoryId", null);
              }}
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
