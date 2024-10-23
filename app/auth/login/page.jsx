import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import LoginForm from "@/components/auth/login-form";
import Image from "next/image";

import logo from "@/public/logo.png";

const Page = () => {
  return (
    <Card className="w-full max-w-sm border border-slate-200 shadow-xl">
      <CardHeader className="space-y-6">
        <CardTitle className="flex items-center justify-center">
          <Image src="/logo.png" alt="Clay Inn Logo" width={100} height={100} priority quality={95} style={{ width: "auto", height: "auto" }} />
        </CardTitle>
        <CardDescription className="text-center text-clayInnPrimary text-base">
          Enter your email and password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default Page;
