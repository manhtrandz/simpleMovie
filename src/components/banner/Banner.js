import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config/config";
import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router";

function Banner({ item }) {
  const navigate = useNavigate();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=6cc739457b66fe412b722c791bdd263a&language=en-US&page=1`,
    fetcher
  );
  const movies = data?.results || [];
  // console.log(movies);
  return (
    <section className="banner h-[500px] page-container mb-10 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={40}>
        {movies.length > 0 &&
          movies.map((movie) => {
            return (
              <SwiperSlide
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}>
                <BanerItem item={movie}></BanerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
}

function BanerItem({ item }) {
  const { backdrop_path, title } = item || {};
  return (
    <div className="w-full h-full rounded-lg relative bg-white">
      <div className="overlay absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      <img
        className="w-full h-full rounded-lg object-cover"
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
      />
      <div className="desc-baner absolute left-5 bottom-5 w-full text-white z-50">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-10">
          <span className="border py-2 px-4  rounded-md border-white">
            Action
          </span>
          <span className="border py-2 px-4 rounded-md border-white">
            Advanture
          </span>
          <span className="border py-2 px-4 rounded-md border-white">
            Drama
          </span>
        </div>
        <button className="outline-none rounded-lg py-3 px-5 bg-primary font-bold">
          Watch now
        </button>
      </div>
    </div>
  );
}

export default Banner;
