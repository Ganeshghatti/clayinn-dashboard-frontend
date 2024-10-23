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
import { createNewVenue_Actions, updateVenue_Actions } from "@/app/redux/venueSlice";
import { useToast } from "@/hooks/use-toast";

import { IoCreateOutline } from "react-icons/io5";

// Zod validation schema
const formSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 4 characters." }).max(50, { message: "Name cannot exceed 50 characters." }),
    // location: z.string().min(5, { message: "Location must be at least 5 characters." }).max(50, { message: "Location cannot exceed 50 characters." }),
});

export function CreateNewVenueForm({ action, location_id, setOpen, venue }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const venueId = venue?.venue_id;

    const { toast } = useToast();

    // 1. Define your form using the zodResolver and formSchema
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: venue?.name || "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values) {

        try {
            console.log(location_id, "location_id from Form try");

            if (venueId) {
                // Update venue if venueId exists
                await dispatch(updateVenue_Actions({ data: values, location_Id: location_id, venue_id: venueId }));
                toast({
                    title: "Venue Updated Successfully !",
                })
            } else {
                // Create new venue if venueId is not available
                await dispatch(createNewVenue_Actions({ data: values, location_Id: location_id }));
                toast({
                    title: "New Venue Created Successfully !",
                })
            }
            form.reset();
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.log("Error creating/updating venue:", error);
            toast({
                variant: "destructive",
                title: "Some thing went wrong !",
                description: "Please try again or contact support . . . !",
            })
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
                                    <FormLabel className="capitalize font-semibold text-clayInnPrimary">
                                        <span>Venue </span>{eachInput?.name}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder={eachInput?.placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <div className="flex items-end justify-end">
                        <Button type="submit" className={`${action === "Create" ? "bg-clayInnBackground text-clayInnPrimary hover:bg-clayInnBackground/80 rounded-full" : "bg-green-500 hover:bg-green-500/80 rounded-full"} flex items-center gap-2`}>
                            <span>
                                {action}
                            </span>
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
