import { db } from "@/db";
import { categorySchema, transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import "server-only";

export async function getSortedTransaction({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  console.log("User: ", userId);

  const earliestDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0); // Last day of the month

  const transactions = await db
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
      and(
        eq(transactionSchema.userId, userId), // Checks and compares the userId in the table
        gte(
          // Checks for the dates greater than the earliestDate
          transactionSchema.transactionDate,
          format(earliestDate, "yyyy-MM-dd")
        ), // The function won't work without formatting the date
        lte(transactionSchema.transactionDate, format(lastDate, "yyyy-MM-dd"))
      )
    )
    .orderBy(desc(transactionSchema.transactionDate))
    .leftJoin(
      categorySchema,
      eq(transactionSchema.categoryId, categorySchema.id)
    );

  return transactions;
}

export async function getTransaction() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  console.log("User: ", userId);

  const transactions = await db
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
      eq(transactionSchema.userId, userId) // Checks and compares the userId in the table
    )
    .leftJoin(
      categorySchema,
      eq(transactionSchema.categoryId, categorySchema.id)
    ).limit(5).orderBy(desc(transactionSchema.transactionDate));

  return transactions;
}
