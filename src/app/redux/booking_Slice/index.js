import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// Create Booking
export const create_Booking_Action = createAsyncThunk(
  "bookings/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      console.log("Creating booking with data:", formData);
      const response = await axiosInstance.post(
        `/bookings-management/bookings/create/`,
        formData
      );
      console.log("Booking created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating booking:", error);
      return rejectWithValue(error.response?.data || "Failed to create booking");
    }
  }
);

// Fetch Bookings
export const fetchBookings_Action = createAsyncThunk(
  "bookings/fetch",
  async (locationId, { rejectWithValue }) => {
    try {
      console.log("Fetching bookings for location:", locationId);
      const response = await axiosInstance.get(
        `/bookings-management/bookings/get/${locationId}/`
      );
      console.log("Bookings fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch bookings");
    }
  }
);

// Delete Booking
export const deleteBooking_Action = createAsyncThunk(
  "bookings/delete",
  async (bookingId, { rejectWithValue }) => {
    try {
      console.log("Deleting booking:", bookingId);
      await axiosInstance.delete(`/bookings-management/bookings/delete/${bookingId}/`);
      console.log("Booking deleted successfully");
      return bookingId;
    } catch (error) {
      console.error("Error deleting booking:", error);
      return rejectWithValue(error.response?.data || "Failed to delete booking");
    }
  }
);

// Get Booking Details
export const fetchBookingDetails_Action = createAsyncThunk(
  "bookings/details",
  async (bookingId, { rejectWithValue }) => {
    try {
      console.log("Fetching booking details for:", bookingId);
      const response = await axiosInstance.get(
        `/bookings-management/bookings/detail/${bookingId}/`
      );
      console.log("Booking details fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching booking details:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch booking details");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(create_Booking_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_Booking_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(create_Booking_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Bookings
      .addCase(fetchBookings_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Booking
      .addCase(deleteBooking_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      })
      .addCase(deleteBooking_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Booking Details
      .addCase(fetchBookingDetails_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetails_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(fetchBookingDetails_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
