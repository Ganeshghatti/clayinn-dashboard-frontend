"use client";

import { fetch_Lead_By_ID } from "@/app/redux/lead_Slice/index";
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

export default function LeadsDetails({ lead }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { lead_By_Id } = useSelector((state) => state.leads);

  useEffect(() => {
    if (lead?.lead_number) {
      dispatch(fetch_Lead_By_ID(lead.lead_number));
    }
  }, [dispatch, lead?.lead_number]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-blue-600">
            Lead Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-md:max-w-[90%] md:max-w-[95%] h-[90vh] mx-auto p-6 bg-white rounded-md shadow-md overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
              Lead Information
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500"></DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Lead Information */}
            <section>
              <div className="space-y-2">
                <p>
                  <strong>Lead Number:</strong> {lead_By_Id?.lead_number}
                </p>
                <p>
                  <strong>Lead Status:</strong> {lead_By_Id?.lead_status}
                </p>
                <p>
                  <strong>Call Status:</strong> {lead_By_Id?.call_status}
                </p>
                <p>
                  <strong>Follow-up Date:</strong> {lead_By_Id?.followup}
                </p>
                <p>
                  <strong>Remark:</strong> {lead_By_Id?.remark}
                </p>
                <p>
                  <strong>Lead Entry Date:</strong>{" "}
                  {lead_By_Id?.lead_entry_date}
                </p>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {lead_By_Id?.hostname}
                </p>
                <p>
                  <strong>Mobile:</strong> {lead_By_Id?.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {lead_By_Id?.email}
                </p>
              </div>
            </section>

            <Separator />

            {/* Salesperson Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Salesperson Information
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {lead_By_Id.sales_person?.name}
                </p>
                <p>
                  <strong>Role:</strong> {lead_By_Id.sales_person?.role}
                </p>
              </div>
            </section>

            <Separator />

            {/* Venue Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Venue Information
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>Venue ID:</strong> {lead_By_Id?.venue_id}
                </p>
                <p>
                  <strong>Location ID:</strong> {lead_By_Id?.location_id}
                </p>
              </div>
            </section>

            <Separator />

            {/* Engagements */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Engagements
              </h2>
              <table className="w-full border border-gray-200 text-center text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-200 text-gray-600">
                    <th>Date</th>
                    <th>Day</th>
                    <th>Lunch Min Pax</th>
                    <th>Hi Tea Min Pax</th>
                    <th>Dinner Min Pax</th>
                    <th>DJ</th>
                    <th>Decor</th>
                    <th>Liquor</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lead_By_Id?.engagements?.map((engagement, index) => (
                    <tr key={index} className="border-b">
                      <td>{engagement.date_of_function}</td>
                      <td>{engagement.day}</td>
                      <td>{engagement.lunch_min_pax_value || "N/A"}</td>
                      <td>{engagement.hi_tea_min_pax_value || "N/A"}</td>
                      <td>{engagement.dinner_min_pax_value || "N/A"}</td>
                      <td>{engagement.dj_type === "yes" ? "Yes" : "No"}</td>
                      <td>{engagement.decor_value || "N/A"}</td>
                      <td>{engagement.liquor_value || "N/A"}</td>
                      <td>{engagement.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Weddings */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Weddings
              </h2>
              <table className="w-full border border-gray-200 text-center text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-200 text-gray-600">
                    <th>Date</th>
                    <th>Day</th>
                    <th>Lunch Min Pax</th>
                    <th>Hi Tea Min Pax</th>
                    <th>Dinner Min Pax</th>
                    <th>DJ</th>
                    <th>Decor</th>
                    <th>Liquor</th>
                    <th>Vedi</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lead_By_Id?.weddings?.map((wedding, index) => (
                    <tr key={index} className="border-b">
                      <td>{wedding.date_of_function}</td>
                      <td>{wedding.day}</td>
                      <td>{wedding.lunch_min_pax_value || "N/A"}</td>
                      <td>
                        {wedding.hi_tea_min_pax_type === "yes" ? "Yes" : "No"}
                      </td>
                      <td>{wedding.dinner_min_pax_value || "N/A"}</td>
                      <td>{wedding.dj_type === "yes" ? "Yes" : "No"}</td>
                      <td>{wedding.decor_value || "N/A"}</td>
                      <td>{wedding.liquor_value || "N/A"}</td>
                      <td>{wedding.vedi_value || "N/A"}</td>
                      <td>{wedding.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Room Arrangements */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Room Arrangements
              </h2>
              <table className="w-full border border-gray-200 text-center text-sm md:text-base">
                <thead>
                  <tr className="bg-blue-200 text-gray-600">
                    <th>Number of Pax</th>
                    <th>Number of Rooms</th>
                    <th>Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {lead_By_Id?.rooms?.map((room, index) => (
                    <tr key={index} className="border-b">
                      <td>{room.number_of_pax}</td>
                      <td>{room.number_of_rooms}</td>
                      <td>{room.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
