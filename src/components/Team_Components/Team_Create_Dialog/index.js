"use client";

import Team_Create_Form from "@/components/Forms/Team_Create_Form";
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

export default function Team_Create_Dialog({ action, locationId, member }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-team_Btn_Bg hover:bg-team_Btn_Bg/90 transition-all duration-300 ease-linear capitalize">
            {action} Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{action} Team</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Team_Create_Form
              action={action}
              setOpen={setOpen}
              locationId={locationId}
              member={member}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
