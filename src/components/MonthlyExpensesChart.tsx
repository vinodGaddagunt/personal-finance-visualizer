"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
}

export function MonthlyExpensesChart() {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

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
        const monthlyTotals: { [month: string]: number } = {};

        transactions.forEach((tx) => {
          const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
          monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
        });

        const chartData = Object.keys(monthlyTotals).map((month) => ({
          month,
          total: monthlyTotals[month],
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
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
