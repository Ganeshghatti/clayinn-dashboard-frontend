"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import axios from "axios";
import withAdmin from "../../hoc/withAdmin";
import Link from "next/link";


import Location_Details from "@/components/Location_Components/Location_details";
import Common_Dialog_Create_and_Update from "@/components/common_Dialog_Create_and Update";
import Logout from "@/components/auth/Logout";

import { FaHotel } from "react-icons/fa6";

import background from "@/public/pattern.svg";
// URL From Environment Variable
const url = process.env.NEXT_PUBLIC_URL;

// Fetching Location from API
const fetchLocationInformation = async () => {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const response = await axios.get(`${url}/location-management/locations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching location information:", error);
    throw error;
  }
};

const Page = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use Effect for Fetching API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchLocationInformation();
        setLocationData(data);
      } catch (error) {
        setError("Failed to fetch location data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="pt-10 min-h-screen p-5 space-y-8  flex items-center  gap-3 flex-col bg-clayInnBackground relative" style={{
      backgroundImage: `url(${background.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: "100vh",
      width: "100%",
    }}>
      <div className="w-[90vw] md:w-[85vw] flex items-center max-md:flex-col gap-4 justify-between p-4 mt-2 absolute z-10 bg-clayInnBackground sticky top-0 border rounded-3xl shadow-2xl border-clayInnPrimary">
        <h1 className="flex items-center justify-center gap-2 text-base md:text-2xl text-center font-semibold text-clayInnPrimary uppercase">
          <span>
            <FaHotel />
          </span>
          <span>
            Access your Hotel all Locations
          </span>
        </h1>
        {/* Common Dialog for Create and Update Form*/}
        <div className="flex items-center justify-center gap-2">
          <Common_Dialog_Create_and_Update heading="Create a New Location" description="This form will allow you to create a new location for the hotels." action="Create" />
          <Logout className="rounded-full bg-clayInnPrimary text-clayInnBackground hover:bg-clayInnBackground hover:text-clayInnPrimary hover:border-clayInnPrimary border-clayInnBackground border-2 transition-all duration-300 ease-linear" />
        </div>
      </div>
      {/* Display loading, error, or location data */}
      {loading ? (
        <p>Loading locations...</p> // Display loading state
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message if there's an error
      ) : (
        <div className="flex gap-2 flex-wrap items-center justify-center">
          {locationData?.map((item) => (

            <div key={item?.loc_id} className="px-2 py-4 flex border border-gray-300 rounded-lg shadow-2xl scale-100 hover:scale-95 transition-all duration-300 ease-linear" style={{
              backgroundImage: `url(${background.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <Link href={`/locations/${item?.name.toLowerCase()}`}>
                <Card className="w-56 h-40 md:w-64 md:h-40 flex items-start justify-start flex-col shadow-none border-none bg-transparent" >
                  <CardHeader>
                    <CardTitle className="font-semibold text-lg text-clayInnPrimary">{item?.name.toUpperCase()}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-white py-10 font-normal">{item?.address}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <div className="flex items-end justify-end">
                {/* Pass locationId to Location_Details */}
                <Location_Details locationId={item?.loc_id} />
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div >
  );
};

export default withAdmin(Page);
