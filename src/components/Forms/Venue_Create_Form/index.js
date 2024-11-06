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
import { createNewVenueForm_Inputs } from "@/constants";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  create_Venue_Action,
  createNewVenue_Actions,
  fetchVenues_Actions,
  updateVenue_Actions,
  venue_Update_action,
} from "@/app/redux/venue_Slice";
import { useToast } from "@/hooks/use-toast";

import { IoCreateOutline } from "react-icons/io5";

// Zod validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  // location: z.string().min(5, { message: "Location must be at least 5 characters." }).max(50, { message: "Location cannot exceed 50 characters." }),
});

export default function Venue_Create_Form({
  action,
  setOpen,
  location_Id,
  venue,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  console.log(venue, "------");

  // 1. Define your form using the zodResolver and formSchema
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: venue?.name || "",
    },
  });

  const venue_id = venue?.venue_id;

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      if (venue) {
        await dispatch(venue_Update_action({ values, location_Id, venue_id }));
      } else {
        await dispatch(create_Venue_Action({ values, location_Id }));
      }

      setOpen(false);
      form.reset();
      router.refresh();
      toast({
        title: "Venue Updated Successfully !",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Some thing went wrong !",
        description: "Please try again or contact support . . . !",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {createNewVenueForm_Inputs.map((eachInput, index) => (
            <FormField
              key={index}
              control={form.control}
              name={eachInput?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">{eachInput?.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={eachInput?.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-end justify-end">
            <Button type="submit" className={`flex items-center gap-2`}>
              <span className="capitalize">{action}</span>
              <span>
                <IoCreateOutline size={20} />
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
