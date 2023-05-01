import React, { useEffect, useState } from "react";
import { fetcher } from "../config/config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
// import useDebounceSearchMovie from "../hooks/useDebounceSearchMovie";
import useDebounce from "../hooks/useDebounceSearchMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
function MoviePage(props) {
  const [filter, setFilter] = useState("");
  const [pageIndex, setpageIndex] = useState(1);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=6cc739457b66fe412b722c791bdd263a&page=${pageIndex}`
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error, isLoading } = useSWR(url, fetcher);
  const filterDebounce = useDebounce(filter, 700);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=6cc739457b66fe412b722c791bdd263a&query=${filterDebounce}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=6cc739457b66fe412b722c791bdd263a&page=${pageIndex}`
      );
    }
  }, [filterDebounce]);
  const movies = data?.results || [];
  const { page, total_page } = data;
  console.log(page);
  console.log(total_page);
  // const loading = !data && !error;

  return (
    <div className="py-10 page-container">
      <div className="flex mb-5">
        <div className=" flex-1 bg-transparent">
          <input
            type="text"
            className="w-full p-4 outline-none  bg-slate-800 text-white"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button
          type="submit"
          className="py-4 px-10 bg-primary"
          onClick={handleFilterChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-white ">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {isLoading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
      )}
      <div className="grid grid-cols-4 gap-10 mt-20 mb-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} item={movie}></MovieCard>;
          })}
      </div>

      {/* next page */}
      <div className="flex items-center justify-center text-xl">
        <span className="cursor-none">
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <div className="mx-5">
          <span className="mx-3 px-[13px] py-[5px] leading-none rounded-lg bg-white text-slate-900">
            1
          </span>
        </div>
        <span className="cursor-pointer">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
    </div>
  );
}

export default MoviePage;
