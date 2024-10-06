import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (tag = "") => {
    const { data } = await axios.get(`posts/getAll${tag ? `?tag=${tag}` : ""}`);
    console.log(data);
    return data;
  }
);
export const fetchPostsByViews = createAsyncThunk(
  "posts/fetchPostsByViews",
  async (tag = "") => {
    const { data } = await axios.get(
      `posts/getAllByViews${tag ? `?tag=${tag}` : ""}`
    );
    console.log(data);
    return data;
  }
);
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("tags");
  console.log(data);
  return data;
});

export const removePost = createAsyncThunk("posts/removePost", async (id) => {
  const { data } = await axios.delete(`posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = "error";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPostsByViews.pending, (state) => {
      state.posts.status = "loading";
    });
    builder.addCase(fetchPostsByViews.fulfilled, (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPostsByViews.rejected, (state) => {
      state.posts.status = "error";
      state.posts.items = action.payload;
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = "loaded";
      state.tags.items = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.status = "error";
      state.tags.items = action.payload;
    });
    builder.addCase(removePost.pending, (state) => {
      state.tags.status = "loading";
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.tags.status = "loaded";
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
    });
    builder.addCase(removePost.rejected, (state) => {
      state.tags.status = "error";
    });
  },
});

export default postsSlice.reducer;
