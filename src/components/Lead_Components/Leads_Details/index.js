"use client";

import { fetch_Lead_By_ID } from "@/app/redux/lead_Slice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar, FiPhone, FiMail, FiMapPin } from "react-icons/fi"; // Add icons

export default function LeadsDetails({ lead }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { lead_By_Id } = useSelector((state) => state.leads);

  console.log(lead, "----------");

  useEffect(() => {
    if (lead?.lead_number) {
      dispatch(fetch_Lead_By_ID(lead.lead_number));
    }
  }, [dispatch, lead?.lead_number]);

  const date = lead_By_Id?.lead_entry_date
    ? new Date(lead_By_Id.lead_entry_date).toLocaleDateString()
    : "N/A";

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-blue-700 font-medium hover:text-blue-900"
          >
            View Lead Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:max-w-[90%] md:max-w-[85%] h-[90vh] mx-auto p-6 bg-white rounded-lg shadow-lg overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-blue-700 text-center mb-6">
              Lead Information
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            {/* Basic Lead Information */}
            <section className="p-5 bg-blue-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-blue-700">
                Basic Details
              </h2>
              <Separator className="my-3" />
              <table className="w-full text-gray-700 text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold">Lead Number:</td>
                    <td>{lead_By_Id?.lead_number || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Lead Status:</td>
                    <td>{lead_By_Id?.lead_status || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Call Status:</td>
                    <td>{lead_By_Id?.call_status || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Follow-up Date:</td>
                    <td>{lead_By_Id?.followup || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Lead Entry Date:</td>
                    <td>{date}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Contact Information */}
            <section className="p-5 bg-green-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <FiPhone /> Contact Information
              </h2>
              <Separator className="my-3" />
              <table className="w-full text-gray-700 text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold">Name:</td>
                    <td>{lead_By_Id?.hostname || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Mobile:</td>
                    <td>{lead_By_Id?.mobile || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Email:</td>
                    <td>{lead_By_Id?.email || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Venue Information */}
            <section className="p-5 bg-purple-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                <FiMapPin /> Venue Information
              </h2>
              <Separator className="my-3" />
              <p className="text-gray-700 font-medium">
                Location ID: {lead_By_Id?.location_id || "N/A"}
              </p>
            </section>

            {/* Occasion Details */}
            <section className="p-5 bg-orange-50 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-orange-700">
                Occasion Details
              </h2>
              <Separator className="my-3" />
              <div className="space-y-4">
                {lead_By_Id?.occasions?.map((occasion) => (
                  <div
                    key={occasion.id}
                    className="p-4 border border-orange-200 rounded-md bg-white shadow-sm"
                  >
                    <h3 className="text-md font-semibold text-orange-600 capitalize">
                      {occasion.occasion_type === "wedding"
                        ? "Wedding Event"
                        : "Room Arrangement"}
                    </h3>
                    <Separator className="my-2" />

                    {/* Wedding Event Details Table */}
                    {occasion.occasion_type === "wedding" ? (
                      <table className="w-full text-gray-600 text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold">Date of Function:</td>
                            <td>{occasion.date_of_function || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Day:</td>
                            <td>{occasion.day || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Lunch Pax:</td>
                            <td>{occasion.lunch_pax || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Hi Tea Pax:</td>
                            <td>{occasion.hi_tea_pax || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Dinner Pax:</td>
                            <td>{occasion.dinner_pax || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">DJ Value:</td>
                            <td>{occasion.dj_value || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Decor Value:</td>
                            <td>{occasion.decor_value || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Liquor Value:</td>
                            <td>{occasion.liquor_value || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Vedi Value:</td>
                            <td>{occasion.vedi_value || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Total:</td>
                            <td>{occasion.total || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-gray-600 text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold">Number of Pax:</td>
                            <td>{occasion.number_of_pax || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Number of Rooms:</td>
                            <td>{occasion.number_of_rooms || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Plan:</td>
                            <td>{occasion.plan || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Total:</td>
                            <td>{occasion.total || "N/A"}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
