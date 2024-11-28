"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenueDetails_Action } from "@/app/redux/venue_Slice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { convertBookingsToEvents } from "@/function";

// React Icons
import { CiMenuKebab } from "react-icons/ci";
import Venue_Dialog from "../Venue_Dialog";
import Delete_Dialog from "../Venue_Delete_Dialog";

// REACT ICONS
import { FaBuilding } from "react-icons/fa6";

import "../../../app/globals.css";
import axiosInstance from "@/utils/axiosInstance";

export default function Venue_Detail({ location_Id, venue }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState();
  const [events, setEvents] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleEventsSet = async (arg) => {
    const currentMonth = arg.start.getMonth() + 1; // Months are 0-indexed
    const currentYear = arg.start.getFullYear();

    try {
      const token = localStorage.getItem("access-token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const URL = process.env.NEXT_PUBLIC_URL;

      const response = await axiosInstance.get(
        `${URL}/venue-management/venues/detail/${venue?.venue_id}/?year=${currentYear}&month=${currentMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  // Event click handler
  const handleEventClick = (info) => {
    setSelectedEvent(info.event); // Store clicked event data in state
  };

  useEffect(() => {
    const eventsArray = convertBookingsToEvents(bookings);
    setEvents(eventsArray); // Set the converted events in state
  }, [bookings]);

  useEffect(() => {
    if (venue?.venue_id) {
      dispatch(fetchVenueDetails_Action({
        venue_id: venue.venue_id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1 // Adding 1 because getMonth() returns 0-11
      }));
    }
  }, [dispatch, venue?.venue_id, currentDate]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-0 ">
            <CiMenuKebab />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full space-y-8">
          <DialogHeader>
            <DialogTitle className="text-center mb-8">
              Venue Details
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center gap-2">
              <span>
                <FaBuilding size={20} />
              </span>
              <span>{venue?.name}</span>
              {/* Calendar Implementation */}
              <div className="venue-calendar w-full max-w-6xl mx-auto">
                  <FullCalendar
                    eventClassNames="bg-blue-500 text-white rounded-md py-1 px-2 shadow-sm hover:bg-blue-600"
                    dayCellClassNames={"p-5"}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    datesSet={handleEventsSet}
                    showNonCurrentDates={false}
                    eventClick={handleEventClick}
                    eventTimeFormat={{
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false, // Use true for 12-hour format
                    }}
                  />

                {selectedEvent && (
                  <Dialog
                    open={true}
                    onOpenChange={(open) => !open && setSelectedEvent(null)}
                  >
                    <DialogTrigger>View Event</DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        <h2 className="text-xl font-bold">Event Details</h2>
                      </DialogTitle>
                      <p className="font-bold">Title: {selectedEvent.title}</p>

                      <p>
                        Start Time:{" "}
                        {new Date(selectedEvent.start).toLocaleString()}
                      </p>
                      <p>
                        End Time: {new Date(selectedEvent.end).toLocaleString()}
                      </p>
                      <DialogClose className="mt-4 px-4 py-2 bg-gray-900 text-white rounded">
                        Close
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <Venue_Dialog
              action={"Update"}
              location_Id={location_Id}
              venue={venue}
            />
            <Delete_Dialog
              setOpen={setOpen}
              location_Id={location_Id}
              venue={venue}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
