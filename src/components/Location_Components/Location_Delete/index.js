"use client";

import { delete_Location_Action } from "@/app/redux/location_Slice";
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

// REACT ICONS
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";

export default function Location_Delete({ location }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  // ON HANDLE DELETE
  const on_handleDelete = async () => {
    console.log(location.loc_id, "LOCATION ID");
    try {
      await dispatch(delete_Location_Action(location?.loc_id));
      toast({
        title: "Location Deleted Successfully",
        description: "Location has been deleted successfully",
      });
      setOpen(false);
      router.refresh();
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="flex items-center gap-2 rounded-full px-6 py-4">
            <span>
              <TiDeleteOutline size={20} />
            </span>
            <span>Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-md:w-[95vw] md:w-[500px] m-auto space-y-8">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-red-500">
              This action cannot be undone. This will permanently delete your
              Location and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white"
              onClick={on_handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
