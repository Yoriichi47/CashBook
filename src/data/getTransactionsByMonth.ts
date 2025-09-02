import { db } from "@/db";
import { transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import "server-only";

export async function getTransaction({
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

  const earliestDate = new Date(year, month - 1, 1);
  const latestDate = new Date(year, month, 0);

  const transactions = await db
    .select()
    .from(transactionSchema)
    .where(
      and(
        eq(transactionSchema.userId, userId), // Checks and compares the userId in the table
        gte(  // Checks for the dates greater than the earliestDate
          transactionSchema.transactionDate,
          format(earliestDate, "yyyy-MM-dd")
        ), // The function won't work without formatting the date
        lte(transactionSchema.transactionDate, format(latestDate, "yyyy-MM-dd"))
      )
    )
    .orderBy(desc(transactionSchema.transactionDate));

    return transactions
}
