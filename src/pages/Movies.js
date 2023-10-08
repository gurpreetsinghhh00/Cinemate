import React, { useState, useEffect, useRef } from "react";
import { APT_OPTIONS } from "../constant";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Movies = () => {
  // const [moviesList, setMoviesList] = useState([]);

  // useEffect(() => {
  //   getMoviesList();
  // }, []);

  // const getMoviesList = async () => {
  //   const data = await fetch(
  //     "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  //     APT_OPTIONS
  //   );
  //   const json = await data.json();
  //   setMoviesList(json.results);
  // };

  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

  function onIntersection(entries) {
    console.log(entries);
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      getMoviesList();
    }
  }

  const getMoviesList = async () => {
    const data = await fetch(
      ` https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      APT_OPTIONS
    );
    const json = await data.json();
    if (json?.results) {
      setMoviesList((prev) => [...prev, ...json.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, { threshold: 1 });
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [moviesList]);

  return (
    <div className="w-full sm:p-2 mt-6 min-h-screen">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-hidden">
        {moviesList.map((movie) => (
          <Link to={`/details/movie/${movie.id}`} key={movie.id}>
            <Card {...movie} />
          </Link>
        ))}
      </div>
      <div
        ref={elementRef}
        className="p-3 animate-pulse text-gray-300 text-xl text-center"
      >
        Loading...
      </div>
    </div>
  );
};

export default Movies;
