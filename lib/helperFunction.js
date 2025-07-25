import { jwtVerify } from "jose";
import { cookies } from "next/headers";
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

/
