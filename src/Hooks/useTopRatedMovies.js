import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../Utils/movieSlice";
import { useEffect } from "react";
import { APT_OPTIONS } from "../Utils/constant";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);

  useEffect(() => {
    !topRatedMovies && getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      APT_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };
};

export default useTopRatedMovies;
