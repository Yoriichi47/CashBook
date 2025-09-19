"use server"

import { db } from "@/db";
import { transactionSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

type DeleteDataErrors = Record<
  string,
  { type: string; message: string }
>;

const deleteData = async (id: number) => {
    const {userId} = await auth()

    const errors: DeleteDataErrors = {}

    if (!userId) {
        errors.user = {
            type: "required",
            message: "User not authenticated"
        }
    }

   if (id == null || typeof id !== "number") {
    errors.id = {
      type: "required",
      message: "ID is not provided",
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      error: true,
      message: errors[Object.keys(errors)[0]].message,
      details: errors,
    };
  }

    await db.delete(transactionSchema).where(
        and(
            eq(transactionSchema.id, id),
            eq(transactionSchema.userId, userId!)
        )
    )

    return {
        error: false,
        message: "Transaction deleted successfully."
    }


}

export default deleteData;