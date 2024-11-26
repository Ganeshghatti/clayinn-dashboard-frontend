"use client";

import Venue_Create_Form from "@/components/Forms/Venue_Create_Form";
import Venue_Edit_Form from "@/components/Forms/Venue_Edit_Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";

export default function Venue_Dialog({ action, location_Id, venue }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <span>
              {action === "create" ? <FaPlus size={20} /> : <FaRegEdit size={20} />}
            </span>
            <span>{action === "create" ? "Create Venue" : "Edit Venue"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize text-center">
              {action === "create" ? "Create Venue" : "Edit Venue"}
            </DialogTitle>
          </DialogHeader>
          <div>
            {action === "create" ? (
              <Venue_Create_Form setOpen={setOpen} location_Id={location_Id} />
            ) : (
              <Venue_Edit_Form setOpen={setOpen} location_Id={location_Id} venue={venue} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
