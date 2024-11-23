"use client";

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
import axios from "axios";

export default function Booking_Delete({ booking }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access-token");
      await axios.delete(
        `https://clayinn-dashboard-backend.onrender.com/bookings-management/bookings/delete/${booking.booking_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete booking",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-red-700 hover:text-red-900">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-600">
            This action cannot be undone. This will permanently delete the
            booking and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
