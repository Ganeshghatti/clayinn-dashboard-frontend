"use client";

import React, { useState } from "react";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { FaAngleRight } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [type, setType] = useState("password"); // Removed unnecessary parentheses
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      // Sending login request
      const response = await axios.post(
        "https://clayinn-dashboard-backend.onrender.com/user-management/login/",
        values
      );

      // Storing tokens in local storage
      localStorage.setItem("access-token", response.data.access);
      localStorage.setItem("refresh-token", response.data.refresh);

      // Redirecting the user to admin route
      router.push("/super-admin");
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email" // No issue here
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="abc@example.com"
                  {...field}
                  className="h-10 border border-slate-200 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type={type} // Correctly setting the type
                    className="h-10 border border-slate-200 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="absolute right-[5%] top-[58%] cursor-pointer">
            {type === "password" ? (
              <FaEyeSlash size={22} onClick={onHandleType} />
            ) : (
              <FaEye size={22} onClick={onHandleType} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button className="py-5 px-8 group rounded-full" type="submit">
            <span className="group-hover:ml-2 transition-all duration-300">
              Login
            </span>
            <span className="group-hover:ml-2 transition-all duration-300 group-hover:translate-x-2">
              <FaAngleRight size={20} />
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
