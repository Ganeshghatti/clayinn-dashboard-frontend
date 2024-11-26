import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/utils/axiosInstance';

const initialState = {
  dashboardData: null,
  isLoading: false,
  isError: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard-management/locations/${locationId}/`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data || "Failed to fetch dashboard data");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
        state.isError = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
