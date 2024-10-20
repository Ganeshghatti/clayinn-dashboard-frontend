"use client";

import React from "react";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormField,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LocationSchema } from "@/schema";
import axios from "axios";

// URL From Environment Variable
const url = process.env.NEXT_PUBLIC_URL;

const CreateLocation = ({ location, action, setOpen }) => {
    const router = useRouter();

    // Handle form submission
    const onSubmit = async (values) => {
        try {
            const token = localStorage.getItem("access-token");
            if (!token) {
                throw new Error("No token found");
            }

            const apiUrl = location
                ? `${url}/location-management/locations/${location?.loc_id}/`
                : `${url}/location-management/locations/`;

            const method = location ? "put" : "post";

            const response = await axios({
                method,
                url: apiUrl,
                data: values,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response data:", response.data);

            // Reset form and close dialog after successful submission
            form.reset();
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Error submitting the form:", error);
            setOpen(true);
        }
    };

    // Form configuration using react-hook-form and zod schema
    const form = useForm({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            name: location?.name || "",
            address: location?.address || "",
            location_admin_name: location?.location_admin?.name || "",
            location_admin_email: location?.location_admin?.email || "",
            location_admin_password: "",
        },
    });

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    {/* Location Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter location name"
                                        {...field}
                                        className="border-2 border-clayInnPrimary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address Field */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter the address"
                                        {...field}
                                        className="border-2 border-clayInnPrimary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Admin Name Field */}
                    <FormField
                        control={form.control}
                        name="location_admin_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter admin name"
                                        {...field}
                                        className="border-2 border-clayInnPrimary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Admin Email Field */}
                    <FormField
                        control={form.control}
                        name="location_admin_email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin's Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter admin email"
                                        {...field}
                                        className="border-2 border-clayInnPrimary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Admin Password Field */}
                    <FormField
                        control={form.control}
                        name="location_admin_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin's Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter admin password"
                                        {...field}
                                        className="border-2 border-clayInnPrimary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button className="w-full py-5" variant="clayInnPrimary">
                        {action || "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateLocation;
