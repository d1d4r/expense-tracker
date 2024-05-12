import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import SelectCategory from "./SelectCategory";
import SubmitButton from "@/components/common/SubmitButton";
// import { useFormState } from "react-dom";
//import { createTran } from "./action";

export default function Form() {
    // const [state, formAction] = useFormState(createTran, null);

  return (
    <form>
      <div className="w-1/2 p-5 mx-auto my-5 border space-y-7">
        <div className="grid w-full max-w-sm items-center gap-1.5">
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
            {/* show state error here */}
          </RadioGroup>
        </div>
        <SelectCategory />{/*this is server componen, it fetch data from categories tabel */}
        {/* show state error here */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">amount</Label>
          <Input type="number" name="amount" id="amount" placeholder="amount" />
          {/* show state error here */}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Email" />
          {/* show state error here */}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
