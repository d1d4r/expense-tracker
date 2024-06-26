"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/axios/categoriesApi";
import { useFormContext } from "react-hook-form";
import { useRadioContext } from "@/context/RadioProvider";

export function CategoryCombobox({ form }) {
  const [open, setOpen] = useState(false);
  const { radioValue } = useRadioContext();

  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categoryies", radioValue],
    queryFn: () => getCategories(radioValue),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>fail</p>;
  }
  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Category</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? categories?.find(
                        (category) => category.value === field.value
                      )?.label
                    : "Select category"}
                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories?.map((category) => (
                    <CommandItem
                      value={category.label}
                      key={category.value}
                      onSelect={() => {
                        form.setValue("categoryId", category.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {category.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>pick a Category</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
