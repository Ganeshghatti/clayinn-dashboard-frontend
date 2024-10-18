"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LocationItems } from "@/constants";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import withAdmin from "../../hoc/withAdmin";
import Link from "next/link";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import CreateLocation from "@/components/forms/create-location";

// Fetching Location from API

const fetchLocationInformation = async () => {
  try {
    const token = localStorage.getItem("access-token");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }
    const response = await axios.get(
      "https://clayinn-dashboard-backend.onrender.com/location-management/locations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Api Response", response.data);
  } catch (error) {
    console.log("Error making API request", error);
  }
};

const Page = () => {
  // Use Effect for Fetching API

  useEffect(() => {
    fetchLocationInformation();
  }, []);

  return (
    <div className="pt-10 h-screen p-5 space-y-8 bg-clayInnBackground flex items-center justify-center gap-3 flex-col family-poppins">
      <h1 className="text-2xl text-center font-semibold text-clayInnPrimary">
        Access your Hotel Locations
      </h1>
      <Dialog>
        <DialogTrigger className="bg-clayInnSecondary text-clayInnPrimary border-2 border-clayInnPrimary hover:bg-clayInnPrimary hover:text-clayInnSecondary rounded-md flex items-center justify-center px-4 py-2">
          <Plus className="w-5 h-4" />
          Create a Location
        </DialogTrigger>
        <DialogContent className="family-poppins">
          <DialogHeader>
            <DialogTitle className="text-clayInnPrimary">
              Create a New Location
            </DialogTitle>
            <DialogDescription>
              This form will allow you to create a new location for the hotels.
            </DialogDescription>
          </DialogHeader>
          <CreateLocation />
        </DialogContent>
      </Dialog>

      <div className="flex gap-2 flex-wrap items-center justify-center">
        {LocationItems.map((item, index) => (
          <Link href={`/locations/${item.title.toLowerCase()}`} key={index}>
            <Card className="py-6 w-72">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default withAdmin(Page);
