"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Logo from "@/public/assets/images/ARTCY.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OtpVerification from "@/components/Application/OtpVerification";
import React from "react";
import UpdatePassword from "@/components/Application/UpdatePassword";

const ResetPassword = () => {
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [otpVerificationLoading, setotpVerificationLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // email verification
  const handleEmailVerification = async (values) => {
    try {
      setEmailVerificationLoading(true);
      const { data: sendOtpResponse } = await axios.post("/api/auth/reset-password/send-otp",values);
      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }
      setOtpEmail(values.email);
      showToast("success", sendOtpResponse.message);

    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  // otp verification
  const handleOtpVerification = async (values) => {
    try {
      setEmailVerificationLoading(true);
      const { data: otpResponse } = await axios.post("/api/auth/reset-password/send-otp",values);
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      showToast("success", otpResponse.message);
      setIsOtpVerified(true);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setotpVerificationLoading(false);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent>
        <div className="flex justify-center ">
          <Image src={Logo.src}  width={Logo.width}  height={Logo.height} alt="logo" className="max-w-[80px]"/>
        </div>
        {!otpEmail ? 
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold ">
                Reset Password
              </h1>
              <p>Enter your email to reset your password.</p>
            </div>
            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailVerification)}>
                  <div className="mb-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <ButtonLoading loading={emailVerificationLoading}
                      type="submit" text="Send OTP" className="w-full cursor-pointer"/>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center items-center gap-3">
                      <Link  href={WEBSITE_LOGIN} className="text-primary underline">
                        Back to Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
         : 
          <>
            {!isOtpVerified ? 
              <OtpVerification  email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading}  />
             : 
              <UpdatePassword email={otpEmail} />
            }
          </>
        }
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
