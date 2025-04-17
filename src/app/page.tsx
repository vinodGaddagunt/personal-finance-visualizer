import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Personal Finance Visualizer</h1>
      <p className="text-lg mb-8">Track your income, expenses, budgets, and get insights!</p>
      <Link
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
