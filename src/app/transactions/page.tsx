import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";

export default function TransactionsPage() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <TransactionForm />
      <TransactionList />
    </main>
  );
}
