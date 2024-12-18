"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBookings_Action } from "@/app/redux/booking_Slice";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingsTable({ locationId }) {
  const [filterState, setFilterState] = useState({
    venue: "All",
    start_date: null,
    end_date: null,
    booking_number: null,
    nextPage: null,
    previousPage: null,
  });
  const { all_venues } = useSelector((state) => state.venues);
  const { loading, error, bookings } = useSelector((state) => state?.bookings);
  const dispatch = useDispatch();

  const getSlots = (slot) => {
    if (slot == "evening") {
      return "Dinner";
    } else if (slot == "afternoon") {
      return "Lunch";
    } else {
      return slot;
    }
  };

  const handleFilterChange = (name, value) => {
    setFilterState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const {
        booking_number,
        nextPage,
        previousPage,
        venue,
        start_date,
        end_date,
      } = filterState;

      const query = {
        locationId,
        venue: venue !== "All" ? venue : null,
        booking_number: booking_number || null,
        start_date: start_date || null,
        end_date: end_date || null,
        next: nextPage || null,
        previous: previousPage || null,
      };

      await dispatch(fetchBookings_Action(query));
      console.log("booking fetched:", bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [
    filterState.start_date,
    filterState.end_date,
    filterState.venue,
    filterState.booking_number,
  ]);

  useEffect(() => {
    if (locationId) {
      dispatch(fetchVenues_Actions(locationId));
    }
  }, [locationId]);

  useEffect(() => {
    if (bookings.next || bookings.previous) {
      setFilterState((prevState) => ({
        ...prevState,
        nextPage: bookings.next,
        previousPage: bookings.previous,
      }));
    }
  }, [bookings.next, bookings.previous]);

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search */}
      <div className="mb-4 flex justify-between">
        <Input
          type="number"
          onWheel={(e) => e.target.blur()}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none max-w-sm w-full"
          placeholder="Search by booking number"
          value={filterState.booking_number}
          onChange={(e) => handleFilterChange("booking_number", e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <DatePickerWithRange handleFilterChange={handleFilterChange} />
          <Select
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            onValueChange={(value) => handleFilterChange("venue", value)}
            defaultValue={filterState.venue || ""}
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
        <div className="text-center text-red-600">Error: {error}</div>
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
              {bookings.results?.map((booking) => (
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
                      <Booking_Delete
                        booking={booking}
                        locationId={locationId}
                      />
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
          Showing {bookings?.results?.length || 0} of {bookings?.count || 0}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => fetchData()}
            disabled={filterState.previousPage == null ? true : false}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchData()}
            disabled={filterState.nextPage == null ? true : false}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
