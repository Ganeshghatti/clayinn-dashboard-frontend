"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings_Action } from "@/app/redux/booking_Slice";
import Header from "@/components/Header";
import Footer_Component from "@/components/Footer";
import BookingsTable from "@/components/Booking_Components/Booking_Table";
import { useSearchParams } from "next/navigation";

export default function Bookings() {
  const { locationId } = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  const venue = searchParams.get("venue") || '';
  const start_date = searchParams.get("start_date") || '';
  const end_date = searchParams.get("end_date") || '';
  const booking_number = searchParams.get("booking_number") || '';


  useEffect(() => {
    dispatch(fetchBookings_Action({locationId, venue, start_date, end_date, booking_number}));
  }, [dispatch, locationId, venue, start_date, end_date, booking_number]);


  return (
    <div className="space-y-14 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-4">
        <Header content="Bookings Management" />
      </div>

      <div className="flex-1">
         <BookingsTable bookings={bookings} locationId={locationId} />
      </div>

      <Footer_Component content={locationId} />
    </div>
  );
}
