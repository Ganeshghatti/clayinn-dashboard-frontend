"use client";

import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import { Hotel } from "lucide-react";
import { SidebarItems } from "@/constants";

import Image from "next/image";
import logo from "@/public/logo.png";

import { capitalizeFirstLetter } from "@/functions";
import { Separator } from "@/components/ui/separator";
import VenueCard from "@/components/venue_components/venue_Card";
import { VenueNewPost } from "@/components/venue_components/Venue_New_Post";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const { locationId } = useParams();
  const pathname = usePathname();

  const onHandleLogout = () => {
    localStorage.removeItem("access-token");
    router.push("/auth/login");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-clayInnPrimary">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex items-center justify-center py-4">
            <Link href={`/locations/${locationId}`} className="flex items-center gap-2 font-semibold flex-col">
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <Separator />
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SidebarItems.map((item, index) => (
                <Link
                  key={index}
                  className={`${pathname.includes("venues") && item.title === "Venues" ? "bg-slate-200 text-primary" : ""} flex items-center gap-3 rounded-lg px-3  text-muted-foreground transition-all hover:text-primary`}
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
      <div className="flex flex-col items-center text-center bg-clayInnBackground p-5 space-y-5">
        <div className="text-2xl text-clayInnPrimary font-semibold">
          <span className="text-3xl uppercase">
            {capitalizeFirstLetter(locationId)}
          </span>
          <div>
            <span className="text-2xl font-normal">
              Venue Information
            </span>
          </div>
          <div className="mt-6">
            <Separator className="w-[50vw]" />
          </div>

        </div>
        <div className="flex items-start justify-start">
          <VenueNewPost />
        </div>
        <div className="mt-10">
          <Separator className="w-[50vw]" />
        </div>
        <div className="flex flex-wrap gap-4">
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
          <VenueCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
