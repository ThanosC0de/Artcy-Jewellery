import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    // validation schema
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json(
        false,
        401,
        "Invalid or missing input field.",
        validatedData.error
      );
    }
    const { name, email, password } = validatedData.data;

    // check if user already registered
    const checkUser = await UserModel.exists({ email });

    if (checkUser) {
      return response(
        true,
        409,
        "User already registered.",
        validatedData.error
      );
    }

    // new regitered user
    const NewRegisteration = new UserModel({
      name,
      email,
      password,
    });

    await NewRegisteration.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: NewRegisteration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

      await sendMail('Email verification request form Artcy Jewellery',
      email,emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

      return response(
        true,
        200,
        "Registeration Success, Plase verify your email address.",
        validatedData.error
      );

  } catch (error) {
    catchError(error);
  }
}
