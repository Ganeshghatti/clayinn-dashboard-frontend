"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { fetchBookingDetails_Action, deleteBooking_Action } from "@/app/redux/booking_Slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiPhone, FiMail, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { format } from "date-fns";

export default function BookingDetails({ booking }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedBooking, loading, error } = useSelector((state) => state.bookings);
  const { toast } = useToast();

  useEffect(() => {
    if (booking?.id && open) {
      dispatch(fetchBookingDetails_Action(booking.id));
    }
  }, [booking?.id, open, dispatch]);

  const handleDeleteBooking = async () => {
    try {
      await dispatch(deleteBooking_Action(booking.id)).unwrap();
      setOpen(false);
      toast({
        title: "Success",
        description: "Booking deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete booking"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}
        
        {!loading && selectedBooking && (
          <div className="space-y-6">
            {/* Basic Booking Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Booking Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Booking Number</p>
                  <p>{selectedBooking.booking_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Event Date</p>
                  <p>{selectedBooking.event_date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slot</p>
                  <p className="capitalize">{selectedBooking.slot}</p>
                </div>
              </div>
            </div>

            {/* Lead Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Lead Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Host Name</p>
                  <p>{selectedBooking.lead?.hostname || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                  <p>{selectedBooking.lead?.mobile || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{selectedBooking.location?.name || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Venue Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Venue Name</p>
                  <p>{selectedBooking.venue?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Venue Type</p>
                  <p className="capitalize">{selectedBooking.venue?.venue_type || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
