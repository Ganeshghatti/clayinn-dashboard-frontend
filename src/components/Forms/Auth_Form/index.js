"use client";

import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// IMPORT CONSTANTS
import { loginForm_Inputs } from "@/constants";

// REACT ICONS
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";

import logo_Black from "/public/logo_black.png";

import { useToast } from "@/hooks/use-toast";
import { setTokens } from '@/utils/auth';
import axiosInstance from '@/utils/axiosInstance';

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email must be in the format: user@domain.com",
    }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
  // .max(100, { message: "Password cannot exceed 100 characters" })
  // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" })
  // .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
});

const URL = process.env.NEXT_PUBLIC_URL;

export default function Login_Form() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await axiosInstance.post('/user-management/login/', values);
      setTokens(response.data.access, response.data.refresh);
      router.push('/super_admin');
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Please check your email and password and try again.";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    }
  }

  return (
    <div className="border border-slate-200 rounded-3xl px-5 py-7 shadow-2xl">
      <div className="flex justify-center mb-6">
        <Image
          src={logo_Black}
          alt="logo"
          width={120}
          height={120}
          quality={100}
          className="w-auto h-auto"
          priority={true}
        />
      </div>
      <div className="flex justify-center my-6">
        <h1 className="text-base text-center text-clayInnPrimary">
          Enter your email and password to continue.
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {loginForm_Inputs.map((each_Input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={each_Input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{each_Input.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={each_Input.type}
                      placeholder={each_Input.placeholder}
                      {...field}
                      className="max-md:w-[85vw] md:w-[40vw] xl:w-[30vw] w-[40vw] h-10 placeholder:text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-center">
            <Button type="submit" className="w-1/2 rounded-full py-6 group">
              <span>Login</span>
              <span>
                <FaArrowRightLong
                  size={20}
                  className="group-hover:translate-x-4 transition-all duration-300"
                />
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
