import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  venues: [],
  isLoading: false,
  error: null,
};

const url = process.env.NEXT_PUBLIC_URL;

// GET ALL VENUES
export const fetchVenues_Actions = createAsyncThunk(
  "venues/fetchVenues",
  async (location_Id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.get(
        `${url}/venue-management/locations/${location_Id}/venues/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// CREATE A NEW VENUE
export const createNewVenue_Actions = createAsyncThunk(
  "venues/createNewVenue",
  async ({ data, location_Id }, { rejectWithValue }) => {
    console.log(location_Id, "data redux------------");

    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.post(
        `${url}/venue-management/locations/${location_Id}/venues/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error redux");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// UPDATE A VENUE
export const updateVenue_Actions = createAsyncThunk(
  "venues/updateVenue",
  async ({ data, location_Id, venue_id }) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.put(
        `${url}/venue-management/locations/${location_Id}/venues/${venue_id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error redux");
    }
  }
);

// Delete a Venue
export const deleteVenue_Actions = createAsyncThunk(
  "venues/deleteVenue",
  async ({ location_Id, venue_id }) => {
    console.log(location_Id, venue_id, "location_Id redux Delete");
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.delete(
        `${url}/venue-management/locations/${location_Id}/venues/${venue_id}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error redux");
    }
  }
);

// Venue slice
const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Venues
      .addCase(fetchVenues_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = action.payload;
        state.error = null;
      })
      .addCase(fetchVenues_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.venues = [];
      })
      // Create New Venue
      .addCase(createNewVenue_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewVenue_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues.push(action.payload);
        state.error = null;
      })
      .addCase(createNewVenue_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Update Venue
      .addCase(updateVenue_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVenue_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedVenueIndex = state.venues.findIndex(
          (venue) => venue.id === action.payload.id
        );
        if (updatedVenueIndex !== -1) {
          state.venues[updatedVenueIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateVenue_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      }) // Delete Venue
      .addCase(deleteVenue_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVenue_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venues = state.venues.filter(
          (venue) => venue.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteVenue_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default venueSlice.reducer;
