import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APT_OPTIONS } from "../Utils/constant";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchList, setSearchList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [searchList]);

  useEffect(() => {
    setPage(1);
    setSearchList([]);
    setHasMore(true);
  }, [searchParams.get("query")]);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      getSearchList();
    }
  };

  const getSearchList = async () => {
    const data = await fetch(
      ` https://api.themoviedb.org/3/search/multi?query=${searchParams.get(
        "query"
      )}&include_adult=false&language=en-US&page=${page}`,
      APT_OPTIONS
    );
    const json = await data.json();
    if (json.results.length > 0) {
      setSearchList((prev) => [...prev, ...json.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
      // console.log("Page end");
    }
  };

  return (
    <div className="w-full sm:p-2 mt-6 min-h-screen">
      <h1 className="text-white  font-bold text-3xl p-2">
        Top Results for: '{searchParams.get("query")}'
      </h1>
      {!hasMore && searchList.length === 0 && (
        <h1 className="text-white mt-8 text-center text-3xl">
          No results found....
        </h1>
      )}
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchList.map((list) => (
          <Link to={`/details/movie/${list.id}`} key={list.id}>
            <Card {...list} show_type={true} />
          </Link>
        ))}
      </div>
      <div
        ref={elementRef}
        className={`${
          hasMore ? "block" : "hidden"
        } p-3 animate-pulse text-gray-300 text-xl text-center`}
      >
        Loading...
      </div>
    </div>
  );
};

export default SearchResults;
