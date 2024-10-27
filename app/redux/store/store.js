import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "../locationsSlice";
import venueReducer from "../venueSlice";
import memberReducer from "../memberSlice";
import leadsReducer from "../leadsSlice";

export default configureStore({
  reducer: {
    locations: locationsReducer,
    venues: venueReducer,
    members: memberReducer,
    leads: leadsReducer,
  },
});
