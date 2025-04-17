import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const data = await req.json();
  const updatedTransaction = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedTransaction);
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Transaction deleted" });
}
