"use client";

import "./styles.css";

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

import logo1 from "@/public/logo1.png";

import Image from "next/image";


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
    <div className="pt-10 min-h-screen p-5 space-y-8  flex items-center  gap-3 flex-col bg-clayInnBackground relative bg-mainBackground relative z-50">

      {/* ---------------------------Header Section---------------------------- */}
      <div className="flex flex-col items-end justify-between w-full space-y-8">
        <div className="flex items-center justify-center gap-2 w-full">
          <h1 className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-3xl font-semibold text-mainText">
            <span>
              <FaHotel />
            </span>
            <span>
              Access your Hotel all Locations
            </span>
          </h1>
        </div>
        {/* Common Dialog for Create and Update Form*/}
        <div className="flex items-center justify-center gap-2">
          <Common_Dialog_Create_and_Update heading="Create a New Location" description="This form will allow you to create a new location for the hotels." action="Create" />
          <Logout className="" />
        </div>
      </div>
      {/* --------------------------------------------------------------------- */}
      {/* Display loading, error, or location data */}
      {loading ? (
        <p>Loading locations...</p> // Display loading state
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message if there's an error
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {locationData?.map((item) => (
            <div key={item?.loc_id} className="space-y-8 w-[300px] h-[260px]  flex flex-col justify-between border border-clayInnBackground/50 rounded-md pb-1  pr-4 shadow-xl shadow-clayInnBackground/20 scale-95 hover:scale-100 transition-all duration-300 ease-linear hover:ring-2 hover:ring-clayInnBackground/50" >
              <Link href={`/locations/${item?.name.toLowerCase()}`}>
                <div className="space-y-6">
                  <div className="bg-[#1B160D] text-clayInnBackground h-16 text-lg font-semibold flex items-center justify-center rounded-br-[40px]">
                    <h1 className="capitalize tracking-wide">{item?.name}</h1>
                  </div>
                  <div className="bg-[#D4C7A3] text-[#523517] text-sm font-semibold h-24 flex items-center justify-center px-2 rounded-r-3xl">
                    <h1>
                      {item?.address}
                    </h1>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Location_Details locationId={item?.loc_id} />
                </div>
                <div>
                  <Image src={logo1} alt="background" width={50} height={50} quality={100} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
      }
      <div className="absolute w-72 h-72 bg-clayInnBackground/50 -z-50 top-0 left-0 rounded-full blur-3xl hidden lg:block"></div>
      <div className="absolute w-72 h-72 bg-clayInnBackground -z-50 bottom-0 right-0 rounded-full blur-3xl hidden lg:block"></div>
    </div >
  );
};

export default withAdmin(Page);



// <div className="">
// {/* Pass locationId to Location_Details */}
// 
// </div>


{/* <Card className="p-0" >
<CardHeader>
  <CardTitle className="bg-black text-white">{item?.name.toUpperCase()}</CardTitle>
  <CardDescription className="">{item?.address}</CardDescription>
</CardHeader>
</Card> */}