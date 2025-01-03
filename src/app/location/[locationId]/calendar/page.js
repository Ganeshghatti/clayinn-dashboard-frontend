"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchCalendarData_Action } from "@/app/redux/calendar_Slice";
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

// pages/calendar.js or a component file
import FullCalendar from "@fullcalendar/react";

// Calendar Plugins

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

import Header from "@/components/Header";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer_Component from "@/components/Footer";

export default function CalendarPage() {
  const dispatch = useDispatch();
  const { calendarData, isLoading } = useSelector((state) => state.calendar);
  const pathName = usePathname();
  const locationId = pathName.split("/")[2];
  const locationName = pathName.split("/")[3];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateClick = async (info) => {
    const selectedDate = info.dateStr;
    try {
      await dispatch(
        fetchCalendarData_Action({
          locationId,
          date: selectedDate,
        })
      ).unwrap();
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch calendar data",
      });
    }
  };

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
          eventClassNames="bg-blue-500 text-white rounded-md py-1 px-2 shadow-sm hover:bg-blue-600"
          dayCellClassNames={"p-5"}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={[]}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use true for 12-hour format
          }}
          dateClick={handleDateClick}
          showNonCurrentDates={false}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Events and Bookings</DialogTitle>
              <DialogDescription>Date: {calendarData.date}</DialogDescription>
            </DialogHeader>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {calendarData?.venues?.map((venue, index) => (
                  <AccordionItem value={index + 1} key={index}>
                    <AccordionTrigger>{venue.venue_name}</AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(venue.slots).map(
                        ([slotName, slotDetails]) => (
                          <div
                            key={slotName}
                            className="p-4 bg-blue-200 border rounded-lg space-y-2 mt-3"
                          >
                            <h3 className="text-lg font-bold">
                              {slotName.charAt(0).toUpperCase() +
                                slotName.slice(1)}{" "}
                              Slot
                            </h3>
                            {slotDetails ? (
                              <div className="flex flex-col gap-2">
                                <div className="flex w-full items-center justify-between">
                                  <p className="text-sm  font-medium text-blue-700">
                                    Booking Number: {slotDetails.booking_number}
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
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </DialogContent>
        </Dialog>
      </div>
      </div>
      <div className="mt-5">
        <Footer_Component content={locationId} />
      </div>
    </div>
  );
}
