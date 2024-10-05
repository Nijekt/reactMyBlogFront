import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postsSlice from "./slices/postsSlice";
import commentsSlice from "./slices/commentsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    comments: commentsSlice,
    user: userSlice,
  },
});

export default store;
