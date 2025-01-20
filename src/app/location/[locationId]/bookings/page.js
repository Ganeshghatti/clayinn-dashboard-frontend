"use client";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer_Component from "@/components/Footer";
import BookingsTable from "@/components/Booking_Components/Booking_Table";
import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

export default function Bookings() {
  const { locationId } = useParams();
  const token = getAccessToken();
  const decodedToken = jwtDecode(token);
  return (
    <div className="space-y-14 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-4">
        <Header content="Bookings Management" />
      </div>

      <div className="flex-1">
        <BookingsTable locationId={locationId} />
      </div>

      <Footer_Component content={decodedToken?.loc_address || ""} />
    </div>
  );
}
