"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { predefinedCategories } from "@/constants/categories";

const formSchema = z.object({
  amount: z.number().positive(),
  date: z.string(),
  description: z.string().min(1),
  category: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function TransactionForm() {
  const { register, handleSubmit} = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("amount", { valueAsNumber: true })} type="number" placeholder="Amount" />
      <input {...register("date")} type="date" />
      <input {...register("description")} type="text" placeholder="Description" />
      <select {...register("category")}>
        {predefinedCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
