import { db } from "@/db";
import { transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import "server-only";

export async function getTransactionYearRange() {
  const { userId } = await auth();

  if (!userId) return [];

  const [earliestTransactionDate] = await db
    .select()
    .from(transactionSchema)
    .where(eq(transactionSchema.userId, userId))
    .orderBy(transactionSchema.transactionDate)
    .limit(1);

    const latestDate = new Date();
    const currentYear = latestDate.getFullYear();
    
    const earliestYear = earliestTransactionDate ? new Date(earliestTransactionDate.transactionDate).getFullYear() : currentYear;

    const yearRange = Array.from({length: currentYear - earliestYear + 1}).map((_, i) => currentYear - i);

    return yearRange;
}
