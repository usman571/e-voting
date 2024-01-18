import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AdminSlice = createAsyncThunk("admin/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/adminLogin",
    formData
  );
  return response.data;
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentAdmin: (state, action) => {
      state.currentAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AdminSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentAdmin = action.payload;
      })
      .addCase(AdminSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentAdmin } = adminSlice.actions;

export default adminSlice.reducer;
