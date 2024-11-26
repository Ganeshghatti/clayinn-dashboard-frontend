import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/alert-dialog";

export default function Location_Delete_Dialog({ open, onOpenChange, location }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await dispatch(delete_Location_Action(location.loc_id)).unwrap();
      toast({
        title: "Success",
        description: "Location deleted successfully",
      });
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete location",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Location</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this location? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 