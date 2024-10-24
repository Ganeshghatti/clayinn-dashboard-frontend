import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { createNewMemberForm_Inputs } from "@/constants";

import { FaPlus } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createMember_Actions, updateMember_Actions } from "@/app/redux/memberSlice";

const formSchema = z.object({
    name: z.string().min(4).max(50),
    email: z.string()
        .email("Invalid email address format")
        .min(5, "Email must be at least 5 characters long")
        .max(100, "Email must be less than 100 characters long")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must contain a valid domain and characters"
        ),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be less than 100 characters")
        .regex(
            /^(?=.*[a-zA-Z])(?=.*[0-9])/,
            "Password must contain at least one letter and one number"
        ),

    mobile: z
        .string()
        .regex(/^\d+$/, { message: "Mobile number must contain only digits" })
        .length(10, { message: "Mobile number must be exactly 10 digits" })
});

export default function Create_New_Member({ location_id, action, setOpen, member }) {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const router = useRouter();

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: member?.name || "",
            email: member?.email || "",
            password: action === "update" ? "dummyPassword@123" : "",
            mobile: member?.mobile || "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values) {
        try {
            if (action === "Create") {
                await dispatch(createMember_Actions({ data: values, location_id }));
            } else {
                await dispatch(updateMember_Actions({ member_id: member.user_id, data: values, location_id }));
            }
            toast({
                title: `${action === "Create" ? "New Member Created" : "Member Updated"} Successfully!`,
            });
            form.reset();
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.log("Error creating/updating member:", error);
            toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: "Please try again or contact support.",
            });
        }
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {createNewMemberForm_Inputs.map((eachInput, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={eachInput.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`${action === "update" && eachInput.name === "password" ? "hidden" : "visible"} capitalize text-clayInnPrimary`}>{eachInput.name}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={eachInput.placeholder}
                                            {...field}
                                            disabled={action === "update" && eachInput.name === "email"}
                                            className={`${action === "update" && eachInput.name === "password" ? "hidden" : "visible"} `}
                                        />
                                    </FormControl>
                                    <FormDescription className="hidden">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <div className="flex items-end justify-end">
                        <Button type="submit" className={`${action === "Create" ? "bg-clayInnBackground text-clayInnPrimary hover:bg-clayInnBackground/80" : "bg-green-600  hover:bg-green-500 text-white"} rounded-full flex items-center gap-2`}>
                            <span>
                                {action === "Create" ? <FaPlus size={20} /> : <FaUserEdit size={20} />}
                            </span>
                            <span>
                                {action === "Create" ? "Create" : "Update"}
                            </span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
