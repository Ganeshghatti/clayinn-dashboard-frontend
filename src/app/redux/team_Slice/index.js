import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  members: [],
  isLoading: false,
  error: null,
};

const url = process.env.NEXT_PUBLIC_URL;

// Helper to get token safely
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("access-token") : "";

// Async thunk action to fetch all members
export const fetchAllMembers = createAsyncThunk(
  "members/fetchAll",
  async (location_id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/user-management/locations/${location_id}/sales-persons/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.get(
            `${url}/user-management/locations/${location_id}/sales-persons/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response.data || "Failed to fetch members");
    }
  }
);

// Async thunk action to create a new member
export const createMember = createAsyncThunk(
  "members/create",
  async ({ location_id, data }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${url}/user-management/locations/${location_id}/sales-persons/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.post(
            `${url}/user-management/locations/${location_id}/sales-persons/`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response.data || "Failed to create members");
    }
  }
);

// Async thunk action to update a member
export const updateMember = createAsyncThunk(
  "members/update",
  async ({ location_id, member_id, data }, { rejectWithValue }) => {
    console.log(location_id, "REDUX");
    try {
      const token = getToken();
      const response = await axios.put(
        `${url}/user-management/locations/${location_id}/sales-persons/${member_id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          const newResponse = await axios.put(
            `${url}/user-management/locations/${location_id}/sales-persons/${member_id}/`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return newResponse.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response.data || "Failed to update members");
    }
  }
);

// Async thunk action to delete a member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async ({ location_id, member_id }, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(
        `${url}/user-management/locations/${location_id}/sales-persons/${member_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return member_id;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Refreshing the Token");
        const refresh_token = localStorage.getItem("refresh-token");

        try {
          const response = await axios.post(
            "https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/",
            {
              refresh: refresh_token,
            }
          );
          localStorage.setItem("access-token", response.data.access);

          await axios.delete(
            `${url}/user-management/locations/${location_id}/sales-persons/${member_id}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return member_id;
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
      }

      return rejectWithValue(error.response.data || "Failed to delete members");
    }
  }
);

// Slice
const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch members
      .addCase(fetchAllMembers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create member
      .addCase(createMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = [...state.members, action.payload];
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update member
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedMember = action.payload;
        const index = state.members.findIndex(
          (member) => member.id === updatedMember.id
        );
        if (index !== -1) {
          state.members[index] = updatedMember;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete member
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = state.members.filter(
          (member) => member.id !== action.payload
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
