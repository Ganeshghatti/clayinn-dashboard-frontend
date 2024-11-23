"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings_Action } from "@/app/redux/booking_Slice";
import Header from "@/components/Header";
import Footer_Component from "@/components/Footer";
import BookingsTable from "@/components/Booking_Components/Booking_Table";

export default function Bookings() {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings_Action(locationId));
  }, [dispatch, locationId]);

  // Debug logs
  console.log("Bookings from state:", bookings);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  return (
    <div className="space-y-14 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-4">
        <Header content="Bookings Management" />
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="text-center">Loading bookings...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : bookings?.length === 0 ? (
          <div className="text-center">No bookings found</div>
        ) : (
          <BookingsTable bookings={bookings} locationId={locationId} />
        )}
      </div>

      <Footer_Component content={locationId} />
    </div>
  );
}
