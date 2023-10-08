import { createSlice } from "@reduxjs/toolkit";

const tvShowSlice = createSlice({
  name: "tvshow",
  initialState: {
    popularShows: null,
    topRatedShows: null,
  },
  reducers: {
    addPopularShows: (state, action) => {
      state.popularShows = action.payload;
    },
    addTopRatedShows: (state, action) => {
      state.topRatedShows = action.payload;
    },
  },
});

export const { addPopularShows, addTopRatedShows } = tvShowSlice.actions;
export default tvShowSlice.reducer;
