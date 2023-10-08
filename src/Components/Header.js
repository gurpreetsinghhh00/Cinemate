import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { APT_OPTIONS } from "../constant";
import search1 from "../assets/img/search1.png";
import cross1 from "../assets/img/cross1.png";
import search2 from "../assets/img/search2.png";
import { useDispatch, useSelector } from "react-redux";
import { cacheSuggestions } from "../Utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const cache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cache[searchQuery]) {
        setSearchSuggestions(cache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/keyword?query=" +
        searchQuery +
        "&page=1",
      APT_OPTIONS
    );
    const json = await data.json();
    setSearchSuggestions(json.results.slice(0, 10));
    dispatch(
      cacheSuggestions({
        [searchQuery]: json.results.slice(0, 10),
      })
    );
  };

  const navItems = [
    {
      name: "Home",
      url: "/",
      isActive: true,
    },
    {
      name: "Movies",
      url: "/movies",
      isActive: false,
    },
    {
      name: "TV",
      url: "/tv-shows",
      isActive: false,
    },
  ];

  return (
    <header className="w-full absolute z-10">
      <nav className="flex justify-between px-4 py-4 items-center h-16 font-bold bg-gray-950 text-white">
        <div className="font-creepster text-4xl text-red-600">CineMate</div>
        <ul className="flex gap-4 mr-4 ">
          {navItems.map((item) => {
            return (
              <li className=" py-2 px-3 text-lg" key={item.name}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : " hover:text-red-500"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
          <li className=" py-2 px-3 text-lg" key="search">
            <img
              src={visible ? cross1 : search1}
              className="cursor-pointer w-8"
              onClick={() => setVisible(!visible)}
            />
          </li>
        </ul>
      </nav>
      <form
        className={`w-full px-7 bg-white border border-b-black  ${
          visible ? "block" : "hidden"
        }`}
        onSubmit={(e) => {
          e.preventDefault;
          setSearchQuery("");
        }}
      >
        <div className="flex">
          <img className="w-5 py-3" src={search2} />
          <input
            className="p-3 outline-none italic w-full"
            placeholder="Search for movies, tv shows..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </form>
      <ul className={`w-full bg-white ${visible ? "block" : "hidden"}`}>
        {searchSuggestions.map((suggestion) => {
          return (
            <li
              className="px-8 py-1  border-b border-gray-200 text-sm cursor-pointer hover:bg-gray-200"
              key={suggestion.id}
              onClick={(e) => setSearch(suggestion.name)}
            >
              <img className="w-4 inline-block" src={search2} />
              <span className="ml-2">{suggestion.name}</span>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
