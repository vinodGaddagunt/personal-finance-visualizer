"use client";

import { useEffect, useState } from "react";

type Transaction = {
  amount: number;
  category: string;
  date: string;
};

export function SummaryCards() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    }

    fetchTransactions();
  }, []);

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recentTransactions = transactions.slice(-5);
  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-gray-500 text-sm">Total Expenses</div>
        <div className="text-2xl font-bold mt-2">₹{totalExpenses}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-gray-500 text-sm">Recent Transactions</div>
        <div className="text-2xl font-bold mt-2">{recentTransactions.length}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="text-gray-500 text-sm">Categories Used</div>
        <div className="text-2xl font-bold mt-2">{categories.length}</div>
      </div>
    </div>
  );
}
