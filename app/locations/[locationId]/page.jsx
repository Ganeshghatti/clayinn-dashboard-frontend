"use client"



import BarChat from "@/components/dashboardComponents/BarChat";
import PieChartGraph from "@/components/dashboardComponents/PieChart";

import Footer from "@/components/Footer";

import wave from "@/public/wave.svg"




export default function Page() {
  return (
    <div className="flex flex-col gap-4 px-2 h-full">
      <div className="mt-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-mainText capitalize">Welcome to the Clay Inn Hotels</h1>
      </div>
      <div className="flex-1 mt-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* ---------1------ */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Total Venues</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">4</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 10</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
          {/* ---------2------ */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Total Members</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">4</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 4</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
          {/* -------3-------- */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Total Leads</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">8</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 6</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
          {/* -------4-------- */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Accepted Leads</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">6</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 5</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
          {/* -------5-------- */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Rejected Leads</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">2</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 0</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
          {/* --------6------- */}
          <div className="w-[80%] md:w-[100%] h-32  border rounded-lg bg-cardBg relative border border-cardBorder shadow-2xl ring-1 ring-clayInnPrimary/5 hover:ring-2 hover:ring-offset-2 ring-offset-clayInnPrimary/50 transition-all duration-300 cursor-pointer" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="flex flex-col">
              <h1 className="text-center px-2 py-2 text-lg sm:text-xl md:text-2xl font-bold text-black capitalize">Active Leads</h1>
              <p className="text-center px-2 py-2 text-lg sm:text-xl md:text-3xl font-bold text-black rounded-full">12</p>
            </div>
            <div>
              <p className="text-sm px-2 text-white bg-clayInnPrimary w-fit ml-4 rounded-full px-4">Last Month : 10</p>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* --------------- */}
        </div>

        {/* Bars and Pie Chart */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* --------------- */}
          <div className="col-span-2 hidden md:block">
            <BarChat />
          </div>
          {/* --------------- */}
          <div className="md:col-span-2 xl:col-span-1 md:w-[100%] xl:w-[100%] max-md:w-[80%]">
            <PieChartGraph />
          </div>
          {/* --------------- */}
        </div>

      </div>
      <div>
        <Footer content="Dashboard" />
      </div>
    </div >
  )
}
