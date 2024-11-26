import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  members: [],
  isLoading: false,
  error: null,
};

// Fetch all team members
export const fetchAllMembers = createAsyncThunk(
  "members/fetchAll",
  async (location_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/user-management/locations/${location_id}/sales-persons/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch members");
    }
  }
);

// Create new team member
export const createMember = createAsyncThunk(
  "members/create",
  async ({ location_id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user-management/locations/${location_id}/sales-persons/`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create member");
    }
  }
);

// Update team member
export const updateMember = createAsyncThunk(
  "members/update",
  async ({ location_id, member_id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/user-management/locations/${location_id}/sales-persons/${member_id}/`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update member");
    }
  }
);

// Delete team member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async ({ location_id, member_id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/user-management/locations/${location_id}/sales-persons/${member_id}/`
      );
      return member_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete member");
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    clearTeamError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch members
      .addCase(fetchAllMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
        state.error = null;
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create member
      .addCase(createMember.fulfilled, (state, action) => {
        state.members.push(action.payload);
        state.error = null;
      })
      // Update member
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(
          (member) => member.user_id === action.payload.user_id
        );
        if (index !== -1) {
          state.members[index] = action.payload;
        }
        state.error = null;
      })
      // Delete member
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(
          (member) => member.user_id !== action.payload
        );
        state.error = null;
      });
  },
});

export const { clearTeamError } = teamSlice.actions;
export default teamSlice.reducer;
