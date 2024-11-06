"use client";

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
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

// REACT ICONS
import { FaEllipsisVertical } from "react-icons/fa6";
import { ImUser } from "react-icons/im";
import { MdWorkspaces, MdEmail } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import { FaMobile } from "react-icons/fa";

// -------------------
import Add_New_Location from "../Add_New_Location";
import Location_Delete from "../Location_Delete";

export default function Location_Card_Menu({ location }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="hover:bg-transparent p-0">
            <FaEllipsisVertical size={25} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:w-[90vw] w-[500px] m-auto space-y-10">
          <DialogHeader>
            <div className="flex items-center justify-center">
              <DialogTitle>Location Admin Details</DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
            </div>
          </DialogHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-2 max-md:text-sm">
              <span>
                <ImUser size={20} />
              </span>
              <span className="max-md:hidden">Name : </span>
              <span>{location?.location_admin?.name}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 max-md:text-sm">
              <span>
                <MdWorkspaces size={20} />
              </span>
              <span className="max-md:hidden">Role : </span>
              <span>{location?.location_admin?.role}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 max-md:text-sm">
              <span>
                <MdEmail size={20} />
              </span>
              <span className="max-md:hidden">Email : </span>
              <span>{location?.location_admin?.email}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 max-md:text-sm">
              <span>
                <AiOutlineNumber size={20} />
              </span>
              <span className="max-md:hidden">User ID : </span>
              <span>{location?.location_admin?.user_id}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2 max-md:text-sm">
              <span>
                <FaMobile size={20} />
              </span>
              <span className="max-md:hidden">Mobile : </span>
              <span>{location?.location_admin?.mobile ?? "Not Added"}</span>
            </div>
          </div>
          {/* Options */}
          <div className="flex items-center justify-center gap-2">
            <Add_New_Location
              setOpen={setOpen}
              action={"update"}
              location={location}
            />
            <Location_Delete location={location} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
