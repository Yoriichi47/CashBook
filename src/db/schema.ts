import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

export const categorySchema = pgTable("Categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    type: text({
        enum: ["income", "expense"],
    }).notNull(),
})

export const transactionSchema = pgTable("Transactions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("User_Id").notNull(),
    amount: integer().notNull(),
    description: text().notNull(),
    transactionDate: date("Transaction_Date").notNull(),
    categoryId: integer("Category_Id").references(() => categorySchema.id).notNull()
})