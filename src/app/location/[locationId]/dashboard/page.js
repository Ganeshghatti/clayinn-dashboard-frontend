"use client";

import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import Image from "next/image";

import wave from "/public/wave.svg";
import Footer_Component from "@/components/Footer";
// import { Separator } from "@/components/ui/separator";

// import PieChart_Graph from "@/components/Dashboard_Components/PieChart";
// import Graph from "@/components/Dashboard_Components/Graph";

export default function Dashboard() {
  const pathname = usePathname();
  const locationName = pathname.split("/")[3];
  const location_Name = pathname.split("/")[2];

  return (
    <div className="mt-10 space-y-8">
      <div>
        <Header content={`${locationName}`} />
      </div>

      <div className="flex-1 h-[75vh]">
        <div className="">
          {/* ------------------------------------- */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#C99B32] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Total Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  quality={100}
                  priority
                  className="absolute top-0 left-0 rotate-90 "
                />
              </div>
            </div>
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#435D59] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Active Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  className="absolute top-0 left-0 rotate-90"
                />
              </div>
            </div>
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#435D59] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Accepted Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  className="absolute top-0 left-0 rotate-90"
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------- */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#C99B32] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Total Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  quality={100}
                  priority
                  className="absolute top-0 left-0 rotate-90 "
                />
              </div>
            </div>
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#435D59] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Active Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  className="absolute top-0 left-0 rotate-90"
                />
              </div>
            </div>
            <div className="max-md:col-span-3 col-span-1 h-[180px]  rounded-lg border border-black/5 shadow-xl bg-[#435D59] relative">
              <div className="text-mainBg flex flex-col items-end  justify-center mt-4 gap-2 space-y-4 h-hull mr-6">
                <div>
                  <h1 className="text-lg">Accepted Leads</h1>
                </div>
                <div>
                  <p className="text-5xl font-bold">0</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Last Month : </span>
                  <span>90</span>
                </div>
              </div>
              <div>
                <Image
                  src={wave}
                  alt="wave"
                  width={180}
                  height={50}
                  className="absolute top-0 left-0 rotate-90"
                />
              </div>
            </div>
          </div>

          {/* ---------------------------------- */}

          <div className="grid grid-cols-3 w-full gap-4">
            <div className="col-span-1 h-[95%] max-md:col-span-3 md:hidden xl:block">
              <div className="h-[50%]">{/* <PieChart_Graph /> */}</div>
              <div className="h-[50%]">{/* <PieChart_Graph /> */}</div>
            </div>

            {/* ---------------------------------------- */}
            {/* <div className="xl:col-span-2 h-[100%] max-md:col-span-3 md:col-span-3">
          <Graph />
        </div> */}
          </div>
        </div>
      </div>

      <div className="">
        <Footer_Component content={`${location_Name}`} />
      </div>
    </div>
  );
}
