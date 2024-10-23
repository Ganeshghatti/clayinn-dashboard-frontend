import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    members: [],
    isLoading: false,
    error: null,
}

const url = process.env.NEXT_PUBLIC_URL;

// Async thunk action to fetch all members
export const fetchAll_Members_Actions = createAsyncThunk(
    "members/fetchAll",
    async (location_id) => {
        try {
            const token = localStorage.getItem("access-token");
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
            console.log(error);
        }
    }
);

// Async thunk action to create a new member
export const createMember_Actions = createAsyncThunk(
    "members/create",
    async ({ location_id, data }) => {

        try {
            const token = localStorage.getItem("access-token");
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
            console.log(error);
        }
    }
);


// Async thunk action to update a member
export const updateMember_Actions = createAsyncThunk(
    "members/update",
    async ({ location_id, member_id, data }) => {

        try {
            const token = localStorage.getItem("access-token");
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
            console.log(error);
        }
    }
);


// Async thunk action to Delete a member
export const deleteMember_Actions = createAsyncThunk(
    "members/delete",
    async ({ location_id, member_id }) => {

        try {
            const token = localStorage.getItem("access-token");
            const response = await axios.delete(
                `${url}/user-management/locations/${location_id}/sales-persons/${member_id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
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

            .addCase(fetchAll_Members_Actions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchAll_Members_Actions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload;
            })

            .addCase(fetchAll_Members_Actions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create member
            .addCase(createMember_Actions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createMember_Actions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members.push(action.payload);
            })
            .addCase(createMember_Actions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to create member.";
            })
            // Update member
            .addCase(updateMember_Actions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMember_Actions.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedMember = action.payload;
                const index = state.members.findIndex(member => member.id === updatedMember.id);
                if (index !== -1) {
                    state.members[index] = updatedMember;
                }
            })
            .addCase(updateMember_Actions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to update member.";
            })
            // Delete member
            .addCase(deleteMember_Actions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMember_Actions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = state.members.filter(member => member.id !== action.payload);
            })
            .addCase(deleteMember_Actions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to delete member.";
            });
    },
});

export default memberSlice.reducer;
