import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  all_venues: [],
  isLoading: false,
  error: null,
};

const URL = process.env.NEXT_PUBLIC_URL;

// FETCH
export const fetchVenues_Actions = createAsyncThunk(
  "venues/fetchVenues",
  async (location_Id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(
        `${URL}/venue-management/locations/${location_Id}/venues/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.get(
            `${URL}/venue-management/locations/${location_Id}/venues/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// CREATE VENUE
export const create_Venue_Action = createAsyncThunk(
  "venue/create",
  async ({ values, location_Id }, { rejectWithValue }) => {
    console.log(location_Id, "data redux------------");

    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.post(
        `${URL}/venue-management/locations/${location_Id}/venues/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.post(
            `${URL}/venue-management/locations/${location_Id}/venues/`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update
export const venue_Update_action = createAsyncThunk(
  "venue/update",
  async ({ values, location_Id, venue_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("Token not found");

      const response = await axios.put(
        `${URL}/venue-management/locations/${location_Id}/venues/${venue_id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.put(
            `${URL}/venue-management/locations/${location_Id}/venues/${venue_id}/`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE

export const venue_Delete_Action = createAsyncThunk(
  "delete/venue",
  async ({ location_Id, venue_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");

      const response = await axios.delete(
        `${URL}/venue-management/locations/${location_Id}/venues/${venue_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.delete(
            `${URL}/venue-management/locations/${location_Id}/venues/${venue_id}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues_Actions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVenues_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_venues = action.payload;
      })
      .addCase(fetchVenues_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(create_Venue_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_Venue_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_venues = [...state.all_venues, action.payload];
        state.error = null;
      })
      .addCase(create_Venue_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(venue_Update_action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(venue_Update_action.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedVenueIndex = state.all_venues.findIndex(
          (venue) => venue.id === action.payload.id
        );
        if (updatedVenueIndex !== -1) {
          state.all_venues[updatedVenueIndex] = action.payload;
        }
        state.error = null;
      })
      .addCase(venue_Update_action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(venue_Delete_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(venue_Delete_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_venues = state.all_venues.filter((venue) => {
          venue.id !== action.payload;
        });
      })
      .addCase(venue_Delete_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default venueSlice.reducer;
