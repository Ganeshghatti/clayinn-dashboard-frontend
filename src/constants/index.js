// ICONS IMPORT
import {
  Album,
  Calendar1,
  Castle,
  Home,
  MapPin,
  NotebookTabs,
  Users,
  ShieldCheck,
  User,
} from "lucide-react";

// LOGIN FORM INPUT

const loginForm_Inputs = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Please enter your email . . .",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Please enter your password . . .",
  },
];

// CREATE LOCATION FORM INPUTS
const createLocationForm_Inputs = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Please enter the location name . . .",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Please enter the location address . . .",
  },
  {
    name: "location_admin_name",
    label: "Admin Name",
    type: "text",
    placeholder: "Please enter the location admin name . . .",
  },
  {
    name: "location_admin_email",
    label: "Admin Email",
    type: "email",
    placeholder: "Please enter the location admin email . . .",
  },
  {
    name: "location_admin_password",
    label: "Admin Password",
    type: "password",
    placeholder: "Please enter the location admin password . . .",
  },
];

const navLinks = [
  {
    id: 0,
    title: "Dashboard",
    link: "dashboard",
    icon: <Home size={22} />,
    isAdmin: "false",
    active: true,
  },
  {
    id: 1,
    title: "Leads",
    link: "leads",
    icon: <NotebookTabs size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 2,
    title: "Bookings",
    link: "bookings",
    icon: <Album size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 3,
    title: "Venues",
    link: "venues",
    icon: <Castle size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 4,
    title: "Calendar",
    link: "calendar",
    icon: <Calendar1 size={22} />,
    isAdmin: "false",
    active: false,
  },

  {
    id: 5,
    title: "Team",
    link: "team",
    icon: <Users size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 6,
    title: "Profile",
    link: "profile",
    icon: <User size={22} />,
    isAdmin: "false",
    active: false,
  },
];

// Create New Venue Form Action Inputs
const createNewVenueForm_Inputs = [
  {
    name: "name",
    label: "Venue Name",
    placeholder: "Enter Venue Venue Name . . .",
  },
];

// Create New Team Form Action Inputs
const createNew_Team_Form_Inputs = [
  {
    name: "name",
    placeholder: "Enter Member Name",
  },
  {
    name: "email",
    placeholder: "Enter Member Email",
  },
  {
    name: "password",
    placeholder: "Enter Member Name",
  },
  {
    name: "mobile",
    placeholder: "Enter Member Name",
  },
];

// Function parameters shared across regular occasions
const functionParameters = [
  { name: "date_of_function", label: "Date of Function", type: "date" },
  { name: "day", label: "Day", type: "text" },
  { name: "lunch_pax", label: "Lunch (Min. Pax)", type: "number" },
  { name: "hi_tea_pax", label: "Hi Tea (Min. Pax)", type: "number" },
  { name: "dinner_pax", label: "Dinner (Min. Pax)", type: "number" },
  { name: "dj_value", label: "DJ", type: "number" },
  { name: "decor_value", label: "Decor", type: "number" },
  { name: "liquor_value", label: "Liquor", type: "number" },
];

// All occasion types including room
const occasionTypes = [
  {
    id: "engagement",
    label: "Engagement",
    parameters: functionParameters,
  },
  {
    id: "sagan",
    label: "Sagan",
    parameters: functionParameters,
  },
  {
    id: "roka",
    label: "Roka",
    parameters: functionParameters,
  },
  {
    id: "haldi",
    label: "Haldi",
    parameters: functionParameters,
  },
  {
    id: "mehndi",
    label: "Mehndi",
    parameters: functionParameters,
  },
  {
    id: "wedding",
    label: "Wedding",
    parameters: [
      ...functionParameters,
      { name: "vedi_value", label: "Vedi", type: "number" },
    ],
  },
  {
    id: "reception",
    label: "Reception",
    parameters: [
      ...functionParameters,
      { name: "vedi_value", label: "Vedi", type: "number" },
    ],
  },
  {
    id: "room",
    label: "room",
    parameters: [
      // { name: "date_of_booking", label: "Date of Booking", type: "date" },
      { name: "date_of_function", label: "Date of Function", type: "date" },
      { name: "day", label: "Day", type: "text" },
      {
        name: "number_of_pax",
        label: "Number of Pax (Min. Pax)",
        type: "number",
      },
      { name: "number_of_rooms", label: "Number of Rooms", type: "number" },
      { name: "plan", label: "Plan", type: "text" },
    ],
  },
];

const createLeadForm_Inputs = [
  {
    name: "hostname",
    label: "Host Name",
    placeholder: "Enter host name",
    type: "text",
  },
  {
    name: "mobile",
    label: "Mobile Number",
    placeholder: "Enter mobile number",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "followup",
    label: "Follow Up Date",
    placeholder: "Select follow up date",
    type: "date",
  },
  {
    name: "occasions",
    label: "Occasions",
    type: "occasions",
    options: occasionTypes,
  },
];

export {
  loginForm_Inputs,
  createLocationForm_Inputs,
  navLinks,
  createNewVenueForm_Inputs,
  createNew_Team_Form_Inputs,
  createLeadForm_Inputs,
  occasionTypes,
  functionParameters,
};
