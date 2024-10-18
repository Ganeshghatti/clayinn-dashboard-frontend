"use client";

import React, { useEffect } from "react";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { LocationSchema } from "@/schema";

const CreateLocation = () => {
  const router = useRouter();

  const onSubmit = (values) => {
    console.log(values);
    router.push("/super-admin");
  };

  const form = useForm({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      name: "",
      address: "",
      location_admin_name: "",
      location_admin_email: "",
      location_admin_password: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="abc@example.com"
                    {...field}
                    className="border-2 border-clayInnPrimary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password please.."
                    {...field}
                    className="border-2 border-clayInnPrimary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_admin_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password please.."
                    {...field}
                    className="border-2 border-clayInnPrimary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_admin_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin&apos;s Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password please.."
                    {...field}
                    className="border-2 border-clayInnPrimary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_admin_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Admin&apos;s Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password please.."
                    {...field}
                    type="password"
                    className="border-2 border-clayInnPrimary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full py-5 " variant="clayInnPrimary">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLocation;
