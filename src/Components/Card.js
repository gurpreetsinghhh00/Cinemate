import React from "react";
import { IMAGE_URL } from "../Utils/constant";
import notAvailable from "../assets/img/notAvailable.png";

const Card = ({
  title,
  name,
  first_air_date,
  poster_path,
  release_date,
  vote_average,
  show_type = false,
  media_type,
}) => {
  return (
    <div className="w-full shadow-lg rounded-lg bg-white cursor-pointer h-full">
      <img
        src={poster_path?.length ? IMAGE_URL + poster_path : notAvailable}
        className="rounded-t-lg w-full"
        alt={title}
      />
      <div className="py-4 px-3">
        <h1 className="font-bold">{title ? title : name}</h1>
        <p className="text-sm text-gray-500">
          {release_date ? release_date : first_air_date}
        </p>
        {/* <p className="text-sm text-gray-500">{vote_average}/10</p> */}
        {show_type && (
          <span className="text-xs ">
            {media_type === "movie" ? `Movie` : `TV Show`}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
