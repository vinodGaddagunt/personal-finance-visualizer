"use client";

import { useEffect, useState } from "react";
import { Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, ComposedChart } from "recharts";

type Transaction = {
  amount: number;
  category: string;
  date: string;
};

type Budget = {
  category: string;
  amount: number;
  month: string;
};

export function BudgetComparisonChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [transactionsRes, budgetsRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budgets"),
      ]);
      const transactionsData = await transactionsRes.json();
      const budgetsData = await budgetsRes.json();
      setTransactions(transactionsData);
      setBudgets(budgetsData);
    }

    fetchData();
  }, []);

  const data = budgets.map((budget) => {
    const totalSpent = transactions
      .filter(
        (t) =>
          t.category === budget.category &&
          t.date.startsWith(budget.month)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category,
      Budget: budget.amount,
      Actual: totalSpent,
    };
  });

  return (
    <div className="h-80">
      <h2 className="text-xl font-bold mb-4">Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Actual" barSize={30} fill="#8884d8" />
          <Line type="monotone" dataKey="Budget" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
