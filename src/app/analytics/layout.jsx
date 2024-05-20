import React from "react";

export default function LayoutAnalytics({
  children,
  Income,
  Average,
  Category,
  Expense,
}) {
  return (
    <div className="grid grid-cols-1 col-span-5 grid-rows-1 md:grid-cols-2">
      {Income}
      {Average}
      {Category}
      {Expense}
      {children}
    </div>
  );
}
