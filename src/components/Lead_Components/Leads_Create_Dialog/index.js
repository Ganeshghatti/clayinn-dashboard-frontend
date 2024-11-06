"use client";

import Lead_Create_Form from "@/components/Forms/Lead_Create_Form";
import VenueForm from "@/components/Forms/Lead_Create_Form";
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

export default function Lead_Create_Dialog({ action }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-team_Btn_Bg hover:bg-team_Btn_Bg/90 transition-all duration-300 ease-linear capitalize">
            {action} a New Lead
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">{action} Team</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Lead_Create_Form />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
