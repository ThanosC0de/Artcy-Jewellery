import cloudinary from "@/lib/cloudinary";
import { catchError } from "@/lib/helperFunction";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const { paramsToSign } = payload;

    const Signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_SECRET_KEY
    );

    return NextResponse.json({ Signature });
  } catch (error) {
    return catchError(error);
  }
}
