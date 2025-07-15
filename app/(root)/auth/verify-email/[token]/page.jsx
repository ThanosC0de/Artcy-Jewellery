"use client";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import verifiedImg from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Image from "next/image";

const Emailverification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };
    verify();
  }, [token]);
  return (
    <Card>
      <CardContent className="w-[400px]">
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verifiedImg.src}
                height={verifiedImg.height}
                width={verifiedImg.width}
                className="h-[100px] w-auto" alt="Verification Success"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-500 my-5 ">
                Email Verification Success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verificationFailedImg.src}
                height={verificationFailedImg.height}
                width={verificationFailedImg.width}
                className="h-[100px] w-auto"  alt="Verification Failed"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500 my-5 ">
                Email Verification Failed!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Emailverification;
