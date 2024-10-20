"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";


import Link from "next/link";
import { Hotel } from "lucide-react";
import { SidebarItems } from "@/constants";


import Image from "next/image";
import logo from "@/public/logo.png";


import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";



function capitalizeFirstLetter(text) {
  if (!text) return ""; // Handle empty string
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default function Page() {
  const { locationId } = useParams();
  const router = useRouter();

  const onHandleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  }



  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-clayInnPrimary">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex items-center justify-center py-4">
            <Link href={`/`} className="flex items-center gap-2 font-semibold flex-col">
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <Separator />
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SidebarItems.map((item, index) => (
                <Link
                  key={index}
                  className={`${item?.active ? "bg-slate-200 text-black" : ""} flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary`}
                  style={{ fontSize: "3rem" }}
                  href={`/locations/${locationId}/${item.link}`}
                >
                  <span>
                    {item.icon}
                  </span>
                  <span className="text-base">
                    {item.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex justify-center items-center mb-8">
            <Button className="w-[80%]" onClick={onHandleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-clayInnBackground p-5">
        <div className="text-2xl text-clayInnPrimary font-semibold">
          {capitalizeFirstLetter(locationId)}
          <div>
            Venue Information
          </div>
        </div>
      </div>
    </div >
  );
};


