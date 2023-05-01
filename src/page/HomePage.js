import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import MovieList from "../components/MovieList";

function HomePage(props) {
  return (
    <Fragment>
      <section className="movies-layout page-container mb-20">
        <div className="flex justify-between">
          <h2 className="capitalize text-white mb-10 text-3xl font-bold">
            Movies
          </h2>
          <div className="text-white">
            <FontAwesomeIcon className="" icon={faAngleLeft} />
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </div>
        </div>
        <MovieList></MovieList>
      </section>
      <section className="movies-layout page-container mb-20" id="top_rated">
        <div className="flex justify-between">
          <h2 className="capitalize text-white mb-10 text-3xl font-bold">
            Top rated
          </h2>
          <div className="text-white">
            <FontAwesomeIcon className="" icon={faAngleLeft} />
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </div>
        </div>
        <MovieList typeMovie={"top_rated"}></MovieList>
      </section>

      <section className="movies-layout page-container mb-20" id="trending">
        <div className="flex justify-between">
          <h2 className="capitalize text-white mb-10 text-3xl font-bold">
            Trending
          </h2>
          <div className="text-white">
            <FontAwesomeIcon className="" icon={faAngleLeft} />
            <FontAwesomeIcon className="" icon={faAngleRight} />
          </div>
        </div>
        <MovieList typeMovie={"popular"}></MovieList>
      </section>
    </Fragment>
  );
}

export default HomePage;
