"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All_Location_Action } from "../redux/location_Slice";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Logout from "@/components/Auth_Components/Logout";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/utils/auth";

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
  console.log(all_locations);

  useEffect(() => {
    const checkAndFetchData = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          router.push("/");
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role !== "super-admin") {
          router.push("/");
          return;
        }

        dispatch(fetch_All_Location_Action());
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/");
      }
    };

    checkAndFetchData();
  }, [dispatch, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <PiBuildingsFill size={30} />
          <h1 className="text-2xl font-bold">Locations</h1>
        </div>
        <div className="flex items-center gap-4">
          <Add_New_Location />
          <Logout className="bg-red-600 hover:bg-red-500" />
        </div>
      </div>

      <Separator />

      <div className="flex-1 p-4">
        {/* {isError &&
          <div className="text-center text-red-600">
            Error: {isError}
          </div>
        } */}
        {!all_locations || all_locations?.length === 0 ? (
          <div className="text-center">No locations found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {all_locations?.map((location) => (
              <div
                key={location.loc_id}
                className="bg-white rounded-lg shadow-md p-4 relative group"
                style={{ backgroundColor: getRandomLightColor() }}
              >
                <div className="absolute top-2 right-2">
                  <Location_Card_Menu location={location} />
                </div>
                <Link href={`/location/${location.loc_id}/dashboard`}>
                  <div className="flex items-center gap-4 cursor-pointer">
                    <FaLocationArrow size={25} />
                    <div>
                      <h2 className="text-xl font-semibold">{location.name}</h2>
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
