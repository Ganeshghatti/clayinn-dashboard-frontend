"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { updateLead_Action } from "@/app/redux/lead_Slice";
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
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Zod schema for validation (similar to create form)
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

export default function Lead_Edit_Form({ setOpen, leadData }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);


  console.log("lead data", leadData)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: leadData.hostname || "",
      mobile: leadData.mobile || "",
      email: leadData.email || "",
      followup: leadData.followup || new Date().toISOString().split("T")[0],
      occasions: leadData.occasions || [],
      location_id: leadData.location_id || "",
      sales_person: leadData.sales_person || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "occasions",
  });

  const calculateTotal = (values) => {
    if (!values) return 0;

    if (values.occasion_type === "rooms") {
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

    if (occasionType === "rooms") {
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
      console.log("Submitting values:", values);
      console.log("Lead Number:", leadData.lead_number);

      setIsSubmitting(true);

      const formData = {
        ...values,
        occasions: values.occasions.map((occasion) => ({
          ...occasion,
          total: calculateTotal(occasion),
        })),
      };

      console.log("Prepared FormData:", formData);

      const result = await dispatch(
        updateLead_Action({
          leadNumber: leadData.lead_number,
          formData,
        })
      );

      console.log("Update Result:", result);

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });

      setOpen(false);
    } catch (error) {
      console.error("Update Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update lead",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
          (errors) => console.error("Validation Errors:", errors) // Debug errors
        )}
        className="space-y-6"
      >
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
          <Button
            onClick={() => onSubmit(form.getValues())}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Lead..." : "Update Lead"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
