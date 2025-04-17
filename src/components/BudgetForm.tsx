"use client";

import { useForm } from "react-hook-form";
import { predefinedCategories } from "@/constants/categories";

type BudgetFormData = {
  category: string;
  amount: number;
  month: string;
};

export function BudgetForm() {
  const { register, handleSubmit } = useForm<BudgetFormData>();

  async function onSubmit(data: BudgetFormData) {
    await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <select {...register("category")}>
        {predefinedCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input {...register("amount", { valueAsNumber: true })} type="number" placeholder="Budget Amount" />
      <input {...register("month")} type="month" />
      <button type="submit">Set Budget</button>
    </form>
  );
}
