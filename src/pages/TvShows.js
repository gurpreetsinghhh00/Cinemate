import React, { useState, useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const TvShows = () => {
  const [tvList, setTvList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTvList();
  }, [page]);

  const getTvList = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
      APT_OPTIONS
    );
    const json = await data.json();
    if (json) {
      setTvList(json.results);
    }
  };

  return (
    <div className="w-full min-h-screen sm:p-2 mt-6">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-hidden">
        {tvList?.map((tv) => (
          <Link to={`/details/tv/${tv.id}`} key={tv.id}>
            <Card title={tv.name} release_date={tv.first_air_date} {...tv} />
          </Link>
        ))}
      </div>
      <div className="text-white flex px-8 pb-6 justify-between mt-4 font-semibold font-nunito self-end">
        <button
          className={`py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 ${
            page === 1 ? "invisible" : "visible"
          }`}
          onClick={() => {
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
          }}
        >
          ◀ Prev
        </button>
        <span className="p-2">{page}</span>
        <button
          className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TvShows;
