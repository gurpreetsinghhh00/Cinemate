import React, { useState, useEffect } from "react";
import { APT_OPTIONS } from "../constant";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    getMoviesList();
  }, []);

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      APT_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    setMoviesList(json.results);
  };

  return (
    <div className="w-full sm:p-2 mt-20">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-x-hidden">
        {moviesList.map((movie) => (
          <Link to={`/details/movie/${movie.id}`} key={movie.id}>
            <Card {...movie} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
