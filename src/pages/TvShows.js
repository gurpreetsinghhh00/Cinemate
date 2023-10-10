import React, { useState, useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const TvShows = () => {
  const [tvList, setTvList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTvList();
  }, [page]);

  const getTvList = async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
      APT_OPTIONS
    );
    const json = await data.json();
    if (json && json?.results?.length > 1) {
      setTvList(json.results);
    } else {
      setTvList([]);
      setHasMore(false);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full min-h-screen sm:p-2 mt-6">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tvList.length === 0 ? (
          <h1 className="font-bold text-white text-2xl h-[80vh]">
            No Result Found...
          </h1>
        ) : (
          tvList?.map((tv) => (
            <Link to={`/details/tv/${tv.id}`} key={tv.id}>
              <Card {...tv} />
            </Link>
          ))
        )}
      </div>
      <div className="text-white flex px-8 pb-6 justify-between mt-4 font-semibold font-nunito self-end">
        <button
          className={`py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 ${
            page === 1 ? "invisible" : "visible"
          }`}
          onClick={() => {
            setHasMore(true);
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
            window.scrollTo(0, 0);
          }}
        >
          ◀ Prev
        </button>
        <span className="p-2">{page}</span>
        <button
          className={`py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 ${
            hasMore ? "visible" : "invisible"
          }`}
          onClick={() => {
            setPage((prev) => prev + 1);
            window.scrollTo(0, 0);
          }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default TvShows;
