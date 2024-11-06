"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

// React Icons
import { CiMenuKebab } from "react-icons/ci";
import Venue_Dialog from "../Venue_Dialog";
import Delete_Dialog from "../Venue_Delete_Dialog";

// REACT ICONS
import { FaBuilding } from "react-icons/fa6";

export default function Venue_Detail({ location_Id, venue }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-0 ">
            <CiMenuKebab />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] md:w-[50%] space-y-8">
          <DialogHeader>
            <DialogTitle className="text-center mb-8">
              Venue Details
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <span>
                <FaBuilding size={20} />
              </span>
              <span>{venue?.name}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <Venue_Dialog
              action={"Update"}
              location_Id={location_Id}
              venue={venue}
            />
            <Delete_Dialog
              setOpen={setOpen}
              location_Id={location_Id}
              venue={venue}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
