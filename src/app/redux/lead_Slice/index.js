import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  leads: [],
  loading: false,
  error: null,
  lead_By_Id: {},
};

const url = process.env.NEXT_PUBLIC_URL;

// Helper function for token
const getToken = () => {
  const token = localStorage.getItem("access-token");
  if (!token) throw new Error("No token found. Please login again.");
  return token;
};

// Create Lead Action
export const create_Lead_Action = createAsyncThunk(
  "leads/create",
  async ({ formData, locationId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${url}/leads-management/leads/create/`,
        { ...formData, location_id: locationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create lead");
    }
  }
);

// Fetch Leads
export const fetchLeads_Action = createAsyncThunk(
  "leads/fetchLeads",
  async (locationId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/leads-management/leads/get/${locationId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      return response.data?.results;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch leads");
    }
  }
);

// Fetch Lead By ID
export const fetch_Lead_By_ID = createAsyncThunk(
  "lead/fetchLeadById",
  async (lead_number, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${url}/leads-management/leads/detail/${lead_number}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Lead By Id"
      );
    }
  }
);

// Delete Lead
export const delete_Lead_By_SuperAdmin = createAsyncThunk(
  "lead/delete",
  async (lead_number, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(
        `${url}/leads-management/leads/delete/${lead_number}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return lead_number;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete the lead"
      );
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Lead
      .addCase(create_Lead_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create_Lead_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = [...state.leads, action.payload];
      })
      .addCase(create_Lead_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Leads
      .addCase(fetchLeads_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Lead By ID
      .addCase(fetch_Lead_By_ID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_Lead_By_ID.fulfilled, (state, action) => {
        state.loading = false;
        state.lead_By_Id = action.payload;
      })
      .addCase(fetch_Lead_By_ID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Lead
      .addCase(delete_Lead_By_SuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delete_Lead_By_SuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = state.leads.filter(
          (lead) => lead.lead_number !== action.payload
        );
      })
      .addCase(delete_Lead_By_SuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadsSlice.reducer;
