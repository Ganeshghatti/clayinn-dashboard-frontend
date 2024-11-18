import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  booking: [],
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
      console.log(error);
      console.log(formData);
      return rejectWithValue(
        error.response?.data || "Failed to create Booking"
      );
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
      return response.data?.results;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch Bookings"
      );
    }
  }
);

// Fetch Booking By ID
export const fetch_Booking_By_ID = createAsyncThunk(
  "booking/fetchBookingById",
  async (booking_number, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/bookings-management/bookings/detail/${booking_number}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Booking By Id"
      );
    }
  }
);

// Delete Booking
export const delete_Booking_By_SuperAdmin = createAsyncThunk(
  "booking/delete",
  async (booking_number, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(
        `${url}/bookings-management/bookings/delete/${booking_number}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return booking_number;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete the Booking"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create Booking
      .addCase(create_Booking_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_Booking_Action.fulfilled, (state) => {
        state.loading = false;
        state.booking = [...state.booking, action.payload];
      })
      .addCase(create_Booking_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Booking
      .addCase(fetchBookings_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookings_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Booking By ID
      .addCase(fetch_Booking_By_ID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_Booking_By_ID.fulfilled, (state, action) => {
        state.loading = false;
        state.booking_By_Id = action.payload;
      })
      .addCase(fetch_Booking_By_ID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Booking
      .addCase(delete_Booking_By_SuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete_Booking_By_SuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = state.booking.filter(
          (booking) => booking.booking_number !== action.payload
        );
      })
      .addCase(delete_Booking_By_SuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
