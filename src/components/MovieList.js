import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import MovieCard from "./movie/MovieCard";
import { fetcher } from "../config/config";
import useSWR from "swr";
function MovieList({ typeMovie = "now_playing" }) {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${typeMovie}?api_key=6cc739457b66fe412b722c791bdd263a&language=en-US&page=1`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movies-list">
      <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={20}>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default MovieList;
