"use client";


import Footer from "@/components/Footer";
import { useParams } from "next/navigation";


import { FaChevronRight } from "react-icons/fa";

export default function Page() {
  const { locationId } = useParams();
  return (
    <div className="flex flex-col gap-4 px-2 h-screen">
      {/* Header section */}
      <div className="mt-4 flex items-center justify-between px-5">
        <div>
          <h1 className="flex items-center justify-start text-sm sm:text-xl md:text-2xl font-bold text-mainText capitalize">
            <span className="text-mainText/60">Clay Inn Hotels</span>
            <span><FaChevronRight /></span>
            <span>
              {locationId} Team
            </span>
          </h1>
        </div>
        <div className="">
          {/* Create Lead Button */}
        </div>
      </div>
      <div className="flex-1">
        <h1>Content</h1>
      </div>
      <div>
        <Footer content={`${locationId} Leads`} />
      </div>
    </div>


  )
}
