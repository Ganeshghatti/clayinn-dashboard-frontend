"use client";

import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import Header from "@/components/Header";
import Venue_Dialog from "@/components/Venue_Components/Venue_Dialog";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import getRandomLightColor from "@/constants/random_Color";
import Venue_Detail from "@/components/Venue_Components/Venue_Detail_Dialog";
import Footer_Component from "@/components/Footer";

export default function Venues() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { all_venues } = useSelector((state) => state.venues);

  const location_Id = pathname.split("/")[2];
  const locationName = pathname.split("/")[3];

  useEffect(() => {
    dispatch(fetchVenues_Actions(location_Id));
  }, [dispatch, location_Id]);

  return (
    <div className="flex flex-col gap-4 h-[95vh]">
      <div>
        <Header content={`${locationName}`} />
      </div>
      <div className="flex justify-end items-center gap-4">
        <Venue_Dialog action="create" location_Id={location_Id} />
      </div>

      <div className="h-screen  flex-1">
        {all_venues.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {all_venues.map((venue) => (
              <div key={venue?.venue_id} className="relative">
                <div
                  className={`max-md:w-[95vw] md:w-[300px]  p-4 rounded-lg h-[200px] border border-black/5 shadow-md flex flex-col items-center justify-center space-y-4`}
                  style={{ backgroundColor: venue?.bg_color }}
                >
                  <span className="text-xl font-bold capitalize">
                    {venue?.name}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <Venue_Detail location_Id={location_Id} venue={venue} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Venues Found </div>
        )}
      </div>
      <div>
        <Footer_Component content={location_Id} />
      </div>
    </div>
  );
}
