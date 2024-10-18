import React from "react";
import Link from "next/link";

import { Hotel } from "lucide-react";

import { SidebarItems } from "@/constants";

const Sidebar = ({ children }, location) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-clayInnPrimary">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href={`/locations/`}
              className="flex items-center gap-2 font-semibold"
            >
              <Hotel className="h-6 w-6" />
              <span className="">ClayInn Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {SidebarItems.map((item, index) => (
                <Link
                  key={index}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  href={`/locations/${location}`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
