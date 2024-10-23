"use client"

import { deleteMember_Actions } from "@/app/redux/memberSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AiOutlineUserDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";


export default function Members_Delete({ member, location_id }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);


    const handleDelete = async () => {
        await dispatch(deleteMember_Actions({ location_id, member_id: member.user_id }));
        router.push(`/locations/${location_id}/members`);
        toast({
            title: "Member Deleted Successfully !",
        })
        setOpen(false);
    }
    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="text-red-600 hover:text-red-500 hover:bg-clayInnBackground/10 flex items-center gap-2" variant="ghost">
                        <span><AiOutlineUserDelete size={20} /></span>
                        <span>Delete</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-clayInnBackground text-text-clayInnPrimary hover:bg-clayInnBackground/80 rounded-full">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 text-white hover:bg-red-500 rounded-full flex items-center gap-2" onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
