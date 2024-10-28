"use client";

import React, { useEffect, useState } from "react";
import VenueCard from "@/components/venue_components/venue_Card";
import { VenueNewPost } from "@/components/venue_components/Venue_New_Post";


import { useDispatch, useSelector } from "react-redux";
import { fetchLocations_Actions } from "@/app/redux/locationsSlice";
import { useParams } from "next/navigation";
import { fetchVenues_Actions } from "@/app/redux/venueSlice";


import { FaChevronRight } from "react-icons/fa";
import Footer from "@/components/Footer";

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
    <div className="flex flex-col gap-4 px-2 h-full">
      {/* Header section */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="flex items-center justify-start text-sm sm:text-xl md:text-2xl font-bold text-mainText capitalize">
          <span className="text-mainText/60">Clay Inn Hotels</span>
          <span><FaChevronRight /></span>
          <span>
            {locationId} Venue
          </span>
        </h1>

        <div>
          <VenueNewPost action="Create" location_id={location_id} />
        </div>
      </div>




      {/* Handle loading and error states */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}


      {/* Venue Cards */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {venues.length > 0 ? (
            venues.map((venue, index) => (
              <VenueCard key={index} venue={venue} location_id={location_id} />
            ))
          ) : (
            <p>No venues found for this location.</p>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="mt-4">
        <Footer content={`${locationId} Venue`} />
      </div>

    </div>
  );
}
