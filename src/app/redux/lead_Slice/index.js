import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const initialState = {
  leads: [],
  currentLead: null,
  isLoading: false,
  error: null,
  nextPage: null,
  previousPage: null,
  count: null
};

// Fetch all leads
export const fetchLeads_Action = createAsyncThunk(
  "leads/fetchAll",
  async ({ locationId, status=null, lead_number=null, next=null, previous=null }, { rejectWithValue }) => {
    try {

      // Base URL with location ID
      let url = '';

      // Array to store query parameters
      const queryParams = [];

      // Add status filter if provided
      if (status) {
        queryParams.push(`status=${encodeURIComponent(status)}`);
      }

      // Add lead number filter if provided
      if (lead_number) {
        queryParams.push(`lead_number=${encodeURIComponent(lead_number)}`);
      }

      // Add query parameters only if there are any
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      
      }

      if(next){
        const response = await axios.get(`${next}`+url);

        return response.data
      }

      if(previous){
        const response = await axios.get(`${previous}`+url);

        return response.data
      }

      const response = await axiosInstance.get(`/leads-management/leads/get/${locationId}/`+url);

     

      return response.data;
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

//Update lead Status 
export const updateLead_Status = createAsyncThunk(
  "leads/updateStatus",
  async ({ leadNumber, formData }, {
    rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/leads-management/leads/detail/${leadNumber}/`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update lead status");
    }
  }
)

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
        state.nextPage = action.payload.next;
        state.previousPage = action.payload.previous;
        state.count = action.payload.count;
        state.leads = action.payload.results;
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
      })  // update lead status
      .addCase(updateLead_Status.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLead_Status.fulfilled, (state, action) => {
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
      .addCase(updateLead_Status.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default leadSlice.reducer;
