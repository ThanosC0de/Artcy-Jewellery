import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB()
        const cookieStore = await cookies()
        cookieStore.delete('accsess_token')
        return response(true, 200, "Logout successfully.")
    } catch (error) {
        catchError(error)
    }
}