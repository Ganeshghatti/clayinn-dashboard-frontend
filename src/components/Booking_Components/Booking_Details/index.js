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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BookingDetails({ booking }) {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  // const { booking, loading, error } = useSelector((state) => state?.bookings);
  // const { toast } = useToast();

  // useEffect(() => {
  //   console.log("Booking ID:", booking);
  //   if (booking?.booking_number && open) {
  //     console.log("Fetching booking details for:", booking.id);
  //     dispatch(fetchBookingDetails_Action(booking.booking_number));
  //   }
  // }, [booking?.id, open, dispatch]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setOpen(true)}
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        {/* {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>} */}
        
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Booking Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Booking Number</p>
                  <p>{booking.booking_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Event Date</p>
                  <p>{booking.event_date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slot</p>
                  <p className="capitalize">{booking.slot}</p>
                </div>
              </div>
            </div>

            {/* Lead Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Lead Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Host Name</p>
                  <p>{booking.lead?.hostname || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                  <p>{booking.lead?.mobile || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{booking.location?.name || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Venue Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Venue Name</p>
                  <p>{booking.venue?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Venue Type</p>
                  <p className="capitalize">{booking.venue?.venue_type || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
