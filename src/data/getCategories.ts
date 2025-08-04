import { db } from "@/db"
import { categorySchema } from "@/db/schema"
import "server-only"

export async function getCategories(){
    const categories = await db.select().from(categorySchema)
    return categories
}