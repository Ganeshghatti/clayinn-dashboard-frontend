"use client";

import { deleteMember } from "@/app/redux/team_Slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDispatch } from "react-redux";

export default function Team_Delete({ member, locationId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteMember({ location_id: locationId, member_id: member.user_id })
      );
      router.refresh();
      window.location.reload();
      toast({
        title: "Member Deleted Successfully !",
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${error}`,
      });
    }
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="text-red-600 hover:text-red-500 " variant="ghost">
            <span>Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-500">
              This action cannot be undone. This will permanently delete your
              team and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-500  flex items-center gap-2"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
