import { useSelector } from "react-redux";
import useTrendingMovies from "../Hooks/useTrendingMovies";
import List from "./List";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpcomingMovies from "../Hooks/useUpcomingMovies";
import usePopularShows from "../Hooks/usePopularShows";
import useTopRatedShows from "../Hooks/useTopRatedShows";

const MovieShowsList = () => {
  useTrendingMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  usePopularShows();
  useTopRatedShows();
  const movie = useSelector((store) => store.movie);
  const tvshow = useSelector((store) => store.tvshow);

  return (
    <div className="space-y-8">
      <List
        heading="Trending Movies"
        data={movie.trendingMovies}
        type="movie"
      />
      <List
        heading="Top Rated Movies"
        data={movie.topRatedMovies}
        type="movie"
      />
      <List
        heading="Upcoming Movies"
        data={movie.upcomingMovies}
        type="movie"
      />
      <List heading="Popular Shows" data={tvshow.popularShows} type="tv" />
      <List heading="Top Rated Shows" data={tvshow.topRatedShows} type="tv" />
    </div>
  );
};

export default MovieShowsList;
