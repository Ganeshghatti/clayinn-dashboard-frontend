import { CreateNewVenueForm } from "@/components/forms/create_New_Venue_Form";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { FaPlus } from "react-icons/fa6";

export function VenueNewPost() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <span><FaPlus size={20} /></span>
                        <span>
                            Add New Venue
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Venue</DialogTitle>
                        <DialogDescription className="hidden">

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <CreateNewVenueForm />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}