import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VenueDeleteAlert } from "./venue_Delete_Alert";

import { BsFillBuildingsFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { VenueNewPost } from "../Venue_New_Post";
import { CiMenuKebab } from "react-icons/ci";



export function VenueDetailDialog({ venue, location_id }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-transparent text-black" variant="ghost" >
          <CiMenuKebab size={30} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:w-[350px] w-[425px]">
        <DialogHeader>
          <DialogTitle className="uppercase text-center text-clayInnPrimary">Venue Details</DialogTitle>
          <DialogDescription className="hidden">
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg flex items-center gap-2"><span><BsFillBuildingsFill size={22} /></span>Name : </p>
            <p>{venue?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg flex items-center gap-2"><span><FaMapLocationDot size={22} /></span>Location : </p>
            <p>{venue?.location}</p>
          </div>
        </div>
        <div className="flex  flex-row items-center justify-center gap-2">
          <VenueNewPost venue={venue} action="Update" location_id={location_id} />
          <VenueDeleteAlert venue={venue} location_id={location_id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
