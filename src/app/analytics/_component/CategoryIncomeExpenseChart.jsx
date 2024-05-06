"use client";
import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const data1 = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
const data2 = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

export default function CategoryIncomeExpenseChart() {
  return (
    <ResponsiveContainer width='100%' height={350}>
        <PieChart >
        <Tooltip />
        <Legend />
          <Pie
            data={data1}
            dataKey="uv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={data2}
            dataKey="pv"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
    </ResponsiveContainer>
  );
}
