import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, handleTokenRefresh } from "@/utils/getToken";

const url = process.env.NEXT_PUBLIC_URL;

const initialState = {
  dashboardData: null,
  isLoading: false,
  isError: null,
};

// Fetch Dashboard Data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (locationId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/dashboard-management/locations/${locationId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await handleTokenRefresh();
          const newResponse = await axios.get(
            `${url}/dashboard-management/locations/${locationId}/`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          return newResponse.data;
        } catch (refreshError) {
          return rejectWithValue("Session expired. Please login again.");
        }
      }
      return rejectWithValue(error.response?.data || "Failed to fetch dashboard data");
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
