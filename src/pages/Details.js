import React, { useEffect, useState } from "react";
import { UseParams } from "react-router-dom";
import { APT_OPTIONS } from "../constant";
import useGetDetails from "../Hooks/useGetDetails";

const Details = () => {
  const data = useGetDetails();
  const details = data[0];
  const video = data[1];

  return (
    <div className="w-screen">
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={"https://www.youtube.com/embed/" + video?.key + "?&autoplay=1"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className=" w-screen relative z-10">
        <div
          className="w-screen h-full bg-cover absolute opacity-30"
          style={
            Object.keys(details).length
              ? {
                  backgroundImage: `url("https://image.tmdb.org/t/p/original${details?.backdrop_path}")`,
                }
              : {}
          }
        ></div>
        <div className="px-8 py-10 flex text-white gap-4 font-nunito">
          <img
            src={`https://image.tmdb.org/t/p/original${details?.poster_path}`}
            className="rounded-lg w-[300px] h-[500px] z-20"
          />
          <div className="z-20 p-2 flex flex-col justify-between">
            <div>
              <div className="text-4xl flex">
                <h1 className="">
                  {details?.title ? details?.title : details?.name}{" "}
                </h1>
                <p className="text-gray-300">
                  (
                  {details?.release_date
                    ? details?.release_date?.split("-")[0]
                    : details?.first_air_date?.split("-")[0]}
                  )
                </p>
              </div>
              <div className="space-x-2 py-2">
                {details?.genres &&
                  details?.genres.map((genre) => {
                    return (
                      <span
                        key={genre.id}
                        className="text-sm py-1 px-2 rounded-full border-2 border-white"
                      >
                        {genre?.name}
                      </span>
                    );
                  })}
              </div>
            </div>
            <p className="italic text-gray-300">{details?.tagline}</p>
            <div className="py-2 space-y-4">
              <p className="p-2 object-contain">{details?.overview}</p>
              <button className="p-2 hover:scale-105 transition-all">
                <a
                  href={details?.homepage}
                  target="_blank"
                  className="hover:border-red-600 py-2 px-2 rounded-full border-white border-2 text-center"
                >
                  Visit Official Site
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
