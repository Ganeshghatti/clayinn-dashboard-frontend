import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import LoginForm from "@/components/auth/login-form";

const Page = () => {
  return (
    <Card className="w-full max-w-sm text-clayInnPrimary border-2 border-clayInnPrimary">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome Back !!</CardTitle>
        <CardDescription className="text-center">
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
