import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    const validationScahema = zSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationScahema.safeParse(payload);
    if (!validatedData.success) {
      return response( false, 401, "Invalid or expired otp.",
        validatedData.error);
    }

    const { email, otp } = validatedData.data;

    const getOtpData = await OTPModel.findOne({ email, otp });
    if (!getOtpData) {
      return response(false, 400, "Invalid or expired otp.");
    }

    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return response(false, 400, "User not found.");
    }

    // remove otp After validation
    await getOtpData.deleteOne();

    return response(true, 200, "Otp verified.");
    
  } catch (error) {
    return catchError(error);
  }
}
