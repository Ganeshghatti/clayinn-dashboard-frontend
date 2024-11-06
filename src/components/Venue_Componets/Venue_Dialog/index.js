"use client";

import Venue_Create_Form from "@/components/Forms/Venue_Create_Form";
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
import { useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function Venue_Dialog({
  action,
  location_Id,
  venue,
  classname,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={`flex items-center gap-2 bg-buttonBg text-white hover:bg-buttonBg/80 transition-all duration-300 ease-linear`}
          >
            <span>
              {action === "create" ? (
                <FaPlus size={20} />
              ) : (
                <FaRegEdit size={20} />
              )}
            </span>
            <span>{action === "create" ? "Create Venue" : "Edit Venue"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize text-center">
              {action}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Venue_Create_Form
              action={action}
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
