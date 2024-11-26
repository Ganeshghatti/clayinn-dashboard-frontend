import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  calendarData: {},
  isLoading: false,
  error: null,
};

export const fetchCalendarData_Action = createAsyncThunk(
  "calendar/fetchData",
  async ({ locationId, date }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/master-calender-management/locations/${locationId}/?date=${date}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch calendar data");
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCalendarData_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.calendarData = action.payload;
      })
      .addCase(fetchCalendarData_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default calendarSlice.reducer;
