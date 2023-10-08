import React, { useState, useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import usePopularShows from "../Hooks/usePopularShows";
import { Link } from "react-router-dom";

const TvShows = () => {
  usePopularShows();
  const tvList = useSelector((store) => store.tvshow.popularShows);

  // useEffect(() => {
  //   getTvList();
  // }, []);

  // const getTvList = async () => {
  //   const data = await fetch(
  //     "https://api.themoviedb.org/3/tv/popular",
  //     APT_OPTIONS
  //   );
  //   const json = await data.json();
  //   console.log(json);
  //   setTvList(json.results);
  // };

  return (
    <div className="w-full sm:p-2 mt-20">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-hidden">
        {tvList?.map((tv) => (
          <Link to={`/details/tv/${tv.id}`} key={tv.id}>
            <Card title={tv.name} release_date={tv.first_air_date} {...tv} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
