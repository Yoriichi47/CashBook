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

    const {userId} = await auth()

    if(!userId){
        return {
            error: true,
            message: "User not authenticated"
        }
    }

    const result = await db.insert(transactionSchema).values({
        transactionDate: format(data.transactionDate, "dd-MM-yyyy"),
        categoryId: data.categoryId,
        amount: data.amount,
        description: data.description,
        userId
    })
}

export default insertData