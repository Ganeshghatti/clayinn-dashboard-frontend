import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useEffect } from "react";

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

import jwt from "jsonwebtoken";

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
import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import { decode } from "punycode";

const BookingSchema = z.object({
  venue: z.string().min(1),
  occasion: z.string().min(1),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slot: z.string().min(1),
});

export default function Booking_Create_Form({
  setOpen,
  leadNumber,
  occasions,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const { locationId } = useParams();

  const token = localStorage.getItem("access-token");
  const decodedToken = jwt.decode(token);

  const { all_venues } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenues_Actions(locationId));
  }, [dispatch, locationId]);

  const form = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      venue: "",
      ocassion: "",
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
        lead: leadNumber,
        occasion: parseInt(values.occasion),
        venue: values.venue,
        location: locationId,
        sales_person: decodedToken.user_id,
        event_date: values.event_date,
        slot: values.slot,
      };

      await dispatch(create_Booking_Action({ formData })).unwrap();
      console.log(formData);
      console.log(occasions);
      console.log(decodedToken);

      toast({
        title: "Success",
        description: "Lead created successfully",
      });

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
    <Form {...form} className="">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Venues" />
                  </SelectTrigger>
                  <SelectContent>
                    {all_venues.map((item, index) => (
                      <SelectItem key={index} value={item.venue_id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          name="occasion"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Occasion</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((item, index) => (
                      <SelectItem
                        key={index}
                        className="capitalize"
                        value={item.id.toString()}
                      >
                        {item.occasion_type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      </form>
    </Form>
  );
}
