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

// Zod validation schema
const formSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 4 characters." }).max(50, { message: "Name cannot exceed 50 characters." }),
    location: z.string().min(5, { message: "Location must be at least 5 characters." }).max(50, { message: "Location cannot exceed 50 characters." }),
});

export function CreateNewVenueForm({ action, location_id, setOpen, venue }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const venueId = venue?.venue_id;


    console.log(venue, "venue from Form");

    // 1. Define your form using the zodResolver and formSchema
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: venue?.name || "",
            location: venue?.location || "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            console.log(location_id, "location_id from Form try");

            if (venueId) {
                // Update venue if venueId exists
                await dispatch(updateVenue_Actions({ data: values, location_Id: location_id, venue_id: venueId }));
            } else {
                // Create new venue if venueId is not available
                await dispatch(createNewVenue_Actions({ data: values, location_Id: location_id }));
            }
            form.reset();
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.log("Error creating/updating venue:", error);
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
                            name={eachInput?.name} // Ensure this matches the schema fields
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize font-semibold">
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
                    <div>
                        <Button type="submit">{action}</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
