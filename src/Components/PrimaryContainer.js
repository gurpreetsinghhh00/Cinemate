import React, { useEffect, useState } from "react";
import { APT_OPTIONS } from "../constant";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const PrimaryContainer = () => {
  const [trending, setTrending] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTrending();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  const getTrending = async () => {
    setIsLoading(true);
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      APT_OPTIONS
    );
    const json = await data.json();
    setTrending(json.results?.slice(0, 15));
    setIsLoading(false);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? trending.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === trending.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-full h-56 sm:h-96 lg:h-[90vh] relative group">
      <div
        className="w-full h-full bg-cover duration-500 opacity-80"
        style={
          trending.length
            ? {
                backgroundImage: `url("https://image.tmdb.org/t/p/original${trending[currentIndex]?.backdrop_path}")`,
              }
            : {}
        }
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2 cursor-pointer text-white bg-black/20">
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2 cursor-pointer text-white bg-black/20">
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div>
      <div className="hidden md:block absolute top-[60%] w-[45%] left-10 text-white text-md h-[70px] text-ellipsis font-nunito overflow-hidden">
        {trending[currentIndex]?.overview}
      </div>
      <Link
        to={
          "/details/" +
          trending[currentIndex]?.media_type +
          "/" +
          trending[currentIndex]?.id
        }
        className="underline absolute top-[85%] text-white border py-[6px] text-[8px] sm:text-sm hover:border-red-600 hover:scale-105 left-5 sm:left-10 sm:py-2 px-2 rounded-full border-white sm:border-2"
      >
        Know More
      </Link>
      <div className="font-nunito absolute bottom-[5%] w-2/4 text-right text-ellipsis right-5 sm:right-20 text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        {trending[currentIndex]?.title
          ? trending[currentIndex]?.title
          : trending[currentIndex]?.name}
      </div>
    </div>
  );
};

export default PrimaryContainer;
