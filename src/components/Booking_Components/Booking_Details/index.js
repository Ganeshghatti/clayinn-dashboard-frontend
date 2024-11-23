"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FiCalendar, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

export default function BookingDetails({ booking }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-blue-700 font-medium hover:text-blue-900"
          >
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:max-w-[90%] md:max-w-[85%] h-[90vh] mx-auto p-6 bg-white rounded-lg shadow-lg overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-blue-700 text-center mb-6">
              Booking Information
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {/* Basic Booking Information */}
            <section className="p-5 bg-blue-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-blue-700">
                Basic Details
              </h2>
              <Separator className="my-3" />
              <table className="w-full text-gray-700 text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold">Booking Number:</td>
                    <td>{booking?.booking_number || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Event Date:</td>
                    <td>{booking?.event_date || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Slot:</td>
                    <td className="capitalize">{booking?.slot || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Venue:</td>
                    <td>{booking?.venue?.name || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Lead Information */}
            <section className="p-5 bg-green-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-green-700">
                Lead Information
              </h2>
              <Separator className="my-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Host Name:</span>
                    <span>{booking?.lead?.hostname || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-green-600" />
                    <span>{booking?.lead?.mobile || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-green-600" />
                    <span>{booking?.lead?.email || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-green-600" />
                    <span>{booking?.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-green-600" />
                    <span>Lead Entry: {new Date(booking?.lead?.lead_entry_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Occasion Details */}
            <section className="p-5 bg-orange-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-orange-700">
                Occasion Details
              </h2>
              <Separator className="my-3" />
              <div className="space-y-4">
                <div className="p-4 border border-orange-200 rounded-md bg-white shadow-sm">
                  <h3 className="text-md font-semibold text-orange-600 capitalize">
                    {booking?.occasion?.occasion_type || "N/A"}
                  </h3>
                  <Separator className="my-2" />
                  <table className="w-full text-gray-600 text-sm">
                    <tbody>
                      {booking?.occasion?.occasion_type === "wedding" ? (
                        <>
                          <tr>
                            <td className="font-semibold">Date of Function:</td>
                            <td>{booking?.occasion?.date_of_function || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Total Pax:</td>
                            <td>
                              {(
                                (booking?.occasion?.lunch_pax || 0) +
                                (booking?.occasion?.hi_tea_pax || 0) +
                                (booking?.occasion?.dinner_pax || 0)
                              ) || "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Total Value:</td>
                            <td>{booking?.occasion?.total || "N/A"}</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="font-semibold">Number of Pax:</td>
                            <td>{booking?.occasion?.number_of_pax || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Number of Rooms:</td>
                            <td>{booking?.occasion?.number_of_rooms || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Total:</td>
                            <td>{booking?.occasion?.total || "N/A"}</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
