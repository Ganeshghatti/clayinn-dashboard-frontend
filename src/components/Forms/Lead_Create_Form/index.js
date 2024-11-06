"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

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

const eventSchema = z.object({
  date_of_function: z.string().optional(),
  day: z.string().optional(),
  lunch_min_pax_type: z.string().optional(),
  lunch_min_pax_value: z.number().nullable().optional(),
  hi_tea_min_pax_type: z.string().optional(),
  hi_tea_min_pax_value: z.number().nullable().optional(),
  dinner_min_pax_type: z.string().optional(),
  dinner_min_pax_value: z.number().nullable().optional(),
  dj_type: z.string().optional(),
  dj_value: z.number().nullable().optional(),
  decor_type: z.string().optional(),
  decor_value: z.number().nullable().optional(),
  liquor_type: z.string().optional(),
  liquor_value: z.number().nullable().optional(),
  total: z.number().optional(),
  vedi_type: z.string().optional(),
  vedi_value: z.number().nullable().optional(),
});

const formSchema = z.object({
  hostname: z.string(),
  mobile: z.string(),
  venue_id: z.string(),
  location_id: z.string(),
  lead_status: z.string(),
  call_status: z.string(),
  followup: z.string(),
  remark: z.string(),
  email: z.string().email(),
  engagements: z.array(eventSchema),
  weddings: z.array(eventSchema),
  corporates: z.array(eventSchema),
  haldis: z.array(eventSchema),
  mehndis: z.array(eventSchema),
  rokas: z.array(eventSchema),
  sagans: z.array(eventSchema),
  receptions: z.array(eventSchema),
  rooms: z.array(
    z.object({
      number_of_pax: z.number(),
      number_of_rooms: z.number(),
      plan: z.string(),
    })
  ),
});

export default function Lead_Create_Form() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
      mobile: "",
      venue_id: "",
      location_id: "",
      lead_status: "",
      call_status: "",
      followup: "",
      remark: "",
      email: "",
      engagements: [{}],
      weddings: [{}],
      corporates: [{}],
      haldis: [{}],
      mehndis: [{}],
      rokas: [{}],
      sagans: [{}],
      receptions: [{}],
      rooms: [{}],
    },
  });

  const { control, handleSubmit } = form;

  const { fields: engagementFields } = useFieldArray({ control, name: "engagements" });
  const { fields: weddingFields } = useFieldArray({ control, name: "weddings" });
  const { fields: roomFields } = useFieldArray({ control, name: "rooms" });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
            name="hostname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter host name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="Enter mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="venue_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter venue ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lead_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead Status</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lead status" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="call_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call Status</FormLabel>
                <FormControl>
                  <Input placeholder="Enter call status" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="followup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Follow-Up</FormLabel>
                <FormControl>
                  <Input placeholder="Enter follow-up date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="remark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remark</FormLabel>
                <FormControl>
                  <Input placeholder="Enter remark" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {engagementFields.map((_, index) => (
            <FormField
              key={index}
              control={control}
              name={`engagements.${index}.date_of_function`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engagement Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {weddingFields.map((_, index) => (
            <FormField
              key={index}
              control={control}
              name={`weddings.${index}.date_of_function`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wedding Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {roomFields.map((_, index) => (
            <FormField
              key={index}
              control={control}
              name={`rooms.${index}.number_of_pax`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Pax</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter number of pax" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
