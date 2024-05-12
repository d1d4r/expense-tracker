import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import SelectCategory from "./SelectCategory";
import SubmitButton from "@/components/common/SubmitButton";
import { createTransaction } from "../transactions/_action/transactionAction";
import Form from "./Form";

export default function AnalyticsPage() {
  //   const [message, formAction] = useFormState(
  //     createTransaction,
  //     null
  //     );

  //   const action = async (FormData) => {
  //     "use server";
  //     console.log("🚀 ~ action ~ FormData:", FormData);
  //     };

  return (
    <Form>
      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="type">Transaction Type</Label>
        <RadioGroup
          defaultValue="INCOME"
          id="type"
          name="type"
          className="flex gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="INCOME" id="INCOME" />
            <Label
              htmlFor="INCOME"
              className="p-2 font-normal rounded-full cursor-pointer text-emerald-500 bg-emerald-500/10"
            >
              INCOME
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="EXPENSE" id="EXPENSE" />
            <Label
              htmlFor="EXPENSE"
              className="p-2 font-normal text-red-500 rounded-full cursor-pointer bg-red-500/10"
            >
              EXPENSE
            </Label>
          </div>
        </RadioGroup>
      </div> */}

      {/* <SelectCategory /> */}

      {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="amount">amount</Label>
        <Input type="number" name="amount" id="amount" placeholder="amount" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Email" />
      </div>
      <SubmitButton /> */}
    </Form>
  );
}
