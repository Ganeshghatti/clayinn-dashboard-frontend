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
import { useState } from "react";

import { FaPlus, FaBuilding } from "react-icons/fa6";

export function VenueNewPost({ action, location_id, venue }) {
    const [open, setOpen] = useState(false);
    const venueId = venue?.venue_id;
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <span>
                            {venueId ? <FaBuilding /> : <FaPlus />}
                        </span>
                        <span className="hidden md:block">
                            {venue?.venue_id ? "Update Venue" : "Add New Venue"}
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
                        <CreateNewVenueForm action={action} location_id={location_id} setOpen={setOpen} venue={venue} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}