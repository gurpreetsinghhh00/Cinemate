import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";
import { APT_OPTIONS } from "../constant";

const useUpcoming = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);

  useEffect(() => {
    !upcomingMovies && getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      APT_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };
};

export default useUpcoming;
