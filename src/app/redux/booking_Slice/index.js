import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
  booking_By_Id: {},
};

const url = process.env.NEXT_PUBLIC_URL;

// Helper function for token
const getToken = () => {
  const token = localStorage.getItem("access-token");
  if (!token) throw new Error("No token found. Please login again.");
  return token;
};

// Create Booking Action
export const create_Booking_Action = createAsyncThunk(
  "bookings/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${url}/bookings-management/bookings/create/`,
        formData,
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
            `${url}/bookings-management/bookings/create/`,
            formData,
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
      return rejectWithValue(error.response.data || "Failed to create the Booking");
    }
  }
);

// Fetch Bookings
export const fetchBookings_Action = createAsyncThunk(
  "bookings/fetchBookings",
  async (locationId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/bookings-management/bookings/get/${locationId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Add debug logs
      console.log("API Response:", response);
      console.log("Response Data:", response.data);
      
      // Check if response.data exists and has the expected structure
      if (!response.data) {
        return rejectWithValue("No data received from the API");
      }

      // Return the results array directly (not nested under results)
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
            `${url}/bookings-management/bookings/get/${locationId}/`,
            {
              headers: {
                Authorization: `Bearer ${response.data.access}`, // Use the new token
              },
            }
          );

          // Add debug logs for refresh token case
          console.log("Refreshed API Response:", newResponse);
          console.log("Refreshed Response Data:", newResponse.data);

          if (!newResponse.data) {
            return rejectWithValue("No data received after token refresh");
          }

          return newResponse.data;
        } catch (error) {
          console.error("Token refresh error:", error);
          return rejectWithValue(error.response?.data || "Token refresh failed");
        }
      }

      console.error("API error:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch Bookings");
    }
  }
);

// Delete Booking
export const delete_Booking_Action = createAsyncThunk(
  "booking/delete",
  async (booking_number, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${url}/bookings-management/bookings/delete/${booking_number}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to delete the Booking");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        console.log("State updated with bookings:", state.bookings); // Debug log
      })
      .addCase(fetchBookings_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Fetch bookings rejected:", action.payload); // Debug log
      });
  },
});

export default bookingSlice.reducer;
