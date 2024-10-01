import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postsSlice from "./slices/postsSlice";
import commentsSlice from "./slices/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    comments: commentsSlice,
  },
});

export default store;
