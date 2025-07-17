import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({ success, statusCode, message, data });
};

export const catchError = (error, customMessage) => {
  //hendling dublicate key error
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = ` Duplicate filed: ${keys}. These fields value must be unique.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal Server Error",
    };
  }

  return NextResponse.json({
    success: false,
    statusCode: error.code,
    ...errorObj,
  });
};

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

// export const isAuthenticated = async (role) => {
//   try {
//     const cookieStore = await cookies();
//     if (!cookieStore.has("accsess_token")) {
//       return {
//         isAuth: false,
//       };
//     }
//     const accsess_token = cookieStore.get("accsess_token");
//     const { payload } = await jwtVerify(
//       accsess_token.value,
//       new TextEncoder().encode(process.env.SECRET_KEY)
//     );
//     if (payload.role !== role) {
//       return {
//         isAuth: false,
//       };
//     }
//     return {
//       isAuth: true,
//       userId: payload._id,
//     };
//   } catch (error) {
//     return {
//       isAuth: false,
//       error,
//     };
//   }
// };
