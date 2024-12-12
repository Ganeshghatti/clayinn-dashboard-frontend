"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BookingDetails from "../Booking_Details";
import Booking_Delete from "../Booking_Delete";

export default function BookingsTable({ bookings, locationId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 10;
  const { toast } = useToast();

  // Search filter
  const filteredBookings = bookings?.filter(
    (booking) =>
      booking.lead?.hostname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.booking_number?.toString().includes(searchTerm) ||
      booking.lead?.mobile?.includes(searchTerm)
  );

  // Sorting
  const sortedBookings = [...(filteredBookings || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const getValue = (obj, key) => {
      if (key === "hostname") return obj.lead?.hostname;
      if (key === "mobile") return obj.lead?.mobile;
      return obj[key];
    };

    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookings?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((sortedBookings?.length || 0) / itemsPerPage);

  const getSlots = (slot) => {
    if (slot == "evening") {
      return "Dinner";
    } else if (slot == "afternoon") {
      return "Lunch";
    } else {
      return slot;
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name, booking number, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Booking No.</th>
              <th className="p-3 text-left">Host Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Event Date</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((booking) => (
              <tr
                key={booking.booking_number}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{booking.booking_number}</td>
                <td className="p-3">{booking.lead?.hostname}</td>
                <td className="p-3">{booking.lead?.mobile}</td>
                <td className="p-3">{booking.event_date}</td>
                <td className="p-3">{getSlots(booking.slot)}</td>
                <td className="p-3">{booking.venue?.name}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <BookingDetails booking={booking} />
                    <Booking_Delete booking={booking} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedBookings?.length || 0)} of{" "}
          {sortedBookings?.length || 0} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
