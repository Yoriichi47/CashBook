"use server";

import { db } from "@/db";
import { transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, eq } from "drizzle-orm";

const updateData = async (data: {
  id: number;
  categoryId: number;
  transactionDate: Date;
  amount: number;
  description: string;
}) => {
  const { userId } = await auth();

  const errors: any = {};

  if (!userId) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  if (data.id == null || typeof data.id !== "number")
{
    errors.id = {
      type: "required",
      message: "ID is not provided",
    };
  }

  if (typeof data.categoryId !== "number") {
    errors.categoryId = {
      type: "required",
      message: "Category is not chosen",
    };
  }

  if (!data.transactionDate) {
    errors.transactionDate = {
      type: "required",
      message: "Transaction date is not provided",
    };
  }

  if (data.amount === undefined || data.amount === null || data.amount === 0) {
    errors.amount = {
      type: "required",
      message: "Amount is not provided",
    };
  }

  if (!data.description) {
    errors.description = {
      type: "required",
      message: "Description is not provided",
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      error: true,
      message: errors[Object.keys(errors)[0]].message,
      details: errors,
    };
  }

  await db
    .update(transactionSchema)
    .set({
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      amount: data.amount.toString(),
      description: data.description,
    })
    .where(
      and(
        eq(transactionSchema.id, data.id),
        eq(transactionSchema.userId, userId!)
      )
    );

  return { error: false, message: "Transaction updated successfully" };
};

export default updateData;
