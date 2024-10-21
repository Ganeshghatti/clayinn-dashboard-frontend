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
    <div className="pt-10 min-h-screen p-5 space-y-8  flex items-center  gap-3 flex-col ">
      <div className="w-[90vw] md:w-[85vw] flex items-center justify-between border border-slate-200 p-4 rounded-md shadow-sm mt-2 sticky top-0 ">
        <h1 className="text-2xl text-center font-semibold">
          Access your Hotel Locations
        </h1>
        {/* Common Dialog for Create and Update Form*/}
        <div className="flex items-center justify-center gap-4">
          <Common_Dialog_Create_and_Update heading="Create a New Location" description="This form will allow you to create a new location for the hotels." action="Create" />
          <Logout />
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
            <div key={item?.loc_id} className="bg-white px-2 py-4 flex border border-slate-200 rounded-lg shadow-xl">
              <Link href={`/locations/${item?.name.toLowerCase()}`}>
                <Card className="w-64 h-48 flex items-start justify-start flex-col shadow-none border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">{item?.name}</CardTitle>
                    <CardDescription className="text-sm">{item?.address}</CardDescription>
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
      )}
    </div>
  );
};

export default withAdmin(Page);
