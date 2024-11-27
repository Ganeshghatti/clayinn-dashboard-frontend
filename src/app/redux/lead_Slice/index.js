import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  leads: [],
  currentLead: null,
  isLoading: false,
  error: null,
};

// Fetch all leads
export const fetchLeads_Action = createAsyncThunk(
  "leads/fetchAll",
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/leads-management/leads/get/${locationId}/`
      );
      console.log(response.data);
      return response.data?.results || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch leads");
    }
  }
);

// Create new lead
export const createLead_Action = createAsyncThunk(
  "leads/create",
  async ({ formData, locationId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/leads-management/leads/create/`,
        {
          ...formData,
          location_id: locationId
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create lead");
    }
  }
);

// Delete lead
export const deleteLead_Action = createAsyncThunk(
  "leads/delete",
  async (leadNumber, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/leads-management/leads/detail/${leadNumber}/`);
      return leadNumber;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete lead");
    }
  }
);
// Fetch Lead Detail Action
export const fetch_Lead_By_ID = createAsyncThunk(
  "leads/fetchDetail",
  async ({ leadNumber }, { rejectWithValue }) => {
    try {
      console.log(leadNumber);
      const response = await axiosInstance.get(
        `/leads-management/leads/detail/${leadNumber}/`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch lead details");
    }
  }
);

// Update Lead Action
export const updateLead_Action = createAsyncThunk(
  "leads/update",
  async ({ leadNumber, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/leads-management/leads/detail/${leadNumber}/`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update lead");
    }
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all leads
      .addCase(fetchLeads_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeads_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create lead
      .addCase(createLead_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLead_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads.push(action.payload);
      })
      .addCase(createLead_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete lead
      .addCase(deleteLead_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLead_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leads = state.leads.filter(
          lead => lead.lead_number !== action.payload
        );
      })
      .addCase(deleteLead_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) 
      // Fetch Lead Detail cases
      .addCase(fetch_Lead_By_ID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetch_Lead_By_ID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lead_By_Id = action.payload;
      })
      .addCase(fetch_Lead_By_ID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Lead cases
      .addCase(updateLead_Action.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLead_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lead_By_Id = action.payload;
        // Update the lead in the leads array if it exists
        const index = state.leads.findIndex(
          (lead) => lead.lead_number === action.payload.lead_number
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLead_Action.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
