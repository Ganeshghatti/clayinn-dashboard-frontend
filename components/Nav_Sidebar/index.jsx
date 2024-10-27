"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { SidebarItems } from "@/constants";
import Logout from "../auth/Logout";



export default function NavSidebar() {
    const { locationId } = useParams();
    const pathname = usePathname();

    return (
        <div className="lg:w-[20vw] xl:w-[15vw] h-[96svh] flex flex-col justify-between hidden lg:flex transition-all duration-300 ease-linear m-4 rounded-2xl bg-[#624E2A]">
            <div className="flex flex-col">
                <div className="bg-black h-40 w-full rounded-t-2xl flex items-center justify-center">
                    <Image src={logo} alt="logo" quality={100} width={200} height={100} priority />
                </div>
                <div className="space-y-8 mt-10 px-6 menu">
                    {SidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={`/locations/${locationId}/${item.link}`}
                            className={`menu flex items-center gap-4 text-base transition-all duration-300 ease-linear rounded-l-full py-[12px] px-5  ${pathname.includes(item.link) && !item.active
                                ? "bg-mainBackground text-black w-full ml-8 rounded-full transition-all duration-300 ease-linear"
                                : "text-mainBackground"
                                } transition-all duration-300 ease-linear`}
                        >
                            <span
                                className={`text-lg ${pathname.includes(item.link) && !item.active
                                    ? "text-clayInnPrimary"
                                    : "text-mainBackground"
                                    }`}
                            >
                                {item.icon}
                            </span>
                            <span
                                className={`${pathname.includes(item.link) && !item.active
                                    ? "text-clayInnPrimary"
                                    : "text-mainBackground"
                                    }`}
                            >
                                {item.title}
                            </span>

                        </Link>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <Logout className="w-full bg-clayInnPrimary hover:bg-clayInnPrimary/80 text-white" />
            </div>
        </div >
    );
}
