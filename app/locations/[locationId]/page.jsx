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
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* ---------1------ */}
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* ---------1------ */}
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* ---------1------ */}
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* ---------1------ */}
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
          {/* ---------1------ */}
          <div className="relative w-[80%] md:w-[100%] h-44 border border-cardBorder rounded-md scale-95 hover:scale-100 transition-all duration-300 ease-linear shadow-2xl hover:ring-1 hover:ring-cardBorder" style={{
            backgroundImage: `url(${wave.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10,
          }}>
            <div className="">
              <div className="bg-black w-[90%] h-[60px] border border-cardBorder shadow-2xl shadow-clayInnPrimary rounded-br-full my-auto flex items-center justify-center text-center rounded-tl-md">
                <h1 className="text-clayInnBackground text-lg font-semibold capitalize ">Total Venues</h1>
              </div>
              <div className="absolute animate-none right-[0%] top-[35%] bg-cardBorder/70 w-14 h-14 rounded-l-full  m-auto border border-clayInnPrimary/50">
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">4</p>
              </div>
              <div className=" bg-cardBorder/70 w-[90%] h-[50px] absolute bottom-0 flex items-center justify-center text-center rounded-tr-full ring-2 ring-cardBorder">
                <p className="text-clayInnPrimary font-semibold text-lg">Last Month : 10</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-clayInnPrimary/50 absolute rounded-full bottom-2 right-5 blur-lg"></div>
          </div>
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
