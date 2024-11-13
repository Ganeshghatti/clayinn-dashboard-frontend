"use client";

import { delete_Lead_By_SuperAdmin } from "@/app/redux/lead_Slice";
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

import { useDispatch } from "react-redux";

export default function Lead_Delete({ lead }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onHandle_Delete_Lead = async () => {
    try {
      await dispatch(delete_Lead_By_SuperAdmin(lead?.lead_number));
      router.refresh();
      toast({
        title: "Lead Successfully Deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete lead",
      });
    }
  };

  return (
    <div>
      {" "}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-red-600 hover:bg-transparent hover:text-red-500"
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-600">
              This action cannot be undone. This will permanently delete your
              lead and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              onClick={onHandle_Delete_Lead}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
