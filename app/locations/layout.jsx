import CheckAuth from "@/hoc/checkAuth";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


import { Toaster } from "@/components/ui/toaster"


import background from "@/public/pattern.svg";

export default function Layout({ children }) {
    return (
        <CheckAuth>
            <SidebarProvider>
                <AppSidebar />
                {/* bg-clayInnBackground w-full */}
                <main className="" style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: "100vh",
                    width: "100%",
                }}>
                    {children}
                </main>
                <Toaster />
            </SidebarProvider>
        </CheckAuth>
    )
}
