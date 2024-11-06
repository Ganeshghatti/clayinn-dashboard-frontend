"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNew_Team_Form_Inputs } from "@/constants";

import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createMember, updateMember } from "@/app/redux/team_Slice";

const formSchema = z.object({
  name: z.string().min(4).max(50),
  email: z
    .string()
    .email("Invalid email address format")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be less than 100 characters long")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must contain a valid domain and characters"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Password must contain at least one letter and one number"
    ),

  mobile: z
    .string()
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" })
    .length(10, { message: "Mobile number must be exactly 10 digits" }),
});

export default function Team_Create_Form({
  action,
  setOpen,
  locationId,
  member,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || "",
      email: member?.email || "",
      password: action === "update" ? "dummyPassword@123" : "",
      mobile: member?.mobile || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      if (action === "create") {
        await dispatch(createMember({ data: values, location_id: locationId }));
      } else {
        await dispatch(
          updateMember({
            location_id: locationId,
            member_id: member.user_id,
            data: values,
          })
        );
      }
      form.reset();
      router.refresh();
      setOpen(false);
      toast({
        title: `${
          action === "create" ? "New Member Created" : "Member Updated"
        } Successfully!`,
      });
    } catch (error) {
      console.log("Error creating/updating member:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again or contact support.",
      });
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {createNew_Team_Form_Inputs.map((eachInput, index) => (
            <FormField
              key={index}
              control={form.control}
              name={eachInput.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${
                      action === "update" && eachInput.name === "password"
                        ? "hidden"
                        : "visible"
                    } capitalize`}
                  >
                    {eachInput.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={eachInput.placeholder}
                      {...field}
                      disabled={
                        action === "update" && eachInput.name === "email"
                      }
                      className={`${
                        action === "update" && eachInput.name === "password"
                          ? "hidden"
                          : "visible"
                      } `}
                    />
                  </FormControl>
                  <FormDescription className="hidden">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex items-end justify-end">
            <Button type="submit">
              <span>{action === "create" ? "Create" : "Update"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
