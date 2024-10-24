"use client";

import React, { useEffect, useState } from "react";
import VenueCard from "@/components/venue_components/venue_Card";
import { VenueNewPost } from "@/components/venue_components/Venue_New_Post";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useDispatch, useSelector } from "react-redux";
import { fetchLocations_Actions } from "@/app/redux/locationsSlice";
import { useParams } from "next/navigation";
import { fetchVenues_Actions } from "@/app/redux/venueSlice";

export default function Page() {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const [filteredLocations, setFilteredLocations] = useState({});


  const { locations, isLoading, error } = useSelector((state) => state.locations);
  const { venues, isLoading: venuesLoading, error: venuesError } = useSelector(
    (state) => state.venues
  );

  useEffect(() => {
    dispatch(fetchLocations_Actions());
  }, [dispatch]);

  useEffect(() => {
    if (locations.length > 0 && locationId) {
      const filtered = locations.filter((location) =>
        location?.loc_id.toLowerCase().startsWith(locationId.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [locations, locationId]);

  const location_id = filteredLocations[0]?.loc_id

  useEffect(() => {
    if (location_id) {
      dispatch(fetchVenues_Actions(location_id));
    }
  }, [location_id, dispatch]);



  return (
    <div className="flex flex-col gap-4 px-2">
      {/* Header section */}
      <div className="w-[95vw] m-auto md:w-[80vw] flex items-center justify-between p-4 rounded-lg shadow-sm mt-2 sticky top-0 bg-clayInnPrimary">
        <div className="bg-clayInnBackground text-clayInnPrimary rounded-full py-2 px-2">
          <SidebarTrigger className="hover:bg-clayInnBackground hover:text-clayInnPrimary hover:animate-pulse transition-all duration-300 ease-linear" />
        </div>
        <h1 className="lg:text-xl text-base uppercase font-semibold text-clayInnBackground">
          {locationId ? `${locationId} Venues Page` : "Venues Page"}
        </h1>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-clayInnBackground text-clayInnPrimary  rounded-sm py-[0.4rem] px-2 hidden md:block">
            <h1 className="flex items-center justify-center gap-1 font-semibold">
              Total Venue :
              <span>
                {
                  venues.length
                }
              </span>
            </h1>
          </div>
          <div>
            <VenueNewPost action="Create" location_id={location_id} />
          </div>
        </div>
      </div>

      {/* Handle loading and error states */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {/* Venue Cards */}
      <div className="">
        <div className="flex items-center justify-center flex-wrap gap-4 max-md:items-center max-md:justify-center">
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <VenueCard key={index} venue={venue} location_id={location_id} />
            ))
          ) : (
            <p>No venues found for this location.</p>
          )}
        </div>
      </div>
    </div>
  );
}
