import { db } from "@/db";
import { categorySchema, transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { and, eq, sql, sum } from "drizzle-orm";
import "server-only";

export async function getAnnualCashflow(year: number) {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const month = sql`EXTRACT(MONTH FROM ${transactionSchema.transactionDate})`;

  const data = await db
    .select({
      month,
      totalIncome: sum(sql`CASE WHEN ${categorySchema.type} = 'income' THEN ${transactionSchema.amount} ELSE 0 END`),
      totalExpense: sum(sql`CASE WHEN ${categorySchema.type} = 'expense' THEN ${transactionSchema.amount} ELSE 0 END`),
    })
    .from(transactionSchema)
    .leftJoin(
      categorySchema,
      eq(transactionSchema.categoryId, categorySchema.id)
    )
    .where(
      and(
        eq(transactionSchema.userId, userId),
        sql`EXTRACT(YEAR FROM ${transactionSchema.transactionDate}) = ${year}`
      )
    )
    .groupBy(month);

    const totalCashflow: {month: string, income: number, expense: number}[] = []

    for (let i = 1; i <= 12; i++){
        const monthlyCashflow = data.find(d => Number(d.month) === i)
        totalCashflow.push({
            month: format( new Date(year, i - 1, 1), 'MMMM' ),
            income: Number(monthlyCashflow?.totalIncome ?? 0),
            expense: Number(monthlyCashflow?.totalExpense ?? 0)
        })
    }

  // console.log("Annual Cashflow Data: ", totalCashflow);
  return totalCashflow;
}
