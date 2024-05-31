import React from "react";
import FilterChart from "./_component/filter/FilterChart";

export default function LayoutAnalytics({
  children,
  Income,
  Average,
  Category,
  Expense,
}) {
  return (
    <div >
     {/*  {Income}
      {Average}
      {Category}
      {Expense} */}
      {children}
    </div>
  );
}
