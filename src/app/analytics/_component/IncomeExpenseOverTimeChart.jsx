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

const data = [
  { name: "Month A", income: 4000, expense: 2400, amt: 2400 },
  { name: "Month B", income: 1500, expense: 3400, amt: 3400 },
  { name: "Month C", income: 700, expense: 4400, amt: 4400 },
  { name: "Month D", income: 5200, expense: 400, amt: 7400 },
];
export default function IncomeExpenseOverTimeChart() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart
        // width={730}
        // height={250}
        // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
