"use client";

import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || "Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.error(error);
        setTransactions([]);
      });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td className="py-2 px-4 border-b">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{tx.description}</td>
                <td className="py-2 px-4 border-b">₹{tx.amount}</td>
                <td className="py-2 px-4 border-b">{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
