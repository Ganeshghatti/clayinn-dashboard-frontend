import { deleteVenue_Actions } from "@/app/redux/venueSlice";
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
import { useRouter } from "next/navigation";

import { FaBuildingCircleXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";

export function VenueDeleteAlert({ venue, location_id }) {
    const venue_id = venue?.venue_id;
    const dispatch = useDispatch();
    const router = useRouter();


    const onHandleDelete_Venue = async () => {
        await dispatch(deleteVenue_Actions({ location_Id: location_id, venue_id: venue_id }))
        router.refresh();
    }







    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-red-600 text-white hover:bg-red-500">
                    <span>
                        <FaBuildingCircleXmark size={20} />
                    </span>
                    <span>
                        Delete Venue
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Venue
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onHandleDelete_Venue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}