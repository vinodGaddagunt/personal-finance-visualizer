import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { BudgetForm } from "@/components/BudgetForm";
import { SpendingInsights } from "@/components/SpendingInsights";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Transactions Section */}
      <section className="space-y-6">
        <TransactionForm />
        <TransactionList />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MonthlyExpensesChart />
        <CategoryPieChart />
      </section>

      {/* Budget Section */}
      <section className="space-y-6">
        <BudgetForm />
        <SpendingInsights />
      </section>
    </main>
  );
}

