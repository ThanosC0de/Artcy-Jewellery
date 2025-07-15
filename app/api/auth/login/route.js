import { emailVerificationLink } from "@/email/emailVerificationLink";
import { zSchema } from "@/lib/zodSchema";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import z from "zod";
import { otpEmail } from "@/email/otpEmail";

export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        
        const validationScahema = zSchema.pick({
            email: true,
        }).extend({
            password: z.string()
        })

        const validatedData = validationScahema.safeParse(payload)
        if(!validatedData.success){
            return response(false, 401, "Invalid or missing input field.", validatedData.error)
        }

        const {email, password} = validatedData.data

        //get user data

        const getUser = await UserModel.findOne({deletedAt: null, email}).select('+password')
        if(!getUser){
            return response(false, 400, "Invalide login creadentials.")
        }

        // resend email varification link 

        if(!getUser.isEmailVerified){
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
                const token = await new SignJWT({ userId: getUser._id.toString() })
                  .setIssuedAt()
                  .setExpirationTime("1h")
                  .setProtectedHeader({ alg: "HS256" })
                  .sign(secret);
            
                  await sendMail('Email verification request form Artcy Jewellery',
                  email,emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

                  return response(false, 401, "Please verify your email.")
                }

        // password verification
            
        const isPasswordVerified = await getUser.comparePassword(password)

        if(!isPasswordVerified){
            return response(false, 400, "Invalide login creadentials.")
        }
        
        
        //otp generation

        await OTPModel.deleteMany({email})//delete previous otps

        const otp = generateOTP()

        // storing otp into db

        const newOtpData = new OTPModel({
            email,
            otp
        })
        
        await newOtpData.save()

        // sending otp to email

        const otpEmailStatus = await sendMail('OTP form Artcy Jewellery', email, otpEmail(otp))
        if(!otpEmailStatus.success){
            return response(false, 400, "Failed to send otp.")
        }

        return response(true, 200, "Please Verify your device.")

    } catch (error) {
        return catchError(error);
    }
}