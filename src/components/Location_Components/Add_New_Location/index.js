"use client";

import Location_Create_Form from "@/components/Forms/Location_Create_Form";
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

// REACT ICONS
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function Add_New_Location({ action, location }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={`${
              action === "create" ? "px-8 py-6" : "px-6 py-4"
            } rounded-full flex items-center gap-2`}
          >
            <span>
              {action === "create" ? (
                <FaPlus size={20} />
              ) : (
                <FaEdit size={20} />
              )}
            </span>
            <span>{action === "create" ? "Add New Location" : "Update"}</span>
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
              action={action}
              location={location}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
