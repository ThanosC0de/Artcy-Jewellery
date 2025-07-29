import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const auth = isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()

        const searchPrams = request.nextUrl.searchPrams;
        const page = parseInt(searchPrams.get('page'),10) || 0
        const limit = parseInt(searchPrams.get('limit'),10) || 0
        const deleteType = searchPrams.get('deleteType')

        let filter = {}
        if(deleteType === 'SD'){
            filter = { deleteAt: null}
        }
        else if (deleteType === 'PD'){
            filter = { deleteAt:{$ne: null}}
        }

        const mediaData = await MediaModel.find(filter).sort({ createdAt: -1 }).skip(page * limit).limit(limit).lean()
        const totalMedia = await MediaModel.countDocuments(filter)

        return NextResponse.json({
            mediaData: mediaData,
            hasMore: ((page +1) * limit) < totalMedia
        })
        

    } catch (error) {
        return catchError(error)
    }
}