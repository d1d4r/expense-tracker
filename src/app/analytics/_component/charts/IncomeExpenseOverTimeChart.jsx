"use client";

import React from "react";
import {
  CartesianGrid,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function IncomeExpenseOverTimeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_expense" stroke="#EF4444" />
        <Line type="monotone" dataKey="total_income" stroke="#10B980" />
      </LineChart>
    </ResponsiveContainer>
  );
}
