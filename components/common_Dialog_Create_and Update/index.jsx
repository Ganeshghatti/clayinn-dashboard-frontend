import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { FaEdit } from "react-icons/fa";

import CreateLocation from "../forms/create-location";
import { useState } from "react";

export default function Common_Dialog_Create_and_Update({ heading, description, action, location }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className={`${action === "Create" ? " border-2 " : "bg-green-500 hover:bg-green-600"} rounded-md flex items-center justify-center px-4 py-6 `}
                    >
                        {action === "Create" ? <Plus className="w-5 h-4" /> : <FaEdit className="w-5 h-4" />}
                        {heading}
                    </Button>
                </DialogTrigger>
                <DialogContent className="family-poppins">
                    <DialogHeader>
                        <DialogTitle className="">
                            {heading}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <CreateLocation action={action} setOpen={setOpen} location={location} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
