import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";

function MovieCard({ item }) {
  const { poster_path, title, release_date, vote_average, id } = item;
  const navigate = useNavigate();

  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 h-full select-none">
      <img
        onClick={handleNavigate}
        className="w-full h-[400px] object-cover mb-5 rounded-lg cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
      />
      <div className="movie-title flex flex-col flex-1 text-center text-white">
        <h3
          className="text-xl mt-4 mb-2 cursor-pointer"
          onClick={handleNavigate}>
          {title}
        </h3>
        <div className="manufacture flex justify-between mt-2  mb-8 opacity-50 ">
          <span className="movie-year">
            {new Date(release_date).getFullYear()}
          </span>
          <div className="rate">
            <span className="movie-rate mr-1">{vote_average}</span>
            <FontAwesomeIcon className="text-yellow-300" icon={faStar} />
          </div>
        </div>
        <button
          onClick={handleNavigate}
          className="w-full mt-auto py-3 px-6 outline-none font-bold rounded-lg bg-primary">
          Watch now
        </button>
      </div>
    </div>
  );

  function handleNavigate() {
    return navigate(`/movies/${id}`);
  }
}

export default MovieCard;
