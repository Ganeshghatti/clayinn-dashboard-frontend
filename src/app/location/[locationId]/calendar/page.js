"use client";

// pages/calendar.js or a component file
import FullCalendar from "@fullcalendar/react"; // Import the main component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import a plugin
import timeGridPlugin from "@fullcalendar/timegrid";
import Header from "@/components/Header";

import { usePathname } from "next/navigation";

export default function CalendarPage() {
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];

  return (
    <div className="flex flex-col gap-5 min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-4">
        <div>
          <Header content={`${locationName}`} />
        </div>
      </div>
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden p-6">
        <FullCalendar
          eventClassNames="bg-blue-500 text-white rounded-md py-1 px-2 shadow-sm hover:bg-blue-600"
          dayCellClassNames={"p-5"}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={[]}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use true for 12-hour format
          }}
        />
      </div>
    </div>
  );
}
