"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Month A", income: 4000, expense: 2400, amt: 2400 },
  { name: "Month B", income: 1500, expense: 3400, amt: 3400 },
  { name: "Month C", income: 700, expense: 4400, amt: 4400 },
  { name: "Month D", income: 5200, expense: 400, amt: 7400 },
];

export default function AverageTransactionAmountByCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" />
        <Bar dataKey="expense" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
