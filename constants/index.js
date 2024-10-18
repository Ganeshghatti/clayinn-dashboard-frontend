// This file contains static data to map inside various components

import {
  Album,
  Calendar1,
  Castle,
  Home,
  MapPin,
  NotebookTabs,
  Users,
} from "lucide-react";

export const SidebarItems = [
  {
    id: 0,
    title: "Dashboard",
    link: "/",
    icon: <Home className="h-5 w-5" />,
    isAdmin: "false",
  },
  {
    id: 1,
    title: "Venues",
    link: "venues",
    icon: <Castle className="h-5 w-5" />,
    isAdmin: "false",
  },
  {
    id: 2,
    title: "Bookings",
    link: "bookings",
    icon: <Album className="h-5 w-5" />,
    isAdmin: "false",
  },
  {
    id: 3,
    title: "Leads",
    link: "leads",
    icon: <NotebookTabs className="h-5 w-5" />,
    isAdmin: "false",
  },
  {
    id: 4,
    title: "Calendar",
    link: "calendar",
    icon: <Calendar1 className="h-5 w-5" />,
    isAdmin: "false",
  },
];

export const LocationItems = [
  {
    id: 0,
    title: "Delhi",
    desc: " Here you can access all the information about Delhi Location from sales to members",
  },
  {
    id: 1,
    title: "Mumbai",
    desc: " Here you can access all the information about Mumbai Location from sales to members",
  },
  {
    id: 2,
    title: "Kolkata",
    desc: " Here you can access all the information about Kolkata Location from sales to members",
  },
];
