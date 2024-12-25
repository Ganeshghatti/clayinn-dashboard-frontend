"use client";

import Logout from "@/components/Auth_Components/Logout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { navLinks } from "@/constants";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

import { CgMenuGridR } from "react-icons/cg";
import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import { ShieldCheck } from "lucide-react";

export default function Small_Devices() {
  const [open, setOpen] = useState(false);
  const { locationId } = useParams();
  const pathname = usePathname();

  const isAdmin = () => {
    const token = getAccessToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded.role == "super-admin" ? true : false;
  };
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-full hover:bg-transparent w-[40px] h-[40px]  m-auto">
            <CgMenuGridR size={50} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-between bg-mainBg"
        >
          <div className="flex flex-col gap-4 mt-12 space-y-10 items-start">
            {navLinks.map((eachLink, index) => (
              <Link
                href={`/location/${locationId}/${eachLink.link}`}
                onClick={() => setOpen(false)}
                key={index}
                className={`${
                  eachLink.link === pathname.split("/")[3] ? "" : ""
                } flex items-start justify-center gap-2  transition-all duration-300 ease-linear text-xl font-semibold mt-10`}
              >
                {eachLink?.title}
              </Link>
            ))}
            {isAdmin() && (
              <Link
                href={`/super_admin`}
                className={`flex items-start justify-center gap-2  transition-all duration-300 ease-linear text-xl font-semibold mt-10`}
              >
                <span>
                  <ShieldCheck size={22} />
                </span>
                <span className="text-lg">Super Admin</span>
              </Link>
            )}
          </div>
          <div>
            <Logout />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
