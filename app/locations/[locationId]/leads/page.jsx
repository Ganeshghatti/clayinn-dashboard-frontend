"use client";


import { SidebarTrigger } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";

export default function Page() {
  const { locationId } = useParams();
  return (
    <div>
      <div className="w-[95vw] m-auto md:w-[80vw] flex items-center justify-between p-4 rounded-lg shadow-sm mt-2 sticky top-0 bg-clayInnPrimary">
        <div className="bg-clayInnBackground text-clayInnPrimary rounded-full py-2 px-2">
          <SidebarTrigger className="hover:bg-clayInnBackground hover:text-clayInnPrimary hover:animate-pulse transition-all duration-300 ease-linear" />
        </div>
        <h1 className="lg:text-xl text-base uppercase font-semibold text-clayInnBackground">
          {locationId ? `${locationId} Leads Page` : "Leads Page"}
        </h1>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-clayInnBackground text-clayInnPrimary  rounded-sm py-[0.4rem] px-2 hidden md:block">
            <h1 className="flex items-center justify-center gap-1 font-semibold">
              Total Leads :
              <span>
                {/* Title */}
              </span>
            </h1>
          </div>
          <div>
            {/* Cards */}
          </div>
        </div>
      </div>
    </div>
  )
}
