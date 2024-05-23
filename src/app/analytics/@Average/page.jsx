import React, { Suspense } from "react";
import { SekeletonChart } from "../_component/charts/SekeletonChart";
import AverageTransactionAmountByCategory from "../_component/charts/AverageTransactionAmountByCategory";

export default function AverageTransactionAmountpage() {
  return (
    <Suspense fallback={<SekeletonChart />}>
      <AverageTransactionAmountByCategory />
    </Suspense>
  );
}
