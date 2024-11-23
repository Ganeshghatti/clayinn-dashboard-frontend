import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/app/redux/location_Slice";
import venueReducer from "@/app/redux/venue_Slice";
import memberReducer from "@/app/redux/team_Slice";
import leadReducer from "@/app/redux/lead_Slice";
import bookingReducer from "@/app/redux/booking_Slice";
import dashboardReducer from "@/app/redux/dashboard_Slice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    venues: venueReducer,
    members: memberReducer,
    leads: leadReducer,
    bookings: bookingReducer,
    dashboard: dashboardReducer,
  },
});
