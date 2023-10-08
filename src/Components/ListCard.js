import React from "react";
import { IMAGE_URL } from "../constant";

const ListCard = ({ title, poster_path, name }) => {
  return (
    <div className="w-40 inline-block shadow-lg rounded-lg bg-white hover:scale-105 transition-all ease-in-out">
      <img
        src={IMAGE_URL + poster_path}
        className="rounded-t-lg cursor-pointer"
        alt={title ? title : name}
      />
      <div className="py-4 px-3">
        <h1 className="font-bold h-[3rem] text-ellipsis overflow-hidden cursor-pointer">
          {title ? title : name}
        </h1>
      </div>
    </div>
  );
};

export default ListCard;
