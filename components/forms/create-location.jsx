"use client";

import React from "react";
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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

import { IoCreate } from "react-icons/io5";

// URL From Environment Variable
const url = process.env.NEXT_PUBLIC_URL;

const CreateLocation = ({ location, action, setOpen }) => {
  const router = useRouter();
  const { toast } = useToast();

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        throw new Error("No token found");
      }

      const apiUrl = location
        ? `${url}/location-management/locations/${location?.loc_id}/`
        : `${url}/location-management/locations/`;



      const method = location ? "put" : "post";

      const response = await axios({
        method,
        url: apiUrl,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form and close dialog after successful submission
      form.reset();
      setOpen(false);
      router.refresh();

      location ?
        toast({
          title: "Location Updated Successfully !",
        }) :
        toast({
          title: "New Location Created Successfully !",
        })

    } catch (error) {
      console.error("Error submitting the form:", error);
      setOpen(true);
      toast({
        variant: "destructive",
        title: "Some thing went wrong !",
        description: "Please try again or contact support . . . !",
      })
    }
  };

  // Form configuration using react-hook-form and zod schema
  const form = useForm({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      name: location?.name || "",
      address: location?.address || "",
      location_admin_name: location?.location_admin?.name || "",
      location_admin_email: location?.location_admin?.email || "",
      location_admin_password: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Location Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-clayInnPrimary uppercase text-xs">Location Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location name"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-clayInnPrimary  uppercase text-xs">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the address"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admin Name Field */}
          <FormField
            control={form.control}
            name="location_admin_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-clayInnPrimary  uppercase text-xs">Admin Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter admin name"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admin Email Field */}
          <FormField
            control={form.control}
            name="location_admin_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-clayInnPrimary uppercase text-xs">
                  Admin<span>&apos;</span>s Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter admin email"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admin Password Field */}
          <FormField
            control={form.control}
            name="location_admin_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-clayInnPrimary uppercase text-xs">
                  Admin<span>&apos;</span> Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex items-end justify-end">
            <Button className={`${action === "Update" ? "bg-green-500 hover:bg-green-600 rounded-full shadow-xl" : "bg-clayInnBackground hover:bg-clayInnPrimary text-clayInnPrimary hover:text-clayInnBackground rounded-full shadow-xl"}`} >
              <span>
                {action}
              </span>
              <span>
                <IoCreate size={20} />
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div >
  );
};

export default CreateLocation;
