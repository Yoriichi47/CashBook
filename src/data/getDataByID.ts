import { db } from "@/db";
import { categorySchema, transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import "server-only";

export async function getDataByID({ id }: { id: number }){
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .select({
      id: transactionSchema.id,
      description: transactionSchema.description,
      amount: transactionSchema.amount,
      transactionDate: transactionSchema.transactionDate,
      transactionType: categorySchema.type,
      categoryId: transactionSchema.categoryId,
      categoryName: categorySchema.name,
    })
    .from(transactionSchema)
    .where(
      and(eq(transactionSchema.userId, userId), eq(transactionSchema.id, id))
    )
    .leftJoin(
      categorySchema,
      eq(transactionSchema.categoryId, categorySchema.id)
    );

  return data.length > 0 ? data[0] : null;
};