import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { VenueDeleteAlert } from "./venue_Delete_Alert"

import { BsFillBuildingsFill } from "react-icons/bs";
import { PiBuildingFill } from "react-icons/pi";


export function VenueDetailDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <span><BsFillBuildingsFill /></span>
                    <span>
                        Venue Details
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Render Details */}
                </div>
                <DialogFooter>
                    <Button className="flex items-center gap-2">
                        <span>
                            <PiBuildingFill size={20} />
                        </span>
                        <span>
                            Update Venue
                        </span>
                    </Button>
                    <VenueDeleteAlert />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
