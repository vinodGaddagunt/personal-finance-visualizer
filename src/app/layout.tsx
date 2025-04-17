import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white shadow-md p-4 flex gap-6">
          <Link href="/dashboard" className="font-semibold hover:underline">
            Dashboard
          </Link>
          <Link href="/transactions" className="font-semibold hover:underline">
            Transactions
          </Link>
          <Link href="/budgets" className="font-semibold hover:underline">
            Budgets
          </Link>
        </nav>
        <div className="max-w-6xl mx-auto py-10">{children}</div>
      </body>
    </html>
  );
}

