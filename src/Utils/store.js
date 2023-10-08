import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieSlice from "./movieSlice";
import tvShowSlice from "./tvShowSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieSlice,
    tvshow: tvShowSlice,
  },
});

export default store;
