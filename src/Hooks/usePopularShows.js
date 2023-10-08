import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import { addPopularShows } from "../Utils/tvShowSlice";

const usePopularShows = () => {
  const dispatch = useDispatch();
  const popularShows = useSelector((store) => store.tvshow.popularShows);
  useEffect(() => {
    !popularShows && getTvList();
  }, []);

  const getTvList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular",
      APT_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularShows(json.results));
  };
};

export default usePopularShows;
