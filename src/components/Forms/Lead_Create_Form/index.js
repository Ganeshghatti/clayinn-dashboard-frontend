"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create_Lead_Action } from "@/app/redux/lead_Slice";
import { useParams } from "next/navigation";

import jwt from "jsonwebtoken";

const standardOccasionSchema = z.object({
  occasion_type: z.string(),
  date_of_function: z.string(),
  day: z.string(),
  lunch_pax: z.number().default(0),
  hi_tea_pax: z.number().default(0),
  dinner_pax: z.number().default(0),
  dj_value: z.number().default(0),
  decor_value: z.number().default(0),
  liquor_value: z.number().default(0),
  total: z.number(),
});

const weddingSchema = standardOccasionSchema.extend({
  vedi_value: z.number().default(0),
});

const roomSchema = z.object({
  occasion_type: z.literal("room"),
  number_of_pax: z.number(),
  number_of_rooms: z.number(),
  plan: z.string(),
  total: z.number(),
});

const formSchema = z.object({
  hostname: z.string().min(2, "Host name is required"),
  mobile: z.string().length(10, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email format"),
  lead_status: z.string().default("untouched"),
  call_status: z.string().default("not_yet_call"),
  followup: z.string(),
  occasions: z.array(
    z.discriminatedUnion("occasion_type", [
      weddingSchema.extend({ occasion_type: z.literal("wedding") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("reception") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("engagement") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("haldi") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("mehndi") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("roka") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("sagan") }),
      standardOccasionSchema.extend({ occasion_type: z.literal("corporate") }),
      roomSchema,
    ])
  ),
});

export default function Lead_Create_Form({ setOpen, action }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const { locationId } = useParams();

  const token = localStorage.getItem("access-token");
  const decodedToken = jwt.decode(token);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
      mobile: "",
      email: "",
      lead_status: "untouched",
      call_status: "not_yet_call",
      followup: "",
      occasions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "occasions",
  });

  const occasionTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "reception", label: "Reception" },
    { value: "engagement", label: "Engagement" },
    { value: "haldi", label: "Haldi" },
    { value: "mehndi", label: "Mehndi" },
    { value: "roka", label: "Roka" },
    { value: "sagan", label: "Sagan" },
    { value: "corporate", label: "Corporate" },
    { value: "room", label: "Room" },
  ];

  // Function to get day name from date
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Handle date change to automatically update day
  const handleDateChange = (index, value) => {
    form.setValue(`occasions.${index}.date_of_function`, value);
    form.setValue(`occasions.${index}.day`, getDayName(value));
  };

  const renderOccasionFields = (index) => {
    const occasionType = form.watch(`occasions.${index}.occasion_type`);

    if (!occasionType) return null;

    if (occasionType === "room") {
      return (
        <div className="space-y-4 mt-4 ">
          <FormField
            control={form.control}
            name={`occasions.${index}.number_of_pax`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.number_of_rooms`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Rooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.plan`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.total`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name={`occasions.${index}.date_of_function`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Function</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`occasions.${index}.lunch_pax`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lunch Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.hi_tea_pax`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hi Tea Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.dinner_pax`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dinner Pax</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`occasions.${index}.dj_value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>DJ Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.decor_value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Decor Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occasions.${index}.liquor_value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquor Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {occasionType === "wedding" && (
            <FormField
              control={form.control}
              name={`occasions.${index}.vedi_value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vedi Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name={`occasions.${index}.total`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

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
        sales_person: decodedToken.user_id,
        location_id: locationId,
      };

      const ApiData = {
        hostname: "Adarsh",
        mobile: "9876543210",
        location_id: "Delhi-43a9a",
        sales_person: "super-admin-461a0",
        email: "john@example.com",
        lead_status: "untouched",
        call_status: "not_yet_call",
        followup: "2024-03-20",
        occasions: [
          {
            occasion_type: "wedding",
            date_of_function: "2024-11-24",
            day: "Wednesday",
            lunch_pax: 200,
            hi_tea_pax: 150,
            dinner_pax: 300,
            dj_value: 25000,
            decor_value: 50000,
            liquor_value: 30000,
            vedi_value: 10000,
            total: 115000,
          },
        ],
      };

      console.log(formData);
      console.log(ApiData);

      await dispatch(create_Lead_Action({ formData, locationId })).unwrap();

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
        description: error.message || "Failed to create lead",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 h-[60vh] overflow-y-auto flex flex-col items-center justify-between"
      >
        <Tabs defaultValue="general" className="w-full space-y-14">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="occasions">Occasions</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hostname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="followup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow Up Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="flex items-center justify-between"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="occasions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Occasions</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ occasion_type: "" })}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Occasion
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg relative">
                <FormField
                  control={form.control}
                  name={`occasions.${index}.occasion_type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occasion type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occasionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {renderOccasionFields(index)}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <Button
          type="submit"
          className="w-full capitalize bg-buttonBg hover:bg-buttonBg/80 transition-all ease-linear duration-300"
        >
          {action} Lead
        </Button>
      </form>
    </Form>
  );
}
