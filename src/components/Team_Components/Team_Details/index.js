"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaUser } from "react-icons/fa6";
import { CiHashtag } from "react-icons/ci";
import { FaMobile } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { useState } from "react";
import Team_Create_Dialog from "../Team_Create_Dialog";

export default function TeamDetails({ member, locationId, action }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="" variant="ghost">
            <span>Details</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-md:w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-center text-clayInnPrimary">
              Member Details
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-4">
            <p className="flex items-center gap-2">
              <span>
                <FaUser size={20} />
              </span>
              <span>Name : </span>
              <span>{member?.name}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <CiHashtag size={20} />
              </span>
              <span>Role : </span>
              <span>{member?.role}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FaMobile size={20} />
              </span>
              <span>Contact : </span>
              <span>{member?.mobile}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <MdAttachEmail size={20} />
              </span>

              <span>Email : </span>
              <span>{member?.email}</span>
            </p>
          </div>
          <DialogFooter className="flex">
            <div>
              <Team_Create_Dialog
                member={member}
                locationId={locationId}
                action={action}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
