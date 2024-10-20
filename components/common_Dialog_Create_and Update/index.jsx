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
                        className={`${action === "Create" ? "bg-clayInnSecondary text-clayInnPrimary border-2 border-clayInnPrimary hover:bg-clayInnPrimary hover:text-clayInnSecondary" : "bg-green-500 hover:bg-green-600"} rounded-md flex items-center justify-center px-4 py-2`}
                    >
                        {action === "Create" ? <Plus className="w-5 h-4" /> : <FaEdit className="w-5 h-4" />}
                        {heading}
                    </Button>
                </DialogTrigger>
                <DialogContent className="family-poppins">
                    <DialogHeader>
                        <DialogTitle className="text-clayInnPrimary">
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
