import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: null,
    trendingMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
  },
  reducers: {
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
  },
});

export const {
  addPopularMovies,
  addTopRatedMovies,
  addTrendingMovies,
  addUpcomingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
