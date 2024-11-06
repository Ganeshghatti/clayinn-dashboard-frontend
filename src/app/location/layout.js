import Large_Devices from "@/components/Sidebar_Components/Large_Devices";
import Small_Devices from "@/components/Sidebar_Components/Small_Devices";

export default function Location_Layout({ children }) {
  return (
    <div className="flex flex-row gap-4 h-screen relative ">
      <div className="bg-sidebarBackground w-[300px] h-[96vh] my-auto ml-4 z-50 rounded-2xl max-lg:hidden">
        <Large_Devices />
      </div>
      <div className="lg:hidden absolute top-[1%] right-[2%] z-[9999] ">
        <Small_Devices />
      </div>
      <main className="flex-1 bg-mainBg p-4 overflow-y-scroll">{children}</main>
      <div className="w-[250px] h-[250px] bg-corn absolute top-0 left-0 rounded-br-full max-lg:hidden"></div>
    </div>
  );
}
