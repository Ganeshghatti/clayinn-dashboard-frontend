"use client";

import { fetchLeads_Action } from "@/app/redux/lead_Slice";
import Booking_Create_Dialog from "@/components/Booking_Components/Booking_Create_Dialog";
import Footer_Component from "@/components/Footer";
import Header from "@/components/Header";
import LeadTable from "@/components/Lead_Components/Lead_Table";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Bookings() {
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];
  const location_Name = pathName.split("/")[2];
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads_Action(locationId));
  }, [dispatch, locationId]);

  return (
    <div className="space-y-14 flex flex-col justify-between h-[95vh]">
      <div className="flex flex-col gap-4">
        <div>
          <Header content={`${locationName}`} />
        </div>
      </div>
      <div className="mt-10 flex-1">
        <LeadTable leads={leads} locationId={locationId} />
      </div>
      <div>
        <Footer_Component content={location_Name} />
      </div>
    </div>
  );
}
