import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    const { data } = await axios.get(`comments/${id}`);
    console.log("coms by post", data);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.items = action.payload;
    });
  },
});

export default commentsSlice.reducer;
