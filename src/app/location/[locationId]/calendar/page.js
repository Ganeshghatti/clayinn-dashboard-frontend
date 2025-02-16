"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";

// pages/calendar.js or a component file
import FullCalendar from "@fullcalendar/react";

// Calendar Plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Header from "@/components/Header";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer_Component from "@/components/Footer";
import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

export default function CalendarPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.calendar);
  const pathName = usePathname();
  const locationId = pathName.split("/")[2];
  const locationName = pathName.split("/")[3];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const toast = useToast();
  const [allData, setAllData] = useState(null);
  const [clickedDateData, setClickedDateData] = useState(null);

  const timeRanges = {
    afternoon: { start: "12:00:00", end: "15:00:00" },
    evening: { start: "18:00:00", end: "21:00:00" },
  };

  const handleDateClick = async (info) => {
    const selectedDate = info.dateStr;
    const filterByDate = allData.filter((event) => event.date === selectedDate);

    if (filterByDate.length > 0) {
      const venuesArray = Object.values(filterByDate[0].venues);
      const transformedData = {
        ...filterByDate[0],
        venues: venuesArray,
      };
      setClickedDateData([transformedData]);
    } else {
      setClickedDateData([]);
    }

    setIsDialogOpen(true);
  };

  const transformVenueData = (data, timeRanges) => {
    return data.flatMap(({ date, venues }) =>
      // Iterate through each venue in the venues object
      Object.values(venues).flatMap((venue) => {
        // Get the venue's background color
        const venueColor = venue.bg_color;

        // Process slots for this venue
        return Object.entries(venue.slots)
          .filter(([_, slot]) => slot !== null) // Filter out null slots
          .map(([timeOfDay, slot]) => ({
            title: `${venue.venue_name}`,
            start: `${date}T${timeRanges[timeOfDay].start}`,
            end: `${date}T${timeRanges[timeOfDay].end}`,
            backgroundColor: venueColor, // Apply the venue's background color
            borderColor: venueColor, // Match border color with background
            extendedProps: {
              timeOfDay,
              venueName: venue.venue_name,
              bookingNumber: slot.booking_number,
              occasion: slot.occasion,
              mobile: slot.mobile,
            },
          }));
      })
    );
  };

  const fetchCalendarData = async (arg) => {
    const currentMonth = arg.start.getMonth() + 1; // Months are 0-indexed
    const currentYear = arg.start.getFullYear();
    try {
      const response = await axiosInstance.get(
        `/master-calender-management/locations/${locationId}/?year=${currentYear}&month=${currentMonth}`
      );

      setAllData(response.data.days);

      const transformedData = transformVenueData(
        response.data.days,
        timeRanges
      );

      setEvents(transformedData);
    } catch (error) {
      console.log("the error on fetching calendar data", error);
    }
  };

  const token = getAccessToken();
  const decodedToken = jwtDecode(token);

  return (
    <div className="flex flex-col justify-between gap-5 min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <Header content={`${locationName}`} />
          </div>
        </div>
        <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <FullCalendar
            eventClassNames="rounded-md py-1 px-2 -z-10  shadow-sm"
            dayCellClassNames={"p-5"}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            datesSet={fetchCalendarData}
            events={events}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Use true for 12-hour format
            }}
            eventTextColor="black"
            dateClick={handleDateClick}
            showNonCurrentDates={false}
            eventDisplay="block"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Events and Bookings</DialogTitle>
                <DialogDescription>
                  Date:{" "}
                  {clickedDateData &&
                    new Date(clickedDateData[0]?.date).toLocaleDateString(
                      "en-GB"
                    )}
                </DialogDescription>
              </DialogHeader>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="w-full overflow-y-auto h-[400px] flex flex-col gap-4">
                  {clickedDateData &&
                    clickedDateData[0]?.venues?.map((venue, index) => (
                      <div
                        value={index + 1}
                        key={index}
                        className="px-2 py-4 rounded-xl border-2 shadow-md"
                      >
                        <div className="text-lg font-bold">
                          {venue.venue_name}
                        </div>
                        <div>
                          {Object.entries(venue.slots).map(
                            ([slotName, slotDetails]) => (
                              <div
                                key={slotName}
                                className="p-4 bg-blue-200 border rounded-lg space-y-2 mt-3"
                              >
                                <h3 className="text-lg font-medium">
                                  {slotName === "afternoon"
                                    ? "Lunch"
                                    : slotName === "evening"
                                    ? "Dinner"
                                    : slotName.charAt(0).toUpperCase() +
                                      slotName.slice(1)}{" "}
                                  Slot
                                </h3>
                                {slotDetails ? (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex w-full items-center justify-between">
                                      <p className="text-sm  font-medium text-blue-700">
                                        Booking Number:{" "}
                                        {slotDetails.booking_number}
                                      </p>
                                      <p>Lead Name: {slotDetails.lead_name}</p>
                                    </div>
                                    <p className="font-bold text-md">
                                      Occasion: {slotDetails.occasion}
                                    </p>
                                    <p>Mobile: {slotDetails.mobile}</p>
                                  </div>
                                ) : (
                                  <p>No booking available.</p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-5">
        <Footer_Component content={decodedToken?.loc_address || ""} />
      </div>
    </div>
  );
}
