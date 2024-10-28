"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarItems } from "@/constants";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Logout from "../auth/Logout";

import logo from "@/public/logo.png";
import Image from "next/image";

import { CgMenuGridR } from "react-icons/cg";

export default function Mobile_Sidebar() {
  const { locationId } = useParams();
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="bg-black text-mainBackground mt-4 mb-4"
          >
            <CgMenuGridR size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-[#624E2A] border-none flex flex-col gap-20 p-0"
        >
          <SheetHeader>
            <SheetTitle className="bg-black w-full p-0 h-44 flex items-center justify-center">
              <Image
                src={logo}
                alt="logo"
                quality={100}
                width={200}
                height={100}
                priority
                className="m-auto w-auto h-auto"
              />
            </SheetTitle>
            <SheetDescription className="hidden">
              Make changes to your profile here. Click save when you
              <span>&apos;</span>re done.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-8 mt-10 px-6 transition-all duration-300 ease-linear">
            {SidebarItems.map((item, index) => (
              <Link
                key={index}
                href={`/locations/${locationId}/${item.link}`}
                className={` text-mainBackground flex items-center gap-4 text-base transition-all duration-300 ease-linear ${pathname.includes(item.link) && !item.active ? "" : ""
                  }`}
              >
                <span
                  className={`${pathname.includes(item.link) && !item.active ? "" : ""
                    }`}
                >
                  {item?.icon}
                </span>
                <span
                  className={`${pathname.includes(item.link) && !item.active ? "" : ""
                    }`}
                >
                  {item?.title}
                </span>
              </Link>
            ))}
          </div>
          <SheetFooter>
            <Logout className="w-full bg-clayInnPrimary hover:bg-clayInnPrimary/80 text-white" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
