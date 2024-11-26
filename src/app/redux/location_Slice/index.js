import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/utils/axiosInstance';

const initialState = {
  all_locations: [],
  current_location: null,
  isLoading: false,
  isError: null,
};

// Fetch all locations
export const fetch_All_Location_Action = createAsyncThunk(
  "location/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/location-management/locations/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch locations");
    }
  }
);

// Create new location
export const create_New_Location_Action = createAsyncThunk(
  "location/create",
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/location-management/locations/',
        locationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create location");
    }
  }
);

// Get location details
export const get_Location_Details = createAsyncThunk(
  "location/getDetails",
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/location-management/locations/${locationId}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch location details");
    }
  }
);

// Update location
export const update_Location_Action = createAsyncThunk(
  "location/update",
  async ({ locationId, values }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/location-management/locations/${locationId}/`,
        values
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update location");
    }
  }
);

// Delete location
export const delete_Location_Action = createAsyncThunk(
  "location/delete",
  async (locationId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/location-management/locations/${locationId}/`);
      return locationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete location");
    }
  }
);

// Delete location admin
export const delete_Location_Admin = createAsyncThunk(
  "location/deleteAdmin",
  async (locationId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/location-management/locations/${locationId}/delete-admin/`
      );
      return locationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete location admin");
    }
  }
);

// Create new location admin
export const create_Location_Admin = createAsyncThunk(
  "location/createAdmin",
  async ({ locationId, adminData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/location-management/locations/${locationId}/add-admin/`,
        adminData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create location admin");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearLocationError: (state) => {
      state.isError = null;
    },
    clearCurrentLocation: (state) => {
      state.current_location = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all locations
      .addCase(fetch_All_Location_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetch_All_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = action.payload;
        state.isError = null;
      })
      .addCase(fetch_All_Location_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Create new location
      .addCase(create_New_Location_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_New_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations.push(action.payload);
        state.isError = null;
      })
      .addCase(create_New_Location_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Get location details
      .addCase(get_Location_Details.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_Location_Details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current_location = action.payload;
        state.isError = null;
      })
      .addCase(get_Location_Details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Update location
      .addCase(update_Location_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = state.all_locations.map(location =>
          location.loc_id === action.payload.id ? action.payload : location
        );
        state.current_location = action.payload;
        state.isError = null;
      })
      .addCase(update_Location_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Delete location
      .addCase(delete_Location_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_Location_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_locations = state.all_locations.filter(
          location => location.loc_id !== action.payload
        );
        state.isError = null;
      })
      .addCase(delete_Location_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // Admin actions
      .addCase(delete_Location_Admin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.current_location?.id === action.payload) {
          state.current_location.location_admin = null;
        }
      })
      .addCase(create_Location_Admin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.current_location?.id === action.payload.location_id) {
          state.current_location.location_admin = action.payload.admin;
        }
      });
  },
});

export const { clearLocationError, clearCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
