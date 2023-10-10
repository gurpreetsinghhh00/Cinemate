import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { APT_OPTIONS } from "../constant";
import search1 from "../assets/img/search1.png";
import cross1 from "../assets/img/cross1.png";
import search2 from "../assets/img/search2.png";
import menu from "../assets/img/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { cacheSuggestions } from "../Utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const cache = useSelector((store) => store.search);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
    {
      name: "Login",
      url: "/tv-shows",
      isActive: false,
    },
    {
      name: "Signup",
      url: "/tv-shows",
      isActive: false,
    },
  ];

  return (
    <header className="w-full">
      <nav className="hidden md:block font-bold bg-black text-white">
        <div className="flex justify-between px-4 py-4 items-center h-16">
          <div className="font-creepster text-4xl text-red-600">
            <Link to="/">CineMate</Link>
          </div>
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
                className="cursor-pointer w-7"
                onClick={() => setVisible(!visible)}
              />
            </li>
          </ul>
        </div>
      </nav>
      <nav className="md:hidden font-bold text-white bg-black">
        <div className="flex h-16 px-4 py-4 justify-between items-center ">
          <img
            src={menu}
            className={`w-11 cursor-pointer ${
              isMenuVisible ? "animate-rotate-right" : "animate-rotate-left"
            }`}
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
          />
          <div className="font-creepster text-4xl text-red-600">
            <Link to="/">CineMate</Link>
          </div>
          <div className=" py-2 px-3 text-lg">
            <img
              src={visible ? cross1 : search1}
              className="cursor-pointer w-7"
              onClick={() => setVisible(!visible)}
            />
          </div>
        </div>
        <div className={isMenuVisible ? "block" : "hidden"}>
          <ul className="flex flex-col border-t border-gray-500">
            {navItems.map((item) => {
              return (
                <li
                  className="text-center border-b border-gray-500 text-lg py-1"
                  key={item.name}
                >
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
          </ul>
        </div>
      </nav>
      <div className="absolute w-full z-10">
        <form
          name="search"
          className={`w-full pl-7 bg-white border border-b-black ${
            visible ? "block" : "hidden"
          }`}
          onSubmit={(e) => {
            e.preventDefault;
            setSearchQuery("");
            setVisible(false);
          }}
        >
          <div className="flex">
            <img className="w-5 py-3" src={search2} />
            <input
              className="px-3 py-2 outline-none italic w-full"
              placeholder="Search for movies, tv shows..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Link to={"/search?query=" + searchQuery}>
              <button
                className="px-3 py-2 border-2 border-gray-300 bg-gray-200  hover:bg-gray-300"
                onClick={() => {
                  setSearchQuery("");
                  setVisible(false);
                }}
              >
                Search
              </button>
            </Link>
          </div>
        </form>
        <ul className={`w-full bg-white ${visible ? "block" : "hidden"}`}>
          {searchSuggestions.map((suggestion) => {
            return (
              <li
                className="px-8 py-1  border-b border-gray-200 text-sm cursor-pointer hover:bg-gray-200"
                key={suggestion.id}
                onClick={(e) => setSearchQuery(suggestion.name)}
              >
                <img className="w-4 inline-block" src={search2} />
                <span className="ml-2">{suggestion.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
