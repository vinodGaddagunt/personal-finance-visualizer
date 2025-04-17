import { BudgetForm } from "@/components/BudgetForm";
import { SpendingInsights } from "@/components/SpendingInsights";

export default function BudgetsPage() {
  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Budgets</h1>

      <BudgetForm />
      <SpendingInsights />
    </main>
  );
}
