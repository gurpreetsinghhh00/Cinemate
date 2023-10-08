import React from "react";
import { IMAGE_URL } from "../constant";

const Card = ({ title, poster_path, release_date }) => {
  return (
    <div className="w-full shadow-lg rounded-lg bg-white cursor-pointer h-full">
      <img
        src={IMAGE_URL + poster_path}
        className="rounded-t-lg w-full"
        alt={title}
      />
      <div className="py-4 px-3">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{release_date}</p>
      </div>
    </div>
  );
};

export default Card;
