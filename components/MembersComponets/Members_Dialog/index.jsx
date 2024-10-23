"use client"

import Create_New_Member from "@/components/forms/create_New_Member";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";


import { FaUserEdit } from "react-icons/fa";
import Members_Delete from "../Members_Delete";


export default function Members_Dialog({ member, location_id }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center  justify-end gap-2 w-full mt-10">


            <Dialog open={open} onOpenChange={setOpen} className="">
                <DialogTrigger asChild>
                    <Button className="bg-green-600 text-white hover:bg-green-500 rounded-full flex items-center gap-2">
                        <span><FaUserEdit size={20} /></span>
                        <span>Update</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader className="hidden">
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <Create_New_Member member={member} action="update" setOpen={setOpen} location_id={location_id} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    )
}
