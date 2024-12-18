"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BookingDetails from "../Booking_Details";
import Booking_Delete from "../Booking_Delete";
import DatePickerWithRange from "./date-filter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingsTable({ bookings, locationId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { all_venues } = useSelector((state) => state.venues);
  const { loading, error } = useSelector((state) => state?.bookings);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 100;

  // Search filter
  const filteredBookings = bookings?.results?.filter(
    (booking) =>
      booking?.lead?.hostname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.booking_number?.toString().includes(searchTerm) ||
      booking.lead?.mobile?.includes(searchTerm)
  );

  // Sorting
  const sortedBookings = [...(filteredBookings || [])]?.sort((a, b) => {
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

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (locationId) {
      dispatch(fetchVenues_Actions(locationId));
    }
  }, [dispatch, locationId]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update URL with search parameter
    router.push(pathname + '?' + createQueryString('booking_number', value));
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search */}
      <div className="mb-4 flex justify-between">
        <Input
          type="number"
          onWheel={(e) => e.target.blur()}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none max-w-sm w-full"
          placeholder="Search by name, booking number, or mobile..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
        />
        <div className="flex gap-4 items-center">
          <DatePickerWithRange />
          <Select
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            onValueChange={(value) =>
              router.push(
                pathname +
                  "?" +
                  createQueryString("venue", value == "All" ? "" : value)
              )
            }
            defaultValue={searchParams.get("venue") || ""}
          >
            <SelectTrigger className="w-[180px] bg-black text-white">
              <SelectValue placeholder="Filter by Venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Venue</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {all_venues?.map((ven) => (
                  <SelectItem key={ven.venue_id} value={ven.venue_id}>
                    {ven.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error: {error}
        </div>
      ) : bookings.results?.length === 0 ? (
        <div className="text-center">No bookings found</div>
      ) : (
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
      )}

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
