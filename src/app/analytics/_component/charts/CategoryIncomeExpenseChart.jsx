"use client";
import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function CategoryIncomeExpenseChart({data}) {

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={data.incomeData}
          cx="50%"
          cy="50%"
          outerRadius={50}
          dataKey="total_amount"
          nameKey="category"
          fill="#82ca9d"
        />
        <Pie
          data={data.expenseData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="total_amount"
          nameKey="category"
          fill="#EF4444"
        />

        {/* <Pie data={data2} dataKey="expense" nameKey="name" fill="#82ca9d" />
        <Pie data={data3} dataKey="expense" nameKey="name" fill="#10B980" />
        <Pie data={data4} dataKey="expense" nameKey="name" fill="#EF4444" /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}
