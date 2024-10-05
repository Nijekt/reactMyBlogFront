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
export const fetchLastComments = createAsyncThunk(
  "comments/fetchLastComments",
  async () => {
    const { data } = await axios.get(`comments/last`);
    console.log("coms by post", data);
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
  lastComs: {
    items: [],
    status: "loading",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.comments.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.status = "loaded";
      state.comments.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments.status = "error";
    });
    builder.addCase(fetchLastComments.pending, (state) => {
      state.lastComs.status = "loading";
    });
    builder.addCase(fetchLastComments.fulfilled, (state, action) => {
      state.lastComs.status = "loaded";
      state.lastComs.items = action.payload;
    });
    builder.addCase(fetchLastComments.rejected, (state) => {
      state.lastComs.status = "error";
    });
  },
});

export default commentsSlice.reducer;
