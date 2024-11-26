import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  all_venues: [],
  currentVenueDetails: null,
  isLoading: false,
  error: null,
};

// Fetch venues
export const fetchVenues_Actions = createAsyncThunk(
  "venues/fetchVenues",
  async (location_Id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/venue-management/locations/${location_Id}/venues/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch venues");
    }
  }
);

// Create venue
export const createVenue_Action = createAsyncThunk(
  "venues/create",
  async ({ location_Id, values }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/venue-management/locations/${location_Id}/venues/`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create venue");
    }
  }
);

// Update venue
export const updateVenue_Action = createAsyncThunk(
  "venues/update",
  async ({ location_id, venue_id, values }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/venue-management/locations/${location_id}/venues/${venue_id}/`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update venue");
    }
  }
);

// Delete venue
export const venue_Delete_Action = createAsyncThunk(
  "venues/delete",
  async ({ location_Id, venue_id }, { rejectWithValue }) => {

    try {
      await axiosInstance.delete(
        `/venue-management/locations/${location_Id}/venues/${venue_id}/`
      );
      return venue_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete venue");
    }
  }
);

// Add new action for fetching venue details
export const fetchVenueDetails_Action = createAsyncThunk(
  "venues/fetchDetails",
  async ({ venue_id, year, month }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/venue-management/venues/detail/${venue_id}/?year=${year}&month=${month}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch venue details");
    }
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch venues
      .addCase(fetchVenues_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_venues = action.payload;
      })
      .addCase(fetchVenues_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create venue
      .addCase(createVenue_Action.fulfilled, (state, action) => {
        state.all_venues.push(action.payload);
      })
      // Update venue
      .addCase(updateVenue_Action.fulfilled, (state, action) => {
        const index = state.all_venues.findIndex(
          (venue) => venue.venue_id === action.payload.venue_id
        );
        if (index !== -1) {
          state.all_venues[index] = action.payload;
        }
      })
      // Delete venue
      .addCase(venue_Delete_Action.fulfilled, (state, action) => {
        state.all_venues = state.all_venues.filter(
          (venue) => venue.venue_id !== action.payload
        );
      })
      // Add cases for venue details
      .addCase(fetchVenueDetails_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenueDetails_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVenueDetails = action.payload;
      })
      .addCase(fetchVenueDetails_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default venueSlice.reducer;
