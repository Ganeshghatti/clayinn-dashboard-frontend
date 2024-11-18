import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create_Booking_Action } from "@/app/redux/booking_Slice";

const BookingSchema = z.object({
  venue: z.string().min(1),
  sales_person: z.string().min(1),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().min(1),
});

export default function Booking_Create_Form({ setOpen, action }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const { locationId } = useParams();

  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      venue: "",
      sales_person: "",
      event_date: "",
      slot: "",
    },
  });

  async function onSubmit(values) {
    try {
      // if (!user) {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: "User information not found. Please login again.",
      //   });
      //   return;
      // }

      const formData = {
        ...values,
        lead: 4,
        occasion: 7,
        location: locationId,
      };

      await dispatch(create_Booking_Action({ formData })).unwrap();

      toast({
        title: "Success",
        description: "Lead created successfully",
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create booking",
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form} className="">
        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input placeholder="select the venue for booking" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sales_person"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Sales Person</FormLabel>
              <FormControl>
                <Input placeholder="who is the sales person" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Event Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="event date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slot"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Slot</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-5 capitalize bg-buttonBg hover:bg-buttonBg/80 transition-all ease-linear duration-300"
        >
          Create Booking
        </Button>
      </Form>
    </form>
  );
}
