"use client";

import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
}

interface Budget {
  _id: string;
  category: string;
  amount: number;
}

export function SpendingInsights() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, budgetsRes] = await Promise.all([
          fetch("/api/transactions"),
          fetch("/api/budgets"),
        ]);

        if (!transactionsRes.ok || !budgetsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const transactionsData = await transactionsRes.json();
        const budgetsData = await budgetsRes.json();

        setTransactions(transactionsData);
        setBudgets(budgetsData);
      } catch (error) {
        console.error(error);
        setTransactions([]);
        setBudgets([]);
      }
    };

    fetchData();
  }, []);

  const insights = budgets.map((budget) => {
    const actualSpent = transactions
      .filter((tx) => tx.category === budget.category)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      category: budget.category,
      budgeted: budget.amount,
      spent: actualSpent,
      overBudget: actualSpent > budget.amount,
    };
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.category}
            className={`p-4 rounded-lg shadow ${
              insight.overBudget ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <h3 className="text-lg font-semibold">{insight.category}</h3>
            <p>Budgeted: ₹{insight.budgeted}</p>
            <p>Spent: ₹{insight.spent}</p>
            {insight.overBudget ? (
              <p className="text-red-600 font-semibold">Over Budget!</p>
            ) : (
              <p className="text-green-600 font-semibold">Within Budget</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
