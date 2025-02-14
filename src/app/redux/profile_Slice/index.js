import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// Fetch Profile
export const fetchProfile_Action = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user-management/profile/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

// Edit Profile
export const editProfile_Action = createAsyncThunk(
  "profile/edit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/user-management/profile/edit/`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error editing profile:", error);
      return rejectWithValue(error.response?.data || "Failed to edit profile");
    }
  }
);

// Change Password
export const changePassword_Action = createAsyncThunk(
  "profile/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user-management/profile/change-password/`,
        passwordData
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      return rejectWithValue(
        error.response?.data || "Failed to change password"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit Profile
      .addCase(editProfile_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(editProfile_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change Password
      .addCase(changePassword_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(changePassword_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
