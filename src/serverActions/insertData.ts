"use server"

import { db } from "@/db"
import { transactionSchema } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"

const insertData = async (data: {
    categoryId: number;
    transactionDate: Date;
    amount: number;
    description: string;
}) => {
    const errors: any = {}

    const { userId } = await auth()

    if (!userId) {
        return {
            error: true,
            message: "User not authenticated"
        }
    }

    if (typeof data.categoryId !== "number") {
        errors.categoryId = {
            type: "required",
            message: "Category is not chosen"
        }
    }

    if (!data.transactionDate) {
        errors.transactionDate = {
            type: "required",
            message: "Transaction date is not provided"
        }
    }

    if (data.amount === undefined || data.amount === null || data.amount === 0) {
        errors.amount = {
            type: "required",
            message: "Amount is not provided"
        }
    }

    if (!data.description) {
        errors.description = {
            type: "required",
            message: "Description is not provided"
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            error: true,
            message: "There was an error while validating the data",
            details: errors
        }
    }

    await db.insert(transactionSchema).values({
        transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
        categoryId: data.categoryId,
        amount: data.amount,
        description: data.description,
        userId
    })

    return {
        error: false,
        message: "Transaction added successfully",
    }
}

export default insertData
