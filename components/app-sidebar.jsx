"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"


import { SidebarItems } from "@/constants"

import Image from "next/image"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { useParams, usePathname } from "next/navigation"


import Logout from "./auth/Logout"




export function AppSidebar() {
    const { locationId } = useParams()
    const pathname = usePathname()
    return (
        <Sidebar variant="floating" collapsible="icon" className="bg-clayInnBackground ">
            <SidebarContent className="overflow-hidden shadow-xl bg-clayInnPrimary shadow-clayInnBackground">
                <SidebarGroup className="space-y-10">
                    <SidebarGroupLabel className="flex justify-center items-center mt-10">
                        <Image src="/logo.png" alt="logo" width={100} height={100} quality={100} priority style={{ width: "auto", height: "auto" }} />

                    </SidebarGroupLabel>
                    <div>
                        <Separator />
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-4">
                            {SidebarItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <Link href={`/locations/${locationId}/${item.link}`} className={`flex items-center gap-4 py-6 text-clayInnBackground hover:bg-red-500 transition-all duration-300 ease-linear ${pathname.includes(item.link) && !item.active ? "bg-clayInnBackground text-clayInnPrimary ml-2 pl-6 rounded-l-full" : ""}`}>
                                            <span>{item?.icon}</span>
                                            <span className="text-base font-normal">{item?.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="md:hidden">
                    <Logout />
                </div>
            </SidebarContent>
            <div className="hidden md:block">

                <Logout />
            </div>
        </Sidebar >
    )
}
