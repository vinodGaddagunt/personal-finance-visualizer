"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57", "#a4de6c"];

export function CategoryPieChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || "Failed to fetch transactions");
        }
        return res.json();
      })
      .then((transactions: Transaction[]) => {
        const categoryTotals: { [category: string]: number } = {};

        transactions.forEach((tx) => {
          categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
        });

        const chartData = Object.keys(categoryTotals).map((category) => ({
          name: category,
          value: categoryTotals[category],
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  return (
    <div className="h-72">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
