import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    leads: [],
    loading: false,
    error: null
}






const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
})

export default leadsSlice.reducer
