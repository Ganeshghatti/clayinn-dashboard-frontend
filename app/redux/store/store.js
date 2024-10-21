import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "../locationsSlice";
import venueReducer from "../venueSlice";

export default configureStore({
  reducer: {
    locations: locationsReducer,
    venues: venueReducer,
  },
});
