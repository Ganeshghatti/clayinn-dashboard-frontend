import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  locations: [],
  isLoading: false,
  error: null,
};

const url = process.env.NEXT_PUBLIC_URL;

export const fetchLocations_Actions = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const token = localStorage.getItem("access-token");

    const response = await axios.get(`${url}/location-management/locations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations_Actions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.locations = [];
      })
      .addCase(fetchLocations_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = action.payload;
        state.error = null;
      })
      .addCase(fetchLocations_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.locations = [];
      });
  },
});

export default locationsSlice.reducer;
