"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { occasionTypes, createLeadForm_Inputs } from "@/constants";
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
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import jwt from "jsonwebtoken";
import { createLead_Action } from "@/app/redux/lead_Slice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchLeads_Action } from "@/app/redux/lead_Slice";

// Zod schema for validation
const formSchema = z.object({
  hostname: z.string().min(1, "Host name is required"),
  mobile: z
    .string()
    .min(10, "Valid mobile number required")
    .max(10, "Mobile number must be 10 digits"),
  email: z.string().email("Valid email required"),
  followup: z.string().min(1, "Follow up date is required"),
  occasions: z
    .array(
      z.object({
        occasion_type: z.string(),
        date_of_function: z.string().min(1, "Date is required"),
        day: z.string().optional().nullable(),
        lunch_pax: z.number().min(0).optional().nullable(),
        hi_tea_pax: z.number().min(0).optional().nullable(),
        dinner_pax: z.number().min(0).optional().nullable(),
        dj_value: z.number().min(0).optional().nullable(),
        decor_value: z.number().min(0).optional().nullable(),
        liquor_value: z.number().min(0).optional().nullable(),
        vedi_value: z.number().min(0).optional().nullable(),
        number_of_pax: z.number().min(0).optional().nullable(),
        number_of_rooms: z.number().min(0).optional().nullable(),
        plan: z.string().optional().nullable(),
        total: z.number().min(0).optional(),
      })
    )
    .min(1, "At least one occasion is required"),
});

export default function Lead_Create_Form({ setOpen, locationId }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("access-token");
  const decodedToken = token ? jwt.decode(token) : null;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
      mobile: "",
      email: "",
      followup: new Date().toISOString().split("T")[0],
      occasions: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "occasions",
  });

  if (!decodedToken) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Authentication token not found. Please login again.",
    });
    return null;
  }

  const calculateTotal = (values) => {
    if (!values) return 0;

    if (values.occasion_type === "room") {
      return (values.number_of_rooms || 0) * (values.number_of_pax || 0) * 3000;
    }

    return (
      (values.dj_value || 0) +
      (values.decor_value || 0) +
      (values.liquor_value || 0) +
      (values.vedi_value || 0)
    );
  };

  const addOccasion = (occasionType) => {
    if (!occasionType) return;

    const defaultValues = {
      occasion_type: occasionType,
      date_of_function: new Date().toISOString().split("T")[0],
      day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
      total: 0,
    };

    if (occasionType === "room") {
      append({
        ...defaultValues,
        number_of_pax: 0,
        number_of_rooms: 0,
        plan: "",
      });
    } else {
      append({
        ...defaultValues,
        lunch_pax: 0,
        hi_tea_pax: 0,
        dinner_pax: 0,
        dj_value: 0,
        decor_value: 0,
        liquor_value: 0,
        ...(occasionType === "wedding" || occasionType === "reception"
          ? { vedi_value: 0 }
          : {}),
      });
    }
  };

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);

      if (!locationId || !decodedToken.user_id) {
        throw new Error("Missing required parameters");
      }

      const formData = {
        ...values,
        location_id: locationId,
        sales_person: decodedToken.user_id,
        lead_status: "untouched",
        call_status: "not_yet_call",
        occasions: values.occasions.map((occasion) => ({
          ...occasion,
          total: calculateTotal(occasion),
        })),
      };

      await dispatch(createLead_Action({ formData, locationId })).unwrap();

      await dispatch(fetchLeads_Action({locationId}));

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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-h-[80vh] overflow-y-auto pr-4">
          {/* Basic Lead Information */}
          <div className="space-y-4 mb-6">
            {createLeadForm_Inputs
              .filter((input) => input.name !== "occasions")
              .map((input, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={input.type}
                          placeholder={input.placeholder}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>

          {/* Occasions Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <FormLabel>Occasions</FormLabel>
              <Select onValueChange={addOccasion} disabled={isSubmitting}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Add Occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Accordion type="multiple" className="w-full">
              {fields.map((field, index) => (
                <AccordionItem key={field.id} value={`occasion-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span className="font-semibold capitalize">
                        {field.occasion_type} - {index + 1}
                      </span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(index);
                        }}
                        disabled={isSubmitting}
                      >
                        Remove
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4">
                      {occasionTypes
                        .find((type) => type.id === field.occasion_type)
                        ?.parameters.map((param, paramIndex) => (
                          <FormField
                            key={paramIndex}
                            control={form.control}
                            name={`occasions.${index}.${param.name}`}
                            render={({ field: paramField }) => (
                              <FormItem>
                                <FormLabel>{param.label}</FormLabel>
                                <FormControl>
                                  <Input
                                    type={param.type}
                                    {...paramField}
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    disabled={isSubmitting}
                                    onChange={(e) => {
                                      const value =
                                        param.type === "number"
                                          ? parseFloat(e.target.value) || 0
                                          : e.target.value;
                                      paramField.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="bottom-0 bg-white pt-4 border-t">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Lead..." : "Create Lead"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
