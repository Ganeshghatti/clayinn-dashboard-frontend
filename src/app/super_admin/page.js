"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Location_Action } from "../redux/location_Slice";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Logout from "@/components/Auth_Components/Logout";
import Link from "next/link";

// REACT ICONS
import { FaLocationArrow } from "react-icons/fa";
import { PiBuildingsFill } from "react-icons/pi";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Location_Card_Menu from "@/components/Location_Components/Location_Card_Menu";
import Add_New_Location from "@/components/Location_Components/Add_New_Location";
import getRandomLightColor from "@/constants/random_Color";

export default function Super_Admin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { all_locations, isLoading, isError } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    dispatch(fetch_All_Location_Action());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-red-500 flex justify-center items-center h-screen font-semibold">
        Failed to load locations. Please try again.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen space-y-8 relative">
      <h1 className="max-md:text-xl md:text-3xl xl:text-4xl font-bold capitalize text-center text-mainText mt-10">
        Welcome to ClayInn Hotels
      </h1>
      <div>
        <h1 className="max-md:text-sm md:text-lg xl:text-xl font-bold capitalize">
          Access your Hotel all Locations
        </h1>
      </div>

      <div className="flex max-md:flex-col flex-row items-end justify-end gap-2">
        <Add_New_Location action={"create"} />
        <Logout className={"px-8 py-2 rounded-full"} />
      </div>

      {isError ? (
        <p className="text-red-500 flex justify-center items-center h-screen font-semibold">
          Failed to load locations. Please try again.
        </p>
      ) : (
        <div className="flex max-md:flex-col  items-center justify-center flex-wrap gap-4">
          {all_locations.length > 0 ? (
            all_locations.map((location, index) => (
              <div
                key={index}
                className="flex justify-between  border border-black/5 shadow  rounded-xl max-md:w-[90vw] md:w-[400px] h-[200px] p-4 "
                style={{ backgroundColor: getRandomLightColor() }}
              >
                <Link
                  href={`/location/${location?.loc_id}/dashboard`}
                  className="space-y-6 mt-8"
                >
                  <h1 className="max-md:text-lg md:text-xl font-semibold flex items-center gap-4">
                    <span>
                      <PiBuildingsFill size={20} />
                    </span>
                    <span>{location?.name}</span>
                  </h1>
                  <div className="">
                    <Separator />
                  </div>
                  <p className="text-xs flex items-center gap-4">
                    <span>
                      <FaLocationArrow size={20} />
                    </span>
                    <span>{location?.address}</span>
                  </p>
                </Link>

                <div className="bg-black/5  rounded-full p-2 flex h-fit w-fit hover:bg-black/20 transition-all duration-300 ease-linear cursor-pointer">
                  <Location_Card_Menu location={location} />
                </div>
              </div>
            ))
          ) : (
            <p>Please Add Location To Access!</p>
          )}
        </div>
      )}
      <div className="absolute top-0 left-0 w-[100px] h-[150px] bg-sideBg/50 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[100px] h-[150px] bg-sideBg/50 blur-3xl z-10"></div>
    </div>
  );
}
