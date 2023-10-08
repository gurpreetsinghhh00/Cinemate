import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieSlice from "./movieSlice";
import tvShowSlice from "./tvShowSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieSlice,
    tvshow: tvShowSlice,
    search: searchSlice,
  },
});

export default store;
