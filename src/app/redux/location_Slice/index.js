import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  all_locations: [],
  isError: false,
};

const URL = process.env.NEXT_PUBLIC_URL;

// FETCH ALL LOCATIONS
export const fetch_All_Location_Action = createAsyncThunk(
  "all_locations/fetch_all_locations",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.get(
        `${URL}/location-management/locations/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CREATE NEW LOCATION
export const create_New_Location_Action = createAsyncThunk(
  "create/NewLocation",
  async (values, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");

      if (!token) {
        throw new Error("No token found. Please login again.");
      }

      const response = await axios.post(
        `${URL}/location-management/locations/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE LOCATION
export const update_Location_Action = createAsyncThunk(
  "location/update",
  async ({ values, location_Id }, { rejectWithValue }) => {
    console.log(values, location_Id, "-----------REDUX");
    try {
      const token = localStorage.getItem("access-token");

      const response = await axios.put(
        `${URL}/location-management/locations/${location_Id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE LOCATION
export const delete_Location_Action = createAsyncThunk(
  "location/delete",
  async (location_Id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");

      const response = await axios.delete(
        `${URL}/location-management/locations/${location_Id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_All_Location_Action.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.all_locations = [];
      })
      .addCase(fetch_All_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = action.payload;
      })
      .addCase(fetch_All_Location_Action.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.all_locations = [];
      })
      .addCase(create_New_Location_Action.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(create_New_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations.push(action.payload);
      })
      .addCase(create_New_Location_Action.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(update_Location_Action.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(update_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = state.all_locations.map((location) =>
          location.loc_id === action.payload.loc_id ? action.payload : location
        );
      })
      .addCase(update_Location_Action.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(delete_Location_Action.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(delete_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = state.all_locations.filter(
          (location) => location.loc_id !== action.payload.loc_id
        );
      })
      .addCase(delete_Location_Action.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default locationSlice.reducer;
