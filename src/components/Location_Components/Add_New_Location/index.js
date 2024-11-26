"use client";

import Location_Create_Form from "@/components/Forms/Location_Create_Form";
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
import { FaPlus } from "react-icons/fa6";

export default function Add_New_Location() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-8 py-6 rounded-full flex items-center gap-2">
            <FaPlus size={20} />
            <span>Add New Location</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:w-[95vw] md:w-[500px] m-auto space-y-8">
          <DialogHeader className="space-y-4 flex flex-col items-center">
            <DialogTitle className="text-2xl font-bold text-mainText">
              Create New Location
            </DialogTitle>
            <DialogDescription className="text-sm text-mainText">
              This form will allow you to create a new location for the hotels.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Location_Create_Form
              setOpen={setOpen}
              action="create"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
