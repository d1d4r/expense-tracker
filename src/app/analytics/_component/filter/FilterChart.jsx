"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterChart({ query }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onFilterHandler = (value) => {
    console.log("🚀 ~ FilterChart ~ value:", value);
    const params = new URLSearchParams(searchParams);
    params.set(query, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onFilterHandler} defaultValue="2024">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
