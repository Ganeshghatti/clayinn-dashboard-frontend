"use client";

import { Card } from "@/components/ui/card";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Location_Card_Menu from "../Location_Card_Menu";
import Link from "next/link";
import getRandomLightColor from "@/constants/random_Color";

export default function Location_Card({ location }) {
  return (
    <Card 
      className="relative p-6 transition-all duration-300 hover:shadow-lg"
      style={{ backgroundColor: getRandomLightColor() }}
    >
      <div className="absolute top-4 right-4">
        <Location_Card_Menu location={location} />
      </div>

      <Link href={`/location/${location.loc_id}/dashboard`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-xl" />
            <h3 className="text-xl font-semibold">{location.name}</h3>
          </div>

          <p className="text-sm text-gray-600">{location.address}</p>

          {location.location_admin && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <FaUser className="text-gray-600" />
                <span>{location.location_admin.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MdEmail className="text-gray-600" />
                <span>{location.location_admin.email}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
} 