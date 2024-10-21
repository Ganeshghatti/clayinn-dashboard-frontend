import CheckAuth from "@/hoc/checkAuth";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
    return (
        <CheckAuth>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    {children}
                </main>
            </SidebarProvider>
        </CheckAuth>
    )
}
