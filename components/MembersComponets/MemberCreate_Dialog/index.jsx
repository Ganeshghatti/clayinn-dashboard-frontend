"use client"


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



import { FaPlus } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import Create_New_Member from "@/components/forms/create_New_Member";
import { useState } from "react";



export default function MemberCreate_Dialog({ location_id, action }) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={`${action === "Create" ? "bg-clayInnBackground text-clayInnPrimary hover:bg-clayInnBackground/80" : "bg-green-500  text-white"} rounded-full flex items-center gap-2`}>
                    <span>
                        {action === "Create" ? <FaPlus size={20} /> : <FaUserEdit size={20} />}
                    </span>
                    <span className="hidden md:block">
                        {action === "Create" ? "Add New Member" : "Update Member"}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-clayInnPrimary uppercase">
                        {action === "Create" ? "Add New Member" : "Update Member"}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    {/* Create New Member Form */}
                    <Create_New_Member location_id={location_id} action={action} setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    )
}