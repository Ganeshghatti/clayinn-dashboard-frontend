"use client";

import Lead_Create_Form from "@/components/Forms/Lead_Create_Form";
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

export default function Lead_Create_Dialog({ action }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-team_Btn_Bg hover:bg-team_Btn_Bg/90 transition-all duration-300 ease-linear capitalize">
            {action} a New Lead
          </Button>
        </DialogTrigger>
        <DialogContent className=" space-y-4 max-md:max-w-[90%] max-w-[50%]  rounded-xl ">
          <DialogHeader>
            <DialogTitle className="capitalize text-center mt-10">
              {action} a new Lead
            </DialogTitle>
          </DialogHeader>
          <Lead_Create_Form setOpen={setOpen} action={action} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
