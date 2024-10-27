import CheckAuth from "@/hoc/checkAuth";
import { Toaster } from "@/components/ui/toaster"
import NavSidebar from "@/components/Nav_Sidebar";
import Mobile_Sidebar from "@/components/Mobile_Sidebar";



export default function Layout({ children }) {
    return (
        <CheckAuth>
            <div className="flex relative bg-mainBackground transition-all duration-300 ease-linear z-10 h-full">
                <NavSidebar />
                <Mobile_Sidebar />
                {/* bg-clayInnBackground w-full */}
                <main className="flex-1" >
                    {children}
                </main>
                <Toaster />
                <div className="hidden lg:block bg-[#B08022] w-[200px] h-[200px] absolute top-0 left-0 -z-50 rounded-br-full"></div>
            </div>
        </CheckAuth>
    )
}
