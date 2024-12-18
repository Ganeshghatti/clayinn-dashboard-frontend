"use client";

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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createVenue_Action } from "@/app/redux/venue_Slice";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  bg_color: z.string().regex(/^#([A-Fa-f0-9]{6})$/, "Invalid color format"),
});

export default function Venue_Create_Form({ setOpen, location_Id }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bg_color: "#3357FF"
    },
  });

  async function onSubmit(values) {
    try {
      await dispatch(createVenue_Action({ values, location_Id }));
      setOpen(false);
      form.reset();
      router.refresh();
      toast({
        title: "Venue Created Successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create venue",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter venue name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bg_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <FormControl>
                <Input 
                  type="color" 
                  {...field} 
                  className="w-full h-10 cursor-pointer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Venue
        </Button>
      </form>
    </Form>
  );
}
