import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";
import { APT_OPTIONS } from "../Utils/constant";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movie.trendingMovies);

  useEffect(() => {
    !trendingMovies && getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      APT_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    dispatch(addTrendingMovies(json.results));
  };
};

export default useTrendingMovies;
