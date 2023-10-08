import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import { addTopRatedShows } from "../Utils/tvShowSlice";

const useTopRatedShows = () => {
  const dispatch = useDispatch();
  const topRatedShows = useSelector((store) => store.tvshow.topRatedShows);
  useEffect(() => {
    !topRatedShows && getTvList();
  }, []);

  const getTvList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated",
      APT_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedShows(json.results));
  };
};

export default useTopRatedShows;
