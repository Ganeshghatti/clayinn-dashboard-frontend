"use client";

import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoCreate } from "react-icons/io5";
import { createLocationForm_Inputs } from "@/constants";
import { useDispatch } from "react-redux";
import {
  create_New_Location_Action,
  update_Location_Action,
} from "@/app/redux/location_Slice";
import { useToast } from "@/hooks/use-toast";

// URL From Environment Variable
const url = process.env.NEXT_PUBLIC_URL;

// Dynamic Schema based on action
const LocationSchema = (action) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, "Location name must be at least 3 characters")
      .nonempty("Location name is required"),
    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .nonempty("Address is required"),
    location_admin_name: z
      .string()
      .trim()
      .min(3, "Admin name must be at least 3 characters")
      .nonempty("Admin name is required"),
    location_admin_email: z
      .string()
      .email("Invalid email format")
      .nonempty("Admin email is required"),
    location_admin_password:
      action === "create"
        ? z
            .string()
            .trim()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password is required")
        : z.string().optional(),
  });

export default function Location_Create_Form({ setOpen, action, location }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Form configuration using react-hook-form and dynamic schema
  const form = useForm({
    resolver: zodResolver(LocationSchema(action)),
    defaultValues: {
      name: location?.name || "",
      address: location?.address || "",
      location_admin_name: location?.location_admin?.name || "",
      location_admin_email: location?.location_admin?.email || "",
      location_admin_password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      if (action === "create") {
        await dispatch(create_New_Location_Action(values));
        toast({
          title: "Location Created Successfully",
          description: "You have successfully created a new location.",
        });
      } else {
        await dispatch(
          update_Location_Action({ values, location_Id: location?.loc_id })
        );
        toast({
          title: "Location Updated Successfully",
          description: "The location has been updated.",
        });
      }
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: action === "create" ? "Creation Failed" : "Update Failed",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {createLocationForm_Inputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={
                      action === "update" &&
                      input.name === "location_admin_password"
                        ? "hidden"
                        : "block"
                    }
                  >
                    {input.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={input.placeholder}
                      {...field}
                      className={
                        action === "update" &&
                        input.name === "location_admin_password"
                          ? "hidden"
                          : "block placeholder:text-sm"
                      }
                      type={input.type}
                    />
                  </FormControl>
                  <FormMessage
                    className={
                      action === "update" &&
                      input.name === "location_admin_password"
                        ? "hidden"
                        : "block"
                    }
                  />
                </FormItem>
              )}
            />
          ))}
          {/* Submit Button */}
          <div className="flex items-end justify-end">
            <Button type="submit" className="flex gap-2 items-center">
              <span>{action === "create" ? "Create" : "Update"}</span>
              <IoCreate size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
