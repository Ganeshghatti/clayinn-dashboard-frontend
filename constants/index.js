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
    icon: <Home size={20}/>,
    isAdmin: "false",
    active: true,
  },
  {
    id: 1,
    title: "Leads",
    link: "leads",
    icon: <NotebookTabs size={20}/>,
    isAdmin: "false",
    active: false,
  },
  {
    id: 2,
    title: "Bookings",
    link: "bookings",
    icon: <Album size={20}/>,
    isAdmin: "false",
    active: false,
  },
  {
    id: 3,
    title: "Venues",
    link: "venues",
    icon: <Castle size={20}/>,
    isAdmin: "false",
    active: false,
  },
  {
    id: 4,
    title: "Calendar",
    link: "calendar",
    icon: <Calendar1 size={20}/>,
    isAdmin: "false",
    active: false,
  },

  {
    id: 5,
    title: "Members",
    link: "members",
    icon: <Users size={20}/>,
    isAdmin: "false",
    active: false,
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

// Create New Venue Form Action Inputs
export const createNewVenueForm_Inputs = [
  {
    name: "name",
    placeholder: "Enter Venue Venue Name",
  },
  {
    name: "location",
    placeholder: "Enter Venue Location",
  }
]