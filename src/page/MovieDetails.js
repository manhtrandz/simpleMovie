import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { apiKey, fetcher } from "../config/config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
function MovieDetails(props) {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US?page=1`,
    fetcher
  );

  if (!data) {
    return null;
  }
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="overlay w-full h-full absolute inset-0 bg-black opacity-70 rounded-lg"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}></div>
      </div>
      <div className="w-full h-[600px] max-w-[400px] mx-auto -mt-[400px] relative z-10 pb-8">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
        />
      </div>
      <div className="text-center text-white mb-10">
        <h1 className="text-3xl mt-4 mb-2 cursor-pointer">{title}</h1>
      </div>

      {
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((gen) => {
            return (
              <span
                key={gen.id}
                className="px-6 py-3 border border-purple-500 rounded-full text-purple-500">
                {gen.name}
              </span>
            );
          })}
        </div>
      }

      <div className="flex items-center justify-center max-w-[600px] mx-auto">
        <p className="text-justify">{overview}</p>
      </div>

      <div className=" text-white mb-10">
        <h1 className="text-3xl mt-4 mb-10 cursor-pointer font-bold">Cast</h1>
        <MovieCredits></MovieCredits>
      </div>

      <div className=" text-white mb-10">
        <h1 className="text-3xl mt-4 mb-10 cursor-pointer font-bold">
          Trailer
        </h1>
        <TrailerMovie></TrailerMovie>
      </div>

      <div className=" text-white mb-10">
        <h1 className="text-3xl mt-4 mb-10 cursor-pointer font-bold">
          Similar movies
        </h1>
        <MoviesSamillar></MoviesSamillar>
      </div>
    </div>
  );
}

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
    fetcher
  );
  if (!data) {
    return null;
  }
  const { cast } = data;
  return (
    <div className="profile-card">
      <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={20}>
        {cast.length > 0 &&
          cast.map((item) => {
            return (
              <SwiperSlide key={item.cast_id}>
                <div className="flex flex-col rounded-lg p-3 bg-slate-800 select-none">
                  <div className="w-[300px]">
                    <img
                      className="w-full h-[400px] object-cover mb-5 rounded-lg cursor-pointer"
                      src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                      alt=""
                    />
                    <div className="movie-title flex flex-col flex-1 text-center text-white">
                      <h3 className="text-xl mt-4 mb-2 cursor-pointer">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

function TrailerMovie() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-Us?page=1`,
    fetcher
  );
  if (!data) {
    return null;
  }
  const { results } = data;
  if (!results && results.lenght <= 0) return null;
  return (
    <div className="py-10 page-container">
      {results.length > 0 &&
        results.slice(0, 3).map((item) => {
          return (
            <div>
              <h3 className="text-xl">{item.name}</h3>
              <div
                className="w-full h-[600px] border my-10 aspect-video"
                key={item.id}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="How to make a Movie Trailer App with ReactJs and TheMovieDB API"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
              </div>
            </div>
          );
        })}
    </div>
  );
}

function MoviesSamillar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-Us?page=1`,
    fetcher
  );
  if (!data) {
    return null;
  }
  // console.log(data);
  const { results } = data;
  if (!results && results.length <= 0) return null;

  return (
    <div className="movie-similar flex flex-col">
      <div className="movies-list">
        <Swiper grabCursor={"true"} slidesPerView={"auto"} spaceBetween={20}>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetails;
