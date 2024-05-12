'use client'
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submit..." : "Submit"}
    </Button>
  );
}
