"use client";

import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { fetchLocations_Actions } from "@/app/redux/locationsSlice";
import { fetchLeads_Action } from "@/app/redux/leadsSlice";
import LeadsTable from "@/components/LeadsComponents/LeadsTable";
import LeadDialog from "@/components/LeadsComponents/LeadDialog";

export default function Page() {
  const [filteredLocationId, setFilteredLocationId] = useState([]);
  const { locationId } = useParams();
  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.locations);
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLocations_Actions());
  }, [dispatch]);

  useEffect(() => {
    if (locationId && locations.length > 0) {
      const filtered = locations.filter((location) =>
        location.loc_id.toLowerCase().startsWith(locationId.toLowerCase())
      );
      setFilteredLocationId(filtered);
    }
  }, [locations, locationId]);

  const [location_of_Venue] = filteredLocationId;
  const location_id = location_of_Venue?.loc_id;

  useEffect(() => {
    if (location_id) {
      dispatch(fetchLeads_Action(location_id));
    }
  }, [dispatch, location_id]);


  const total_Leads = leads?.results;



  return (
    <div className="flex flex-col gap-4 px-2 h-screen">
      {/* Header section */}
      <div className="mt-4 flex items-center justify-between px-5">
        <div>
          <h1 className="flex items-center justify-start text-sm sm:text-xl md:text-2xl font-bold text-mainText capitalize">
            <span className="text-mainText/60">Clay Inn Hotels</span>
            <span><FaChevronRight /></span>
            <span>{locationId} Team</span>
          </h1>
        </div>
        <div className="">
          <LeadDialog />
        </div>
      </div>
      <div className="flex-1 mt-10">
        <LeadsTable leads={total_Leads} />
      </div>
      <div>
        <Footer content={`${locationId} Leads`} />
      </div>
    </div>
  );
}
