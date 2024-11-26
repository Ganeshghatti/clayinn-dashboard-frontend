"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { create_New_Location_Action, update_Location_Action } from "@/app/redux/location_Slice";
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
import * as z from "zod";

const LocationSchema = (action) => {
  const baseSchema = {
    name: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  };

  // Add admin fields only for create action
  if (action === "create") {
    return z.object({
      ...baseSchema,
      location_admin_name: z.string().min(2, "Admin name must be at least 2 characters"),
      location_admin_email: z.string().email("Invalid email address"),
      location_admin_password: z.string().min(8, "Password must be at least 8 characters"),
    });
  }

  return z.object(baseSchema);
};

export default function Location_Create_Form({ setOpen, action = "create", location }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(LocationSchema(action)),
    defaultValues: {
      name: location?.name || "",
      address: location?.address || "",
      location_admin_name: location?.location_admin?.name || "",
      location_admin_email: location?.location_admin?.email || "",
      location_admin_password: "",
    },
  });

  async function onSubmit(values) {
    try {
      if (action === "create") {
        await dispatch(create_New_Location_Action(values)).unwrap();
        toast({
          title: "Location Created",
          description: "New location has been created successfully.",
        });
      } else {
        await dispatch(
          update_Location_Action({ 
            locationId: location.loc_id, 
            values: { 
              name: values.name, 
              address: values.address 
            } 
          })
        ).unwrap();
        toast({
          title: "Location Updated",
          description: "Location has been updated successfully.",
        });
      }
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter location name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter location address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {action === "create" && (
          <>
            <FormField
              control={form.control}
              name="location_admin_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter admin name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_admin_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter admin email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_admin_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter admin password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {action === "create" ? "Create Location" : "Update Location"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
